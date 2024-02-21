import axios from "axios";
class SubGoalsClient {
 
    
    async addSubGoal(subGoalData) {
        try {
            console.log(subGoalData)
            const mainGoalId = subGoalData.mainGoalId;
         await axios.post(`http://localhost:3001/mainGoal/${mainGoalId}/subgoals`, subGoalData);
           
        } catch (err) {
            console.log(err);
        }
    }

    async getSubGoals() {
        const response = await axios.get("http://localhost:3001/mainGoal");
        const subGoals = [];
        if (response) {
            response.data.forEach(item => {
        const subGoalsArray = item.subGoals;
        if (subGoalsArray) {
        subGoalsArray.forEach(item => {
          subGoals.push(item)
        })
      }})
        }
        return subGoals
    // return response.data
    
    }


    
    async editSubGoal(subGoalData) {
        try {
            const mainGoalId = subGoalData.mainGoalId;
            const subGoalId = subGoalData.id;
            await axios.put(`http://localhost:3001/mainGoal/${mainGoalId}/subGoals/${subGoalId}`, subGoalData);
                return null
        } catch (err) {
            console.log(err);
        }
    }

    async deleteSubGoal(mainGoalId, id) {
        console.log("subgoal", id);
        console.log("mainGoalId", mainGoalId);
        try {
           await axios.delete(`http://localhost:3001/mainGoal/${mainGoalId}/subGoals/${id}`);
            return null
        } catch (err) {
            console.log(err);
        }
    }
}


export default new SubGoalsClient();