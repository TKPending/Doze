"use client";
import Link from "next/link";

const SERVER = "https://doze-pink.vercel.app"

const Goal = ({ goal, deleteOneMainGoalFromDashboard }) => {
  return (
    <div className="relative flex items-center justify-between gap-4 md:w-5/6 w-full mt-2.5  p-2 rounded-lg">
      <Link
        href={`${SERVER}/maingoal/${goal._id}`}
        className="flex items-center gap-4"
      >
        <div className="text-2xl  hover:cursor-pointer flex justify-center items-center">{goal.icon}</div>
        <h2 className="text-gray-800 md:text-xl text-lg font-medium hover:text-gray-400 hover:cursor-pointer">
          {goal.title}
        </h2>
      </Link>
      {/* <ProgressBar /> */}

      <label className="lg:absolute lg:right-10 flex flex-col justify-center items-center w-1/4 md:w-1/4 font-medium">
        {/* {goal.completed}% */}
        <progress
          value={goal.completed > 0 && goal.completed}
          max="100"
          className="progress progress-primary opacity-75 md:w-full w-full"
        ></progress>
      </label>
      {/* <Delete /> */}
      <h2
        className="text-red-600 hover:cursor-pointer lg:absolute lg:right-0"
        onClick={() => {
          deleteOneMainGoalFromDashboard(goal._id);
        }}
      >
        <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-delete"
            >
              <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
              <line x1="18" x2="12" y1="9" y2="15" />
              <line x1="12" x2="18" y1="9" y2="15" />
            </svg>
             </h2>
    </div>
  );
};

export default Goal;
