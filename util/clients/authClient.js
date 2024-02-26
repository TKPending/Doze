import axios from "axios";

const SERVER = "http://localhost:3001" // "https://dozebackend.onrender.com";

class AuthClient {
  async getUser() {
    try {
      const response = await axios.get(`${SERVER}/user`);

      // Response isn't received
      if (!response) {
        console.error("Problem getting user!");
        return;
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  // Signing in a user
  async signInReq(userData) {
    try {
      const response = await axios.post(`${SERVER}/signin`, userData);

      console.log(response.data);

      if (response.data.error) {
        return { success: false, error: response.data.error}
      }
      return {success: true};
    } catch (err) {
      console.log(err);
    }
  }

  async signUpReq(userData) {
    try {
      const response = await axios.post(`${SERVER}/signup`, userData);
      if (response.data.error){
        return { success: false, error: response.data.error}
      }
      return { success: true};
    } catch (err) {
      console.log(err);
      return { success: false, error: err.message };
    }
  };

  async signOutUser() {
    try {
      await axios.post(`${SERVER}/signout`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthClient();
