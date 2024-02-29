"use client";

import { useState, useEffect } from "react";
import { handleMainGoalsPageError } from "@/util/handleErrors";
import MainGoal from "../../components/MainGoalComponents/MainGoal";
import mainGoalsClient from "@/util/clients/mainGoalsClient";
import SuccessMessage from "@/components/MessageComponent/SuccessMessage";
import { SUCCESS_MESSAGES } from "@/util/messages";
import ErrorMessage from "@/components/MessageComponent/ErrorMessage";
import { useRouter } from "next/navigation";

export default function MainGoalPage() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const router = useRouter();

  //POST - creating main goal request
  const onSavePost = async (mainGoalData) => {
    const response = await mainGoalsClient.createNewMainGoalReq(mainGoalData);

    if (!response.success) {
      const customErrorMessage = "Problem creating a goal";
      handleMainGoalsPageError(setErrorMessage, customErrorMessage);
      return;
    }

    setSuccessStatus(true);
  };

  useEffect(() => {
    if (errorMessage || successStatus) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2500);
    }
  }, [errorMessage, successStatus]);

  return (
    <div className="h-screen w-screen">
    {successStatus || errorMessage && 
      <div className="h-screen w-screen z-10 absolute">
        {successStatus && (
          <SuccessMessage message={SUCCESS_MESSAGES.CREATED_MAIN_GOAL} />
        )}
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    }

      <MainGoal onSave={onSavePost} />
    </div>
  );
}
