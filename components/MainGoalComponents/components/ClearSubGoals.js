const ClearSubGoals = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="hover:cursor-pointer w-auto flex text-indigo-600 hover:text-white  items-center justify-center border border-indigo-600 hover:bg-indigo-600 bg-white transition duration-200 rounded-xl p-2.5"
    >
      <p className="text-center">Delete All Sub Tasks</p>
    </div>
  );
};

export default ClearSubGoals;
