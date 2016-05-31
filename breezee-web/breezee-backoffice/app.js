/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

global.config = require('./config.js');
global.tool = require('./utils/tool');

var routes = require('./routes/index');
var viewRoutes = require('./routes/view');
var dataRoutes = require('./routes/data');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('trust proxy', true);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    name: 'breezee.sid',
    saveUninitialized: true,
    cookie: {maxAge: 1800000}
}));

app.use('/', routes);
app.use('/view', viewRoutes);
app.use('/api', dataRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (err.status == 404 || err.message.indexOf('Failed to lookup view') > -1) {
        res.render(req.session.endType + '/notFound', {
            message: err.message,
            error: err
        });
    } else if (err.status == 401) {
        res.render(req.session.endType + '/forbid', {
            message: err.message,
            error: err
        });
    } else {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    }
});

module.exports = app;
