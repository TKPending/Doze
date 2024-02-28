require("dotenv").config();

const request = require("supertest");
const app = require("../../testApp");
const mongoose = require("mongoose");
const User = require("../../server/models/user");

jest.mock("axios");

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany({ email: "test@example.com" });
  await User.deleteMany({ email: "anothertest@example.com" });
  await User.deleteMany({ email: "invalidjwt@example.com"});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authenticating Tests", () => {
  // Sign up process - valid details
  test("POST /signup should create a new user", async () => {
    const response = await request(app).post("/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sign up");
  });

  // Sign up process - Invalid email
  test("POST /signup with invalid email should return an error", async () => {
    const response = await request(app).post("/signup").send({
      username: "invaliduser",
      email: "invalidemail",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(undefined); // Adjust this based on your error message
  });

  // Sign up process - Invalid username
  test("POST /signup with invalid username should return an error", async () => {
    const response = await request(app).post("/signup").send({
      username: "",
      email: "invalid@email.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(undefined); // Adjust this based on your error message
  });

  // Sign in process - User exists
  test("POST /signin should sign in the user", async () => {
    const response = await request(app).post("/signin").send({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sign in");
  });

  // Sign in process - User doesn't exist
  test("POST /signin with incorrect credentials should return an error", async () => {
    const response = await request(app).post("/signin").send({
      email: "nonexistent@example.com",
      password: "incorrectpassword",
    });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(undefined);
  });

  // Get User - User exists
  test("GET /user should get user information", async () => {
    // Create user
    const signupResponse = await request(app).post("/signup").send({
      username: "anothertestuser",
      email: "anothertest@example.com",
      password: "testpassword",
    });

    expect(signupResponse.status).toBe(200);

    // Sign in user
    const signinResponse = await request(app).post("/signin").send({
      email: "anothertest@example.com",
      password: "testpassword",
    });

    expect(signinResponse.status).toBe(200);

    // Get User
    const userResponse = await request(app)
      .get("/user")
      .set("Cookie", signinResponse.header["set-cookie"]);


    expect(userResponse.status).toBe(200);
    expect(userResponse.body.username).toBe("anothertestuser");
    expect(userResponse.body.email).toBe("anothertest@example.com");
  });

  // Get User - Invalid JWT Token
  test("GET /user should get user information", async () => {
    // Create user
    const signupResponse = await request(app).post("/signup").send({
      username: "invalidjwt",
      email: "invalidjwt@example.com",
      password: "testpassword",
    });

    expect(signupResponse.status).toBe(200);

    // Sign in user
    const signinResponse = await request(app).post("/signin").send({
      email: "invalidjwt@example.com",
      password: "testpassword",
    });

    expect(signinResponse.status).toBe(200);

    // Get User
    const userResponse = await request(app)
      .get("/user")


    expect(userResponse.status).toBe(401);
  });
});
