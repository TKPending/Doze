"use client";

import Link from "next/link";
import Goal from "./components/Goal";
import { useState, useEffect } from "react";
import mainGoalsClient from "@/util/clients/mainGoalsClient";

const MainGoalsContainer = () => {
  // Replicate Database information
  const [mainGoals, setMainGoals] = useState([]);
  console.log(mainGoals, "mainGoals");
  const getAllMainGoals = async () => {
    const mainGoalsData = await mainGoalsClient.getAllMainGoals();
    setMainGoals(mainGoalsData);
  };

  const deleteOneMainGoalFromDashboard = async (id) => {
    if (!confirm("Do you want to delete this goal?")) {
      return;
    }
    mainGoalsClient.deleteOneMainGoalReq(id);
    getAllMainGoals();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== "") {
      getAllMainGoals();
    }
  }, []);
  return (
    <div
      className={`bg-white flex flex-col w-full ${
        mainGoals.length > 5 ? "h-60" : "h-auto"
      } px-20 py-4 `}
    >
      <div className="flex items-center w-3/4 border-b border-b-black h-1/4 mb-2">
        <h1 className="text-2xl text-black font-semibold mb-2">Goals</h1>
      </div>

      <div
        className={`flex flex-col ${
          mainGoals.length > 5 ? "overflow-y-auto" : ""
        } p-4 w-1/2 h-3/4`}
      >
        {!mainGoals ? (
          <div className="w-full">
            <p className="text-black font-semibold">
              It's recommended to have between 3-5 goals
            </p>
          </div>
        ) : (
          <>
            {mainGoals.map((goal, index) => (
              <Goal
                key={index}
                goal={goal}
                deleteOneMainGoalFromDashboard={() => {
                  deleteOneMainGoalFromDashboard(goal._id);
                }}
              />
            ))}
          </>
        )}

        {mainGoals.length >= 5 && (
          <div className="h-14 flex items-center">
            <p className="text-black">
              It's recommended to only have 3-5 goals
            </p>
          </div>
        )}
        {mainGoals.length === 0 && (
          <div className="h-14 flex items-center">
            <p className="text-black">
              It's recommended to have 3-5 goals. <br /> Press the button below
              to start creating goals
            </p>
          </div>
        )}

        <Link
          href={"/maingoal"}
          className={`mt-4 ml-8 flex gap-4 items-center justify-center w-32 h-8 border border-indigo-600 bg-indigo-600 hover:bg-white text-white hover:text-black hover:border hover:scale-105 transition duration-200 rounded-lg hover:cursor-pointer`}
        >
          Add Goal +
        </Link>
      </div>
    </div>
  );
};

export default MainGoalsContainer;
