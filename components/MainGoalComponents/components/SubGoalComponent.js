const SubGoalComponent = ({ subGoal, onClick }) => {

  const showCircle = (subGoal) => {
    let colour 
  if (subGoal.status === "To-do"){
    colour = "#FF9796"
    return colour
  } else if (subGoal.status === "In progress"){
    colour = "#7899D4"
    return colour
  } else {
    colour = "#ACE4AA"
    return colour
  }}

  return (
    <div
      onClick={() => onClick(subGoal)}
      className="relative h-16 border border-indigo-600 hover:scale-105 transition duration-200 rounded-2xl flex items-center justify-between p-4 cursor-pointer"
    >
      <div className="h-16 flex gap-4 items-center">
        <div className="h-6 font-bold w-6">{subGoal.icon}</div>
        <p className="font-medium">{subGoal.title}</p>
        <div className="absolute right-1 top-1">
        <svg className="rounded-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={showCircle(subGoal)} stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle"><circle cx="12" cy="12" r="10"/></svg>
        </div>
       </div>

      
    </div>
  );
};

export default SubGoalComponent;
