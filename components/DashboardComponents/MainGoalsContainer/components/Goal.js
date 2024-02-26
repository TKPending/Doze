"use client";
import Link from "next/link";

const Goal = ({ goal, deleteOneMainGoalFromDashboard }) => {
  return (
    <div className="flex items-center gap-4 w-2/4">
      <Link
        href={`http://localhost:3000/maingoal/${goal._id}`}
        className="flex items-center gap-4"
      >
        <div className="h-4 w-4 bg-black hover:cursor-pointer"></div>
        <h2 className="text-black text-lg font-lg hover:underline hover:cursor-pointer">
          {goal.title}
        </h2>
      </Link>
      {/* <ProgressBar /> */}
      <label className="flex flex-col justify-center items-center">
        {goal.completed}%
        <progress
          value={goal.completed}
          max="100"
          className="progress progress-primary w-56"
        ></progress>
      </label>
      {/* <Delete /> */}
      <h2
        className=" hover:cursor-pointer"
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
