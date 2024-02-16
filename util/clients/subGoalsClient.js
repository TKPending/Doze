import axios from "axios";
class SubGoalsClient {
 
    
    async addSubGoal(subGoalData) {
        try {
            const response = await axios.post("http://localhost:3001/maingoals/65ce28e540b706abff1737d0/subgoals", subGoalData);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    async getAllSubGoals() {
        try {
            const response = await axios.get("http://localhost:3001/maingoals");
            const mainGoals = response.data;

            // let allSubGoals = [];

            // for (const mainGoal of mainGoals) {
            //     const mainGoalId = mainGoal.id;

            //     const subGoalsResponse = await axios.get(`http://localhost:3001/maingoals/${mainGoalId}/subgoals`);
            //     const subGoals = subGoalsResponse.data
            //     const allSubGoals = [...allSubGoals, ...subGoals];
            // }

            return allSubGoals;
        } catch (err) {
            console.log("error in client");
            console.log(err); 
        }
    }

    async editSubGoal(subGoalData) {
        try {
            const response = await axios.put("http://localhost:3001/maingoals/65ce28e540b706abff1737d0/subgoals/65ce365ad09fa95ac1616d81", subGoalData);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }

    async deleteSubGoal(mainGoalId, subGoalId) {
        try {
            const response = await axios.delete(`http://localhost:3001/maingoals/${mainGoalId}/subgoals/${subGoalId}`);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    }
}

  

export default SubGoalsClient;