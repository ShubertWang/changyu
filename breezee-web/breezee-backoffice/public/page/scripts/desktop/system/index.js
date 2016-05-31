/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

$(function () {
    breezeeContext.menu.topSelect('system');
});


$(function () {
    breezeeContext.page = {

        init: function () {
            console.log(this.path);
        },

        path: 'ccccc'
    };
    breezeeContext.page.init();
});
