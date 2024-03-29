"use client";

import { useEffect, useState } from "react";
import ProgressionContainer from "./components/ProgressionContainer";
import SubGoalsClient from "../../../util/clients/subGoalsClient";
import { handleSubGoalError } from "@/util/handleErrors";

const SubGoalsContainer = () => {
  const [taskUpdated, setTaskUpdated] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
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
      text: "Complete",
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

      if (!goals.success) {
        handleSubGoalError(setErrorMessage, goals.error);
        return;
      }

      goals.data.forEach((item) => {
        if (item.status === "To-do") {
          pushTaskIfNotExists(item, stages[0].tasks);
        } else if (item.status === "In progress") {
          pushTaskIfNotExists(item, stages[1].tasks);
        } else if (item.status === "Complete") {
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
      <div className="flex md:flex-row flex-col gap-4 w-full shadow bg-indigo-600 bg-opacity-20 h-full rounded-lg p-4">
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
            error={errorMessage}
          />
        ))}
      </div>
  );
};

export default SubGoalsContainer;
