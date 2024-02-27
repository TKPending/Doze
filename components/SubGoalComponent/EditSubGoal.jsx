"use client";

import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SubGoalsClient from "@/util/clients/subGoalsClient";
import TagButtonColours from "./Components/TagColoursButtons";
import { handleSubGoalError } from "@/util/handleErrors";
import { SUCCESS_MESSAGES } from "@/util/messages";
import ErrorMessage from "../MessageComponent/ErrorMessage";
import SuccessMessage from "../MessageComponent/SuccessMessage";

const EditSubGoal = ({
  setIsEditModalVisible,
  taskClicked,
  setTaskUpdated,
  handleRemoveOldTask
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [subGoalData, setSubGoalData] = useState({
    title: taskClicked.title,
    dateCreated: taskClicked.dateCreated,
    icon: taskClicked.icon,
    status: taskClicked.status,
    mainGoal: taskClicked.mainGoal,
    mainGoalId: taskClicked.mainGoalId,
    tags: taskClicked.tags,
    description: taskClicked.description,
    id: taskClicked._id,
  });
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

  const closeModal = () => {
    setIsEditModalVisible(false);
  };

  //close modal when user clicks outside the modal
  const handleOffModalClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal();
    }
  };

  const saveSubGoal = async (e) => {
    e.preventDefault();
    if (!subGoalData.title || !subGoalData.mainGoal || !subGoalData.icon || !subGoalData.status){
      alert("Please fill in title, status and add an icon");
      return;
    }

    const response = await SubGoalsClient.editSubGoal(subGoalData);

    if (!response.success) {
      handleSubGoalError(setErrorMessage, response.error);
      return;
    }

    setSuccessStatus(true);
    setTaskUpdated(true);
    handleRemoveOldTask(taskClicked)
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
        closeModal();
      }, 2000)
    }

    if (successStatus) {
      setTimeout(() => {
        setSuccessStatus(false);
        closeModal();
      }, 1000)
    }
  }, [errorMessage, successStatus])

  const deleteSubGoal = async (subGoalData) => {
    const mainGoalId = subGoalData.mainGoalId;
    const id = subGoalData.id;
    if (!confirm("Do you want to delete this sub goal?")) {
      return;
    }
    const response = await SubGoalsClient.deleteSubGoal(mainGoalId, id);

    if (!response.success) {
      handleSubGoalError(setErrorMessage, response.error);
      return;
    }

    setSuccessStatus("DELETE");
    handleRemoveOldTask(taskClicked);
    setTaskUpdated(true);
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

  useEffect(() => {
    if (taskClicked.task !== undefined) {
      setSubGoalData({
        title: taskClicked.task.title,
        dateCreated: taskClicked.task.dateCreated || "",
        icon: taskClicked.task.icon,
        status: taskClicked.task.status,
        mainGoalId: taskClicked.task.mainGoalId,
        mainGoal: taskClicked.task.mainGoal,
        tags: taskClicked.task.tags,
        description: taskClicked.task.description,
        id: taskClicked.task._id,
      });
    }
  }, [taskClicked]);

  return (
    <div
      onClick={handleOffModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative bg-gray-100 md:h-3/4 md:w-1/2 w-4/5 h-4/5 p-6 rounded-lg mt-24 outline outline-indigo-600">
        {errorMessage && <ErrorMessage message={errorMessage} />}
        {successStatus && successStatus != "DELETE" && <SuccessMessage message={SUCCESS_MESSAGES.EDITED_SUBGOAL} />}
        {successStatus == "DELETE" && <SuccessMessage message={SUCCESS_MESSAGES.DELETED_SUBGOAL} />}

        <div className="w-full flex justify-end pr-[3%]">
          <p
            onClick={closeModal}
            className="absolute right-4 top-4 text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl"
          >
            x
          </p>
        </div>

        <form
          className="flex flex-col items-center w-full h-full"
          onSubmit={saveSubGoal}
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
            className="input input-bordered h-8 md:w-1/2 w-60 mb-5 border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Title"
            onChange={handleSubGoalInput}
            defaultValue={subGoalData.title}
          ></input>

          <select
            name="status"
            className="mb-4 w-48 outline-indigo-600 border rounded-md focus:border-indigo-600 p-2"
            onChange={handleSubGoalInput}
            value={subGoalData.status}
            data-testid="status-select"
          >
            <option value="">Select a status</option>
            <option value="To-do">To-do</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
          </select>

          <h2 className="bg-white p-2 w-48 rounded-md mb-4 shadow-sm border">{subGoalData.mainGoal}</h2>

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
                    data-testid={"remove-tag"}
                  >
                    x
                  </a>
                </div>
              </span>
            ))}
          </div>

          <textarea
            name="description"
            className="textarea h-18 input-bordered md:w-1/2 w-60 mb-5 border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
            placeholder="Additional information"
            onChange={handleSubGoalInput}
            defaultValue={subGoalData.description}
          ></textarea>
          <a
            onClick={() => deleteSubGoal(subGoalData)}
            className="hover:cursor-pointer absolute bottom-4 left-4 border rounded-md border-indigo-600 p-2 hover:bg-indigo-600 hover:text-white text-indigo-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-delete"
            >
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <line x1="18" x2="12" y1="9" y2="15" />
              <line x1="12" x2="18" y1="9" y2="15" />
            </svg>
          </a>

          <div className="absolute bottom-4 right-4">
            <button
              type="submit"
              className="h-12 text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-600 rounded-md p-2 pl-5 pr-5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSubGoal;
