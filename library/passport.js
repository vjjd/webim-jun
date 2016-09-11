'use strict';

const VKontakteStrategy = require('passport-vkontakte').Strategy;

// configure VK strategy
let config = require('../config');
let vk = new VKontakteStrategy(
    {
        clientID:    config.passportOptions.clientID,
        clientSecret: config.passportOptions.clientSecret,
        callbackURL:  `https://${process.env.HOST || config.host}:`+
        `${process.env.PORT || config.port}/auth/vk/callback`
    },
    function myVerifyCallbackFn(accessToken, refreshToken, profile, done) {
        process.nextTick(() => done(null, profile));
    }
);

// Passport session setup
module.exports = (passport) => {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(vk);
};