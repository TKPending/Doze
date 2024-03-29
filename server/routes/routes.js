const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  signOut,
} = require("../controllers/authenticationControllers");
const {
  changeEmail,
  changePassword,
  deleteAccount,
} = require("../controllers/profileControllers");
const {
  addOneGoal,
  getOneMainGoal,
  changeOneMainGoal,
  deleteOneMainGoal,
  getAllMainGoalsForDashboard,
} = require("../controllers/mainGoalsControllers");
const {
  addSubGoal,
  editSubGoal,
  deleteSubGoal,
  getSubGoals,
  deleteAllSubGoalsFromStages,
  deleteAllSubGoalsFromMainGoal,
} = require("../controllers/subGoalControllers");
const passport = require("passport");
const {
  dashboardHeaderData,
  updateDashboardTitle,
  updateDashboardQuote,
  updateDashboardBackground,
} = require("../controllers/headerControllers");
const { sendMessage } = require("../controllers/messageController")

// Authentication
router.post("/signup", signUp);
router.post("/signin", signIn);
router.get(
  "/user",
  passport.authenticate(["jwt"], { session: false }),
  getUser
);
router.post("/signout", signOut);

//Profile
router.post(
  "/user/changeEmail",
  passport.authenticate(["jwt"], { session: false }),
  changeEmail
);
router.post(
  "/user/changePassword",
  passport.authenticate(["jwt"], { session: false }),
  changePassword
);
router.delete(
  "/user",
  passport.authenticate(["jwt"], { session: false }),
  deleteAccount
);

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

//For getting all goals for the Dashboard
router.get(
  "/mainGoal",
  passport.authenticate(["jwt"], { session: false }),
  getAllMainGoalsForDashboard
);
// Sub Goals
router.post("/mainGoal/:id/subGoals", addSubGoal);

router.get(
  "/mainGoal",
  passport.authenticate(["jwt"], { session: false }),
  getSubGoals
);

router.put(
  "/mainGoal/:mainGoalId/subGoals/:id",
  passport.authenticate(["jwt"], { session: false }),
  editSubGoal
);

router.delete(
  "/mainGoal/:mainGoalId/subGoals/:id",
  passport.authenticate(["jwt"], { session: false }),
  deleteSubGoal
);

router.delete(
  "/mainGoal/stages_delete_all/:stage",
  passport.authenticate(["jwt"], { session: false }),
  deleteAllSubGoalsFromStages
);

router.delete(
  "/mainGoal/:mainGoalId/mainGoal_delete_all",
  passport.authenticate(["jwt"], { session: false }),
  deleteAllSubGoalsFromMainGoal
);

// Header Data - Header title, quote and background
router.get(
  "/headerData",
  passport.authenticate(["jwt"], { session: false }),
  dashboardHeaderData
);
router.patch(
  "/headerData/updateBackground",
  passport.authenticate(["jwt"], { session: false }),
  updateDashboardBackground
);
router.patch(
  "/headerData/updateTitle",
  passport.authenticate(["jwt"], { session: false }),
  updateDashboardTitle
);
router.patch(
  "/headerData/updateQuote",
  passport.authenticate(["jwt"], { session: false }),
  updateDashboardQuote
);

// Message
router.post("/message", sendMessage);

module.exports = router;
