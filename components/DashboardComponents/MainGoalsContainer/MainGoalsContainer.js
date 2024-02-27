"use client";

import Link from "next/link";
import Goal from "./components/Goal";
import { useState, useEffect } from "react";
import mainGoalsClient from "@/util/clients/mainGoalsClient";
import { ERROR_MESSAGES } from "@/util/messages";
import MainGoalError from "./components/MainGoalError";
import { handleDashboardMainGoalsError } from "@/util/handleErrors";

const MainGoalsContainer = () => {
  // Replicate Database information
  const [mainGoals, setMainGoals] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successStatus, setSuccessStatus] = useState(false);

  const getAllMainGoals = async () => {
    try {
      const mainGoalsData = await mainGoalsClient.getAllMainGoals();

      if (!mainGoalsData.success) {
        setSuccessStatus(false);
        handleDashboardMainGoalsError(setErrorMessage, mainGoalsData.error);
        setMainGoals([]);
        return;
      }

      setSuccessStatus(true);
      setMainGoals(mainGoalsData.data);
    } catch (err) {
      setMainGoals([]);
      setSuccessStatus(false);
    }
  };

  useEffect(() => {
    if (errorMessage && errorMessage != ERROR_MESSAGES.MAIN_GOALS) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000)
    }
  }, [successStatus, errorMessage]);

  const deleteOneMainGoalFromDashboard = async (id) => {
    if (!confirm("Do you want to delete this goal?")) {
      return;
    }
    try {
      const response = await mainGoalsClient.deleteOneMainGoalReq(id);

      if (!response.success) {
        handleDashboardMainGoalsError(setErrorMessage, response.error);
        console.log(response)
      }

      getAllMainGoals();
    } catch (err) {}
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
      } md:px-20 py-4 `}
    >
      <div className="flex items-center w-3/4 border-b border-b-black h-1/4 mb-2">
        <h1 className="text-2xl text-black font-semibold mb-2">Goals</h1>
      </div>

      <div
        className={`flex flex-col ${
          mainGoals.length > 5 ? "overflow-y-auto" : ""
        } p-4 w-full h-3/4`}
      >
        {errorMessage && errorMessage == ERROR_MESSAGES.MAIN_GOALS ? (
          <MainGoalError message={errorMessage} />
        ) : (
          <>
            {!mainGoals ? (
              <div className="w-full">
                <p className="text-black font-semibold">
                  It's recommended to have between 3-5 goals
                </p>
              </div>
            ) : (
              <>
                {errorMessage && errorMessage != ERROR_MESSAGES.MAIN_GOALS && (
                  <div className="bg-red-800 my-2 py-2 rounded-lg flex justify-center items-center w-[60%]">
                    <p className="text-white">
                      {errorMessage}
                    </p>
                  </div>
                )}
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
                  It's recommended to have 3-5 goals. <br /> Press the button
                  below to start creating goals
                </p>
              </div>
            )}

            <Link
              href={"/maingoal"}
              className={`mt-4 ml-8 flex gap-4 items-center justify-center w-32 h-8 border border-indigo-600 bg-indigo-600 hover:bg-white text-white hover:text-black hover:border hover:scale-105 transition duration-200 rounded-lg hover:cursor-pointer`}
            >
              Add Goal +
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MainGoalsContainer;
