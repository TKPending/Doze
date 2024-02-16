const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  getUser,
  signOut,
} = require("../controllers/goalsControllers");
const {
   addSubGoal,
   getAllSubGoals,
    editSubGoal,
     deleteSubGoal 
    } = require("../controllers/subGoalController");
const passport = require("passport");

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
router.post("/maingoals/:id/subgoals", addSubGoal);
router.get("/maingoals", getAllSubGoals);
router.put("/maingoals/:id/subgoals/:id", editSubGoal);
router.delete("/maingoals/:id/subgoals/:id", deleteSubGoal);

// Header Data - Header title, quote and background
router.post("/headerData");
router.get("/headerData");
router.put("/headerData");

module.exports = router;
