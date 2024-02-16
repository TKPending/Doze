require("dotenv").config();
const axios = require("axios");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const MainGoals = require("../models/maingoal")


exports.addSubGoal = async (req, res, next) => {
    try {
        const goalId = '65ce28e540b706abff1737d0';
        const mainGoal = await MainGoals.findById(goalId);

        if (!mainGoal) {
            return next(createError(404, "The main goal not found"));
        }
        mainGoal.subGoals.push({
            title: req.body.title,
            icon: req.body.icon,
            status: req.body.status,
            mainGoal: req.body.mainGoal,
            tags: req.body.tags,
            tagColours: req.body.tagColours,
            description: req.body.description
        });
        await mainGoal.save();
        res.json({ message: "Sub goal added" });

    } catch (error) {
        return next(createError(500, error.message));
    }
    };


    exports.getAllSubGoals = async (req, res, next) => {
        try {
            const subGoals = await MainGoals.aggregate([
                {
                    $unwind: "$subgoals"
                },
                {
                    $project: {
                        mainGoalId: "$_id",
                        subgoal: "$subgoals"
                    }
                }
            ]);

            res.json(subGoals);
            
        } catch (err) {
            return next(createError(500, err.message));
        }
    }

    exports.editSubGoal = async (req, res, next) => {
        try {
            const subGoalId = '65ce365ad09fa95ac1616d81';
            const mainGoalId = '65ce28e540b706abff1737d0';
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
                goalSubGoal.mainGoal = req.body.mainGoal;
                goalSubGoal.tags = req.body.tags;
                goalSubGoal.tagColours = req.body.tagColours;
                goalSubGoal.description = req.body.description;
            }
            await mainGoal.save();
            res.json({ message: "Sub goal edited" });
        } catch (error) {
            return next(createError(500, error.message));

        }
    }

    exports.deleteSubGoal = async (req, res, next) => {
        try {
            const subGoalId = '65ce365ad09fa95ac1616d81'; 
            const mainGoalId = '65ce28e540b706abff1737d0';
            const mainGoal = await MainGoals.findById(mainGoalId);

            if (!mainGoal) {
                return next(createError(404, "The main goal not found with that id"));
            }

            const goalSubGoal = mainGoal.subGoals.id(subGoalId);

            if(!goalSubGoal) {
                return next(createError(404, "Sub Goal not found with that id"));
            }

            const deletedSubGoal = await MainGoals.findByIdAndDelete(goalSubGoal);

            if (!deletedSubGoal) {
                return next(createError(404, "Sub Goal not found with that id to delete"));
            }
            res.json({ result: true });
            } catch (error) {
                return next(createError(500, error.message));
            }
        }
    