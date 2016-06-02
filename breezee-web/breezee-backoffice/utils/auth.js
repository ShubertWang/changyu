/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

/**
 * 认证模块
 * @type {{checkLogin: module.exports.checkLogin, requireAuthentication: module.exports.requireAuthentication, apiAuthentication: module.exports.apiAuthentication, loadUser: module.exports.loadUser}}
 */
module.exports = {

    /**
     * 检查登录信息
     */
    checkLogin: function (req, res, next) {
        console.info('auth::checkLogin');
        //如果认证失败，或者未登录跳转至登录页面
        req.session = req.session || {};
        if (!req.session.endType) {
            req.session.endType = global.tool.endType(req.headers['user-agent']);
        }
        if (!req.session.userData) {
            if (req.header('template_file_name')) {  //如果是在左边菜单树的点击事件
                res.status(403).json({success: false});
            } else {
                var url = req.session.endType + "/login";
                res.render(url, {
                    title: global.config.title,
                    data: {redirect: req.url == '/login' ? '' : req.url},
                    queryData: req.query || {},
                    path: url
                });
            }
        } else {
            if (req.url == '/login') {
                res.redirect(global.config.contextPath + global.config.viewPrefix + '/index');
            } else {
                next();
            }
        }
    },

    /**
     * 安全认证的方法
     * @param req
     * @param res
     * @param next
     */
    requireAuthentication: function (req, res, next) {
        //TODO:判断用户的权限是否可以访问
        next();
    },

    /**
     * 加载用户信息
     * @param req
     * @param res
     * @param next
     */
    loadUser: function (req, res, next) {
        console.info('auth::loadUser');
        //获取用户信息，可以通过页面动态的获取
        if (req.session.userData) {
            next();
        } else {
            var error = new Error('failed to load user');
            error.status = 401;
            next(error);
        }
    }

};