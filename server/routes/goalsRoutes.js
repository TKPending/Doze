const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  signOut,
  addOneGoal,
  getOneMainGoal,
  changeOneMainGoal,
  deleteOneMainGoal,
} = require("../controllers/goalsControllers");
const {
   addSubGoal,
   getAllSubGoals,
    editSubGoal,
     deleteSubGoal 
    } = require("../controllers/subGoalController");
const passport = require("passport");
const {
  dashboardHeaderData,
  updateDashboardTitle,
  updateDashboardQuote,
  updateDashboardBackground,
} = require("../controllers/headerControllers");

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
router.get(
  "/mainGoal/:id",
  passport.authenticate(["jwt"], { session: false }),
  getOneMainGoal
);
router.put(
  "/mainGoal/:id",
  passport.authenticate(["jwt"], { session: false }),
  changeOneMainGoal
);
router.delete(
  "/mainGoal/:id",
  passport.authenticate(["jwt"], { session: false }),
  deleteOneMainGoal
);

// Sub Goals
router.post("/maingoals/:id/subgoals", addSubGoal);
router.get("/maingoals", getAllSubGoals);
router.put("/maingoals/:id/subgoals/:id", editSubGoal);
router.delete("/maingoals/:id/subgoals/:id", deleteSubGoal);

// Header Data - Header title, quote and background
router.get("/headerData", dashboardHeaderData);
router.patch("/headerData/updateBackground", updateDashboardBackground);
router.patch("/headerData/updateTitle", updateDashboardTitle);
router.patch("/headerData/updateQuote", updateDashboardQuote);

module.exports = router;
