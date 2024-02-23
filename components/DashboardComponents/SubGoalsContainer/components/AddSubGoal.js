import SubGoal from "../../../SubGoalComponent/SubGoal";
const AddSubGoal = ({ stage, stages, setStages, setIsModalVisible }) => {

  const openModal = () => {
    setIsModalVisible(true);
  };

  return (
    <div className="w-full h-12 flex justify-center">
      <div
        onClick={openModal}
        className="w-2/4 border text-white border-indigo-600 bg-indigo-600 hover:scale-105 transition duration-300 hover:bg-white hover:text-black h-full rounded-lg flex justify-center items-center hover:cursor-pointer"
      >
        <p className="font-semibold">+ New Sub Task</p>
        
      </div>
    </div>
  );
};

export default AddSubGoal;
