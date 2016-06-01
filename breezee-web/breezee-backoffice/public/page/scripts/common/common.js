/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
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
    return object;
}
namespace("org.breezee");