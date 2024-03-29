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
  error,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [taskClicked, setTaskClicked] = useState({});

  useEffect(() => {}, [isModalVisible, taskClicked, isEditModalVisible]);

  const handleRemoveOldTask = (taskClicked) => {
    const stageTasks = stage.tasks;
    const updatedTasks = stageTasks.filter(
      (task) => task.id !== taskClicked.id
    );

    stage.tasks = updatedTasks;
  };

  return (
    <div
      className={`h-auto md:w-1/3 lg:w-1/3 w-full rounded-lg ${color} p-2 bg-opacity-50`}
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
        } md:overflow-y-auto lg:overflow-y-auto mb-4`}
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

        {/* If error getting all tasks */}
        {error && (
          <div className="flex text-center items-center justify-center text-white border bg-red-500 rounded-lg px-4">
            <p className="m-4">{error}</p>
          </div>
        )}

        {/* If no task, display no task */}
        {tasks.length === 0 && !error && (
          <div className="flex items-center justify-center text-black">
            <p className="text-xl">No Task {stage.text}</p>
          </div>
        )}
      </div>

      {/* Allow user to add task */}
      {!error && <AddSubGoal
        stage={stage}
        stages={stages}
        setStages={setStages}
        setIsModalVisible={setIsModalVisible}
      />}
    </div>
  );
};

export default ProgressionContainer;
