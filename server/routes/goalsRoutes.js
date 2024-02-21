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
  getSubGoals,
} = require("../controllers/goalsControllers");
const {
   addSubGoal,
    editSubGoal,
     deleteSubGoal,

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
router.post("/mainGoal/:id/subGoals", addSubGoal);

router.get("/mainGoal",
 passport.authenticate(["jwt"], { session: false }),
 getSubGoals);

router.put("/mainGoal/:mainGoalId/subGoals/:id",
 passport.authenticate(["jwt"], { session: false }),
  editSubGoal);

router.delete("/mainGoal/:mainGoalId/subGoals/:id", 
passport.authenticate(["jwt"], { session: false }),
deleteSubGoal);

// Header Data - Header title, quote and background
router.get("/headerData", dashboardHeaderData);
router.patch("/headerData/updateBackground", updateDashboardBackground);
router.patch("/headerData/updateTitle", updateDashboardTitle);
router.patch("/headerData/updateQuote", updateDashboardQuote);

module.exports = router;
