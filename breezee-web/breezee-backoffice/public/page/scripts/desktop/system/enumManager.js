/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

$(function () {
    org.breezee.page = {
        /**
         * 初始化页面
         */
        init: function () {
            this.destroy();
            this.initEvent();
            this.enumList('#enumList');
            this.enumItemList('#enumItemList', false);
            this.enumItemList('#enum_option_list', true);
        },
        /**
         * 初始化页面事件
         */
        initEvent: function () {
            var me = this;
            $(".newEnum").click(function () {
                $('#enum_win').modal('show');
            });

            $(".enum_submit").click(function () {
                var ef = $(".edit-form");
                if (Dolphin.form.validate(ef)) {
                    var data = Dolphin.form.getValue(ef, '"');
                    console.log(data);
                    Dolphin.ajax({
                        url: '/api/crm/user/' + checked[0].id,
                        type: Dolphin.requestMethod.PUT,
                        data: Dolphin.json2string(data),
                        onSuccess: function (reData) {
                            $('#enum_win').modal('hide');
                        }
                    });

                }
            });
        },
        /**
         * 枚举信息列表，不分页
         * @param panelId
         * @returns {*|LIST}
         */
        enumList: function (panelId) {
            $(panelId).empty();
            return new Dolphin.LIST({
                panel: panelId,
                idField: 'id',
                columns: [{
                    code: 'name',
                    title: '枚举名称'
                }, {
                    code: 'code',
                    title: '枚举编码'
                }, {
                    code: 'status',
                    title: '是否启用'
                }],
                multiple: false,
                data: {rows: []},
                pagination: false,
                onClick: function (data, thisRow, event) {

                }
            });
        },
        /**
         * 枚举项列表
         * @param panelId
         * @param edit
         * @returns {*|LIST}
         */
        enumItemList: function (panelId, edit) {
            $(panelId).empty();
            return new Dolphin.LIST({
                panel: panelId,
                idField: 'pkId',
                columns: [{
                    code: 'id',
                    hidden: true,
                    title: '数据主键'
                }, {
                    code: 'name',
                    title: '项名称'
                }, {
                    code: 'code',
                    title: '项编码'
                }, {
                    code: 'rowNum',
                    title: '排序'
                }],
                multiple: false,
                rowIndex: false,
                checkbox: false,
                editFlag: edit,
                data: {rows: []},
                pagination: false,
                editListName: 'items',
                onClick: function (data, thisRow, event) {

                },
                onRemoveRow: function (data, event, thisRow) {
                    if (thisRow.find('[listName="id"]').val()) {
                        thisRow.remove();
                    }
                }
            });
        },
        /**
         * 一些页面DOM对象和事件的销毁
         */
        destroy: function () {
        }
    };
    org.breezee.page.init();
});
