#!/bin/env node
'use strict';

// Deps
let express     = require('express');
let bodyParser  = require('body-parser');
let pug         = require('pug');
let config      = require('./config');
let path        = require('path');

// Auth
let passport = require('passport');
require('./library/passport')(passport);

let app = express();

// configure Express
app.locals.basedir = './public';
app
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'pug')
    .use(express.static('public'))
    .use(bodyParser.urlencoded({ extended: false }))
    .use(require('express-session')({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false
    }))
    .use(passport.initialize())
    .use(passport.session());

// Routing
require('./library/routes')(app, passport);

app.listen(process.env.PORT || config.port, () => {
    console.log(`Server listening on https://${config.host}:${config.port}`)
});