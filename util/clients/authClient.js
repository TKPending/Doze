import axios from "axios";

class AuthClient {
  async getUser() {
    try {
      const response = await axios.get("http://localhost:3001/user");

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
      await axios.post("http://localhost:3001/signin", userData);
    } catch (err) {
      console.log(err);
    }
  }

  async signUpReq(userData) {
    try {
      await axios.post("http://localhost:3001/signup", userData);
    } catch (err) {
      console.log(err);
    }
  }

  async signOutUser() {
    try {
      await axios.post("http://localhost:3001/signout");
    } catch (err) {
      console.log(err);
    }
  }
}

export default new AuthClient();
