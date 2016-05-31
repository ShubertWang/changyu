/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

module.exports = {

    order: function (req, res, callback) {
        callback({a: 'aaa'});
    },
    planList: function (req, res, callback) {
        callback({templdate: 'planList'});
    }
};