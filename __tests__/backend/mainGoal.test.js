require("dotenv").config();

const request = require("supertest");
const app = require("../../testApp");
const mongoose = require("mongoose");
const User = require("../../server/models/user");
const MainGoals = require("../../server/models/maingoal");

let jwtToken;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI);

  const signupResponse = await request(app).post("/signup").send({
    username: "maingoal",
    email: "maingoal@testing.com",
    password: "testpassword",
  });

  expect(signupResponse.status).toBe(200);

  const signinResponse = await request(app).post("/signin").send({
    email: "maingoal@testing.com",
    password: "testpassword",
  });

  expect(signinResponse.status).toBe(200);

  jwtToken = signinResponse.header["set-cookie"];
});

afterAll(async () => {
  await User.deleteMany({ email: "maingoal@testing.com" });
  await User.deleteMany({ email: "anothermain@testing.com" });
  await MainGoals.deleteMany({});
  await mongoose.connection.close();
});

const tempData = {
  title: "Main Goal Title",
  description: "",
  status: "to-do",
  startDate: new Date().toLocaleDateString("en-CA"),
  tags: [],
  icon: "😁",
};

const makeRequest = async (method, url, payload = {}) => {
  const requestObject = request(app)[method](url).set("Cookie", jwtToken);

  if (Object.keys(payload).length > 0) {
    requestObject.send(payload);
  }

  return await requestObject;
};

describe("Creating Main Goals", () => {
  test("POST /create main goal", async () => {
    const response = await makeRequest("post", "/mainGoal", tempData);

    expect(response.status).toBe(200);

    const createdGoal = response.body.message;
    expect(createdGoal._id).not.toBe(""); // Has MongoDB ID
    expect(createdGoal.title).toBe("Main Goal Title"); // Created with default
  });

  test("POST /can't create empty goal", async () => {
    const response = await makeRequest("post", "/mainGoal", {});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid request body or empty title");
  });

  test("POST /can't create empty goal", async () => {
    const { title, ...tempDataWithoutTitle } = tempData;

    const response = await makeRequest(
      "post",
      "/mainGoal",
      tempDataWithoutTitle
    );

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid request body or empty title");
  });
});

describe("Main Goals data retrieved", () => {
  test("GET /connect to Main Goal Collection", async () => {
    const response = await makeRequest("get", "/mainGoal");

    expect(response.status).toBe(200);
  });

  test("GET /get user goals", async () => {
    const response = await makeRequest("get", "/mainGoal");

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe("Main Goal Title");
  });

  test("GET /get specific goals", async () => {
    const response = await makeRequest("get", "/mainGoal");
    expect(response.status).toBe(200);

    const goalId = response.body[0]._id;

    const goal = await makeRequest("get", `/mainGoal/${goalId}`);

    expect(goal.status).toBe(200);
    expect(goal.body.title).toBe("Main Goal Title");
    expect(goal.body._id).toBe(goalId);
  });

  test("GET /get correct user goal", async () => {
    const response = await makeRequest("get", "/mainGoal");
    expect(response.status).toBe(200);

    const goalId = response.body[0]._id;
    const userId = response.body[0].userId;

    const goal = await makeRequest("get", `/mainGoal/${goalId}`);
    expect(goal.status).toBe(200);
    expect(goal.body._id).toBe(goalId);
    expect(goal.body.userId).toBe(userId);
  });

  test("GET /can't fetch non-existent goals", async () => {
    const goal = await makeRequest("get", `/mainGoal/12345`);
    expect(goal.status).toBe(404);
  });

  // User can't get another user goal
  test("GET /user can't get other user goals", async () => {
    // create a user
    const signupResponse = await request(app).post("/signup").send({
      username: "anothermain",
      email: "anothermain@testing.com",
      password: "testpassword",
    });

    expect(signupResponse.status).toBe(200);

    // sign in user
    const signinResponse = await request(app).post("/signin").send({
      email: "anothermain@testing.com",
      password: "testpassword",
    });

    expect(signinResponse.status).toBe(200);

    // get jwt for making a new request
    const tempToken = signinResponse.header["set-cookie"];

    // get another user goal id
    const anotherUserGoal = await makeRequest(`get`, "/mainGoal");
    expect(anotherUserGoal.status).toBe(200);
    const anotherUserGoalId = anotherUserGoal.body[0]._id;


    // attempt to get another user goal with another user id
    const getAnotherUserGoal = await request(app)
      .get(`/mainGoal/${anotherUserGoalId}`)
      .set("Cookie", tempToken);
    expect(getAnotherUserGoal.body).toEqual({});
  });
});

describe("Updating Main Goals", () => {
  test("PUT /correctly updates the Main Goal", async () => {
    const createResponse = await makeRequest("post", "/mainGoal", tempData);
    const createdGoalId = createResponse.body.message._id;

    expect(createResponse.status).toBe(200);

    const updateResponse = await makeRequest(
      "put",
      `/mainGoal/${createdGoalId}`,
      { title: "New Title" }
    );

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toBe("New Title");
  });

  test("PUT /goal doesn't exist", async () => {
    const createResponse = await makeRequest("post", "/mainGoal", tempData);

    expect(createResponse.status).toBe(200);

    const updateResponse = await makeRequest("put", `/mainGoal/12345`, {
      title: "Another new title",
    });

    expect(updateResponse.status).toBe(404);
  });
});

describe("Deleting Main Goals", () => {
  test("DELETE /delete endpoint connects", async () => {
    const response = await makeRequest("get", "/mainGoal");
    expect(response.status).toBe(200);

    const goalId = response.body[0]._id;

    const deletedGoal = await makeRequest("delete", `/mainGoal/${goalId}`);
    expect(deletedGoal.status).toBe(200);
  });

  test("DELETE /delete correct goal", async () => {
    const response = await makeRequest("get", "/mainGoal");
    expect(response.status).toBe(200);

    const goalId = response.body[0]._id;

    const deletedGoal = await makeRequest("delete", `/mainGoal/${goalId}`);
    expect(deletedGoal.status).toBe(200);

    const checkGoal = await makeRequest("get", `/mainGoal/${goalId}`);
    expect(checkGoal.status).toBe(404);
  });

  test("DELETE /can't delete non-existent goals", async () => {
    const deletedGoal = await makeRequest("delete", `/mainGoal/12345}`);
    expect(deletedGoal.status).toBe(404);
  });

  test("User can't delete other user's goal", async () => {
    // Sign in with the new user
    const signinResponse = await request(app).post("/signin").send({
      email: "anothermain@testing.com",
      password: "testpassword",
    });
  
    expect(signinResponse.status).toBe(200);

    const otherTempToken = signinResponse.header["set-cookie"];

    // get another user goal
    const anotherUserGoal = await makeRequest(`get`, "/mainGoal");
    expect(anotherUserGoal.status).toBe(200);
    const anotherUserGoalId = anotherUserGoal.body[0]._id;
  
    // Try to delete the first user's goal using the other user's credentials
    const deleteResponse = await request(app)
      .delete(`/mainGoal/${anotherUserGoalId}`)
      .set("Cookie", otherTempToken);
  
    expect(deleteResponse.status).toBe(404);
  });
  
});
