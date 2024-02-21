"use client";

import { useEffect, useState, useContext } from "react";
import ProgressionContainer from "./components/ProgressionContainer";
import SubGoalsClient from "../../../util/clients/subGoalsClient";

const SubGoalsContainer = () => {
  const [taskUpdated, setTaskUpdated] = useState(true);
  const [stages, setStages] = useState([
    {
      text: "To-do",
      color: "bg-[#FF9796]",
      circleColor: "#E87775",
      tasks: [],
    },
    {
      text: "In progress",
      color: "bg-[#7899D4]",
      circleColor: "#5677A6",
      tasks: [],
    },
    {
      text: "Completed",
      color: "bg-[#ACE4AA]",
      circleColor: "#87C082",
      tasks: [],
    },
  ]);

  function pushTaskIfNotExists(task, taskArray) {
    const taskExists = taskArray.some((subgoal) => subgoal._id === task._id);

    if (!taskExists) {
      taskArray.push(task);
    }
  }

  const fetchData = async () => {
    try {
      const goals = await SubGoalsClient.getAllSubGoals();
      goals.forEach((item) => {
        if (item.status === "To-do") {
          pushTaskIfNotExists(item, stages[0].tasks);
        } else if (item.status === "In progress") {
          pushTaskIfNotExists(item, stages[1].tasks);
        } else if (item.status === "Completed") {
          pushTaskIfNotExists(item, stages[2].tasks);
        }
      });

      setTaskUpdated(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [taskUpdated, stages]);

  return (
    <div className="bg-opacity-30 w-full h-auto rounded-b-lg p-10 bg-neutral-100 shadow-md">
      <h1 className="text-3xl text-black font-semibold mb-2">Board</h1>

      <div className="flex gap-4 w-full shadow bg-indigo-600 bg-opacity-20 max-h-screen h-full rounded-lg p-4">
        {stages.map((section, index) => (
          <ProgressionContainer
            key={index}
            stages={stages}
            stage={section}
            setStages={setStages}
            title={section.text}
            color={section.color}
            circleColor={section.circleColor}
            tasks={section.tasks}
            setTaskUpdated={setTaskUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default SubGoalsContainer;
