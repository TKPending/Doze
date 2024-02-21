require("dotenv").config();
const axios = require("axios");
const createError = require("http-errors");
const MainGoals = require("../models/maingoal");

exports.addSubGoal = async (req, res, next) => {
  try {
    const mainGoalId = req.body.mainGoalId;
    const mainGoal = await MainGoals.findById(mainGoalId);

    if (!mainGoal) {
      return next(createError(404, "The main goal not found"));
    }
    mainGoal.subGoals.push({
      title: req.body.title,
      icon: req.body.icon,
      status: req.body.status,
      dateCreated: req.body.dateCreated,
      mainGoalId: req.body.mainGoalId,
      mainGoal: req.body.mainGoal,
      tags: req.body.tags,
      tagColours: req.body.tagColours,
      description: req.body.description,
    });
    await mainGoal.save();
    res.json({ message: "Sub goal added" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.getSubGoals = async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const mainGoals = await MainGoals.find({ userId: userId });
    res.json(mainGoals);
    if (!mainGoals) {
      return next(createError(404, "No goals found"));
    }
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.editSubGoal = async (req, res, next) => {
  try {
    const subGoalId = req.params.id;
    const mainGoalId = req.params.mainGoalId;
    const mainGoal = await MainGoals.findById(mainGoalId);

    if (!mainGoal) {
      return next(createError(404, "The main goal not found"));
    }

    const goalSubGoal = mainGoal.subGoals.id(subGoalId);

    if (!goalSubGoal) {
      return next(createError(404, "Sub goal not found"));
    }
    if (!req.body) {
      await goalSubGoal.deleteOne();
    } else {
      goalSubGoal.title = req.body.title;
      goalSubGoal.icon = req.body.icon;
      goalSubGoal.status = req.body.status;
      goalSubGoal.mainGoalId = req.body.mainGoalId;
      goalSubGoal.mainGoal = req.body.mainGoal;
      goalSubGoal.dateCreated = req.body.dateCreated;
      goalSubGoal.tags = req.body.tags;
      goalSubGoal.tagColours = req.body.tagColours;
      goalSubGoal.description = req.body.description;
    }
    await mainGoal.save();
    res.json({ message: "Sub goal edited" });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteSubGoal = async (req, res, next) => {
  try {
    const subGoalId = req.params.id;
    const mainGoalId = req.params.mainGoalId;
    const mainGoal = await MainGoals.findById(mainGoalId);

    if (!mainGoal) {
      return next(createError(404, "The main goal not found with that id"));
    }

    const goalSubGoal = mainGoal.subGoals.id(subGoalId);

    if (!goalSubGoal) {
      return next(createError(404, "Sub Goal not found with that id"));
    }

    const deletedSubGoal = await MainGoals.findByIdAndUpdate(
      mainGoalId,
      { $pull: { subGoals: { _id: subGoalId } } },
      { new: true }
    );

    await mainGoal.save();

    if (!deletedSubGoal) {
      return next(
        createError(404, "Sub Goal not found with that id to delete")
      );
    }
    res.json({ result: true });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteAllSubGoalsFromStages = async (req, res, next) => {
  try {
    const stage = req.params.stage;
    const allMainGoals = await MainGoals.find({ userId: req.user._id });

    if (!allMainGoals) {
      return next(createError(404, "Can't find all Main Goals"));
    }

    for (const goal of allMainGoals) {
      const mainGoalId = goal.id;
      const subGoalsArray = goal.subGoals;

      for (const subGoal of subGoalsArray) {
        if (subGoal.status === stage) {
          const deleteSubGoal = await MainGoals.findByIdAndUpdate(
            mainGoalId,
            { $pull: { subGoals: { _id: subGoal._id } } },
            { new: true }
          );

          if (!deleteSubGoal) {
            return next(createError(404, `Problem deleting ${subGoal.title}`));
          }
        }
      }
    }

    res.json({
      message: `Sub goals with status ${stage} deleted successfully`,
    });
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.deleteAllSubGoalsFromMainGoal = async (req, res, next) => {
  try {
  } catch (err) {
    return next(createError(500, err.message));
  }
};
