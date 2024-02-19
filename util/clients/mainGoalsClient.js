import axios from "axios";
class MainGoalsClient {
  //POST
  async createNewMainGoalReq(mainGoalData) {
    try {
      await axios.post("http://localhost:3001/mainGoal", mainGoalData);
    } catch (error) {
      console.log(error);
    }
  }
  //GET
  async getOneMainGoalReq(id) {
    try {
      const response = await axios.get(`http://localhost:3001/mainGoal/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  //PUT
  async changeOneMainGoalReq(id, changedMainGoalData) {
    try {
      const response = await axios.put(
        `http://localhost:3001/mainGoal/${id}`,
        changedMainGoalData
      );
    } catch (error) {
      console.log(error);
    }
  }
  //DELETE
  async deleteOneMainGoalReq(id) {
    try {
      await axios.delete(`http://localhost:3001/mainGoal/${id}`);
      alert("deleted");
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MainGoalsClient();
