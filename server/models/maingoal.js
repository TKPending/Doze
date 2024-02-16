const mongoose = require("mongoose");

const subGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  mainGoal: {
    type: String,
    required: false, // Default = Untitled
  },
  tags: [
      {text: {
        type: String,
        required: false
      },
      colour: {
        type: String,
        required: false
      }}
  ],
  description: {
    type: String,
    required: false,
  },
});

const mainGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  dateCreated: {
    type: String,
    required: false,
  },
  maxDate: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
  tagColours: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
  },
  subGoals: [subGoalSchema],
});

module.exports = mongoose.model("MainGoals", mainGoalSchema);
