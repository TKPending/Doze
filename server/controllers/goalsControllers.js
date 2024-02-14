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

exports.signUpWithFacebook = async (req, res, next) => {
  try {
    const user = await User.findOne({ accountId: req.user.id });
    if (!user) {
      const user = new User({
        accountId: req.user.id,
        email: req.user.email,
        name: req.user.displayName,
        provider: req.user.provider,
      });
      await user.save();
    }
    res.cookie("auth", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Authenticated via Facebook" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
