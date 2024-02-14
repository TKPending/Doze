require("dotenv").config();

const axios = require("axios");
const createError = require("http-errors");
const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');



passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_SECRET_KEY,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        }, 
        async function verify(accessToken, refreshToken, profile, cb) {
            console.log("Hello World")
            try {
                
                let user = await User.findOne({ accountId: profile.id });
            
            if (!user) {
                console.log('Adding new facebook user to DB..');
                user = new User({
                    accountId: profile.id,
                    email: profile.email,
                    name: profile.displayName,
                    provider: profile.provider,
                });
                await user.save();
                console.log(user);
                return cb(null, user);
            } else {
                console.log('Facebook User already exists in DB..');
                console.log(user);
                return cb(null, user);
            }
        } catch (error) {
            console.log(error);
            return cb(error);
        }
        }
    )
);


