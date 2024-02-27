import axios from "axios";
import { DEVELOPER_ERRORS } from "../messages";

const SERVER = "http://localhost:3001" // "https://dozebackend.onrender.com";

class MainGoalsClient {
  //POST
  async createNewMainGoalReq(mainGoalData) {
    try {
      await axios.post(`${SERVER}/mainGoal`, mainGoalData);
    } catch (error) {
      console.log(error);
    }
  }
  //GET
  async getOneMainGoalReq(id) {
    try {
      const response = await axios.get(`${SERVER}/mainGoal/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  //PUT
  async changeOneMainGoalReq(id, changedMainGoalData) {
    try {
      const response = await axios.put(
        `${SERVER}/mainGoal/${id}`,
        changedMainGoalData
      );
    } catch (error) {
      console.log(error);
    }
  }
  //DELETE
  async deleteOneMainGoalReq(id) {
    try {
      await axios.delete(`${SERVER}/mainGoal/${id}`);
      alert("deleted");
    } catch (error) {
      console.log(error);
    }
  }

  async getAllMainGoals() {
    try {
      const response = await axios.get(`${SERVER}/mainGoal`);

      if (!response) {
        return { success: false, error: response.data.error}
      }
      return {success: true, data: response.data};
    } catch (err) {
      console.error(DEVELOPER_ERRORS.ENDPOINT)
      return { success: false, error: err.message}
    }
  }
}

export default new MainGoalsClient();
