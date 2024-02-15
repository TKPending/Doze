"use client";
import { useState, useEffect, useRef } from "react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AddSubGoal from "./components/AddSubGoal";
import SubGoalComponent from "./components/SubGoalComponent";
import ClearSubGoals from "./components/ClearSubGoals";
import SubGoal from "../SubGoalComponent/SubGoal";
import axios from "axios";

const MainGoal = () => {
  const [mainGoalData, setMainGoalData] = useState({
    title: "",
    description: "",
    status: "to-do",
    startDate: "",
    tags: [],
    icon: "😁",
  });

  const [tagInput, setTagInput] = useState("");
  const [selectedColour, setSelectedColour] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskClicked, setTaskedClicked] = useState(false);
  const [tempSubGoals, setTempSubGoals] = useState([1, 2, 3, 4, 5]);

  const handleInputValue = (e) => {
    console.log(e);
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
    try {
      const response = await axios.post(
        "http://localhost:3001/mainGoal",
        mainGoalData
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmoji = (e) => {
    handleInputValue({ target: { name: "icon", value: e.native } });
  };

  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const handleColourChange = (colour) => {
    setSelectedColour(colour);
    console.log(colour);
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

  const handleRemoveTag = (index) => {
    const newTags = mainGoalData.tags;
    newTags.splice(index, 1);
    setMainGoalData({
      ...mainGoalData,
      tags: newTags,
    });
  };

  useEffect(() => {
    const isTaskExists = tempSubGoals.includes(taskClicked);

    if (isTaskExists) {
      setIsModalVisible(true);
    }
  }, [taskClicked]);

  console.log(mainGoalData);

  return (
    <div className="w-full flex justify-center items-center mb-20 mt-24">
      <div className="md:w-1/2 h-full relative">
        <form id="goalForm" onSubmit={submitHandler}>
          <input
            name="title"
            type="text"
            className="input text-3xl mb-5"
            defaultValue={"Main Goal Title"}
            onChange={handleInputValue}
          />
          <div className="flex border border-[#7899D4] p-10 flex-col gap-4">
            <div className="">
              <button onClick={toggleEmojiPicker} className="">
                <span className="text-6xl">{mainGoalData.icon}</span>
              </button>
              {isOpen && (
                <div className="absolute">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmoji}
                    onClickOutside={toggleEmojiPicker}
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="startDate" className="font-bold">
                Start Date:
              </label>
              <input
                name="startDate"
                type="date"
                className="input focus:border-[#ff9796] focus:outline-[#ff9796] ml-7"
                onChange={handleInputValue}
              />
            </div>

            {/* Button for changing Status */}
            <div>
              <span className="font-bold mr-2.5">Status:</span>
              <select
                className="outline-[#ff9796] border-indigo-600 border rounded-md focus:border-[#ff9796] p-2"
                name="status"
                onChange={handleInputValue}
              >
                <option value="to-do">To-do</option>
                <option value="in-progress">In progress</option>
                <option value="complete">Complete</option>
              </select>
            </div>

            {/* Tag input and colour changer */}
            <div>
              <label htmlFor="tag" className="font-bold">
                Tags:
              </label>
              <input
                name="tag"
                type="text"
                value={tagInput}
                onChange={handleTagInputChange}
                className="input border border-indigo-600 focus:border-[#ff9796] focus:outline-[#ff9796] m-2.5 md:ml-14"
                placeholder="e.g Travel"
              />
              <button
                className="bg-[#7899D4] hover:bg-blue-400 text-white rounded-md pr-5 pl-5 m-2.5 pt-2.5 pb-2.5"
                onClick={handleAddTag}
              >
                +
              </button>

              {/* Buttons for changing tag colour */}
              <div className="flex items-center mt-2">
                <span className="font-bold">Tag Colour:</span>
                <input
                  type="radio"
                  id="blue"
                  name="colour"
                  value="blue"
                  defaultChecked={selectedColour === "blue"}
                  onChange={() => handleColourChange("blue")}
                  className="radio border-blue-400 checked:bg-blue-400 bg-blue-400 ml-2 mt-1"
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

              <div className="mt-2.5">
                {mainGoalData.tags.map((tag, index) => (
                  <span key={index}>
                    <div className={`badge bg-${tag.colour}-400 gap-2 p-4`}>
                      {tag.text}
                      <a onClick={() => handleRemoveTag(index)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          className="inline-block w-4 h-4 stroke-current cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center mt-2.5">
              <span className="font-bold mr-2.5">Description:</span>
              <textarea
                className="textarea w-1/3 border border-indigo-600 focus:border-[#ff9796] focus:outline-[#ff9796]"
                name="description"
                onChange={handleInputValue}
              ></textarea>
            </div>

            {/* Sub Goals */}
            <div className="flex mt-2 flex-col gap-4 h-auto mb-20">
              <div className="w-2/4 h-8 flex items-center justify-between pr-2">
                <p className="font-bold">Sub Goals:</p>
                {tempSubGoals.length !== 0 && (
                  <ClearSubGoals onClick={() => setTempSubGoals([])} />
                )}
              </div>

              <div className="p-2 flex flex-col gap-4 h-auto w-2/4">
                {tempSubGoals.map((task, index) => (
                  <SubGoalComponent
                    key={index}
                    subGoals={tempSubGoals}
                    setSubGoals={setTempSubGoals}
                    task={task}
                    onClick={() => setTaskedClicked(task)}
                  />
                ))}

                {tempSubGoals.length === 0 && (
                  <div>
                    <p className="font-bold text-center text-neutral-400">
                      Add goals which will help with achieving your mains goals!
                    </p>
                  </div>
                )}

                <AddSubGoal
                  subGoals={tempSubGoals}
                  setSubGoals={setTempSubGoals}
                />
              </div>
            </div>

            <button className="absolute right-5 bottom-5 text-[#ff9796] hover:text-white hover:bg-[#ff9796] border border-[#ff9796] rounded-md p-2 pl-5 pr-5">
              Save
            </button>
          </div>
        </form>

        {isModalVisible && <SubGoal setIsModalVisible={setIsModalVisible} />}
      </div>
    </div>
  );
};

export default MainGoal;
