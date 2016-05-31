/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

$(function () {
    if (breezeeContext.page) {
        delete breezeeContext.page;
    }
    breezeeContext.page = {

        init: function () {
            this.destroy();
            this.enumList('#enumList');
        },
        enumList: function (panelId) {
            return new Dolphin.LIST({
                panel: panelId,
                idField: 'pkId',
                columns: [{
                    code: 'typeName',
                    title: '枚举名称'
                }, {
                    code: 'typeCode',
                    title: '枚举编码'
                }, {
                    code: 'status',
                    title: '是否启用'
                }],
                multiple: false,
                data: {rows: [{typeName: 'a', typeCode: 'a', status: '1'}]},
                onClick: function (data, thisRow, event) {

                }
            });
        },

        enumItemList: function (panelId) {
            return new Dolphin.LIST({
                panel: panelId,
                idField: 'pkId',
                columns: [{
                    code: 'typeName',
                    title: '枚举名称'
                }, {
                    code: 'typeCode',
                    title: '枚举编码'
                }, {
                    code: 'status',
                    title: '是否启用'
                }],
                multiple: false,
                data: {rows: [{typeName: 'a', typeCode: 'a', status: '1'}]},
                onClick: function (data, thisRow, event) {
                    
                }
            });
        },
        destroy: function () {
        }
    };

    breezeeContext.page.init();
});
