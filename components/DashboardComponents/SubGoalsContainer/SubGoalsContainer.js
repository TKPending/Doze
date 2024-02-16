"use client";

import { useEffect, useState, useContext } from "react";
import ProgressionContainer from "./components/ProgressionContainer";
import { SubGoalsClient } from "@/util/clients/subGoalsClient";
import { Context } from "../../ContextUser";

const SubGoalsContainer = () => {

  const { user, SubClient } = useContext(Context);
  const [currentSubGoal, setCurrentSubGoal] = useState(null);
  const [toDos, setToDos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [subGoals, setSubGoals] = useState([]);
  const [stages, setStages] = useState([
    {
      text: "To-Do",
      color: "bg-[#FF9796]",
      circleColor: "#E87775",
      tasks: [
        "Task 1 - Complete task",
        "Task 2 - Review code",
        "Task 3 - Organize files",
        "Task 4 - Attend team meeting",
      ],
    },
    {
      text: "In Progress",
      color: "bg-[#7899D4]",
      circleColor: "#5677A6",
      tasks: [
        "Task 1 - Attend a meeting",
        "Task 2 - Work on project",
        "Task 3 - Research new technologies",
      ],
    },
    {
      text: "Done",
      color: "bg-[#ACE4AA]",
      circleColor: "#87C082",
      tasks: [
        "Task 1 - Complete task",
        "Task 2 - Review code",
        "Task 3 - Submit report",
        "Task 4 - Plan next week's tasks",
        "Task 5 - Organize files",
        "Task 6 - Attend team meeting",
        "Task 7 - Send emails",
      ],
    },
  ]);

  // const getSubGoals = () => {
  //   SubClient.getAllSubGoals().then((res) => {
  //     setSubGoals(res.data);
  //   });
  // //   if (subGoals.status === "To-Do") {
  // //     setToDos(subGoals.data);
  // //   } else if (subGoals.status === "In Progress") {
  // //     setInProgress(subGoals.data);
  // //   } else if (subGoals.status === "Done") {
  // //     setDone(subGoals.data);
  // //   }
  // // console.log(subGoals);
  // // console.log(toDos);
  // // console.log(inProgress);
  // // console.log(done);
  // }


  useEffect(() => {
    getSubGoals();
  }, []);
  

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
          />
        ))}
      </div>
    </div>
  );
};

export default SubGoalsContainer;
