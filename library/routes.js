'use strict';

let request = require('request');

module.exports = (app, passport) => {
    app.get('/', (req, res) => {
        res.render('index', {user: req.user});
    });

    // Routing system with "ensureAuthenticated" middleware
    // that provide any resource protection.
    app.get('/account', ensureAuthenticated, (req, res) => {
        res.render('account', {
            user: req.user,
            friends: req.session.friends
        });
    });

    app.get('/login', (req, res) => {
        res.render('login', { user: req.user });
    });

    app.get('/auth/vk', passport.authenticate('vkontakte'),
        (req, res) => {});

    app.get('/auth/vk/callback',
        passport.authenticate('vkontakte', { failureRedirect: '/login' }),
        (req, res) => {
            // Request to get user's 5 random friends
            request(`https://api.vk.com/method/friends.get?user_id=`+
                `${req.user.id}&order=random&count=5&fields=domain&v=5.53`,
                (err, response, body) => {
                    if (!err && response.statusCode == 200) {
                        req.session.friends = JSON.parse(body);
                        if (req.session.friends) res.redirect('/account');
                    }
            });
        });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

//  Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
}