import axios from "axios";
import { DEVELOPER_ERRORS } from "../messages";

const SERVER = "http://localhost:3001" // "https://dozebackend.onrender.com";

class MainGoalsClient {
  //POST
  async createNewMainGoalReq(mainGoalData) {
    try {
      const response = await axios.post(`${SERVER}/mainGoa`, mainGoalData);

      if (!response) {
        return { success: false, error: response.data.error}
      }

      return { success: true}
    } catch (error) {
      console.log(error);
      return { succes: false, error: error.message};
    }
  }
  //GET
  async getOneMainGoalReq(id) {
    try {
      const response = await axios.get(`${SERVER}/mainGoal/${id}`);

      if (!response) {
        return {success: false, error: response.data.error};
      }
      return {success: true, data: response.data};
    } catch (error) {
      console.error(DEVELOPER_ERRORS.ROUTES);
      return {success: false, error: error.message}
    }
  }
  //PUT
  async changeOneMainGoalReq(id, changedMainGoalData) {
    try {
      const response = await axios.put(
        `${SERVER}/mainGoal/${id}`,
        changedMainGoalData
      );

      if (!response) {
        return { success: false, error: response.data.error};
      }

      return { success: true, data: response.data};

    } catch (error) {
      console.log(DEVELOPER_ERRORS.ROUTES);
      return { success: false, error: error.message}
    }
  }
  //DELETE
  async deleteOneMainGoalReq(id) {
    try {
      const response = await axios.delete(`${SERVER}/mainGoal/${id}`);

      if (!response) {
        return {success: false, error: response.data.error}
      }

      return {success: true}
    } catch (error) {
      console.log(DEVELOPER_ERRORS.ROUTES);
      return {success: false, error: error.message}

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
