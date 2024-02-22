import tinycolor from "tinycolor2";
import { IonIcon } from "@ionic/react";
import { trashBinOutline } from "ionicons/icons";
import SubGoalsClient from "@/util/clients/subGoalsClient";

const SubGoalTitleContainer = ({
  stage,
  stages,
  setStages,
  title,
  color,
  taskAmount,
}) => {
  const taskAmountColor = tinycolor(color).darken(20).toString();
  const stageText = tinycolor(color).darken(5).toString();
  const backgroundColor = tinycolor(taskAmountColor).lighten(30).toString();

  const handleRemoveAllTasks = async () => {
    // Find the stage you want to empty (Todo, In Progress, Completed)
    const stageIndex = stages.findIndex((s) => s.text === stage.text);

    await SubGoalsClient.deleteAllSubGoalsInStages(stage.text);

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
          className="flex items-center gap-4 h-8 rounded-lg w-auto px-2"
          style={{
            backgroundColor: `rgba(${tinycolor(color).toRgb().r}, ${
              tinycolor(color).toRgb().g
            }, ${tinycolor(color).toRgb().b}, 0.2)`,
          }}
        >
          <div
            style={{ backgroundColor: backgroundColor }}
            className="rounded-full border h-6 w-6 bg-[${color}]"
          ></div>
          <p style={{ color: stageText }} className="font-bold">
            {title}
          </p>
        </div>

        {/* Render the amount of tasks available */}
        <p style={{ color: taskAmountColor }} className={`font-bold`}>
          {taskAmount}
        </p>
      </div>

      {/* Render the trashbin to remove all tasks */}
      <div className="hover:cursor-pointer flex items-center text-white transition duration-200 justify-center rounded-full border border-white hover:border-red-800 w-10 hover:text-red-800 font-bold">
        <IonIcon
          icon={trashBinOutline}
          onClick={handleRemoveAllTasks}
          className="text-2xl"
        />
      </div>
    </div>
  );
};

export default SubGoalTitleContainer;
