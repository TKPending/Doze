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
      <span className="text-lg p-1">{task.icon}</span>
      <h1 className="text-black text-center">{task.title}</h1>
    </div>
  );
};

export default SmallSubGoals;
