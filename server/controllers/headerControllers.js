require("dotenv").config();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Header = require("../models/header");

const TITLE_DEFAULT = "12 Weeks Goals";
const QUOTE_DEFAULT =
  "In just 12 weeks, you can create a new habit that will last a lifetime.";
const HEADER_DEFAULT = `Enter URL has to end in (JPEG, JPG, PNG, BMP, SVG)`;


exports.dashboardHeaderData = async (req, res, next) => {
  try {
    if (!req.query.user) {
        console.log("Failure getting all data from header - Check DashboardClient!");
        return (next(createError(400, "invalid Request Body!")));
    }

    const username = req.query.user;
    const userDB = await User.findOne({username});

    if (!userDB) {
        console.log(`Couldn't find user ${username}!`);
    }

    if (!userDB.header_data) {
        console.log("New User Checking Dashboard!");
        const newHeaderData = new Header({
            dashboard_background: HEADER_DEFAULT,
            dashboard_title: TITLE_DEFAULT,
            dashboard_quote: QUOTE_DEFAULT
        });

        await newHeaderData.save();
        userDB.header_data = newHeaderData._id;

        await userDB.save();
    }

    const headerDB = await Header.findOne({_id: userDB.header_data.toString()});
    if (!headerDB) {
        console.log("Header Data Not Found!");
        res({
            dashboard_background: HEADER_DEFAULT,
            dashboard_title: TITLE_DEFAULT,
            dashboard_quote: QUOTE_DEFAULT
        })
    }

    res.send(headerDB);
  } catch (err) {
    return (next(createError(500, "invalid Request Body! (Dashboard Header)")));
  }
};

// headerControllers.js

exports.updateDashboardTitle = async (req, res, next) => {
  const request = req.body ? req.body : false;

  if (!request) {
    console.log("Invalid request sent to - UpdateDashboardTitle");
    return (next(createError(500, "invalid Request Body!")));
  }

  const { username, userInputValue } = request;

  try {
    const userDB = await User.findOne({ username });

    if (!userDB) {
      console.log(`Couldn't find user ${username}!`);
      return res.status(404).json({ error: "User not found" });
    }

    // Update the title in the header data
    const headerDB = await Header.findOne({ _id: userDB.header_data });

    if (!headerDB) {
        console.log(`Couldn't find header data for ${username}`);
        return;
    }
    headerDB.dashboard_title = userInputValue == "" ? TITLE_DEFAULT : userInputValue;
    await headerDB.save();
  } catch (err) {
    return (next(createError(500, "Internal Server Error! (Dashboard Title)")));
  }
};

exports.updateDashboardQuote = async (req, res, next) => {
  const request = req.body ? req.body : false;

  if (!request) {
    console.log("Invalid request sent to - UpdateDashboardQuote");
    return (next(createError(400, "Invalid Request Body!")));
  }

  const { username, userInputValue } = request;

  try {
    const userDB = await User.findOne({ username });

    if (!userDB) {
      console.log(`Couldn't find user ${username}!`);
      return (next(createError(400, "User not found!")));
    }

    // Update the quote in the header data
    const headerDB = await Header.findOne({ _id: userDB.header_data });

    if (!headerDB) {
        console.log(`Problem finding header data for ${username}`);
        return;
    }

    headerDB.dashboard_quote = userInputValue == "" ? QUOTE_DEFAULT : userInputValue;
    await headerDB.save();
  } catch (err) {
    return (next(createError(400, "Internal Server Error! (Dashboard Quote)")));
  }
};


exports.updateDashboardBackground = async (req, res, next) => {
  const request = req.body ? req.body : false;

  if (!request) {
    console.log("Invalid request sent to - UpdateDashboardBackground");
    return (next(createError(400, "Invalid Request Body!")));
  }

  const {username, userInputValue, validHeader} = request;

  try {
    const userDB = await User.findOne({ username });

    if (!userDB) {
      console.log(`Couldn't find user ${username}!`);
      return (next(createError(400, "User not found!")));
    }

    // Update the quote in the header data
    const headerDB = await Header.findOne({ _id: userDB.header_data });

    if (!headerDB) {
        console.log(`Problem finding header data for ${username}`);
        return;
    }

    headerDB.dashboard_background = userInputValue == "" || !validHeader ? HEADER_DEFAULT : userInputValue;
    await headerDB.save();
  } catch (err) {
    return (next(createError(400, "Internal Server Error! (Dashboard Quote)")));
  }
};
