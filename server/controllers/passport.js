require("dotenv").config();

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");

const getUserIdFromReq = (req) => {
  const cookie = req.cookies.jwt;
  return cookie;
};

const jwtStrategyOptions = {
  jwtFromRequest: getUserIdFromReq,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

passport.use(
  new JwtStrategy(jwtStrategyOptions, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  })
);
