"use client";
import Link from "next/link";

const SITE = process.env.SERVER_URL;

const Goal = ({ goal, deleteOneMainGoalFromDashboard }) => {
  return (
    <div className="flex items-center gap-4 w-2/4">
      <Link
        href={`${SITE}/maingoal/${goal._id}`}
        className="flex items-center gap-4"
      >
        <div className="h-4 w-4 bg-black hover:cursor-pointer"></div>
        <h2 className="text-black text-lg font-lg hover:underline hover:cursor-pointer">
          {goal.title}
        </h2>
      </Link>
      {/* <ProgressBar /> */}
      <h2
        className="hover:text-black text-transparent hover:cursor-pointer"
        onClick={() => {
          deleteOneMainGoalFromDashboard(goal._id);
        }}
      >
        x
      </h2>
    </div>
  );
};

export default Goal;
