require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.signUp = async (req, res, next) => {
  try {
    const email = req.body.email;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (req.body.username == "") {
      return res.status(400).json({ error: 'Invalid username' });
    }

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
    return res.status(400).json({ error: "Failure to sign in. User doesn't exist" });
    // return next(createError(500, error.message));
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