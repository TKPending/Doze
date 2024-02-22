require("dotenv").config();

const request = require("supertest");
const app = require("../../testApp");
const mongoose = require("mongoose");
const User = require("../../server/models/user");

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await User.deleteMany({ email: "test@example.com" });
  await User.deleteMany({ email: "anothertest@example.com" });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Authenticating Tests", () => {
  // Sign up process
  test("POST /signup should create a new user", async () => {
    const response = await request(app).post("/signup").send({
      username: "testuser",
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sign up");
  });

  // Invalid Sign up process
  test("POST /signup with invalid email should return an error", async () => {
    const response = await request(app).post("/signup").send({
      username: "invaliduser",
      email: "invalidemail",
      password: "testpassword",
    });

    expect(response.status).not.toBe(200);
    expect(response.body.message).toBe(undefined); // Adjust this based on your error message
  });

  // Valid Sign in process
  test("POST /signin should sign in the user", async () => {
    const response = await request(app).post("/signin").send({
      email: "test@example.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Sign in");
  });

  // Inalid Sign in process User doesn't exist
  test("POST /signin with incorrect credentials should return an error", async () => {
    const response = await request(app).post("/signin").send({
      email: "nonexistent@example.com",
      password: "incorrectpassword",
    });

    expect(response.status).not.toBe(200);
    expect(response.body.message).toBe(undefined);
  });

  // Get user info process
  // test("GET /user should get user information", async () => {
  //   // Create user
  //   const signupResponse = await request(app).post("/signup").send({
  //     username: "anothertestuser",
  //     email: "anothertest@example.com",
  //     password: "testpassword",
  //   });

  //   expect(signupResponse.status).toBe(200);

  //   // Sign in user
  //   const signinResponse = await request(app).post("/signin").send({
  //     email: "anothertest@example.com",
  //     password: "testpassword",
  //   });

  //   expect(signinResponse.status).toBe(200);

  //   // Get User
  //   const userResponse = await request(app).get("/user");

  //   expect(userResponse.status).toBe(200);
  //   expect(userResponse.body.username).toBe("anothertestuser");
  //   expect(userResponse.body.email).toBe("anothertest@example.com");
  // });
});