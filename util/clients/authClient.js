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
      await axios.post(`${SERVER}/signin`, userData);
    } catch (err) {
      console.log(err);
    }
  }

  async signUpReq(userData) {
    try {
      await axios.post(`${SERVER}/signup`, userData);
    } catch (err) {
      console.log(err);
    }
  }

  async signOutUser() {
    try {
      await axios.post(`${SERVER}/signout`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthClient();
