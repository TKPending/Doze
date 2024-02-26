const SmallSubGoals = ({ task, setTaskClicked, setIsEditModalVisible }) => {
  // Opens section to edit Sub Goals
  const openModal = () => {
    setIsEditModalVisible(true);
    setTaskClicked(task);
  };

  return (
    <div
      onClick={openModal}
      className="border border-indigo-600 h-20 w-[97%] hover:scale-105 transition duration-200 rounded-lg bg-white hover:cursor-pointer p-2"
    >
      <div className="flex flex-row">
      <span className="text-xl px-1">{task.icon}</span>
      <h1 className="text-black text-lg font-medium px-2">{task.title}</h1>
      </div>
      <h2 className="text-sm py-1 px-1 ">{task.mainGoal}</h2>
    </div>
  );
};

export default SmallSubGoals;
