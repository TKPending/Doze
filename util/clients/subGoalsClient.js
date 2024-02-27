import axios from "axios";
import MainGoalsClient from "./mainGoalsClient";

const SERVER = "http://localhost:3001" // "https://dozebackend.onrender.com";


class SubGoalsClient {
  async addSubGoal(subGoalData) {
    try {
      const mainGoalId = subGoalData.mainGoalId;
      const response = await axios.post(
        `${SERVER}/mainGoal/${mainGoalId}/subgoals`,
        subGoalData
      );

      if (!response) {
        return { success: false, error: response.data.error}
      }
        
      return { success: true};
    } catch (err) {
      return { success: false, error: err.message}
    }
  }

  async getAllSubGoals() {
    const response = await MainGoalsClient.getAllMainGoals();

    if (!response) {
      return {success: false, error: "Problem getting all main goals"}
    }

    const allSubGoals = response.data;
    const subGoals = [];

    if (allSubGoals) {
      allSubGoals.forEach((goal) => {
        const subGoalsArray = goal.subGoals;
        if (subGoalsArray) {
          subGoalsArray.forEach((item) => {
            subGoals.push(item);
          });
        }
      });
    }
    return {success: true, data: subGoals};
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
      const response = await axios.delete(
        `${SERVER}/mainGoal/${mainGoalId}/mainGoal_delete_all`
      );

      if (!response) {
        return { success: false, error: response.data.error};
      }

      return {success: true};
    } catch (err) {
      console.error("Problem: Most likely to do with the endpoints or routes.")
      return { succses: false, error: err.message};
    }
  }
}

export default new SubGoalsClient();
