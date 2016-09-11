'use strict';

const VKontakteStrategy = require('passport-vkontakte').Strategy;

// configure VK strategy
let config = require('../config');
let vk = new VKontakteStrategy(
    {
        clientID:    config.clientID,
        clientSecret: config.clientSecret,
        callbackURL:  config.webCallbackURI || config.localCallbackURI
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