require("dotenv").config();
const axios = require("axios");
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
    res.clearCookie("jwt");
    res.json({ message: "Sign out" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.addOneGoal = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const user = await User.findOne({ email: userEmail });
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + 3);

    const goal = new MainGoals({
      title: req.body.title,
      startDate: req.body.startDate,
      maxDate: currentDate,
      icon: req.body.icon,
      date: req.body.date,
      status: req.body.status,
      tags: req.body.tags,
      description: req.body.description,
      userId: req.body.userId,
    });
    await goal.save();
    res.json({ message: goal });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
