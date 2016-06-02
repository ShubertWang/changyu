/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

var router = require('express').Router();
var api = require('../utils/api');

router.all('*', api.apiAuthentication);

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    console.log('data::' + req.path, Date.now());
    next();
});

router.use('/login', function (req, res, next) {
    req.session = req.session || {};
    req.session.userData = {
        userCode: 1,
        userName: "silence@breezee.org"
    };
    res.json({success: true});
});

router.use('/', function (req, res, next) {
    res.json({success: true});
});

module.exports = router;