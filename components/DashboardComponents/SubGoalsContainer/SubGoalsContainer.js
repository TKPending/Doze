"use client";

import { useEffect, useState, useContext } from "react";
import ProgressionContainer from "./components/ProgressionContainer";
import SubGoalsClient from "../../../util/clients/subGoalsClient";

const SubGoalsContainer = () => {
  const [taskAdded, setTaskAdded] = useState(true);
  const [stages, setStages] = useState([
    {
      text: "To-Do",
      color: "bg-[#FF9796]",
      circleColor: "#E87775",
      tasks: [],
    },
    {
      text: "In Progress",
      color: "bg-[#7899D4]",
      circleColor: "#5677A6",
      tasks: [],
    },
    {
      text: "Done",
      color: "bg-[#ACE4AA]",
      circleColor: "#87C082",
      tasks: [],
    },
  ]);
  const fetchData = async () => {
    try {
      const goals = await SubGoalsClient.getSubGoals();
      console.log(goals);
      goals.forEach (item => {
        // const subGoalID = item._id;
        if (item.status === "To-do"){ 
          // const filteredSubGoals = stages[0].tasks.filter((i) => i._id !== subGoalID)
          // console.log(filteredSubGoals);
          stages[0].tasks = [];
          stages[0].tasks.push(item);
        }
        if (item.status === "In progress"){
          stages[1].tasks = [];
          stages[1].tasks.push(item)
        }
        if (item.status === "Complete"){
          stages[2].tasks = [];
          stages[2].tasks.push(item)
        }
        setTaskAdded(false)
      })
  } catch (error) {
    console.log(error)
  }} 


  
useEffect (() => {
  if (taskAdded){
    console.log("Adding or deleting task")
    fetchData()
  } 
}, [taskAdded])

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
            setTaskAdded={setTaskAdded}
          />
        ))}
      </div>
    </div>
  );
};

export default SubGoalsContainer;
