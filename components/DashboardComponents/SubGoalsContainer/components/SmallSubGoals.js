const SmallSubGoals = ({ task, setIsModalVisible, setTaskClicked }) => {
  // Opens section to edit Sub Goals
  const openModal = () => {
    setIsModalVisible(true);
    setTaskClicked({ title: task });
  };

  return (
    <div
      onClick={openModal}
      className="border border-indigo-600 h-20 w-[97%] hover:scale-105 transition duration-200 rounded-lg bg-white hover:cursor-pointer p-2"
    >
      <h1 className="text-black">{task}</h1>
    </div>
  );
};

export default SmallSubGoals;
