import axios from "axios";
import MainGoalsClient from "./mainGoalsClient";

class SubGoalsClient {
  async addSubGoal(subGoalData) {
    try {
      const mainGoalId = subGoalData.mainGoalId;
      await axios.post(
        `http://localhost:3001/mainGoal/${mainGoalId}/subgoals`,
        subGoalData
      );
    } catch (err) {
      console.log(err);
    }
  }

  async getAllSubGoals() {
    const response = await MainGoalsClient.getAllMainGoals();

    const subGoals = [];
    if (response) {
      response.forEach((goal) => {
        const subGoalsArray = goal.subGoals;
        if (subGoalsArray) {
          subGoalsArray.forEach((item) => {
            subGoals.push(item);
          });
        }
      });
    }
    return subGoals;
  }

  async editSubGoal(subGoalData) {
    try {
      const mainGoalId = subGoalData.mainGoalId;
      const subGoalId = subGoalData.id;
      await axios.put(
        `http://localhost:3001/mainGoal/${mainGoalId}/subGoals/${subGoalId}`,
        subGoalData
      );
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSubGoal(mainGoalId, id) {
    console.log("subgoal", id);
    console.log("mainGoalId", mainGoalId);
    try {
      await axios.delete(
        `http://localhost:3001/mainGoal/${mainGoalId}/subGoals/${id}`
      );
      return null;
    } catch (err) {
      console.log(err);
    }
  }
}

export default new SubGoalsClient();
