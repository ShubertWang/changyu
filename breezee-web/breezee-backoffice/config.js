/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

module.exports = {
    title: '百年张裕-共享未来繁荣',
    contextPath: '/',
    viewPrefix: 'view',
    publicPath: "",
    mode: "",
    mock: false,

    log : {
        appenders: [
            { type: 'console' }             //输出在console
            // { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }    //输出到文件
            // { type: 'dateFile', filename: 'logs/sys/sys.log', pattern: "_yyyy-MM-dd", alwaysIncludePattern: false, category: 'sys' } //输出到文件，按天拆分
        ],
        levels : {              //日志级别
            sys: 'debug'
        }
    }

};
