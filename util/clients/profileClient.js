import axios from "axios";

const SERVER = "http://localhost:3001"; // "https://dozebackend.onrender.com";

class ProfileClient {
  // Change email request
  async changeEmailReq(emailData) {
    try {
      await axios.post(`${SERVER}/user/changeEmail`, emailData);
    } catch (err) {
      console.log(err);
    }
  }
  //Change password request
  async changePasswordReq(passwordData) {
    try {
      await axios.post(`${SERVER}/user/changePassword`, passwordData);
    } catch (err) {
      console.log(err);
    }
  }
  //Delete account
  async deleteAccountReq() {
    try {
      await axios.delete(`${SERVER}/user`);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new ProfileClient();
