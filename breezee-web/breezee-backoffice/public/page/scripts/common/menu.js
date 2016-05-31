/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

breezeeContext.menu = (function () {
    var _this = this;

    this.topSelect = function (code) {
        $('.' + code).addClass('active');
    };
    this.subSelect = function (code) {
        if (code) {
            $(".menu-item").removeClass("selected");
            $('.' + code).addClass("selected");
            _this.menuClick(code);
        }
    };

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
                $(this).empty();
                $(this).append(content);
            }
        });
    };

    $(".workspaceMenuPanel a").click(function () {
        $(".menu-item").removeClass("selected");
        $(this).parent().addClass("selected");
        //TODO:判断，如果是IE浏览器，则进行页面的跳转即可。
        window.history.pushState(null, null, "?menu=" + $(this).data('menuid'));
        _this.menuClick($(this).data('menuid'));
    });

    window.onpopstate = function (event) {
        if (document.location)
            location.href = document.location;
    };

    return this;
})();






