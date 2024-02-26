require("dotenv").config();
const createError = require("http-errors");
const MainGoals = require("../models/maingoal");

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
    res.json(addGoalComplition(goal));
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

const addGoalComplition = (goal) => {
  const allSubGoalsCount = goal.subGoals.length;
  const completedSubGoals = goal.subGoals.filter((subGoal) => {
    return subGoal.status === "Complete";
  });
  const completedSubGoalsCount = completedSubGoals.length;
  const result = Math.floor((completedSubGoalsCount / allSubGoalsCount) * 100);
  return { ...goal.toObject(), completed: result };
};

exports.getAllMainGoalsForDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const goals = await MainGoals.find({ userId: userId });
    if (!goals) {
      return next(createError(404, "No goals were found"));
    }

    const goalsWithComplition = goals.map(addGoalComplition);
    res.json(goalsWithComplition);
  } catch (error) {
    return next(createError(500, error.message));
  }
};
