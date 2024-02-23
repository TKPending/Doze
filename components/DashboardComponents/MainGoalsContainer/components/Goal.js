"use client";
import Link from "next/link";

const Goal = ({ goal, deleteOneMainGoalFromDashboard }) => {
  return (
    <div className="flex items-center gap-4 w-2/4">
      <Link
        href={`http://localhost:3000/maingoal/${goal._id}`}
        className="flex items-center gap-4"
      >
        <div className="text-2xl  hover:cursor-pointer flex justify-center items-center">{goal.icon}</div>
        <h2 className="text-gray-800 md:text-xl text-lg font-medium hover:text-indigo-600 hover:cursor-pointer">
          {goal.title}
        </h2>
      </Link>
      {/* <ProgressBar /> */}
      <h2
        className="hover:text-red-600 text-transparent hover:cursor-pointer"
        onClick={() => {
          deleteOneMainGoalFromDashboard(goal._id);
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-badge-x"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
      </h2>
    </div>
  );
};

export default Goal;
