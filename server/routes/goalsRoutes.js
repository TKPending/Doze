const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  signOut,
  addOneGoal,
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
router.post(
  "/mainGoal",
  passport.authenticate(["jwt"], { session: false }),
  addOneGoal
);
router.get("/mainGoal/:id", passport.authenticate(["jwt"], { session: false }));
router.put("/mainGoal/:id", passport.authenticate(["jwt"], { session: false }));
router.delete("/mainGoal/:id");

// Sub Goals
router.post("/subGoal");
router.get("/subGoal");
router.put("/subGoal");
router.delete("/subGoal");

// Header Data - Header title, quote and background
router.get("/headerData", passport.authenticate(["jwt"], { session: false }), dashboardHeaderData);
router.patch("/headerData/updateBackground", passport.authenticate(["jwt"], { session: false }), updateDashboardBackground);
router.patch("/headerData/updateTitle", passport.authenticate(["jwt"], { session: false }), updateDashboardTitle);
router.patch("/headerData/updateQuote", passport.authenticate(["jwt"], { session: false }), updateDashboardQuote);

module.exports = router;
