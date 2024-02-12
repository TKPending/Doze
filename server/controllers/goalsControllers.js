require("dotenv").config();
const axios = require("axios");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.signUp = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body.email, req.body.password);
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
    res.json({ message: "Sign in" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
