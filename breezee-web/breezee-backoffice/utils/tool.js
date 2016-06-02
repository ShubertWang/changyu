/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

var request = require('request');
var extend = require('extend');
var uuid = require('uuid');

/**
 * 工具类
 * @type {{send: module.exports.send, dateFormatter: module.exports.dateFormatter, padZero: module.exports.padZero}}
 */
module.exports = {

    /**
     * 发送请求
     * @param param 请求的参数
     * @param callback 回调方法
     */
    send: function (param, callback) {
        if (global.config.mockFlag) {
            try {
                var data = require("../mockService" + param.mockData + ".js");
                callback(null, null, data);
            } catch (e) {
                callback(e, null, data);
            }
        } else {
            var defaultParam = {
                json: {},
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Accept-Language": param.language || "zh"
                }
            };
            var _param = extend(true, {}, defaultParam, param);
            request(_param, callback);
        }
    },

    /**
     * 日期格式化
     * @param date 日期
     * @param format 格式
     * @returns {*} 格式化后的字符串值
     */
    dateFormatter: function (date, format) {
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(),      //day
            "h+": date.getHours(),     //hour
            "m+": date.getMinutes(),   //minute
            "s+": date.getSeconds(),   //second
            "w+": "天一二三四五六".charAt(date.getDay()),   //week
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    },

    /**
     * 在指定字符前面补0，以达到指定的长度
     * @param str 需要补0的字符串
     * @param length 需要达到的长度
     * @returns {string} 补0后的字符串
     */
    padZero: function (str, length) {
        var newStr = str + "";
        while (newStr.length < length) {
            newStr = "0" + newStr;
        }
        return newStr;
    },

    /**
     * 获取请求端的类型
     * @param str
     * @returns {string}
     */
    endType: function (str) {
        return /mobile/.test(str) ? "mobile" : "desktop";
    },

    /**
     * 获取随机串
     */
    uuid: function () {
        return uuid.v4();
    }

};