"use client";

import { useState, useEffect } from "react";
import AddSubGoal from "./AddSubGoal";
import SubGoalTitleContainer from "./SubGoalTitleContainer";
import SmallSubGoals from "./SmallSubGoals";
import SubGoal from "../../../SubGoalComponent/SubGoal";
import EditSubGoal from "../../../SubGoalComponent/EditSubGoal";

const ProgressionContainer = ({
  title,
  color,
  circleColor,
  tasks,
  stage,
  stages,
  setStages,
  setTaskUpdated,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  useEffect(() => {}, [isModalVisible, taskClicked, isEditModalVisible]);

  const handleRemoveOldTask = (taskClicked) => {
    const stageTasks = stage.tasks;
    const updatedTasks = stageTasks.filter(task => task.id !== taskClicked.id);

    stage.tasks = updatedTasks;
  };

  return (
    <div
      className={`h-auto max-h-screen w-1/3 rounded-lg ${color} p-2 bg-opacity-50`}
    >
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
              setIsEditModalVisible={setIsEditModalVisible}
              setTaskUpdated={setTaskUpdated}
              setTaskClicked={setTaskClicked}
            />
          ))}
        </div>

        {/* Display the sub goals add modal, when add sub goals is clicked */}
        {isModalVisible && (
          <SubGoal
            setIsModalVisible={setIsModalVisible}
            setTaskUpdated={setTaskUpdated}
            stageName={stage.text}
          />
        )}
        {/* Display the subgoals edit modal, when task is clicked */}
        {isEditModalVisible && (
          <EditSubGoal
            setIsEditModalVisible={setIsEditModalVisible}
            taskClicked={taskClicked}
            setTaskUpdated={setTaskUpdated}
            handleRemoveOldTask={handleRemoveOldTask}
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
      <AddSubGoal
        stage={stage}
        stages={stages}
        setStages={setStages}
        setIsModalVisible={setIsModalVisible}
      />
    </div>
  );
};

export default ProgressionContainer;
