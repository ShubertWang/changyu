/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

var router = require('express').Router();
var request = require('request');
var api = require('../utils/api');
var log4js = require('log4js');
var logger = log4js.getLogger("data");

router.all('*', api.apiAuthentication);

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
    logger.info('data::' + req.path, Date.now());
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

router.use('*', function(req, res, next) {
    try{
        var service, queryData, bodyData,
            uri, method;

        //根据映射关系转换url
        var uriUUID = req.originalUrl.match(/\/data\/([\d\w-]*)@?/)[1];
        var realUri = api.get(uriUUID);
        if(realUri){
            req.originalUrl.replace(uriUUID, realUri);
        }

        //添加service路径
        uri = global.service.hostname + req.originalUrl.replace('/data', global.service.contextPath);

        //获取数据
        bodyData = req.body;
        logger.debug('===================== data ====================');
        logger.debug(bodyData);
        logger.debug('===================== data ====================');

        request({
            method : req.method,
            uri : uri,
            json : bodyData,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Language": req.headers["accept-language"] && req.headers["accept-language"].substr(0,2)
            }
        }, function(error, response, body){
            res.send(body);
        })
    }catch (e){
        logger.error(e);
        throw e;
    }
});

module.exports = router;