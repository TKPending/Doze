"use client";

import { useEffect } from "react";

const AddGoal = ({ goals, setGoals }) => {
  // Add a main goal
  const handleAddGoal = () => {
    // Will be dealt with in the database
    setGoals([...goals, { uid: goals.length + 1 , title: "Click to add goal name", icon: "..." }]);
  };

  useEffect(() => {

  }, [goals])

  return (
    <div
      onClick={handleAddGoal}
      className={`mt-4 ml-8 flex gap-4 items-center justify-center w-32 h-8 border border-indigo-600 bg-indigo-600 hover:bg-white text-white hover:text-black hover:border hover:scale-105 transition duration-200 rounded-lg hover:cursor-pointer`}
    >
      <h1 className="font-semibold">Add Goal +</h1>
    </div>
  );
};

export default AddGoal;
