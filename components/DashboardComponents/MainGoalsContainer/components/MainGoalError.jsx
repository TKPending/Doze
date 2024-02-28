import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const MainGoalError = ({ message }) => {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown === 0) {
      setTimeout(() => {
        router.push("/");
      }, 500);
    }

    return () => clearInterval(interval);
  }, [countdown, router]);

  return (
    <div className="h-32 w-full bg-red-400 text-white text-center flex items-center justify-center rounded-lg">
      <p>{message}<br></br>Redirecting in {countdown}s...</p> 
    </div>
  );
};

export default MainGoalError;
