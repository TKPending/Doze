"use client";

import { Inter } from "next/font/google";
import AddGoal from "./components/AddGoal";
import Goal from "./components/Goal";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const MainGoalsContainer = () => {
  // Replicate Database information
  const [testGoals, setGoals] = useState([
    {
      uid: 1,
      title: "Buy a house",
      icon: "...",
    },
    {
      uid: 2,
      title: "Gain 5 kg",
      icon: "...",
    },
    {
      uid: 3,
      title: "Finish the bootcamp",
      icon: "...",
    },
  ]);

  // Remove goal from database
  const handleRemoveGoal = (goalToRemove) => {
    const newGoals = testGoals.filter((goal) => goal.uid !== goalToRemove);
    setGoals([...newGoals]);
  };

  return (
    <div
      className={`${inter.className} bg-white flex flex-col w-full ${
        testGoals.length > 5 ? "h-60" : "h-auto"
      } px-20 py-4 `}
    >
      <div className="flex items-center w-3/4 border-b border-b-black h-1/4 mb-2">
        <h1 className="text-2xl text-black font-semibold mb-2">Goals</h1>
      </div>

      <div
        className={`flex flex-col ${
          testGoals.length > 5 ? "overflow-y-auto" : ""
        } p-4 w-1/2 h-3/4`}
      >
        {testGoals.length === 0 ? (
          <div className="w-full">
            <p className="text-black font-semibold">
              It's recommended to have between 3-5 goals
            </p>
          </div>
        ) : (
          <>
            {testGoals.map((goals, index) => (
              <Goal
                key={index}
                uid={goals.uid}
                goals={goals.title}
                handleRemoveGoal={handleRemoveGoal}
              />
            ))}{" "}
          </>
        )}

        {testGoals.length === 5 && 
          <div className="h-14 flex items-center">
            <p className="text-black">It's recommended to only have 3-5 goals</p>
          </div>
        }

        <AddGoal goals={testGoals} setGoals={setGoals} />
      </div>
    </div>
  );
};

export default MainGoalsContainer;
