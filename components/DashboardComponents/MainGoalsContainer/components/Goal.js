"use client";

const Goal = ({ goals, uid, handleRemoveGoal }) => {
  // Handle sending user to goal page
  const handleGoalPressed = () => {
    console.log(goals);
  };

  return (
    <div className="flex items-center gap-4 w-2/4">
      <div className="flex items-center gap-4">
        <div onClick={handleGoalPressed} className="h-4 w-4 bg-black hover:cursor-pointer"></div>
        <h2 onClick={handleGoalPressed} className="text-black text-lg font-lg hover:underline hover:cursor-pointer">
          {goals}
        </h2>
      </div>
      {/* <ProgressBar /> */}
      <h2 onClick={() => handleRemoveGoal(uid)} className="hover:text-black text-transparent hover:cursor-pointer">
        x
      </h2>
    </div>
  );
};

export default Goal;
