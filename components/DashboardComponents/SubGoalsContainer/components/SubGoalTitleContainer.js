import tinycolor from "tinycolor2";
import { IonIcon } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";

const SubGoalTitleContainer = ({
  stage,
  stages,
  setStages,
  title,
  color,
  taskAmount,
}) => {
  const darkenColor = tinycolor(color).darken(80).toString();
  const darkText = `text-[${darkenColor}]`;
  const backgroundColor = tinycolor(darkenColor).setAlpha(0.1).toString();

  const handleRemoveAllTasks = () => {
    // Find the stage you want to empty (Todo, In Progress, Completed)
    const stageIndex = stages.findIndex((s) => s.text === stage.text);

    // Create a new array and empty stage tasks
    const newStages = [...stages];
    newStages[stageIndex] = { ...newStages[stageIndex], tasks: [] };

    // Reset the stage
    setStages(newStages);
  };

  return (
    <div className="flex justify-between w-full h-12 rounded-lg p-2 px-4">
      <div className="flex items-center gap-4">
        {/* Render the circle and stage title */}
        <div
          style={{ backgroundColor }}
          className={`flex items-center gap-4 h-8 rounded-lg w-auto px-2`}
        >
          <div className={`rounded-full border h-6 w-6 bg-[${color}]`}></div>
          <p className={`${darkText} font-bold`}>{title}</p>
        </div>
        {/* Render the amount of tasks available */}
        <p className={`font-bold ${darkText}`}>{taskAmount}</p>
      </div>

      {/* Render the trashbin to remove all tasks */}
      <div className="flex items-center justify-center rounded-full border border-white hover:border-red-500 w-10 hover:text-red-500">
        <IonIcon
          icon={trashBinOutline}
          onClick={handleRemoveAllTasks}
          className="hover:cursor-pointer text-2xl"
          // Filter out unwanted attributes
          // {...Object.keys({ role: undefined, class: undefined })
          //   .filter((attr) => !["role", "class"].includes(attr))
          //   .reduce((acc, key) => ({ ...acc, [key]: undefined }), {})}
        />
      </div>
    </div>
  );
};

export default SubGoalTitleContainer;
