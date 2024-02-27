"use client";
import MainGoal from "../../components/MainGoalComponents/MainGoal";
import mainGoalsClient from "@/util/clients/mainGoalsClient";

export default function MainGoalPage() {
  //POST - creating main goal request
  const onSavePost = async (mainGoalData) => {
    console.log("HERE")
    // await mainGoalsClient.createNewMainGoalReq(mainGoalData);
  };
  return (
    <div className="h-auto">
      <MainGoal onSave={onSavePost} />
    </div>
  );
}
