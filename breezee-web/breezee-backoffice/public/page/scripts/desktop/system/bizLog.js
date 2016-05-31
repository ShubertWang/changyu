/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

$(function () {

    breezeeContext.page = {

        init: function () {
            console.log(this.path);
        },

        path: 'bbb'
    };

    breezeeContext.page.init();
});