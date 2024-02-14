require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/goalsRoutes");
const PORT = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const passport = require('passport');
app.use(express.json());


app.use(cookieParser());
app.use(passport.initialize());
app.use(router);


//const morgan = require("morgan");
//const helmet = require("helmet");
//app.use(morgan);
//app.use(helmet());
// const createError = require('http-errors');
// const { User } = require('./models/user');
// const { v4: uuidv4 } = require('uuid');


const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));

  app.use(cors({
    credentials: true,
    origin: (origin, callback) => callback(null, true),
    optionSuccessStatus: 200
  }
  ));



// app.use('/auth/facebook', facebookRouter);

// app.get('/auth/facebook', passport.authenticate('facebook'))

// app.use('/auth/facebook/callback', passport.authenticate('facebook', {
//   failureRedirect: '/signin'
// }), (req, res) => {
//   res.cookie('auth', JSON.stringify(req.user));
//   res.redirect('/');
// });

// app.get('auth/facebook/callback', passport.authenticate('facebook', {
//   failureRedirect: '/signin'
// }), (req, res) => {
//   res.cookie('auth', JSON.stringify(req.user));
//   res.send('Authenticated via Facebook');
//   res.redirect('/');
// })





app.listen(PORT, () => {
  console.log("Server is running on PORT 3001");
});


