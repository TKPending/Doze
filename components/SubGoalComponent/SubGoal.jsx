"use client";

import React from "react";

import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SubGoalsClient from "@/util/clients/subGoalsClient";
import MainGoalsClient from "@/util/clients/mainGoalsClient";
import TagButtonColours from "./Components/TagColoursButtons";
import { handleSubGoalError } from "@/util/handleErrors";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/util/messages";
import ErrorMessage from "../MessageComponent/ErrorMessage";
import SuccessMessage from "../MessageComponent/SuccessMessage";

const SubGoal = ({
  setIsModalVisible,
  setTaskUpdated,
  stageName,
  goalTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainGoalData, setMainGoalData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [subGoalData, setSubGoalData] = useState({
    title: "",
    dateCreated: "",
    icon: "😁",
    status: stageName ? stageName : "",
    mainGoal: goalTitle ? goalTitle : "",
    mainGoalId: mainGoalData ? mainGoalData._id : "",
    tags: [],
    description: "",
    id: "",
  });

  const fetchMainGoals = async () => {
    try {
      const response = await MainGoalsClient.getAllMainGoals();

      if (!response.success) {
        const customErrorMessage = "Problem getting all main goals";
        handleSubGoalError(setErrorMessage, customErrorMessage);
      }

      setMainGoalData(response.data);
    } catch (error) {
      handleSubGoalError(
        setErrorMessage,
        ERROR_MESSAGES.DEVELOPER_DATABASE_ERROR
      );
      console.error(
        "Problem: Most likely to do MainGoalsClient.getAllMainGoals. Check endpoints, routes or server"
      );
      setMainGoalData([]);
    }
  };

  useEffect(() => {
    if (errorMessage && errorMessage != ERROR_MESSAGES.SUB_GOALS.SAVED_FAILED) {
      setTimeout(() => {
        setErrorMessage(false);
        closeModal();
      }, 100000);
    }
  }, [errorMessage]);

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
    if (
      !subGoalData.title ||
      !subGoalData.mainGoal ||
      !subGoalData.icon ||
      !subGoalData.status
    ) {
      alert("Please fill in title, status and add an icon");
      return;
    }

    const handleError = () => {
      const customErrorMessage = "Problem adding Sub Goal from Main Goal";
        handleSubGoalError(setErrorMessage, customErrorMessage);
    }

    // Adding main goal from Main Goal
    if (goalTitle) {
      const mainGoal = mainGoalData.find((goal) => goal.title == goalTitle);
      const mainGoalId = mainGoal._id;

      const goalData = { ...subGoalData, mainGoalId };
      const response = await SubGoalsClient.addSubGoal(goalData);

      if (!response.success) {
        handleError();
        return;
      }

      setSuccessStatus(true);
    } else {
      const response  = await SubGoalsClient.addSubGoal(subGoalData);

      if (!response.success) {
        handleError()
        return;
      }

      setSuccessStatus(true);
    }
    setTaskUpdated(true);
  };

  const subGoalFormHandler = async (e) => {
    e.preventDefault();
    saveSubGoal(subGoalData);

    setTimeout(() => {
      setSuccessStatus(false);
      setErrorMessage(false);
      closeModal();
    }, 2000);
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
      {errorMessage &&
      errorMessage !== ERROR_MESSAGES.SUB_GOALS.SAVED_FAILED ? (
        <div className="flex items-center justify-center p-4 text-center md:h-2/4 md:w-1/2 w-4/5 h-4/5 rounded-lg mt-24 outline outline-indigo-600 bg-gray-100">
          <p className="text-red-500 text-2xl">{errorMessage}</p>
        </div>
      ) : (
        <>
          <div className=" relative bg-gray-100 md:h-3/4 md:w-1/2 w-4/5 h-4/5 rounded-lg mt-24 outline outline-indigo-600">
            {errorMessage === ERROR_MESSAGES.SUB_GOALS.SAVED_FAILED && (
              <div className="w-full">
                <ErrorMessage message={errorMessage} />
              </div>
            )}

            {successStatus && <SuccessMessage message={SUCCESS_MESSAGES.SAVED_SUBGOAL} />}
            <div className="w-full flex justify-end pr-[3%]">
              <p
                onClick={closeModal}
                className="absolute right-4 top-4 text-indigo-600 hover:text-white hover:bg-indigo-600 border hover:cursor-pointer border-indigo-600 rounded-full w-12 h-12 flex items-center justify-center text-2xl"
              >
                x
              </p>
            </div>

            <form
              className="flex flex-col items-center w-full h-full"
              onSubmit={subGoalFormHandler}
            >
              <a
                data-testid="emoji-icon"
                onClick={toggleEmojiPicker}
                className="mb-5 hover:cursor-pointer mt-6"
              >
                <span className="text-6xl">{subGoalData.icon}</span>
              </a>

              {isOpen && (
                <div className="absolute">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmoji}
                    onClickOutside={toggleEmojiPicker}
                    maxFrequentRows={0}
                  />
                </div>
              )}

              <input
                name="title"
                id="title"
                type="text"
                className="input input-bordered h-8 md:w-1/2 w-60 mb-5 border-indigo-600 focus:border-indigo-600 focus:outline-indigo-600"
                placeholder="Title"
                onChange={handleSubGoalInput}
              ></input>

              <select
                name="status"
                className="mb-4 outline-indigo-600 border rounded-md focus:border-indigo-600 p-2 w-48"
                onChange={handleSubGoalInput}
                data-testid="status-select"
              >
                <option value={stageName ? stageName : ""}>
                  {stageName ? stageName : "Select a status"}
                </option>
                <option value="To-do">To-do</option>
                <option value="In progress">In progress</option>
                <option value="Complete">Complete</option>
              </select>

              {goalTitle ? (
                <div className="flex overflow flex-row gap-4 mb-4 pr-2 items-center justify-center  h-auto w-auto text-center border bg-white rounded-lg outline-indigo-600 border-indigo-600">
                  <div className="h-12 text-neutral-20  rounded-s-lg p-2 w-auto bg-neutral-200 flex justify-center items-center">
                    <p className="f">Goal: </p>
                  </div>
                  <p>{goalTitle}</p>
                </div>
              ) : (
                <select
                  name="mainGoal"
                  onChange={handleMainGoalChange}
                  className="mb-4 outline-indigo-600 border rounded-md focus:border-indigo-600 p-2 w-48"
                >
                  <option>Select a main goal</option>
                  {mainGoalData ? (
                    mapMainGoals()
                  ) : (
                    <option value="Untracked">Leave Untracked</option>
                  )}
                </select>
              )}

              <TagButtonColours
                subGoalData={subGoalData}
                setSubGoalData={setSubGoalData}
              />

              <div className="mt-2.5 mb-2.5">
                {subGoalData.tags.map((tag, index) => (
                  <span key={index}>
                    <div
                      className={`badge bg-${tag.colour}-400 gap-2 p-4 text-white`}
                    >
                      {tag.text}
                      <a
                        data-testid="remove-tag"
                        onClick={() => handleRemoveTag(index)}
                        className="inline-block cursor-pointer w-2.5 opacity-0 hover:opacity-100 hover:text-white"
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
              ></textarea>

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
        </>
      )}
    </div>
  );
};

export default SubGoal;
