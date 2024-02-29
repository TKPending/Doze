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
        return { success: false, error: "Problem getting dashboard data", title}
      }

      return { success: true, data: response.data}
    } catch (err) {
      return { success: false, error: err.message};
    }
  }

  async patchRequest(url, userInputValue, validHeader) {
    try {
      const response = await axios.patch(`${url}`, {userInputValue, validHeader});

      return response ? true : false;
    } catch (err) {
        return false;
    }
  }

  async changeDashboardTitle(userInputValue) {
    const response = await this.patchRequest(`${SERVER}/headerData/updateTitle`, userInputValue);

    if (!response) {
      return { success: false, error: "Problem with API Call (Title)", title: "title"}
    }

    if (userInputValue == "") {
      return {success: true, data: TITLE_DEFAULT};
    }

    return {success: true, data: userInputValue};
  }

  async changeDashboardQuote(userInputValue) {
    const response = await this.patchRequest(`${SERVER}/headerData/updateQuote`, userInputValue);

    if (!response) {
      return { success: false, error: "Problem with API Call (Quote)", quote: "quote"}
    }

    if (userInputValue == "") {
      return { success: true, data: QUOTE_DEFAULT};
    }

    return { success: true, data: userInputValue};
  }

  async changeDashboardBackground(validHeader, userInputValue) {
    const response = await this.patchRequest(`${SERVER}/headerData/updateBackground`, userInputValue, validHeader);

    if (!response) {
      return { success: true, error: "Problem with API Call (Background Image)", background: "background"}
    }

    if (!validHeader || userInputValue == "") {
        return { success: true, data: HEADER_DEFAULT};
    }

    return { success: true, data: userInputValue};
  }
}

export default new DashboardClient();
