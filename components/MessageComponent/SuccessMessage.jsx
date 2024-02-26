const SuccessMessage = ({ message }) => {
    return (
      <div className="absolute top-[10%] right-4 max-w-[20%] md:max-w-[30%] items-center gap-4 flex pl-4 rounded-lg bg-green-400">
        <p className="p-2 text-white min-w-0 overflow-hidden overflow-ellipsis">
          {message}
        </p>
      </div>
    );
  };
  
  export default SuccessMessage;
  