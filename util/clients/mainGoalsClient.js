import axios from "axios";

const SERVER = process.env.SERVER_URL;

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
    const response = await axios.get(`${SERVER}/mainGoal`);
    return response.data;
  }
}

export default new MainGoalsClient();
