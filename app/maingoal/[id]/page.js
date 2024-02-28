"use client";
import { useEffect, useState } from "react";
import MainGoal from "../../../components/MainGoalComponents/MainGoal";
import mainGoalsClient from "@/util/clients/mainGoalsClient";
import { handleMainGoalsPageError } from "@/util/handleErrors";
import ErrorMessage from "@/components/MessageComponent/ErrorMessage";
import { useRouter } from "next/navigation";
import SuccessMessage from "@/components/MessageComponent/SuccessMessage";
import { SUCCESS_MESSAGES } from "@/util/messages";

export default function DefinedMainGoal({ params }) {
  const [initialMainGoalData, setInitialMainGoalData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const router = useRouter();

  //GET - getting main goal data
  const getInitialMainGoalDataReq = async () => {
    const mainGoalData = await mainGoalsClient.getOneMainGoalReq(params.id);

    if (!mainGoalData.success) {
      setInitialMainGoalData(mainGoalData);
      return;
    }

    setInitialMainGoalData(mainGoalData.data);
  };

  //PUT - changing main goal data
  const onSavePut = async (changedMainGoalData) => {
    const response = await mainGoalsClient.changeOneMainGoalReq(params.id, changedMainGoalData);

    if (!response.success) {
      handleMainGoalsPageError(setErrorMessage, response.error);
      return;
    }

    setSuccessStatus(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 2000)
  };

  useEffect(() => {
    getInitialMainGoalDataReq();
  }, []);

  useEffect(() => {
    // Show and close error message
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
    }

    // Show and close success message
    if (successStatus) {
      setTimeout(() => {
        setSuccessStatus(false);
      }, 2000);
    }
  }, [errorMessage, successStatus]);

  return (
    <>
      {successStatus && <SuccessMessage message={SUCCESS_MESSAGES.SAVED_MAIN_GOAL} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {initialMainGoalData && (
        <div className="h-auto">
          <MainGoal
            onSave={onSavePut}
            initialMainGoalData={initialMainGoalData}
          />
        </div>
      )}
    </>
  );
}
