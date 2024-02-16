const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  signOut,
} = require("../controllers/goalsControllers");
const passport = require("passport");
const { dashboardHeaderData, updateDashboardTitle, updateDashboardQuote, updateDashboardBackground } = require("../controllers/headerControllers");

// Authentication
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get(
  "/user",
  passport.authenticate(["jwt"], { session: false }),
  getUser
);
router.post("/signout", signOut);

// Main Goals
router.post("/mainGoal");
router.get("/mainGoal");
router.put("/mainGoal");
router.delete("/mainGoal");

// Sub Goals
router.post("/subGoal");
router.get("/subGoal");
router.put("/subGoal");
router.delete("/subGoal");

// Header Data - Header title, quote and background
router.get("/headerData", dashboardHeaderData);
router.patch("/headerData/updateBackground", updateDashboardBackground);
router.patch("/headerData/updateTitle", updateDashboardTitle);
router.patch("/headerData/updateQuote", updateDashboardQuote);

module.exports = router;
