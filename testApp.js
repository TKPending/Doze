const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./server/routes/routes");
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./server/controllers/passport");

const app = express();

mongoose.connect(process.env.TEST_MONGODB_URI);

app.use(cookieParser());
app.use(passport.initialize());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(router);

module.exports = app;