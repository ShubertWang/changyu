/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
