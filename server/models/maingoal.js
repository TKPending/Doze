const mongoose = requrie("mongoose");

const subGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  mainGoal: {
    type: String,
    required: true, // Default = Untitled
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
});

const mainGoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  maxDate: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
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
