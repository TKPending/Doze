const express = require("express");
const router = express.Router();
const passport = require('passport') 
const { signUp, signIn, signUpWithFacebook } = require("../controllers/goalsControllers");
// const { signUpWithFacebook } = require("../controllers/goalControllers");

// Authentication
router.post("/signup", signUp);
router.post("/signin", signIn);


// Facebook Authentication
router.post("/signupfacebook", signUpWithFacebook);

// router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: [ 'email', 'user_location' ]
}));
// router.get('/auth/facebook', () => {
//   console.log("Hello Facebook")
// })
router.get('/oauth2/redirect/facebook', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/signup'
}), (req, res) => {
  res.cookie("auth", JSON.stringify(req.user));
  signUpWithFacebook(req, res);
});

router.get("/google", passport.authenticate('google', {scope: ["profile"]}));



// // Main Goals
// router.post("/mainGoal");
// router.get("/mainGoal");
// router.put("/mainGoal");
// router.delete("/mainGoal");

// // Sub Goals
// router.post("/subGoal");
// router.get("/subGoal");
// router.put("/subGoal");
// router.delete("/subGoal");


// // Header Data - Header title, quote and background
// router.post("/headerData");
// router.get("/headerData");
// router.put("/headerData");

module.exports = router;
