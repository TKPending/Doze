require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const MainGoals = require("../models/maingoal");

exports.signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.json({ message: "Sign up" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return next(createError(404, "The user not found"));
    }
    const result = await bcrypt.compare(req.body.password, user.password);

    if (result) {
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.cookie("jwt", accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        sameSite: "None",
        path: "/",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    res.json({ message: "Sign in" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.getUser = async (req, res, next) => {
  try {
    res.json({ username: req.user.username, email: req.user.email });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.signOut = async (req, res, next) => {
  try {
    cookies.set('testtoken', {expires: Date.now()});
    res.json({ message: "Sign out" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.addOneGoal = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const maxDate = new Date(req.body.startDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    const goal = new MainGoals({
      title: req.body.title,
      startDate: req.body.startDate,
      maxDate: maxDate,
      icon: req.body.icon,
      status: req.body.status,
      tags: req.body.tags,
      description: req.body.description,
      userId: userId,
    });
    await goal.save();
    res.json({ message: goal });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.getOneMainGoal = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const mainGoalId = req.params.id;
    const goal = await MainGoals.findById(mainGoalId);

    if (goal.userId !== userId) {
      return next(createError(404, "No such goal"));
    }

    res.json(goal);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.changeOneMainGoal = async (req, res, next) => {
  try {
    const mainGoalId = req.params.id;
    const goal = await MainGoals.findById(mainGoalId);

    if (!goal) {
      return next(createError(404, "No such goal"));
    }
    const maxDate = new Date(req.body.startDate);
    maxDate.setMonth(maxDate.getMonth() + 3);

    goal.title = req.body.title;
    goal.startDate = req.body.startDate;
    goal.maxDate = maxDate;
    goal.icon = req.body.icon;
    goal.status = req.body.status;
    goal.tags = req.body.tags;
    goal.description = req.body.description;
    await goal.save();
    res.json(goal);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteOneMainGoal = async (req, res, next) => {
  try {
    const mainGoalId = req.params.id;
    const userId = req.user._id.toString();

    await MainGoals.deleteMany({
      _id: mainGoalId,
      userId: userId,
    });

    res.json({ message: "Ok" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.getAllMainGoalsForDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const goals = await MainGoals.find({ userId: userId });
    if (!goals) {
      return next(createError(404, "No goals were found"));
    }
    res.json(goals);
  } catch (error) {
    return next(createError(500, error.message));
  }
};
