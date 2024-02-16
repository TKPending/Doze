import axios from "axios";

const serverUrl = "http://localhost:3001";

const TITLE_DEFAULT = "12 Weeks Goals";
const QUOTE_DEFAULT =
  "In just 12 weeks, you can create a new habit that will last a lifetime.";
const HEADER_DEFAULT = `Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)`;


// {username: 'header', email: 'header@header.com'}

class DashboardClient {
  async getDashboardHeaderData(userId) {
    try {
      const response = await axios.get(`${serverUrl}/headerData`, {
        params: {
          user: userId,
        },
      });

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

  async patchRequest(url, username, userInputValue, validHeader) {
    try {
      await axios.patch(`${url}`, { username, userInputValue, validHeader});
    } catch (err) {
        console.error("Error Making API Request! - Check DashboardClient!");
    }
  }

  async changeDashboardTitle(userId, userInputValue) {
    await this.patchRequest(`${serverUrl}/headerData/updateTitle`, userId, userInputValue);

    if (userInputValue == "") {
      return TITLE_DEFAULT;
    }

    return userInputValue;
  }

  async changeDashboardQuote(userId, userInputValue) {
    await this.patchRequest(`${serverUrl}/headerData/updateQuote`, userId, userInputValue);

    if (userInputValue == "") {
      return QUOTE_DEFAULT;
    }

    return userInputValue;
  }

  async changeDashboardBackground(validHeader, userId, userInputValue) {
    await this.patchRequest(`${serverUrl}/headerData/updateBackground`, userId, userInputValue, validHeader);

    if (!validHeader || userInputValue == "") {
        console.log("Invalid Image Type!");
        return HEADER_DEFAULT;
    }

    return userInputValue;
  }
}

export default new DashboardClient;
