const ClearSubGoals = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-20 flex text-white hover:text-[#ff9796]  items-center justify-center border border-[#ff9796] bg-[#ff9796] hover:bg-white transition duration-200 rounded-2xl"
    >
      <p className="font-bold">Clear</p>
    </div>
  );
};

export default ClearSubGoals;
