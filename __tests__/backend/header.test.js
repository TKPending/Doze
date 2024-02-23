require("dotenv").config();

const request = require("supertest");
const app = require("../../testApp");
const mongoose = require("mongoose");
const User = require("../../server/models/user");
const Header = require("../../server/models/header");

let jwtToken;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);

  const signupResponse = await request(app).post("/signup").send({
    username: "header",
    email: "header@testing.com",
    password: "testpassword",
  });

  expect(signupResponse.status).toBe(200);

  const signinResponse = await request(app).post("/signin").send({
    email: "header@testing.com",
    password: "testpassword",
  });

  expect(signinResponse.status).toBe(200);

  jwtToken = signinResponse.header["set-cookie"];
});

afterAll(async () => {
  await Header.deleteMany({});
  await User.deleteMany({ email: "header@testing.com" });
  await mongoose.connection.close();
});

const TITLE_DEFAULT = "12 Weeks Goals";
const QUOTE_DEFAULT =
  "In just 12 weeks, you can create a new habit that will last a lifetime.";
const BACKGROUND_DEFAULT = "Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)";

const makeRequest = async (method, url, payload = {}) => {
  const requestObject = request(app)[method](url).set("Cookie", jwtToken);

  // Add payload to the request if it's not empty
  if (Object.keys(payload).length > 0) {
    requestObject.send(payload);
  }

  return await requestObject;
};

describe("Dashboard data is retrieved", () => {
  // Connect to headers DB
  test.concurrent("GET /connect to headers database", async () => {
    const response = await makeRequest("get", "/headerData");

    expect(response.status).toBe(200);
  });

  // Get all information from header
  test.concurrent("GET /should get all header data", async () => {
    const response = await makeRequest("get", "/headerData");

    expect(response.status).toBe(200);
    expect(response.body.dashboard_title).toBe(TITLE_DEFAULT);
    expect(response.body.dashboard_quote).toBe(QUOTE_DEFAULT);
    expect(response.body.dashboard_background).toBe(BACKGROUND_DEFAULT);
  });

  // None of the header data should be an empty string
  test.concurrent("GET /should get all header data", async () => {
    const response = await makeRequest("get", "/headerData");

    expect(response.status).toBe(200);
    expect(response.body.dashboard_title).not.toBe("");
    expect(response.body.dashboard_quote).not.toBe("");
    expect(response.body.dashboard_background).not.toBe("");
  });
});

describe("Dashboard data can't be empty", () => {
  test("PATCH /background image link, can't be empty", async () => {
    const response = await makeRequest(
      "patch",
      "/headerData/updateBackground",
      {
        userInputValue: "",
        validHeader: true,
      }
    );

    expect(response.status).toBe(200);
    expect(response.body.dashboard_background).not.toBe("");
  });

  // Title image isn't an empty string
  test("PATCH /header title, can't be empty", async () => {
    const response = await makeRequest("patch", "/headerData/updateTitle", {
      userInputValue: "",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_title).not.toBe("");
  });

  // Quote image isn't an empty string
  test("PATCH /header quote, can't be empty", async () => {
    const response = await makeRequest("patch", "/headerData/updateQuote", {
      userInputValue: "",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_quote).not.toBe("");
  });
});

describe("Dashboard data can be changed", () => {
  // Header Quote can be changed
  test("PATCH /header quote updates value", async () => {
    const response = await makeRequest("patch", "/headerData/updateQuote", {
      userInputValue: "Updated Quote",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_quote).toBe("Updated Quote");
  });

  // Header title can be changed
  test("PATCH /header title updates value", async () => {
    const response = await makeRequest("patch", "/headerData/updateTitle", {
      userInputValue: "Updated Title",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_title).toBe("Updated Title");
  });

  // Header background can be changed
  test("PATCH /header quote updates value", async () => {
    const response = await makeRequest(
      "patch",
      "/headerData/updateBackground",
      {
        userInputValue: "background.jpg",
        validHeader: true,
      }
    );

    expect(response.status).toBe(200);
    expect(response.body.dashboard_background).toBe("background.jpg");
  });
});

describe("Dashboard defaults to expected values", () => {
  // Defaults to QUOTE_DEFAULT
  test("PATCH /header quote updates value", async () => {
    const response = await makeRequest("patch", "/headerData/updateQuote", {
      userInputValue: "",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_quote).not.toBe("");
  });

  // Defaults to TITLE_DEFAULT
  test("PATCH /header title updates value", async () => {
    const response = await makeRequest("patch", "/headerData/updateTitle", {
      userInputValue: "",
    });

    expect(response.status).toBe(200);
    expect(response.body.dashboard_title).not.toBe("");
  });

  // Defaults to BACKGROUND_DEFAULT
  test("PATCH /header quote updates value", async () => {
    const response = await makeRequest(
      "patch",
      "/headerData/updateBackground",
      {
        userInputValue: "",
        validHeader: false,
      }
    );

    expect(response.status).toBe(200);
    expect(response.body.dashboard_background).not.toBe("");
  });
});
