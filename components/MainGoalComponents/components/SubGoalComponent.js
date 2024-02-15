import { IonIcon } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";

const SubGoalComponent = ({ subGoals, setSubGoals, task, onClick }) => {
  const handleRemoveTask = () => {
    const newTasks = subGoals.filter((tasks) => tasks != task);
    setSubGoals([...newTasks]);
  };

  return (
    <div
      onClick={onClick}
      className="h-16 border border-indigo-600 hover:scale-105 transition duration-200 rounded-2xl flex items-center justify-between p-4"
    >
      <div className="h-full flex gap-4 items-center">
        <div className="h-6 font-bold w-6 bg-black"></div>
        <p>Sub Goal {task}</p>
      </div>

      <div className="hover:cursor-pointer flex items-center text-black transition duration-200 justify-center rounded-full hover:scale-105 transition duration-200 hover:border-red-800 w-10 hover:text-red-800 font-bold"></div>
    </div>
  );
};

export default SubGoalComponent;
