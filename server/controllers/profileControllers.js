require("dotenv").config();
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.changeEmail = async (req, res, next) => {
  try {
    const currentEmail = req.user.email;

    const currentEmailReq = req.body.currentEmail;

    const newEmail = req.body.newEmail;

    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findOne({ email: currentEmailReq });
    if (currentEmail === currentEmailReq) {
      user.email = newEmail;
      await user.save();
    } else {
      return next(createError(400, "Current email doesn't match"));
    }

    res.json({ message: "Email changed" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const currentPasswordReq = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const userId = req.user._id;
    const user = await User.findById(userId);
    const result = await bcrypt.compare(currentPasswordReq, user.password);

    if (result) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      return next(createError(400, "Current password doesn't match"));
    }

    res.json({ message: "Password changed" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(createError(404, "No user with that id"));
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      path: "/",
      secure: true,
    });
    res.json({ message: "Deleted" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
