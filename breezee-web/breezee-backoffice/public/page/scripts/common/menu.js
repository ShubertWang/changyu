/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

org.breezee.menu = (function () {
    var _this = this;
    /**
     * 初始化
     */
    this.init = function () {
        _this.initEvent();
    };
    /**
     * 初始化监听事件
     */
    this.initEvent = function () {
        /** 左侧二级菜单的点击事件**/
        $(".workspaceMenuPanel a").click(function () {
            $(".menu-item").removeClass("selected");
            $(this).parent().addClass("selected");
            //TODO:判断，如果是IE浏览器，则进行页面的跳转即可。
            window.history.pushState(null, null, "?menu=" + $(this).data('menuid'));
            _this.menuClick($(this).data('menuid'));
        });
        /**浏览器后退按钮和前进按钮的点击，刷新页面**/
        window.onpopstate = function (event) {
            if (document.location)
                location.href = document.location;
        };
    };
    /**
     * 二级菜单点击事件
     * @param code
     */
    this.menuClick = function (code) {
        $.ajax({
            url: code,
            async: false,
            context: $(".page-content"),
            dataType: 'html',
            global: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('template_file_name', code);
            },
            complete: function (xhr, ts) {

            },
            error: function (xhr, err, exp) {
                console.log(err, exp);
                if (xhr.status == 403) {
                    alert('登录过期，请重新登录');
                    location.reload();
                } else {
                    alert('系统错误，请联系管理员!');
                }
            },
            success: function (content, textStatus) {
                if (org.breezee.page)
                    delete org.breezee.page;
                $(this).empty();
                $(this).append(content);
            }
        });
    };
    /**
     * 横向一级菜单的点击，主要供页面初始化时候
     * @param code
     */
    this.topSelect = function (code) {
        $('.' + code).addClass('active');
    };
    /**
     * 纵向二级菜单的点击，供页面初始化时候
     * @param code
     */
    this.subSelect = function (code) {
        if (code) {
            $(".menu-item").removeClass("selected");
            $('.' + code).addClass("selected");
            _this.menuClick(code);
        }
    };

    this.init();
    return this;
})();






