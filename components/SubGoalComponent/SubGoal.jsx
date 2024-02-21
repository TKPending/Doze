"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SubGoalsClient from "@/util/clients/subGoalsClient";
import MainGoalsClient from "@/util/clients/mainGoalsClient";
import TagButtonColours from "./Components/TagColoursButtons";

const SubGoal = ({ setIsModalVisible, setTaskUpdated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainGoalData, setMainGoalData] = useState([]);
  const [subGoalData, setSubGoalData] = useState({
    title: "",
    dateCreated: "",
    icon: "😁",
    status: "",
    mainGoal: "",
    mainGoalId: "",
    tags: [],
    description: "",
    id: "",
  });

  const fetchMainGoals = async () => {
    try {
      const mainGoalData = await MainGoalsClient.getAllMainGoals();
      setMainGoalData(mainGoalData);
    } catch (error) {
      console.log(error, "error fetching maingoals");
      setMainGoalData([]);
    }
  };

  const handleSubGoalInput = (e) => {
    if (e.target.name === "title") {
      setSubGoalData({ ...subGoalData, title: e.target.value });
    }
    if (e.target.name === "status") {
      setSubGoalData({ ...subGoalData, status: e.target.value });
    }
    if (e.target.name === "description") {
      setSubGoalData({ ...subGoalData, description: e.target.value });
    }
    if (e.target.name === "icon") {
      setSubGoalData({ ...subGoalData, icon: e.target.value });
    }
  };

  const handleMainGoalChange = (e) => {
    const selectedGoal = JSON.parse(e.target.value);
    setSubGoalData({
      ...subGoalData,
      mainGoal: selectedGoal.title,
      mainGoalId: selectedGoal._id,
    });
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  //close modal when user clicks outside the modal
  const handleOffModalClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal();
    }
  };

  const saveSubGoal = async () => {
    //send request to backend to add sub goal
    await SubGoalsClient.addSubGoal(subGoalData);
    setTaskUpdated(true);
  };

  const subGoalFormHandler = async (e) => {
    e.preventDefault();
    // Send request to backend to add sub goal to main goal
    saveSubGoal(subGoalData);
    closeModal();
  };

  //setting Emoji
  const handleEmoji = (e) => {
    handleSubGoalInput({ target: { name: "icon", value: e.native } });
  };

  //toggle Emoji picker
  const toggleEmojiPicker = () => {
    setIsOpen(!isOpen);
  };

  //remove tag from tag list
  const handleRemoveTag = (index) => {
    const newTags = subGoalData.tags;
    newTags.splice(index, 1);
    setSubGoalData({
      ...subGoalData,
      tags: newTags,
    });
  };

  const mapMainGoals = () => {
    return mainGoalData.map((goal) => {
      return (
        <option key={goal._id} value={JSON.stringify(goal)}>
          {goal.title}
        </option>
      );
    });
  };

  useEffect(() => {
    fetchMainGoals();
  }, []);

  return (
    <div
      onClick={handleOffModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-gray-100 md:h-3/4 md:w-1/2 w-4/5 h-4/5 p-6 rounded-lg mt-24 outline outline-[#FF9796]">
        <div className="w-full flex justify-end pr-[3%]">
          <p
            onClick={closeModal}
            className="text-[#ff9796] hover:text-white hover:bg-red-400 border border-[#ff9796] rounded-full w-12 h-12 flex items-center justify-center text-2xl"
          >
            x
          </p>
        </div>

        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={subGoalFormHandler}
        >
          <a onClick={toggleEmojiPicker} className="mb-5 hover:cursor-pointer">
            <span className="text-6xl">{subGoalData.icon}</span>
          </a>
          {isOpen && (
            <Picker
              data={data}
              onEmojiSelect={handleEmoji}
              onClickOutside={toggleEmojiPicker}
              maxFrequentRows={0}
            />
          )}

          <input
            name="title"
            id="title"
            type="text"
            className="input input-bordered h-40 w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            placeholder="Title"
            onChange={handleSubGoalInput}
          ></input>

          <select
            name="status"
            className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2"
            onChange={handleSubGoalInput}
          >
            <option value="">Select a status</option>
            <option value="To-do">To-do</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
          </select>

          <select
            name="mainGoal"
            onChange={handleMainGoalChange}
            className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2"
          >
            <option>Select a main goal</option>
            {mainGoalData ? (
              mapMainGoals()
            ) : (
              <option value="Untracked">Leave Untracked</option>
            )}
          </select>

          <TagButtonColours
            subGoalData={subGoalData}
            setSubGoalData={setSubGoalData}
          />

          <div className="mt-2.5 mb-2.5">
            {subGoalData.tags.map((tag, index) => (
              <span key={index}>
                <div className={`badge bg-${tag.colour}-400 gap-2 p-4`}>
                  {tag.text}
                  <a
                    onClick={() => handleRemoveTag(index)}
                    className="inline-block cursor-pointer w-2.5"
                  >
                    x
                  </a>
                </div>
              </span>
            ))}
          </div>

          <textarea
            name="description"
            className="textarea h-72 input-bordered w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            placeholder="Additional information"
            onChange={handleSubGoalInput}
          ></textarea>

          <div className="w-full h-full flex justify-end items-end pb-[5%] pr-[5%]">
            <button
              type="submit"
              className="h-12 text-[#ff9796] hover:text-white hover:bg-[#ff9796] border border-[#ff9796] rounded-md p-2 pl-5 pr-5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubGoal;
