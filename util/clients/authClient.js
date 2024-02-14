import axios from "axios";

class AuthClient {
  async getUser(setUser) {
    try {
      const response = await axios.get("http://localhost:3001/user");

      // Response isn't received
      if (!response) {
        console.error("Problem getting user!");
        return;
      }

      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Signing in a user
  async signInReq(userData, onUserSignedIn) {
    try {
      await axios.post("http://localhost:3001/signin", userData);
      onUserSignedIn();
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

  async signOutUser(onUserSignedOut) {
    try {
      await axios.post("http://localhost:3001/signout");
      onUserSignedOut();
    } catch (err) {
      console.log(err);
    }
  }
}

export default AuthClient;
