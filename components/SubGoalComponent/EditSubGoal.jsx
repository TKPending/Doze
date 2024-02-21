"use client";

import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import SubGoalsClient from "@/util/clients/subGoalsClient";
import TagButtonColours from "./Components/TagColoursButtons";

const EditSubGoal = ({
  setIsEditModalVisible,
  taskClicked,
  setTaskUpdated,
  handleRemoveOldTask
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

    await SubGoalsClient.editSubGoal(subGoalData);
    setTaskUpdated(true);
    handleRemoveOldTask(taskClicked)

    closeModal();
  };

  const deleteSubGoal = async (subGoalData) => {
    const mainGoalId = subGoalData.mainGoalId;
    const id = subGoalData.id;
    if (!confirm("Do you want to delete this sub goal?")) {
      return;
    }
    await SubGoalsClient.deleteSubGoal(mainGoalId, id);
    console.log("Deleted Task");
    setTaskUpdated(true);
    console.log("State changed to true");
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

  useEffect(() => {
    if (taskClicked.task !== undefined) {
      console.log(taskClicked.task);
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
            className="input input-bordered h-40 w-1/2 mb-5 border-[#FF9796] focus:border-[#FF9796] focus:outline-[#FF9796]"
            placeholder="Title"
            onChange={handleSubGoalInput}
            defaultValue={subGoalData.title}
          ></input>

          <select
            name="status"
            className="mb-4 outline-[#ff9796] border rounded-md focus:border-[#ff9796] p-2"
            onChange={handleSubGoalInput}
            value={subGoalData.status}
          >
            <option value="">Select a status</option>
            <option value="To-do">To-do</option>
            <option value="In progress">In progress</option>
            <option value="Complete">Complete</option>
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
            defaultValue={subGoalData.description}
          ></textarea>
          <a
            onClick={() => deleteSubGoal(subGoalData)}
            className="hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-delete"
            >
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <line x1="18" x2="12" y1="9" y2="15" />
              <line x1="12" x2="18" y1="9" y2="15" />
            </svg>
          </a>

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

export default EditSubGoal;
