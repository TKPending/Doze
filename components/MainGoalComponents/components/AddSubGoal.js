// For the main goals page
const AddSubGoal = ({ setIsModalVisible }) => { // Empty parameters
  const handleAddSubTask = async () => {
    setIsModalVisible(true);
    // Replace with logic to add Sub Goals from Sub Goals Client
  };

  return (
    <div className="w-full h-12 flex justify-center">
      <div
        onClick={handleAddSubTask}
        className="h-16 border border-indigo-600 hover:bg-indigo-600 hover:text-white hover:scale-105 transition duration-200 rounded-2xl flex items-center justify-center p-4 cursor-pointer"
      >
        <p className="font-medium font-sm text-center">+ New Sub Task</p>
      </div>
    </div>
  );
};

export default AddSubGoal;
