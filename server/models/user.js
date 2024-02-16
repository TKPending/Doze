const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  header_data: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Header"
  }
});

module.exports = mongoose.model("User", userSchema);
