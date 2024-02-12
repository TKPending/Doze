const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/goalsControllers");

// Authentication
router.post("/signup", signUp);
router.post("/signin", signIn);

// Main Goals
router.post("/mainGoal",);
router.get("/mainGoal",);
router.put("/mainGoal",);
router.delete("/mainGoal",);

// Sub Goals
router.post("/subGoal",);
router.get("/subGoal",);
router.put("/subGoal",);
router.delete("/subGoal",);


// Header Data - Header title, quote and background
router.post("/headerData",);
router.get("/headerData",);
router.put("/headerData",);

module.exports = router;
