"use client";

import { useState, useEffect } from "react";
import AddSubGoal from "./AddSubGoal";
import SubGoalTitleContainer from "./SubGoalTitleContainer";
import SmallSubGoals from "./SmallSubGoals";
import SubGoal from "../../../SubGoalComponent/SubGoal";


const TempSubGoal = ({ task, setIsModalVisible }) => {
  // User clicks on close modal, close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // User clicks off modal, close modal
  const handleOffModalClick = (e) => {
    if (e.target.classList.contains("bg-black")) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleOffModalClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <SubGoal />
    </div>
  );
};

const ProgressionContainer = ({
  title,
  color,
  circleColor,
  tasks,
  stage,
  stages,
  setStages,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  useEffect(() => {}, [isModalVisible, taskClicked]);

  return (
    <div className={`h-auto max-h-screen w-1/3 rounded-lg ${color} p-2 bg-opacity-50`}>
      {/* Renders the header of subsection, Todo, In Progress and Done */}
      <SubGoalTitleContainer
        stage={stage}
        stages={stages}
        setStages={setStages}
        title={title}
        color={circleColor}
        taskAmount={tasks.length}
      />

      {/* Render the main section, which holds all the sub tasks */}
      <div
        className={`${
          tasks.length >= 10 ? "h-5/6" : "h-auto"
        } overflow-y-auto mb-4`}
      >
        <div className="flex flex-col items-center justify-center overflow-y-auto gap-2 w-full p-2">
          {/* Render the Sub Goals */}
          {tasks.map((task, index) => (
            <SmallSubGoals
              key={index}
              task={task}
              setIsModalVisible={setIsModalVisible}
              setTaskClicked={setTaskClicked}
            />
          ))}
        </div>

        {/* Display the sub goals, when a sub task is clicked */}
        {isModalVisible && (
          <TempSubGoal
            task={taskClicked}
            setIsModalVisible={setIsModalVisible}
          />
        )}

        {/* If no task, display no task */}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center text-black">
            <p className="text-xl">No Task {stage.text}</p>
          </div>
        )}
      </div>

      {/* Allow user to add task */}
      <AddSubGoal stage={stage} stages={stages} setStages={setStages} />
    </div>
  );
};

export default ProgressionContainer;
