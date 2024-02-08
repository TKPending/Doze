"use client";

import { useEffect, useState } from "react";
import ProgressionContainer from "./components/ProgressionContainer";

const SubGoalsContainer = () => {
  const [stages, setStages] = useState([
    {
      text: "To-Do",
      color: "bg-[#FF9796]",
      circleColor: "#E87775",
      tasks: [
        "Task 1 - Go on a run",
        "Task 2 - Read a book",
        "Task 3 - Complete coding exercise",
        "Task 4 - Write a blog post",
        "Task 5 - Do grocery shopping",
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
  

  return (
    <div className="bg-white w-full h-auto rounded-b-lg p-10 ">
      <h1 className="text-3xl text-black font-semibold mb-2">Board</h1>

      <div className="flex gap-4 w-full max-h-screen h-full rounded-lg p-4">
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
