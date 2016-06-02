/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

/**
 * 命名空间的定义
 * @param namespace
 * @returns {namespace}
 */
function namespace(namespace) {
    var object = this,
        tokens = namespace.split("."),
        token;
    while (tokens.length > 0) {
        token = tokens.shift();
        if (typeof object[token] === "undefined") {
            object[token] = {};
        }
        object = object[token];
    }
    /**
     * 此空间内的对象销毁
     * @param key
     */
    object.destroy = function (key) {
        //TODO:研究:我们需要知道当我们删除此对象的时候，
        // 在此对象中设置的一些事件绑定，是否会清除掉。
        if (this[key])
            delete this[key];
    };
    return object;
}
namespace("org.breezee");