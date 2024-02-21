"use client";
import { useEffect, useState } from "react";
import MainGoal from "../../../components/MainGoalComponents/MainGoal";
import mainGoalsClient from "@/util/clients/mainGoalsClient";

export default function DefinedMainGoal({ params }) {
  const [initialMainGoalData, setInitialMainGoalData] = useState(null);

  //GET - getting main goal data
  const getInitialMainGoalDataReq = async () => {
    const mainGoalData = await mainGoalsClient.getOneMainGoalReq(params.id);
    setInitialMainGoalData(mainGoalData);
  };

  //PUT - changing main goal data
  const onSavePut = async (changedMainGoalData) => {
    await mainGoalsClient.changeOneMainGoalReq(params.id, changedMainGoalData);
  };

  useEffect(() => {
    getInitialMainGoalDataReq();
  }, []);

  return (
    <>
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
