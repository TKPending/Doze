"use client";
import { useState, useEffect } from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AddSubGoal from "./components/AddSubGoal";
import SubGoalComponent from "./components/SubGoalComponent";
import ClearSubGoals from "./components/ClearSubGoals";
import SubGoal from "../SubGoalComponent/SubGoal";
import { useRouter } from "next/navigation";
import MainGoalsClient from "@/util/clients/mainGoalsClient";
import EditSubGoal from "../SubGoalComponent/EditSubGoal";
import SubGoalsClient from "@/util/clients/subGoalsClient";

const MainGoal = ({
  onSave,
  initialMainGoalData = {
    title: "Main Goal Title",
    description: "",
    status: "to-do",
    startDate: new Date().toLocaleDateString("en-CA"),
    tags: [],
    icon: "😁",
  },
}) => {
  const [mainGoalData, setMainGoalData] = useState(initialMainGoalData);
  console.log(mainGoalData, "26");
  const [tagInput, setTagInput] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubGoalModalVisible, setSubGoalModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});
  const [taskUpdated, setTaskUpdated] = useState(false);
  const [emptyAllSubGoals, setEmptyAllSubGoals] = useState(false);
  const router = useRouter();
  const handleInputValue = (e) => {
    if (e.target.name === "title") {
      setMainGoalData({ ...mainGoalData, title: e.target.value });
    }
    if (e.target.name === "description") {
      setMainGoalData({ ...mainGoalData, description: e.target.value });
    }
    if (e.target.name === "status") {
      setMainGoalData({ ...mainGoalData, status: e.target.value });
    }
    if (e.target.name === "startDate") {
      setMainGoalData({ ...mainGoalData, startDate: e.target.value });
    }
    if (e.target.name === "icon") {
      setMainGoalData({ ...mainGoalData, icon: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //PUT and POST request
    onSave(mainGoalData);
    router.push("/dashboard");
  };

  const handleEmoji = (e) => {
    handleInputValue({ target: { name: "icon", value: e.native } });
  };

  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleColourChange = (colour) => {
    setSelectedColour(colour);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    try {
      if (tagInput !== "" && selectedColour !== "") {
        setMainGoalData({
          ...mainGoalData,
          tags: [
            ...mainGoalData.tags,
            { text: tagInput, colour: selectedColour },
          ],
        });
        setTagInput("");
        setSelectedColour("");
      } else {
        alert("Please enter a tag and select a colour");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set modal to the task clicked
  const handleOnClick = (subGoal) => {
    setIsEditModalVisible(true);
    setTaskClicked(subGoal);
  };

  const handleRemoveTag = (index) => {
    const newTags = mainGoalData.tags;
    newTags.splice(index, 1);
    setMainGoalData({
      ...mainGoalData,
      tags: newTags,
    });
  };

  //DELETE - deleting main goal
  const onDeleteMainGoal = async (e) => {
    e.preventDefault();
    const response = await MainGoalsClient.deleteOneMainGoalReq(
      mainGoalData._id
    );
    router.push("/dashboard");
  };

  // Add logic to empty all Sub Goals
  const emptySubGoals = async () => {
    const response = await SubGoalsClient.deleteAllSubGoalsInMainGoals(
      mainGoalData._id
    );

    if (!response) {
      console.log("Problem emptying sub goals in main goals page!");
    }

    setEmptyAllSubGoals(true);
  };

  useEffect(() => {
    if (emptyAllSubGoals) {
      setEmptyAllSubGoals(false);
    }

    const fetchData = async () => {
      const response = await MainGoalsClient.getOneMainGoalReq(
        mainGoalData._id
      );
      setMainGoalData(response);
    };

    if (!mainGoalData._id) {
      return;
    }
    fetchData();
  }, [
    isSubGoalModalVisible,
    emptyAllSubGoals,
    taskUpdated,
    taskClicked,
    isEditModalVisible,
  ]);

  return (
    <div className="w-full flex justify-center items-center mb-20 mt-24">
      <div className="md:w-1/2 h-full relative">
      
        <form id="goalForm" onSubmit={submitHandler}>
          <input
            data-testid="title"
            name="title"
            type="text"
            className="input text-3xl mb-5"
            value={mainGoalData.title}
            onChange={handleInputValue}
          />
          
          <div className="flex items-center justify-center border border-[#7899D4] py-10 flex-col gap-4">
            
            {mainGoalData._id && (
            <div className="md:absolute lg:absolute flex justify-center items-center md:left-2.5 lg:left-5 md:top-20 lg:top-24 mb-2.5">
              <div className="flex items-center flex-col">
              {/* <ProgressBar /> */}
              <div
                className="radial-progress text-indigo-400 circle-progress font-bold rounded-full"
                style={{
                  "--value": `${mainGoalData.completed}`,
                  "--size": "5rem",
                  "--thickness": "1rem",
                }}
                role="progressbar"
              >
                {mainGoalData.completed}%
              </div>
             </div>
            </div>
          )}
          
            <div className="">
              <button onClick={toggleEmojiPicker} className="mb-5 mt-6">

                <span className="text-6xl">{mainGoalData.icon}</span>
              </button>
              {isOpen && (
                <div className="absolute sm:left-5">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmoji}
                    onClickOutside={toggleEmojiPicker}
                  />
                </div>
              )}
            </div>
           
            <p className="text-center mb-2.5 text-gray-800">Select a start date</p>
            
              <input
                data-testid="startDate"
                name="startDate"
                type="date"
                className="input border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600 mb-8 p-2 w-56 h-8"
                onChange={handleInputValue}
                value={mainGoalData.startDate}
              />
          

            {/* Button for changing Status */}
            
              <select
                className="outline-indigo-600 border-indigo-600 border rounded-md focus:border-indigo-600 p-2 mb-8 w-56"
                name="status"
                onChange={handleInputValue}
                value={mainGoalData.status}
              >
                <option value="">Select a status</option>
                <option value="to-do">To-do</option>
                <option value="in-progress">In progress</option>
                <option value="complete">Complete</option>
              </select>

            {/* Tag input and colour changer */}
            <div className="flex justify-center items-center mb-2.5">
              
              <input
                name="tag"
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                className="input border border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600 w-44 h-8"
                placeholder="Tags"
              />
              <button
                className="flex items-center border bg-indigo-600 text-white rounded-md hover:bg-white hover:border-indigo-600 hover:text-black transition duration-200 p-2.5 ml-4 h-8 w-8"
                onClick={handleAddTag}
              >
                +
              </button>
              </div>

              {/* Buttons for changing tag colour */}
              <div className="flex justify-center items-center">
                <input
                  type="radio"
                  id="blue"
                  name="colour"
                  value="blue"
                  defaultChecked={selectedColour === "blue"}
                  onChange={() => handleColourChange("blue")}
                  className="radio border-blue-400 checked:bg-blue-400 bg-blue-400 mt-1"
                />

                <input
                  type="radio"
                  id="red"
                  name="colour"
                  value="red"
                  checked={selectedColour === "red"}
                  onChange={() => handleColourChange("red")}
                  className="radio border-red-400 checked:bg-red-400 bg-red-400 ml-2 mt-1"
                />

                <input
                  type="radio"
                  id="lime"
                  name="colour"
                  value="lime"
                  checked={selectedColour === "lime"}
                  onChange={() => handleColourChange("lime")}
                  className="radio border-lime-400 checked:bg-lime-400 bg-lime-400 ml-2 mt-1"
                />

                <input
                  type="radio"
                  id="purple"
                  name="colour"
                  value="purple"
                  checked={selectedColour === "purple"}
                  onChange={() => handleColourChange("purple")}
                  className="radio border-purple-400 checked:bg-purple-400 bg-purple-400 ml-2 mt-1"
                />

                <input
                  type="radio"
                  id="yellow"
                  name="colour"
                  value="yellow"
                  checked={selectedColour === "yellow"}
                  onChange={() => handleColourChange("yellow")}
                  className="radio border-yellow-400 checked:bg-yellow-400 bg-yellow-400 ml-2 mt-1"
                />

                <input
                  type="radio"
                  id="orange"
                  name="colour"
                  value="orange"
                  checked={selectedColour === "orange"}
                  onChange={() => handleColourChange("orange")}
                  className="radio border-orange-400 checked:bg-orange-400 bg-orange-400 ml-2 mt-1"
                />

                <input
                  type="radio"
                  id="pink"
                  name="colour"
                  value="pink"
                  checked={selectedColour === "pink"}
                  onChange={() => handleColourChange("pink")}
                  className="radio border-pink-400 checked:bg-pink-400 bg-pink-400 ml-2 mt-1"
                />
              </div>

              <div className={`mt-2.5 mb-2.5 ${mainGoalData.tags.length > 3 ? 'grid grid-cols-4 gap-1' : 'flex'}`}>
                {mainGoalData.tags.map((tag, index) => (
                  <span data-testid="tag"  key={index}>
                    <div className={`badge bg-${tag.colour}-400 gap-2 p-4 text-white`}>
                      {tag.text}
                      <a onClick={() => handleRemoveTag(index)} className="inline-block cursor-pointer w-2.5 opacity-0 hover:opacity-100 hover:text-white ">
                        x
                      </a>
                    </div>
                  </span>
                ))}
              </div>
            

            
            {/* Description input */}
              <textarea
                data-testid="description"
                name="description"
                onChange={handleInputValue}
                value={mainGoalData.description}
                className="textarea h-18 input-bordered md:w-1/2 w-60 mb-5 border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
              ></textarea>
           
<span className="h-0.5 bg-indigo-600 opacity-25 mt-10 w-5/6"></span>
            {/* Sub Goals */}
            {mainGoalData._id && (
              <div className="flex mt-8 flex-col gap-4 h-auto mb-20">
                <div className="h-8 flex items-center justify-center mt-8 mb-5">
                  {mainGoalData.subGoals.length !== 0 && (
                    <ClearSubGoals onClick={() => emptySubGoals()} />
                  )}
                </div>

                <div className="p-2 overflow-hidden grid lg:grid-cols-3 md:grid-cols-3 grid-rows-1 gap-4 h-auto mb-8">
                  {mainGoalData.subGoals.map((subGoal, index) => (
                    <SubGoalComponent
                      key={index}
                      subGoal={subGoal}
                      onClick={handleOnClick}
                    />
                  ))}

                  {mainGoalData.subGoals.length === 0 && (
                    <div>
                      <p className="font-bold text-center text-neutral-400">
                        Add goals which will help with achieving your mains
                        goals!
                      </p>
                    </div>
                  )}

                  <AddSubGoal setIsModalVisible={setSubGoalModalVisible} />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              {mainGoalData._id && (
                <button
                  className="absolute left-4 bottom-4 text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-md p-2 pl-5 pr-5"
                  data-testid="delete"
                  onClick={onDeleteMainGoal}
                >
                  Delete
                </button>
              )}
              <button className="absolute right-4 bottom-4 text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-md p-2 pl-5 pr-5">
                Save
              </button>
            </div>
          </div>
        </form>

        {isSubGoalModalVisible && (
          <SubGoal
            setIsModalVisible={setSubGoalModalVisible}
            setTaskUpdated={setTaskUpdated}
            goalTitle={mainGoalData.title}
          />
        )}

        {isEditModalVisible && (
          <EditSubGoal
            setIsEditModalVisible={setIsEditModalVisible}
            taskClicked={taskClicked}
            setTaskUpdated={setTaskUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default MainGoal;
