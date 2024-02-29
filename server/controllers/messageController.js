require("dotenv").config();
const createError = require("http-errors");
const Message = require("../models/message");

exports.sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message, date } = req.body;

    console.log(name);

    const messageToSend = new Message({
      name,
      email,
      subject,
      message,
      date,
    });

    await messageToSend.save();

    return res.json({ success: "Message was sent" });
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};
