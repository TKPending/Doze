require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/goalsRoutes");
const PORT = process.env.PORT || 3001;
const cookieParser = require("cookie-parser");
const passport = require("passport");
require("./controllers/passport");

//const morgan = require("morgan");
//const helmet = require("helmet");
//app.use(morgan);
//app.use(helmet());
// const createError = require('http-errors');
// const { User } = require('./models/user');
// const { v4: uuidv4 } = require('uuid');

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

app.use(cookieParser());
app.use(passport.initialize());

app.use(
  cors({
    credentials: true,
    origin: ["https://doze-pink.vercel.app", "http://localhost:3000"],
  })
);
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log("Doze backend server is running!");
  console.log(`Running on ${PORT}`);
});
