import axios from "axios";
import MainGoalsClient from "./mainGoalsClient";

const SERVER = "https://dozebackend.onrender.com";


class SubGoalsClient {
  async addSubGoal(subGoalData) {
    try {
      const mainGoalId = subGoalData.mainGoalId;
      await axios.post(
        `${SERVER}/mainGoal/${mainGoalId}/subgoals`,
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
        `${SERVER}/mainGoal/${mainGoalId}/subGoals/${subGoalId}`,
        subGoalData
      );
      return null;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteSubGoal(mainGoalId, id) {
    try {
      await axios.delete(
        `${SERVER}/mainGoal/${mainGoalId}/subGoals/${id}`
      );
      return null;
    } catch (err) {
      console.log(err);
    }
  }


  async deleteAllSubGoalsInStages(stage) {
    try {
      await axios.delete(
        `${SERVER}/mainGoal/stages_delete_all/${stage}`
      );
    } catch (err) {
      console.log("Error: Problem deleting all sub goals from stages");
      console.error(err);
    }
  }

  async deleteAllSubGoalsInMainGoals(mainGoalId) {
    try {
      await axios.delete(
        `${SERVER}/mainGoal/${mainGoalId}/mainGoal_delete_all`
      );

      return true;
    } catch (err) {
      console.log("Error: Problem deleting all sub goals from main goals page");
      console.error(err);
      return false;
    }
  }
}

export default new SubGoalsClient();
