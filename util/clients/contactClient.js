import axios from "axios";

const SERVER = "http://localhost:3001"; // "https://dozebackend.onrender.com";

class ContactClient {
  async sendMessage(message) {
    console.log("HERE")
    try {
      const formattedDate = new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const messageWithDate = { ...message, date: formattedDate };
      await axios.post(`${SERVER}/message`, messageWithDate);

      return { success: true };
    } catch {
      return { success: false, error: "Error sending message to Doze" };
    }
  }
}

export default new ContactClient;
