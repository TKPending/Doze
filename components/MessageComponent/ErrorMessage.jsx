const ErrorMessage = ({ message }) => {
    return (
      <div className="absolute top-[10%] right-4 max-w-[20%] md:max-w-[30%] border border-2 items-center gap-4 flex pl-4 rounded-lg border-red-200">
        <div className="flex items-center justify-center rounded-full bg-red-500 h-[50%] w-10">
          <p className="text-white text-2xl">x</p>
        </div>
        <p className="p-2 text-netural-400 min-w-0 overflow-hidden overflow-ellipsis">
          {message}
        </p>
      </div>
    );
  };
  
  export default ErrorMessage;
  