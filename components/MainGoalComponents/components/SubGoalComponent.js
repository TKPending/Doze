const SubGoalComponent = ({ subGoal, onClick }) => {
  return (
    <div
      onClick={() => onClick(subGoal)}
      className="h-16 border border-indigo-600 hover:scale-105 transition duration-200 rounded-2xl flex items-center justify-between p-4"
    >
      <div className="h-full flex gap-4 items-center">
        <div className="h-6 font-bold w-6">{subGoal.icon}</div>
        <p>{subGoal.title}</p>
      </div>

      <div className="hover:cursor-pointer flex items-center text-black transition duration-200 justify-center rounded-full hover:scale-105 transition duration-200 hover:border-red-800 w-10 hover:text-red-800 font-bold"></div>
    </div>
  );
};

export default SubGoalComponent;
