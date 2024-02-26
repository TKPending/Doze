import axios from "axios";

const SERVER = "http://localhost:3001" // "https://dozebackend.onrender.com";

const TITLE_DEFAULT = "12 Weeks Goals";
const QUOTE_DEFAULT =
  "In just 12 weeks, you can create a new habit that will last a lifetime.";
const HEADER_DEFAULT = `Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)`;

class DashboardClient {
  async getDashboardHeaderData() {
    try {
      const response = await axios.get(`${SERVER}/headerData`);

      if (!response) {
        console.log(`Response from DashboardHeaderData, is invalid!`);
        return null;
      }

      return response.data;
    } catch (err) {
      console.error("No Response from DashboardHeaderData!");
      console.error(err);
      return null;
    }
  }

  async patchRequest(url, userInputValue, validHeader) {
    try {
      await axios.patch(`${url}`, {userInputValue, validHeader});
    } catch (err) {
        console.error("Error Making API Request! - Check DashboardClient!");
    }
  }

  async changeDashboardTitle(userInputValue) {
    await this.patchRequest(`${SERVER}/headerData/updateTitle`, userInputValue);

    if (userInputValue == "") {
      return TITLE_DEFAULT;
    }

    return userInputValue;
  }

  async changeDashboardQuote(userInputValue) {
    await this.patchRequest(`${SERVER}/headerData/updateQuote`, userInputValue);

    if (userInputValue == "") {
      return QUOTE_DEFAULT;
    }

    return userInputValue;
  }

  async changeDashboardBackground(validHeader, userInputValue) {
    await this.patchRequest(`${SERVER}/headerData/updateBackground`, userInputValue, validHeader);

    if (!validHeader || userInputValue == "") {
        return HEADER_DEFAULT;
    }

    return userInputValue;
  }
}

export default new DashboardClient();
