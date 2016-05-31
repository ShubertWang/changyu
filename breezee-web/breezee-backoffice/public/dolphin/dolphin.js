/*
 * Copyright (c) 2016 Breezee.org. All Rights Reserved. 
 */

;/*!/dolphin/js/core.js*/
(function ($) {
    var DOLPHIN = {};
    var thisTool = DOLPHIN;

    // 基础配置
    DOLPHIN.defaults = {
        ajax: {
            param: {
                type: 'get',
                dataType: "json",
                data: {},
                contentType: "application/json; charset=UTF-8",
                async: true,
                cache: false,
                loading: false,
                mockPathData: null
            },
            requestHeader: {},
            formatterRequestData: null,
            originalPath: "/data",
            mockPath: "/mockData",
            returnMsgKey: 'returnMsg'
        },
        compare: function (a, b) {
            return a == b;
        },

        array: {
            separator: ',',
            formatter: null
        },
        date: {
            dateFormat: 'yyyy-MM-dd',
            dateTimeFormat: 'yyyy-MM-dd hh:mm:ss'
        },

        modalWin: {
            title: '系统提示',
            content: null,
            footer: null,

            defaultHidden: false,

            //event
            init: null,
            hide: null,
            hidden: null
        },
        alert: {
            width: '300px',
            title: '系统提示',
            countDownFlag: true,
            countDownTime: 3
        },
        confirm: {
            width: '300px',
            title: '系统提示'
        },
        prompt: {
            width: '300px',
            title: '系统提示',
            mustFlag: false,

            type: 'text',

            placeholder: '',
            defaultValue: '',

            items: null,															//type = radio, checkbox, select,
            idField: 'code',
            textField: 'name'
        },
        img: {
            mockPath: "/public/mockImg",
            param: {
                prefixPath: "/public/mockImg",
                suffixPath: ".png",
                style: {}
            }
        },
        url: {
            viewPrefix: ""
        },
        mockFlag: false
    };
    DOLPHIN.template = {};

    // 浏览器信息
    DOLPHIN.browser = function () {
        var browser = {
            appName: 'unknown',
            version: 0,
            isMobile: false,
            msIe: false,
            firefox: false,
            opera: false,
            safari: false,
            chrome: false,
            netscape: false
        };
        var userAgent = window.navigator.userAgent;
        if (/(msie|firefox|opera|chrome|netscape)\D+(\d[\d.]*)/.test(userAgent.toLowerCase())) {
            browser[RegExp.$1] = true;
            browser.appname = RegExp.$1;
            browser.version = RegExp.$2;
        } else if (/version\D+(\d[\d.]*).*safari/.test(userAgent.toLowerCase())) { // safari
            browser.safari = true;
            browser.appname = 'safari';
            browser.version = RegExp.$2;
        }

        browser.ismobile = /mobile|Mobile/.test(userAgent);
        browser.language = navigator.language;

        return browser;
    }();

    // 常用路径
    DOLPHIN.path = (function () {
        var obj = {}, key;
        for (key in location) {
            if (typeof location[key] !== 'function') {
                obj[key] = location[key];
            }
        }
        var pathname = obj.pathname.split('/');
        obj.contextPath = "/" + pathname[1];

        return obj;
    })();

    //常用变量
    DOLPHIN.requestMethod = {
        GET: "get",
        POST: "post",
        PUT: "put",
        DELETE: "delete"
    };

    //数据操作
    DOLPHIN.emptyObj = function (data) {
        for (var key in data) {
            delete data[key];
        }
        return data;
    };
    DOLPHIN.isPrime = function (i) {
        var ones = "";
        while (--i >= 0) ones += "1";
        return !/^1?$|^(11+?)\1+$/.test(ones);
    };
    DOLPHIN.isInt = function (num) {
        return num == parseInt(num);
    };
    DOLPHIN.isNumber = function (num) {
        return num == parseFloat(num);
    };
    DOLPHIN.isPositiveNumber = function (num, flag) {
        return (num > 0 || (!flag && num == 0));
    };
    DOLPHIN.compareDate = function (date1, date2) {
        return date1.getTime() - date2.getTime();
    };
    DOLPHIN.urlAddParam = function (url, params) {
        var newUrl = url, key;
        switch (this.typeof(params)) {
            case "array":
                for (var i = 0; i < params.length; i++) {
                    newUrl = this.urlAddParam(newUrl, params[i]);
                }
                break;
            case "object":
                for (key in params) {
                    newUrl += (newUrl.indexOf('?') > 0 ? "&" : "?");
                    newUrl += key + "=" + params[key];
                }
                break;
            default :
        }
        return newUrl;
    };
    DOLPHIN.typeof = function (obj) {
        var type;
        switch (typeof obj) {
            case "object":
                if ($.isArray(obj)) {
                    type = "array";
                } else if (obj === null) {
                    type = "null";
                } else {
                    type = "object";
                }
                break;
            default:
                type = typeof obj;
        }

        return type;

    };
    DOLPHIN.objInArray = function (o, a, func) {
        var check = func || this.defaults.compare;

        for (var i = 0; i < a.length; i++) {
            if (check(o, a[i])) {
                return true;
            }
        }
        return false;
    };
    DOLPHIN.objIndexOfArray = function (o, a, func) {
        var check = func || this.defaults.compare;

        for (var i = 0; i < a.length; i++) {
            if (check(o, a[i])) {
                return i;
            }
        }
        return -1;
    };
    DOLPHIN.randomInt = function (max, min) {
        min = min || 0;
        return min + Math.round(Math.random() * (max - min));
    };
    DOLPHIN.random = function (length) {
        var _Length = length || 6;
        var randomNumber = Math.round(Math.random() * Math.pow(10, _Length));
        var randomStr = randomNumber + "";
        if (randomStr.length < _Length) {
            for (var i = 0; i < _Length - randomStr.length;) {
                randomStr = "0" + randomStr;
            }
        }
        return randomStr;
    };
    DOLPHIN.dateDifference = function (date1, date2) {
        var difference = [], timeDifference, differenceText,
            differenceUnit = ['毫秒', '秒', '分钟', '小时', '天'],
            divisorArr = [1000, 60, 60, 24],
            level = 0, i;
        try {
            timeDifference = Math.abs(date1.getTime() - date2.getTime());

            if (timeDifference == 0) {
                differenceText = 0;
            } else {
                differenceText = "";
                while (timeDifference > 0 && level < divisorArr.length) {
                    difference.push(timeDifference % divisorArr[level]);
                    timeDifference = Math.floor(timeDifference / divisorArr[level]);
                    level++;
                }
                if (timeDifference > 0) {
                    difference.push(timeDifference);
                }

                for (i = 0; i < difference.length; i++) {
                    differenceText = difference[i] + differenceUnit[i] + differenceText;
                }
            }
        } catch (e) {
            console.log(e);
            return differenceText;
        }

        return differenceText;
    };

    //数据间转换
    //string <--> array
    DOLPHIN.splitString = function (string, param) {
        var opts = $.extend({}, this.defaults.array, param);
        var data = string.split(opts.separator);
        if (typeof opts.formatter == 'function') {
            for (var i = 0; i < data.length; i++) {
                data[i] = opts.formatter(data[i], data);
            }
        }

        return data;
    };
    DOLPHIN.joinArray = function (array, param) {
        var opts = $.extend({}, this.defaults.array, param);
        var string = "";
        if (typeof opts.formatter == 'function') {
            for (var i = 0; i < array.length; i++) {
                if (i != 0) {
                    string += opts.separator;
                }
                string += opts.formatter(array[i]);
            }
        } else {
            string = array.join(opts.separator);
        }
        return string;
    };
    //json <--> string
    DOLPHIN.string2json = function (str) {
        var o = null;
        try {
            o = jQuery.parseJSON(str);
        } catch (e) {
            console.warn(e);
            o = str;
        }
        return o;
    };
    DOLPHIN.json2string = function (json, quote) {
        try {
            if (quote == "single") {
                return JSON.stringify(json).replace(/\"/g, "\\\'");
            } else if (quote == "double") {
                return JSON.stringify(json).replace(/\"/g, "\\\"");
            } else {
                return JSON.stringify(json);
            }
        } catch (e) {
            console.warn(e);
            return json;
        }
    };

    //date
    DOLPHIN.string2date = function (string, format) {
        format = format || thisTool.defaults.date.dateFormat;
        var y = string.substring(format.indexOf('y'), format.lastIndexOf('y') + 1);//年
        var M = string.substring(format.indexOf('M'), format.lastIndexOf('M') + 1);//月
        var d = string.substring(format.indexOf('d'), format.lastIndexOf('d') + 1);//日
        var h = string.substring(format.indexOf('h'), format.lastIndexOf('h') + 1);//时
        var m = string.substring(format.indexOf('m'), format.lastIndexOf('m') + 1);//分
        var s = string.substring(format.indexOf('s'), format.lastIndexOf('s') + 1);//秒

        if (s == null || s == "" || isNaN(s)) {
            s = new Date().getSeconds();
        }
        if (m == null || m == "" || isNaN(m)) {
            m = new Date().getMinutes();
        }
        if (h == null || h == "" || isNaN(h)) {
            h = new Date().getHours();
        }
        if (d == null || d == "" || isNaN(d)) {
            d = new Date().getDate();
        }
        if (M == null || M == "" || isNaN(M)) {
            M = new Date().getMonth() + 1;
        }
        if (y == null || y == "" || isNaN(y)) {
            y = new Date().getFullYear();
        }
        var dt = null;
        eval("dt = new Date('" + y + "', '" + (M - 1) + "','" + d + "','" + h + "','" + m + "','" + s + "')");
        return dt;
    };
    DOLPHIN.date2string = function (date, format) {
        format = format || thisTool.defaults.date.dateFormat;
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(),      //day
            "h+": date.getHours(),     //hour
            "m+": date.getMinutes(),   //minute
            "s+": date.getSeconds(),   //second
            "w+": "天一二三四五六".charAt(date.getDay()),   //week
            "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length == 1 ? o[k] :
                        ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };
    DOLPHIN.longDate2string = function (long, format) {
        if (long) {
            var date = new Date(long);
            return this.date2string(date, format);
        } else {
            return "";
        }
    };
    DOLPHIN.jsonDate2string = function (json, format) {
        var jsonObj = null;
        var jsonStr = null;
        var date = null;

        if (typeof json == "string") {
            jsonStr = json;
            jsonObj = this.string2json(json);
        } else {
            jsonStr = this.json2string(json);
            jsonObj = json;
        }
        if (jsonObj && jsonObj.time) {
            date = new Date(jsonObj.time);
            return this.date2string(date, format);
        } else {
            return this.i18n.get('core_jsonDate2string_error', jsonStr);
        }
    };

    /**
     * 请求远程js文件
     *
     * @param url
     * @return 无
     */
    DOLPHIN.require = function (url) {
        var _u = Dolphin.path.contextPath + "/public" + Dolphin.systemConfig.pageScript + (Dolphin.browser.ismobile ? "/mobile" : "/desktop") + url + ".js";
        document.write('<script src="' + _u + '"></' + 'script>');
    };

    //ajax
    DOLPHIN.ajax = function (param) {//初始化数据
        var _this = this;
        var return_data = null, opts, key;
        var defaultFunction = {
            success: function (reData, textStatus) {
                return_data = reData;
                if (reData.success) {
                    if (typeof param.onSuccess === 'function') {
                        param.onSuccess(reData, textStatus);
                    }
                } else {
                    thisTool.alert(reData[thisTool.defaults.ajax.returnMsgKey]
                        || thisTool.i18n.get('core_ajax_error'), {
                        countDownFlag: false,
                        callback: function () {
                            if (typeof param.onError === 'function') {
                                param.onError(reData);
                            }
                        }
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (textStatus == "parsererror" && XMLHttpRequest.status == 200) {
                    return_data = XMLHttpRequest.responseText;
                } else if (XMLHttpRequest.status == 500) {
                    thisTool.alert(textStatus + "<br/>" + XMLHttpRequest.status + "<br/>" + XMLHttpRequest.responseText, {
                        countDownFlag: false
                    });
                } else if (XMLHttpRequest.status == 403) {
                    thisTool.alert(thisTool.i18n.get('core_login_timeout') + '<br/>' + '<a href=".">' + thisTool.i18n.get('core_reLogin') + '</a>', {
                        countDownFlag: false
                    });
                } else if (XMLHttpRequest.status == 404) {
                    thisTool.alert(textStatus + "<br/>" + XMLHttpRequest.status + "<br/>" + this.url, {
                        countDownFlag: false
                    });
                    return_data = textStatus;
                    if (typeof param.onError === 'function') {
                        param.onError(textStatus);
                    }
                } else {
                    thisTool.alert(textStatus + "<br/>" + XMLHttpRequest.status, {
                        countDownFlag: false
                    });
                    return_data = textStatus;
                    if (typeof param.onError === 'function') {
                        param.onError(textStatus);
                    }
                }
            },
            beforeSend: function (XMLHttpRequest) {
                if (typeof param.onBeforeSend === 'function') {
                    param.onBeforeSend.call(thisTOOL, reData);
                }
                if (param.loading) {
                    $('body > #loading').show();
                }

                var requestHeaderParam = $.extend({}, thisTool.defaults.ajax.requestHeader, param.requestHeader);
                for (var key in requestHeaderParam) {
                    XMLHttpRequest.setRequestHeader(key, requestHeaderParam[key]);
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
                // this; 调用本次AJAX请求时传递的options参数
                if (typeof param.onComplete === 'function') {
                    param.onComplete(XMLHttpRequest, textStatus);
                }

                if (param.loading) {
                    $('body > #loading').hide();
                }
            }
        };

        opts = $.extend({}, thisTool.defaults.ajax.param, defaultFunction, param);

        if (typeof thisTool.defaults.ajax.formatterRequestData === 'function') {
            opts.data = thisTool.defaults.ajax.formatterRequestData.call(thisTool, opts.data, opts);
        }

        if (typeof opts.formatterRequestData === 'function') {
            opts.data = opts.formatterRequestData.call(thisTool, opts.data, opts);
        }

        if (opts.pathData) {
            for (key in opts.pathData) {
                opts.url = opts.url.replace('{' + key + '}', opts.pathData[key]);
            }
        }

        if (thisTool.defaults.mockFlag && opts.url.indexOf(thisTool.defaults.ajax.originalPath + '/') >= 0) {
            var mockType = "", urlArray, paramFlag = (opts.url.indexOf("?") > 0) ? true : false, paramArray, i;
            opts.url = opts.url.replace(thisTool.defaults.ajax.originalPath, thisTool.defaults.ajax.mockPath);
            if (opts.mockPathData) {
                if ($.isArray(opts.mockPathData)) {
                    urlArray = opts.url.split("/");
                    if (paramFlag) {
                        paramArray = urlArray[urlArray.length - 1].split("?");
                        urlArray[urlArray.length - 1] = paramArray[0];
                    }
                    for (i = 1; i <= opts.mockPathData.length; i++) {
                        urlArray[urlArray.length - i] = opts.mockPathData[opts.mockPathData.length - i];
                    }
                    opts.url = urlArray.join("/");
                    if (paramFlag) {
                        opts.url += "?" + paramArray[1];
                    }
                } else if (typeof opts.mockPathData == "object") {
                    for (key in opts.mockPathData) {
                        opts.url = opts.url.replace('{' + key + '}', opts.mockPathData[key]);
                    }
                }
            }

            mockType = "_" + opts.type;

            if (paramFlag) {
                opts.url = opts.url.replace("?", mockType + ".json?");
            } else {
                opts.url += mockType + ".json";
            }

            opts.type = "get";
        }

        if (!opts.forceUrl) {
            var contextPathRegexp;
            if (thisTool.path.contextPath == "/") {
                contextPathRegexp = new RegExp("^/");
            } else {
                contextPathRegexp = new RegExp("^" + thisTool.path.contextPath + "/");
            }
            if (!contextPathRegexp.test(opts.url) && !/^http:\/\//.test(opts.url)) {
                opts.url = thisTool.path.contextPath + opts.url;
            }
        }
        $.ajax(opts);
        return return_data;
    };

    //DOM
    DOLPHIN.modalWin = function (param) {
        var opts = $.extend({}, thisTool.defaults.modalWin, param);
        var modalWindow, modalDialog, modalContent, modalHeader, modalBody, modalFooter;
        modalWindow = $('<div class="modal fade">').appendTo('body');

        modalDialog = $('<div class="modal-dialog">').css({
            width: opts.width
        }).appendTo(modalWindow);
        modalContent = $('<div class="modal-content">').appendTo(modalDialog);

        modalHeader = $('<div class="modal-header">').appendTo(modalContent);
        $('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>').appendTo(modalHeader);
        $('<h4 class="modal-title">').html(opts.title).appendTo(modalHeader);

        modalBody = $('<div class="modal-body">').appendTo(modalContent);
        modalBody.append(opts.content);

        if (opts.footer) {
            modalFooter = $('<div class="modal-footer">').appendTo(modalContent);
            modalFooter.append(opts.footer);
        }
        if (typeof opts.init === 'function') {
            opts.init.call(modalWindow);
        }

        if (typeof opts.show === 'function') {
            modalWindow.on('show.bs.modal', function (e) {
                opts.show.call(modalWindow);
            })
        }
        if (typeof opts.shown === 'function') {
            modalWindow.on('shown.bs.modal', function () {
                opts.shown.call(modalWindow);
            });
        }
        if (typeof opts.hide === 'function') {
            modalWindow.on('hide.bs.modal', function (e) {
                opts.hide.call(modalWindow);
            })
        }
        if (typeof opts.hidden === 'function') {
            modalWindow.on('hidden.bs.modal', function () {
                opts.hidden.call(modalWindow);
            });
        }
        if (opts.defaultHidden) {
            modalWindow.modal('hide');
        } else {
            modalWindow.modal('show');
        }

        return modalWindow;
    };
    DOLPHIN.alert = function (info, param) {
        var _this = this;
        var opts = $.extend({}, thisTool.defaults.alert, param), countDownSpan;

        if (this.browser.isMobile) {
            alert(info);
            if (typeof opts.callback == 'function') {
                opts.callback.call(this);
            }
            return false;
        } else {
            opts.content = info;

            if (opts.countDownFlag !== false) {
                opts.footer = $('<div>');
                countDownSpan = $('<span class="countDown">').appendTo(opts.footer);
                countDownSpan.html(_this.i18n.get('core_alert_countDown', opts.countDownTime));

                opts.init = function () {
                    var countDownNum = opts.countDownTime,
                        modalWindow = this;

                    function countDown() {
                        var callee = arguments.callee;
                        if (countDownNum != 0) {
                            countDownSpan.html(_this.i18n.get('core_alert_countDown', countDownNum));
                            countDownNum--;
                            setTimeout(function () {
                                callee();
                            }, 1000);
                        } else {
                            modalWindow.modal('hide');
                        }
                    }

                    countDown();
                }
            }

            if (typeof opts.callback == 'function') {
                opts.hide = function () {
                    try {
                        opts.callback.call(this);
                    } catch (e) {
                        console.error(e);
                    }
                };
            }

            opts.hidden = function () {
                this.remove();
            };

            return this.modalWin(opts);
        }
    };
    DOLPHIN.confirm = function (info, param) {
        var opts = $.extend({}, thisTool.defaults.confirm, param),
            flag = false, confirmButton, cancelButton, callback = opts.callback;

        opts.content = info;
        opts.footer = $('<div>');
        confirmButton = $('<button type="button" class="btn btn-primary btn-small">' + thisTool.i18n.get('core_confirm_yes') + '</button>').appendTo(opts.footer);
        cancelButton = $('<button type="button" class="btn btn-default btn-small" >' + thisTool.i18n.get('core_confirm_no') + '</button>').appendTo(opts.footer);
        opts.init = function () {
            var thisWin = this;
            confirmButton.click(function () {
                flag = true;
                thisWin.modal('hide');
            });
            cancelButton.click(function () {
                thisWin.modal('hide');
            });
        };

        if (typeof callback == 'function') {
            opts.hide = function () {
                callback.call(this, flag);
            };
        }
        opts.hidden = function () {
            this.remove();
        };

        return this.modalWin(opts);
    };
    /*
     param:{width:'300px', title:'系统提示', callback:function(){}, type:'input', mustFlag:false
     placeholder:'', defaultValue:'',
     items:[{code:'', name:''},{code:'', name:''}]																//radio, checkbox, select
     }
     */
    DOLPHIN.prompt = function (info, param) {
        var opts = $.extend({}, thisTool.defaults.prompt, param),
            string = null, confirmButton, cancelButton, inputPanel, input, callback = opts.callback;

        opts.content = $('<div>');
        $('<div>').append(info).appendTo(opts.content);
        inputPanel = $('<div>').appendTo(opts.content);
        switch (opts.type) {
            default :
                input = $('<input type="text" class="form-control" placeholder="' + opts.placeholder + '" value="' + opts.defaultValue + '">');
        }
        input.appendTo(inputPanel);
        function getResultData() {
            switch (opts.type) {
                default :
                    string = input.val();
            }
        }

        opts.footer = $('<div>');
        confirmButton = $('<button type="button" class="btn btn-primary btn-small">' + thisTool.i18n.get('core_prompt_ok') + '</button>').appendTo(opts.footer);
        cancelButton = $('<button type="button" class="btn btn-default btn-small" >' + thisTool.i18n.get('core_prompt_cancel') + '</button>').appendTo(opts.footer);

        opts.init = function () {
            var thisWin = this;
            input.focus();
            confirmButton.click(function () {
                getResultData();
                thisWin.modal('hide');
            });
            cancelButton.click(function () {
                thisWin.modal('hide');
            });
        };
        if (typeof callback == 'function') {
            opts.hide = function () {
                callback.call(this, string);
            }
        }
        opts.hidden = function () {
            this.remove();
        };

        return this.modalWin(opts);
    };
    DOLPHIN.toggleCheck = function (selecter, flag) {
        selecter.each(function () {
            if (typeof flag === 'boolean') {
                this.checked = flag;
            } else {
                this.checked = !this.checked;
            }
            $(this).change();
        });
    };
    DOLPHIN.toggleEnable = function (selecter, flag) {
        var _flag;
        selecter.each(function () {
            _flag = flag == null ? !!$(this).attr('disabled') : flag;
            if (_flag) {
                $(this).removeAttr('disabled');
            } else {
                $(this).attr('disabled', 'disabled');
            }
        });
    };

    //location
    DOLPHIN.goHistory = function () {
        history.go(-1);
    };
    DOLPHIN.goUrl = function (url) {
        if (url.indexOf("http://") != 0) {
            url = this.path.contextPath + this.defaults.url.viewPrefix + url;
        }
        location.href = url;
    };

    //console
    DOLPHIN.console = null;

    //cookie
    /**
     * Cookie plugin
     *
     * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
     * Dual licensed under the MIT and GPL licenses:
     * http://www.opensource.org/licenses/mit-license.php
     * http://www.gnu.org/licenses/gpl.html
     *
     */

    /**
     * Create a cookie with the given name and value and other optional parameters.
     *
     * @example $.cookie('the_cookie', 'the_value');
     * @desc Set the value of a cookie.
     * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
     * @desc Create a cookie with all available options.
     * @example $.cookie('the_cookie', 'the_value');
     * @desc Create a session cookie.
     * @example $.cookie('the_cookie', null);
     * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
     *       used when the cookie was set.
     *
     * @param String name The name of the cookie.
     * @param String value The value of the cookie.
     * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
     * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
     *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
     *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
     *                             when the the browser exits.
     * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
     * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
     * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
     *                        require a secure protocol (like HTTPS).
     * @type undefined
     *
     * @name $.cookie
     * @cat Plugins/Cookie
     * @author Klaus Hartl/klaus.hartl@stilbuero.de
     */

    /**
     * Get the value of a cookie with the given name.
     *
     * @example $.cookie('the_cookie');
     * @desc Get the value of a cookie.
     *
     * @param String name The name of the cookie.
     * @return The value of the cookie.
     * @type String
     *
     * @name $.cookie
     * @cat Plugins/Cookie
     * @author Klaus Hartl/klaus.hartl@stilbuero.de
     */
    DOLPHIN.cookie = function (name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
            }
            // CAUTION: Needed to parenthesize options.path and options.domain
            // in the following expressions, otherwise they evaluate to undefined
            // in the packed version for some reason...
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = jQuery.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    DOLPHIN.createImg = function (param) {
        var img = $('<img>'), src, opts = $.extend({}, this.defaults.img.param, param);
        if (this.defaults.mockFlag) {
            src = this.path.contextPath + this.defaults.img.mockPath + (opts.url || (opts.id ? ("/" + opts.id) : false) || "/null") + opts.suffixPath;
        } else {
            src = this.path.contextPath + opts.prefixPath + (opts.url || (opts.id ? ("/" + opts.id) : false) || "/null.png");
        }
        img.attr("src", src);

        img.addClass(opts.css);
        img.css(opts.style);
        return img;
    };

    DOLPHIN.initLoadingPanel = function (panel) {
        var loading, progressPanel, progress, bar;
        loading = $('<div class="loading" id="loading">').appendTo(panel);
        progressPanel = $('<div class="progressPanel">').appendTo(loading);
        progress = $('<div class="progress">').appendTo(progressPanel);
        bar = $('<div class="progress-bar progress-bar-striped active"></div>').css('width', '100%').appendTo(progress);
        return loading;
    };

    window.Dolphin = DOLPHIN;
    window.TOOL = DOLPHIN;
    $.Dolphin = DOLPHIN;
})(jQuery);
/*!/dolphin/js/i18n.js*/
/**
 * Created by Shubert.Wang on 2015/11/10.
 */
(function ($) {
    Dolphin.messages = {};

    Dolphin.i18n = {};
    Dolphin.i18n.defaults = {
        defaultLang: navigator.language,
        url: '/data/i18n/{id}'
    };
    Dolphin.i18n.addMessages = function (list, lang) {
        var language = lang || this.defaults.defaultLang;

        if (Dolphin.messages[language] == null) {
            Dolphin.messages[language] = {};
        }

        $.extend(Dolphin.messages[language], list);
    };

    Dolphin.i18n.get = function (key) {
        var language = this.defaults.defaultLang;
        var template = Dolphin.messages[language][key],
            i, str;

        if (template) {
            for (i = 1; i < arguments.length; i++) {
                str = template.replace('{' + i + '}', arguments[i]);
            }

        } else {
            str = key;
        }

        return str;
    };

    Dolphin.i18n.load = function (code, param) {
        var _this = this;
        Dolphin.ajax($.extend({}, param, {
            url: this.defaults.url.replace('{id}', code),
            onSuccess: function (reData) {
                if (param.callback) {
                    param.callback.call(_this, reData);
                }
            }
        }));
    }
})(jQuery);
/*!/dolphin/js/formI18nBox.js*/
(function ($) {
    var thisTool = Dolphin;

    function I18N_BOX(thisPanel, param) {
        this.init(thisPanel, param);

        return this;
    }

    I18N_BOX.defaults = {
        //required
        panel: null,								//
        name: null,

        //options
        langOption: ['zh', 'en'],
        defaultLang: navigator.language,
        prefixName: '',
        suffixName: '',

        value: null,
        code: null,

        //icon
        icon: {
            toggle_button: "glyphicon glyphicon-globe",
            toggle_button_hide: "icon-chevron-down",
            toggle_button_show: "icon-chevron-up"
        },
        toggleTime: 300,

        //event
        onChange: null												//function(lang, value, thisInput)
    };


    I18N_BOX.prototype = {
        /* ==================== property ================= */
        constructor: I18N_BOX,
        name: null,
        panel: null,

        /* ===================== method ================== */
        init: function (thisPanel, param) {
            this.opts = $.extend({}, I18N_BOX.defaults, param);
            this.panel = thisPanel;
            if (!this.opts.defaultLang) {
                this.opts.defaultLang = this.opts.langOption[0];
            }
            this.name = this.opts.name || this.panel.children('input[type="hidden"]').attr('name');

            this.render();

            return this;
        },

        render: function () {

            var _this = this,
                mainLang, toggleButton, langPanel, item, i18nInputPanel,
                i;

            this.panel.attr('controlName', this.name);
            this.panel.children('input[type="hidden"]').remove();
            mainLang = $('<div class="input-group">').appendTo(this.panel);
            $('<span class="input-group-addon">').html(_this.renderLang(_this.opts.defaultLang)).appendTo(mainLang);
            //TODO
            $('<input type="text" class="form-control">').attr("name", _this.opts.prefixName + _this.name + _this.opts.suffixName + "." + _this.opts.defaultLang).val(_this.opts.value).bind('change', function (e) {
                _this.change.call(_this, _this.opts.defaultLang, this.value, this);
            }).appendTo(mainLang);
            toggleButton = $('<span class="input-group-addon">').click(function () {
                var __this = this;
                var code = $(__this).children("input").val();
                var flag = $(__this).attr('__i18n_flag');
                if (code && !flag) {
                    thisTool.i18n.load(code, {
                        mockPathData: ["categoryName"],
                        callback: function (reData) {
                            for (k in reData.value) {
                                langPanel.find('[name$=".' + k + '"]').val(reData.value[k]);
                            }
                            langPanel.slideToggle(_this.opts.toggleTime);
                            $(__this).attr('__i18n_flag', true);
                        }
                    });
                } else {
                    langPanel.slideToggle(_this.opts.toggleTime);
                }
            }).appendTo(mainLang);
            $('<span>').addClass(_this.opts.icon.toggle_button).appendTo(toggleButton);
            $('<input type="hidden">').attr("name", _this.opts.prefixName + _this.name + _this.opts.suffixName + "." + 'code').val(_this.opts.code).appendTo(toggleButton);

            langPanel = $('<div class="_lang_items default-hidden">').appendTo(_this.panel);
            $.each(_this.opts.langOption, function (i, lang) {
                if (lang != _this.opts.defaultLang) {
                    item = $('<div class="_lang_item">').appendTo(langPanel);
                    i18nInputPanel = $('<div class="input-group">').appendTo(item);

                    $('<span class="input-group-addon">').html(_this.renderLang(lang)).appendTo(i18nInputPanel);
                    $('<input type="text" class="form-control">').attr("name", _this.opts.prefixName + _this.name + _this.opts.suffixName + "." + lang).bind('change', function (e) {
                        _this.change.call(_this, lang, this.value, this);
                    }).appendTo(i18nInputPanel);
                }
            });

            return _this;
        },

        change: function (lang, value, thisInput) {
            var _this = this;
            if (typeof _this.opts.onChange === 'function') {
                _this.opts.onChange.call(_this, lang, value, thisInput);
            }
        },

        renderLang: function (code) {

            return code;
        }

    };

    $.fn.i18nBox = function (param) {
        var thisControl, thisFunc;
        if (typeof param == 'string') {
            thisControl = this.eq(0).data('dolphin');
            if (thisControl) {
                thisFunc = this.eq(0).data('box')[param];
                if (typeof thisFunc === 'function') {
                    return thisFunc.apply(thisControl, arguments.slice(1));
                }
            }
            console.log('I18N_BOX has no such function : ' + param);
            return false;
        } else {
            this.each(function () {
                if ($(this).data('dolphin')) {

                } else {
                    $(this).data('dolphin', new I18N_BOX($(this), param));
                }
            });
            return this;
        }
    };

    thisTool.I18N_BOX = I18N_BOX;
})(jQuery);
/*!/dolphin/js/formFileBox.js*/
(function ($) {
    var thisTool = Dolphin;

    function FILE_BOX(thisPanel, param) {
        this.init(thisPanel, param);
        return this;
    }

    FILE_BOX.defaults = {
        //required
        name: null,
        uploadName: 'upfile',

        //options
        url: '/ecm/services/image/',
        getUrl: {
            url: '/ecm/services/image/detail',
            type: 'get'
        },
        title: null,

        //icon
        icon: {
            fileUpload: "glyphicon glyphicon-globe"
        }
    };

    FILE_BOX.prototype = {
        /* ==================== property ================= */
        constructor: FILE_BOX,
        panel: null,
        completeTitle: null,
        progressPanel: null,
        filesPanel: null,
        name: null,
        fileInput: null,
        fileId: null,

        /* ===================== method ================== */
        init: function (thisPanel, param) {
            this.panel = thisPanel;
            this.files = [];
            this.opts = $.extend({}, FILE_BOX.defaults, param);
            this.fileInput = this.panel.find('input[type="file"]');
            this.name = this.opts.name || this.fileInput.attr('name');
            this.fileInput.attr('name', this.opts.uploadName);
            this.fileId = $('<input type="hidden" />').attr('name', this.name).appendTo(this.panel);
            this.render();
            this.bind();
            return this;
        },

        render: function () {
            this.completeTitle = $('<div class="upload_complete">').html('<span class="label label-default">上传成功</span>').appendTo(this.panel);
            this.progressPanel = $('<div class="progress">').append('<div class="progress-bar">').appendTo(this.panel);
            this.filesPanel = $('<div class="dolphin_files">').appendTo(this.panel);
        },

        bind: function () {
            var _this = this,
                fileParam;

            fileParam = $.extend({}, {
                /*submit : function (e, data) {
                 debugger;
                 },
                 send : function (e, data) {
                 debugger;
                 },*/
                progressall: function (e, data) {
                    _this.progressAll.call(_this, e, data);
                },
                done: function (e, data) {
                    _this.complete.call(_this, e, data);
                }
            }, _this.opts);

            _this.panel.find('input[type="file"]').fileupload(fileParam);
        },

        progress: function (e, data) {
            debugger;
        },

        progressAll: function (e, data) {
            this.completeTitle.hide();
            var progress = parseInt(data.loaded / data.total * 100, 10) + "%";
            this.progressPanel.show().find('.progress-bar').css('width', progress);
        },

        complete: function (e, data) {
            var _this = this, result = typeof data.result === 'string' ? thisTool.string2json(data.result) : data.result;
            _this.progressPanel.hide();
            if (result.success) {
                _this.completeTitle.fadeIn(500);
                setTimeout(function () {
                    _this.completeTitle.fadeOut(500);
                }, 3000);
                this.addFile(result);
            } else {
                Dolphin.alert(result[thisTool.defaults.ajax.returnMsgKey] || '上传失败', {
                    countDownFlag: false
                });
            }
        },
        addFiles: function (data) {
            var i, ol, li;
            ol = this.filesPanel.find('ol');
            if (ol.length == 0) {
                ol = $('<ol>').appendTo(this.filesPanel);
            }
            for (i = 0; i < data.result.length; i++) {
                li = this.addFile(data.result[i]).appendTo(ol);
            }

            return this;
        },

        addFile: function (data) {
            var _this = this,
                file, remove, fileId,
                ol, li;

            //DOM
            ol = this.filesPanel.find('ol');
            if (ol.length == 0) {
                ol = $('<ol>').appendTo(this.filesPanel);
            }
            file = $('<li>').attr({
                'data-id': data.id
            }).html(data.fileName);
            remove = $('<span class="glyphicon glyphicon-remove">').appendTo(file);
            remove.click(function () {
                _this.removeFile(data.id);
            });
            file.appendTo(ol);

            //data
            fileId = _this.fileId.val();
            if (fileId.length > 0) {
                fileId += ","
            }
            fileId += data.id;
            _this.fileId.val(fileId);
            this.files.push(data);

            return this;
        },

        removeFile: function (id) {
            var _this = this,
                i, fileIds;
            for (i = 0; i < _this.files.length; i++) {
                if (_this.files[i].id == id) {
                    _this.files.splice(i, 1);
                    break;
                }
            }

            fileIds = _this.fileId.val().split(',');
            for (i = 0; i < fileIds.length; i++) {
                if (fileIds[i] == id) {
                    fileIds.splice(i, 1);
                    break;
                }
            }
            _this.fileId.val(fileIds.join(","));

            _this.panel.find('li[data-id="' + id + '"]').remove();
        },

        //method
        resetFiles: function () {
            var _this = this,
                fileIds;
            fileIds = _this.fileId.val();
            this.filesPanel.empty();
            if (fileIds) {
                thisTool.ajax({
                    url: _this.opts.getUrl.url,
                    type: _this.opts.getUrl.type,
                    forceUrl: true,
                    data: {ids: fileIds},
                    onSuccess: function (reData) {
                        _this.addFiles(reData.rows);
                    }
                });
            }
        }
    };

    $.fn.fileBox = function (param) {
        var thisControl, thisFunc;
        if (typeof param == 'string') {
            thisControl = this.eq(0).data('dolphin');
            if (thisControl) {
                thisFunc = this.eq(0).data('dolphin')[param];
                if (typeof thisFunc === 'function') {
                    return thisFunc.apply(thisControl, arguments.slice(1));
                }
            }
            console.log('FILE_BOX has no such function : ' + param);
            return false;
        } else {
            this.each(function () {
                if ($(this).data('dolphin')) {
                    thisControl = $(this).data('dolphin');
                    return false;
                } else {
                    $(this).data('dolphin', new FILE_BOX($(this), param));
                }
            });
            return thisControl;
        }
    };

    thisTool.FILE_BOX = FILE_BOX;

})(jQuery);
/*!/dolphin/js/validate.js*/
(function ($) {
    var thisTool = Dolphin;

    var validate = function (selector, param) {
        var thisValidate = arguments.callee;
        var flag = true, thisFlag;
        selector.each(function () {
            var _this = $(this), method, i;
            method = param || _this.attr(thisValidate.defaults.attr);

            switch (thisTool.typeof(method)) {
                case "array":
                    for (i = 0; i < method.length; i++) {
                        if (!thisValidate(_this, method[i])) {
                            flag = false;
                            break;
                        }
                    }
                    break;
                case "string":
                    var methodArray = method.split(","), funcName, funcArguments;
                    for (i = 0; i < methodArray.length; i++) {
                        funcArguments = methodArray[i].match(/\[\S*\]/g);
                        if (funcArguments) {
                            funcArguments = thisTool.string2json(funcArguments[0]);
                        } else {
                            funcArguments = [];
                        }
                        funcArguments.unshift(_this);
                        funcName = $.trim(methodArray[i].replace(/\[\S*\]/g, ""));
                        if (!thisValidate.check.call(thisValidate, _this, thisValidate.method[funcName], funcArguments)) {
                            flag = false;
                            break;
                        }
                    }
                    break;
                case "function":
                    if (!method.call(thisValidate, _this)) {
                        flag = false;
                    }
                    break;
                case "object":
                    if (!thisValidate.check.call(thisValidate, _this, method, [_this])) {
                        flag = false;
                    }
                    break;
            }
        });

        return flag;
    };

    validate.defaults = {
        attr: "dol-validate"
    };

    validate.check = function (selector, checkMethod, params) {
        var content = null, label, i, flag;
        if (checkMethod.validator.apply(this, params)) {
            this.hide(selector);
            flag = true;
        } else {
            label = selector.attr('dol-label') || selector.closest('.form-group').find('label').html() || '';
            switch (typeof checkMethod.message) {
                case "function":
                    content = checkMethod.message.apply(this, [label].concat(params));
                    break;
                case "string":
                    content = checkMethod.message.replace("{label}", label);
                    for (i = 1; i < params.length; i++) {
                        content = content.replace("{" + i + "}", params[i]);
                    }
                    break;
            }
            this.show(selector, content);
            flag = false;
        }

        return flag;
    };
    validate.show = function (_this, content) {
        var group = _this.closest('.form-group');
        if (group.length == 0) {
            group = _this.closest('.input-group');
        }
        group.addClass('has-error');
        _this.popover('destroy');
        setTimeout(function () {
            _this.popover({
                content: content,
                trigger: 'hover',
                placement: 'top'
            });
        }, 200);
    };

    validate.hide = function (_this) {
        var group = _this.closest('.form-group');
        if (group.length == 0) {
            group = _this.closest('.input-group');
        }
        group.removeClass('has-error');
        _this.popover('destroy');
    };

    validate.monitor = function (selector, param) {
        var thisValidate = this, _selector = selector || $('[' + thisValidate.defaults.attr + ']');
        _selector.bind('blur', function () {
            thisValidate($(this), param);
        }).bind('keyup', function () {
            thisValidate($(this), param);
        });
    };

    validate.method = {};
    validate.method.required = {
        validator: function (selector) {
            if (selector.val()) {
                return true;
            } else {
                return false;
            }
        },
        message: "{label}不能为空"
    };

    validate.method.later = {
        validator: function (selector, otherDateId) {
            var otherDate = thisTool.string2date($(otherDateId).val());
            var thisDate = thisTool.string2date(selector.val());
            if (thisTool.compareDate(thisDate, otherDate) < 0) {
                return false;
            } else {
                return true;
            }
        },
        message: "结束时间不能早于开始时间"
    };
    validate.method.before = {
        validator: function (selector, otherDateId) {
            var otherDate = thisTool.string2date($(otherDateId).val());
            var thisDate = thisTool.string2date(selector.val());
            if (thisTool.compareDate(thisDate, otherDate) > 0) {
                return false;
            } else {
                return true;
            }
        },
        message: "开始时间不能晚于结束时间"
    };

    validate.method.maxLength = {
        validator: function (selector, maxLength) {
            if (selector.val() && selector.val().length > maxLength) {
                return false;
            } else {
                return true;
            }
        },
        message: "{label}长度不能超过{1}"
    };
    validate.method.minLength = {
        validator: function (selector, minLength) {
            if (selector.val() && selector.val().length < minLength) {
                return false;
            } else {
                return true;
            }
        },
        message: function (label, selector, length) {
            return label + "长度不能低于" + length;
        }
    };
    validate.method.email = {
        validator: function (selector, minLength) {
            if (selector.val() && !/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(selector.val())) {
                return false;
            } else {
                return true;
            }
        },
        message: function (label, selector) {
            return label + "格式不正确";
        }
    };
    validate.method.number = {
        validator: function (selector, minLength) {
            if (selector.val() && !/^(0|[1-9][0-9]*)$/.test(selector.val())) {
                return false;
            } else {
                return true;
            }
        },
        message: function (label, selector) {
            return label + "必须为数字";
        }
    };

    thisTool.validate = validate;
})(jQuery);
/*!/dolphin/js/form.js*/
(function ($) {
    var thisTool = Dolphin;

    function FORM(param) {
        this.init(param);
    }

    FORM.defaults = {
        panel: 'body',
        ajax: thisTool.ajax,
        formatter: null,
        ignore: "",

        select: {
            emptyOption: true,
            codeField: 'code',
            nameField: 'name',
            optionUrl: null,
            optionParam: null,
            ajaxType: 'get'
        },

        renderForm: {
            staticFlag: false,
            colPreRow: 2,
            labelCol: 6,
            inputTypeKey: 'inputType',
            labelKey: "label",
            nameKey: 'attrCode',
            codeField: 'attrCode',
            idField: 'attrId',
            selectOptionsKey: 'subType',
            eachField: null								//function 渲染字段前触发，返回false时，跳过此字段
        }
    };


    FORM.prototype = {
        /* ==================== property ================= */
        constructor: FORM,
        data: null,

        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, FORM.defaults, param);
        },
        parse: function (panel) {
            var _panel = panel || this.opts.panel;
            //select
            this.parseSelect($(_panel).find('select[options]'));

            //date
            $(_panel).find('.input-group.dolphin_date_picker').datepicker({
                format: "yyyy-mm-dd",
                language: navigator.language,
                autoclose: true,
                orientation: "bottom left"
            });

            //datetime
            $(_panel).find('.input-group.dolphin_datetime_picker').datetimepicker({
                format: "yyyy-mm-dd hh:ii",
                autoclose: true,
                pickerPosition: "bottom-left"
            });

            //i18n
            $(_panel).find('.dolphin_i18n_box').each(function () {
                $(this).i18nBox();
            });

            //ref-tree
            $(_panel).find('.form-control-ref').each(function () {
                var thisControl = $(this);
                var url = thisTool.path.contextPath + thisControl.attr('data-ref-url');
                var idField = thisControl.attr('idField');
                var nameField = thisControl.attr('nameField');

                var refTree = new REFWIN({
                    type: thisControl.attr('data-ref-type'),
                    url: url,
                    mockPathData: thisControl.attr('mockPathData').split(","),

                    idField: idField || 'code',
                    textField: nameField || 'name',

                    multiple: thisControl.attr('data-ref-multiple') === "true" ? true : false,
                    checkbox: thisControl.attr('data-ref-checkbox') === "false" ? false : true,
                    cascadeCheck: thisControl.attr('data-ref-cascadeCheck') === "true" ? true : false,
                    onlyLeafCheck: thisControl.attr('data-ref-onlyLeafCheck') === "true" ? true : false,
                    onShow: function () {
                        var selected = thisControl.find('.form-control-hidden').val().split(',');

                        for (var i = 0; i < selected.length; i++) {
                            this.refObj.check(this.refObj.findById(selected[i]));
                        }
                    },
                    onSubmit: function (data) {
                        var selectNode = '';
                        var selectId = '';
                        for (var i = 0; i < data.length; i++) {
                            if (i != 0) {
                                selectNode += ', ';
                                selectId += ', ';
                            }
                            selectNode += data[i][this.opts.textField];
                            selectId += data[i][this.opts.idField];
                        }
                        thisControl.find('.form-control').val(selectNode);
                        thisControl.find('.form-control-hidden').val(selectId);
                    }
                });
                thisControl.find('.input-group-addon').bind('click', function () {
                    //console.log(tree.getChecked());
                    refTree.show();
                });
            });

            //file
            $(_panel).find('.dolphin_file_box').each(function () {
                $(this).fileBox();
            });

            //validate
            thisTool.validate.monitor($(this.opts.panel).find('[' + thisTool.validate.defaults.attr + ']'));

            return this;
        },
        empty: function (panel, param) {
            var thisPanel = panel || this.opts.panel;
            var opts = param || this.opts;
            var control;

            $(thisPanel).find('[name]').each(function () {
                control = $(this);
                if (control[0].tagName.toLowerCase() == 'input') {
                    if (control.attr('type') == 'radio' || control.attr('type') == 'checkbox') {
                        control[0].checked = false;
                    } else {
                        control.val("");
                    }
                } else if (control[0].tagName.toLowerCase() == 'select' || control[0].tagName.toLowerCase() == 'textarea') {
                    control.val("");
                } else if (control[0].tagName.toLowerCase() == 'p' || control[0].tagName.toLowerCase() == 'span' || control[0].tagName.toLowerCase() == 'div') {
                    control.html("");
                }
            });
            $(thisPanel).find('div.dolphin_i18n_box').each(function () {
                $(this).find('[__i18n_flag]').removeAttr('__i18n_flag');
                $(this).find('._lang_items').hide();
            });
        },
        //form --> json
        getValue: function (formId) {
            var _form;
            if (typeof formId === 'string') {
                if ($(formId).length > 0) {
                    _form = $(formId);
                } else {
                    _form = $("#" + formId);
                }
            } else {
                _form = formId;
            }
            var obj = {}, control,
                nameTree, namePointer,
                i, j, k;

            //select,input,textarea,checkbox,radio
            var item = _form.find('select[name], input[name][type!="checkbox"][type!="radio"], textarea[name], input[name][type="checkbox"]:checked, input[name][type="radio"]:checked');
            for (i = 0; i < item.length; i++) {
                control = item.eq(i);
                if (control.closest('.table-edit').length > 0 || control.attr('type') == 'file') {
                    continue;
                }
                if (control.attr('name').indexOf('.') > 0) {
                    nameTree = control.attr('name').split('.');
                    namePointer = obj;
                    for (j = 0; j < nameTree.length; j++) {
                        if (j != (nameTree.length - 1)) {
                            if (!namePointer[nameTree[j]]) {
                                namePointer[nameTree[j]] = {};
                            }
                            namePointer = namePointer[nameTree[j]];
                        } else {
                            namePointer[nameTree[j]] = control.val();
                        }
                    }
                } else {
                    obj[control.attr('name')] = control.val();
                }
            }

            //list
            var editList = _form.find('.table-edit');
            for (i = 0; i < editList.length; i++) {
                obj[editList.eq(i).attr('tableName')] = editList.data('dolphin').data.rows;

                //TODO i18n 处理多语言问题 待优化
                var i18n_box = editList.eq(i).find('.list_body').children('tr').eq(0).find('.dolphin_i18n_box');
                for (j = 0; j < i18n_box.length; j++) {
                    var field_name = i18n_box.eq(j).attr('controlName');
                    for (k = 0; k < obj[editList.eq(i).attr('tableName')].length; k++) {
                        obj[editList.eq(i).attr('tableName')][k][field_name] = translateI18n(obj[editList.eq(i).attr('tableName')][k][field_name]);
                    }
                }
            }

            //TODO i18n 处理多语言问题 待优化
            _form.find('.dolphin_i18n_box').each(function (i) {
                var control = $(this);
                if (control.closest('.table-edit').length > 0 || control.attr('type') == 'file') {
                    return true;
                } else {
                    var name = control.attr('controlName');
                    obj[name] = translateI18n(obj[name]);
                }
            });
            function translateI18n(data) {
                var i18nData = "";
                for (var key in data) {
                    if (i18nData != "") {
                        i18nData += ","
                    }
                    i18nData += "\"" + key + "\"" + ":" + (data[key] ? "\"" + data[key] + "\"" : "\"\"");
                }

                return i18nData;
            }


            return obj;
        },
        setValue: function (data, panel, param) {
            var _this = this;
            var thisPanel = $(panel || this.opts.panel);
            var opts = $.extend({}, this.opts, param),
                i, key, _key, keyPath = [], control;

            //TODO i18n
            if (data.lang) {
                for (key in data.lang) {
                    data[key + "_i18n_"] = {};
                    data[key + "_i18n_"]['code'] = data.lang[key];
                    data[key + "_i18n_"][Dolphin.I18N_BOX.defaults.defaultLang] = data[key];
                }
            }

            if (opts.ignore) {
                opts.ignore = "," + opts.ignore.join(',') + ",";
            }

            (function (_data, level) {
                for (key in _data) {
                    if (new RegExp(',' + key + ',').test(opts.ignore)
                        || _data[key] instanceof jQuery
                        || _data[key] instanceof HTMLElement
                        || key == "_parent") {
                        continue;
                    }

                    keyPath[level] = key;
                    if (typeof _data[key] != 'object') {
                        _key = "";
                        for (i = 0; i <= level; i++) {
                            if (i > 0) {
                                _key += ".";
                            }
                            _key += keyPath[i];
                        }
                        control = thisPanel.find('[name="' + _key + '"]');
                        _this.setControlValue(control, _data[key]);
                    } else {
                        arguments.callee(_data[key], level + 1);
                    }
                }
            })(data, 0);

            //TODO file
            thisPanel.find('.dolphin_file_box').each(function () {
                $(this).data('dolphin').resetFiles();
            });

            return this;
        },
        setControlValue: function (control, value, param) {
            var opts = param || this.opts;
            if (control.length > 0) {
                if (control[0].tagName.toLowerCase() == 'input') {
                    if (control.attr('type') == 'radio' || control.attr('type') == 'checkbox') {
                        if (control.length > 1) {
                            for (var i = 0; i < control.length; i++) {
                                if (control.eq(i).val() == value) {
                                    control[i].checked = true;
                                }
                            }
                        } else {
                            if (value === true || value === "true" || value === "1") {
                                control[0].checked = true;
                            }
                        }
                    } else {
                        control.val(value);
                    }
                } else if (control[0].tagName.toLowerCase() == 'select') {
                    control.val(value + "");
                    control.attr('selectedOption', value + "");
                } else if (control[0].tagName.toLowerCase() == 'textarea') {
                    control.val(value + "");
                } else if (control[0].tagName.toLowerCase() == 'p' || control[0].tagName.toLowerCase() == 'span' || control[0].tagName.toLowerCase() == 'div') {
                    if (control.attr('options')) {
                        control.html(thisTool.enum.getEnumText(control.attr('options'), value));
                    } else {
                        if (opts.formatter && typeof opts.formatter[key] === 'function') {
                            control.html(opts.formatter[key].call(this, value, data));
                        } else {
                            control.html(value);
                        }
                    }
                }
            }
        },
        loadData: function (param, panel, funcParam) {
            var thisForm = this;
            param.onSuccess = function (data) {
                if (typeof funcParam.dataFilter == "function") {
                    data = funcParam.dataFilter.call(thisForm, data);
                }

                thisForm.setValue(data.value, panel, param);

                if (typeof funcParam.callback == "function") {
                    funcParam.callback.call(thisForm, data);
                }
            };
            thisTool.ajax(param);
        },
        validate: function (panel) {
            var _panel = panel || this.opts.panel;

            return thisTool.validate($(_panel).find('[' + thisTool.validate.defaults.attr + ']'));
        },

        /*
         功能：通过json创建表单
         参数说明：
         param : [{name:"", title:"", inputType:"", placeholder:"", labelCol : 2}]
         */
        renderForm: function (fields, panel, param) {
            var thisPanel = panel || this.opts.panel,
                _this = this,
                opts = $.extend(true, {}, this.opts.renderForm, param);

            var row = $('<div class="dolphin-row">').appendTo(thisPanel);

            for (var i = 0; i < fields.length; i++) {
                _this.renderField(fields[i], row, opts);
            }
            return row;
        },
        renderField: function (field, panel, param) {
            var col, formField, label, controlPanel;

            if (typeof param.eachField == 'function') {
                if (param.eachField(field, param) === false) {
                    return false;
                }
            }

            if (field.hidden || field[param.inputTypeKey] == 'hidden') {
                this.renderControlMethod['hidden'](field, param).prependTo(panel);
            } else {
                if (!field[param.idField]) {
                    field[param.idField] = Dolphin.random(8);
                }
                col = $('<div>').addClass('dolphin-col-' + 24 / (field.colPreRow || param.colPreRow)).attr({
                    'attrCode': field[param.codeField],
                    'attrId': field[param.idField]
                });

                formField = $('<div>').addClass('form-group').appendTo(col);
                label = $('<label>').addClass('dolphin-col-' + (field.labelCol || param.labelCol) + ' control-label').html(field[param.labelKey]).appendTo(formField);
                controlPanel = $('<div>').addClass('dolphin-col-' + (24 - (field.labelCol || param.labelCol))).appendTo(formField);

                this.renderControl(field, controlPanel, param);
            }

            if (col && panel) {
                col.appendTo(panel);
            }

            return col;
        },
        renderControl: function (field, panel, param) {
            var _this = this;
            var control, inputType, controlMethod;

            if (typeof field.formatter == 'function') {
                control = field.formatter(field);
            } else {
                if (param.staticFlag === false) {
                    if (typeof param.inputTypeKey == 'function') {
                        inputType = param.inputTypeKey.call(_this, field);
                    } else {
                        inputType = field[param.inputTypeKey];
                    }
                    controlMethod = this.renderControlMethod[inputType];
                    if (typeof controlMethod == 'function') {
                        control = controlMethod.call(this, field, param);
                    } else {
                        control = this.renderControlMethod['text'].call(this, field, param);
                    }
                } else {
                    control = this.renderControlMethod['static'].call(this, field, param);
                }
            }
            if (panel) {
                panel.append(control);
            }
            return control;
        },
        renderControlMethod: {
            text: function (field, param) {
                var control = $('<input type="text" class="form-control"/>').val(field.defautValue || "").attr({
                    'name': field[param.nameKey],
                    'placeholder': field.placeholder || ''
                });

                return control;
            },
            enum: function (field, param) {
                var control = $('<select class="form-control">').attr({
                    'name': field[param.nameKey]
                });
                this.parseSelect(control, {
                    options: field[param.selectOptionsKey]
                });
                return control;
            },
            hidden: function (field, param) {
                var control = $('<input type="hidden" />').val(field.defautValue || "").attr({
                    'name': field[param.nameKey]
                });

                return control;
            },
            static: function (field, param) {
                var control = $('<p class="form-control-static">').attr({
                    name: field[param.nameKey]
                }).html(field.defaultValue || '');

                return control;
            },
            textarea: function (field, param) {
                var control = $('<textarea class="form-control">').attr({
                    name: field[param.nameKey]
                }).html(field.defaultValue || '');

                return control;
            }
        },
        submitForm: function (param) {
            var result = thisTool.ajax({
                url: param.url,
                data: param.data || {},
                type: param.type
            });
            if (result.success) {
                thisTool.alert(result[thisTool.defaults.ajax.returnMsgKey] || "操作成功");
                if (param.callback) {
                    param.callback();
                }
            } else {
                thisTool.alert(result[thisTool.defaults.ajax.returnMsgKey]);
            }
        },
        parseSelect: function (selectors, param) {
            var thisForm = this;
            selectors.each(
                function () {
                    var thisSelect = this, opts = $.extend({}, thisForm.opts.select, param);
                    var options = $(this).attr('options') || opts.options,
                        optionUrl = $(this).attr('optionUrl') || opts.optionUrl,
                        ajaxType = $(this).attr('ajaxType') || opts.ajaxType,
                        optionParam = $(this).attr('optionParam') || opts.optionParam,
                        codeField = $(this).attr('codeField') || opts.codeField,
                        nameField = $(this).attr('nameField') || opts.nameField,
                        nameFormatter = $(this).attr('nameFormatter') || opts.nameFormatter,
                        emptyOption = ($(this).attr('emptyOption') === false || $(this).attr('emptyOption') === "false") ? false : opts.emptyOption,
                        selectedOption = $(this).attr('selectedOption') || opts.selectedOption,
                        mockPathData = $(this).attr('mockPathData') ? $(this).attr('mockPathData').split(",") : opts.mockPathData,
                        dataFilter = $(this).attr('dataFilter') || opts.dataFilter,
                        optionName;

                    if (optionUrl) {
                        if (optionParam) {
                            //urgent, so just like this
                            optionUrl = optionUrl + "?" + optionParam;
                        }
                        options = thisTool.ajax({
                            url: optionUrl,
                            async: false,
                            type: ajaxType,
                            mockPathData: mockPathData
                        });
                        if (dataFilter) {
                            switch (typeof dataFilter) {
                                case "string" :
                                    options = window[dataFilter].call(thisSelect, options);
                                    break;
                                case "function":
                                    options = dataFilter.call(thisSelect, options);
                                    break;
                                default:
                                    break;
                            }
                        } else {
                            options = options.rows;
                        }
                    } else {
                        options = thisTool.enum.getEnum(options);
                    }
                    if (options) {
                        if (emptyOption) {
                            $(this).append(
                                '<option value="">'
                                + '--请选择--' + '</option>');
                        }
                        for (var i = 0; i < options.length; i++) {
                            switch (typeof nameFormatter) {
                                case "string" :
                                    optionName = window[nameFormatter].call(thisSelect, options[i][nameField]);
                                    break;
                                case "function":
                                    optionName = nameFormatter.call(thisSelect, options[i][nameField]);
                                    break;
                                default:
                                    optionName = options[i][nameField];
                                    break;
                            }
                            $(this).append(
                                '<option value="' + options[i][codeField] + '">'
                                + optionName + '</option>');
                        }
                        if (selectedOption) {
                            $(this).val(selectedOption);
                        }
                    }
                    if ($(this).attr('callback')) {
                        window[$(this).attr('callback')].call(this, $(this).val(), options);
                        if ($(this).attr('noChange')) {

                        } else {
                            $(this).bind('change', function () {
                                window[$(thisSelect).attr('callback')].call(this, $(thisSelect).val(), options);
                            })
                        }
                    }
                }
            );
        },
        setOptions: function (param) {
            $.extend(true, this.opts, param);
            return this;
        }
    };

    thisTool.FORM = FORM;
    thisTool.form = new FORM();
})(jQuery);
/*!/dolphin/js/enum.js*/
/**
 * jquery Main Data
 * Description: 目前主要用于处理json格式的enum
 * Author: wangsy
 * Date  : 2015-04-15
 * Update: 2015-04-15
 *===============================================================================
 * 一、功能说明：
 * 1. 管理前台枚举值的数据
 *
 * 二、使用参考：
 * 1. 依赖 jQuery
 * 2. 引入插件js: enum.js
 * 3. 初始化插件
 *        var main_data = new MAINDATA({
 * 			ajaxFlag : true,
 * 			enumUrl : '/view/demo/maindata/mockData.jsp'
 * 		});
 * 4. 方法参考：
 *    添加enum : main_data.addEnum('test', [{value : 'v1', text : 't1'}]);
 *    查询enum : main_data.getEnum('test');
 *    查询text : main_data.getEnumText('test', 'v1');
 *
 *===============================================================================
 *
 ********************************************************************************/
(function ($) {
    var thisTool = Dolphin;

    function ENUM(param) {
        this.init(param);
    }

    ENUM.defaults = {
        //enum
        valueField: "code",									  //枚举code label
        textField: "name",									  //枚举值 label
        otherField: "other",								   	  //枚举附加属性 label

        //cookie
        cookieFlag: false,                                     //是否支持cookie

        //ajax
        ajaxFlag: false,							   		       //是否支持远程
        enumUrl: null,						     				   //远程url
        enumTextUrl: null,									   //远程取值url
        async: false,					 				           //是否默认异步
        type: "get",					                 		   //默认请求方法
        dataType: "json",									       //默认数据类型
        //contentType: "application/json; charset=UTF-8",	   //默认contentType
        cache: false,									           //默认ajax是否缓存
        enumKey: "id",								               //默认提交参数enumId名称
        enumNameKey: "enumOptionId",						   //默认提交参数enumOptionId名称
        ajax: thisTool.ajax,							           //默认ajax方法
        enumCache: true,										   //ajax请求结果是否缓存到前台
        dataFilter: null                                       //数据处理
    };

    ENUM.prototype = {
        /* ==================== property ================= */
        constructor: ENUM,
        enumData: {},															//前台缓存枚举数据
        enumType: {															//前台创建枚举类型
            lowerCase: "abcdefghijklmnopqrstuvwxyz",
            upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        },

        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, ENUM.defaults, param);

            if (this.opts.ajaxFlag) {
                if (this.opts.enumTextUrl == null) {
                    this.opts.enumTextUrl = this.opts.enumUrl;
                }
            }
        },
        addEnumType: function (name, data) {
            this.enumType[name] = data;
        },

        //add enum
        addEnum: function (name, data) {
            this.enumData[name] = data;
        },
        createEnum: function (name, data, type, start) {
            //init param
            if (typeof data == 'string') {
                data = data.split(',');
            }
            type = type || 'number';
            start = start || 0;

            //init start index
            var indexValue = start;
            if (type != 'number') {
                indexValue = this.enumType[type].indexOf(start);
                if (indexValue < 0) {
                    indexValue = 0;
                }
            }

            //enumData
            var enumData = [];
            var value = null;
            var enumOption = null;
            for (var i = 0; i < data.length; i++) {
                if (type == 'number') {
                    value = indexValue + i;
                } else {
                    value = this.enumType[type].charAt(indexValue + i);
                }

                enumOption = {};
                enumOption[this.opts.valueField] = value;
                enumOption[this.opts.textField] = data[i];

                enumData.push(enumOption);
            }

            this.addEnum.call(this, name, enumData);
            return enumData;
        },

        //cookie enum
        setCookieEnum: function (name, enumObj) {
            if (!Dolphin.cookie(name)) {
                thisTool.cookie(name, thisTool.json2string(enumObj), {
                    expires: 365,
                    path: thisTool.path.basePath
                });

                if (this.opts.enumCache === true) {
                    this.addEnum(name, enumObj);
                }
            }
        },
        setCookieEnumByAjax: function (name) {
            if (!thisTool.cookie(name)) {
                var enumObj = this.loadEnum(name);
                if (enumObj) {
                    var cookieEnum = [], cookieEnumItem = null;
                    for (var i = 0; i < enumObj.length; i++) {
                        cookieEnumItem = {};
                        cookieEnumItem[this.opts.valueField] = enumObj[i][this.opts.valueField];
                        cookieEnumItem[this.opts.textField] = enumObj[i][this.opts.textField];
                        cookieEnum.push(cookieEnumItem);
                    }
                    this.setCookieEnum(name, cookieEnum);
                }
            }
        },
        setCookieEnumsByAjax: function (nameList) {
            for (var i = 0; i < nameList.length; i++) {
                this.setCookieEnumByAjax(nameList[i]);
            }
        },
        getCookieEnum: function (name) {
            var enumStr = thisTool.cookie(name);
            return thisTool.string2json(enumStr);
        },

        //load enum
        loadEnum: function (name) {
            var _this = this;
            var data = {}, url;
            data[this.opts.enumKey] = name;
            url = this.opts.enumUrl.replace("{" + this.opts.enumKey + "}", name);
            var returnData = this.opts.ajax.call(this, {
                url: url,
                data: data,
                async: false
            });

            var enumData = null;
            if (returnData.success) {
                if (typeof _this.opts.dataFilter == 'function') {
                    returnData = _this.opts.dataFilter.call(_this, returnData);
                }
                enumData = returnData.rows;
                if (this.opts.enumCache === true) {
                    this.addEnum.call(this, name, enumData);
                }
            }

            return enumData;
        },
        loadEnumText: function (name, value) {
            var text = null;
            var data = {};
            data[this.opts.enumKey] = name;
            data[this.opts.enumNameKey] = value;

            this.opts.ajax.call(this, {
                url: this.opts.enumTextUrl,
                data: data,
                async: false
            });

            return text;
        },

        //get enum
        getEnum: function (name) {
            var enumData = this.enumData[name];

            if (enumData == null && this.opts.cookieFlag == true) {
                enumData = this.getCookieEnum.call(this, name);
            }

            if (enumData == null && this.opts.ajaxFlag == true) {
                enumData = this.loadEnum.call(this, name);
            }

            return enumData;
        },
        getEnumText: function (name, value) {
            var enumData = this.getEnum(name);
            var text = value;

            if (enumData) {
                for (var i = 0; i < enumData.length; i++) {
                    if (enumData[i][this.opts.valueField] == value) {
                        text = enumData[i][this.opts.textField];
                        break;
                    }
                }
            } else {
                if (console && console.log) {
                    console.log(thisTool.i18n.get('enum_cannot_found', name));
                }
            }

            return text;
        },
        getEnumOption: function (name, value) {
            var enumData = this.getEnum(name);
            var option = null;

            if (enumData) {
                for (var i = 0; i < enumData.length; i++) {
                    if (enumData[i][this.opts.valueField] == value) {
                        option = enumData[i];
                        break;
                    }
                }
            } else {
                if (console && console.log) {
                    console.log(thisTool.i18n.get('enum_cannot_found', name));
                }
            }

            return option;
        },
        setOptions: function (param) {
            $.extend(true, this.opts, param);
            return this;
        }
    };

    thisTool.ENUM = ENUM;
    thisTool.enum = new ENUM();
})(jQuery);
/*!/dolphin/js/pagination.js*/
(function ($) {
    var thisTool = Dolphin;

    function PAGINATION(param) {
        this.init(param);

        return this;
    }

    PAGINATION.defaults = {
        panel: "",								        //生成区别，遵循jQuery选择器规则
        pageSize: 10,										//每页条数
        pageNumber: 1,									//当前页码

        pageSizeOption: [5, 10, 20, 50],					//每页条数可选项
        indexStart: 1,									//页码起始号
        simpleFlag: false,                              //简化分页条

        type: "page",										//分页展现类型 page, more

        onChangePageSize: null,							//事件
        onChangePageNumber: null,
        onChange: null
    };


    PAGINATION.prototype = {
        /* ==================== property ================= */
        constructor: PAGINATION,
        data: null,
        morePanel: null,

        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, PAGINATION.defaults, param);

            this.render();

            return this;
        },
        initData: function (data) {
            this.data = data;
            $.extend(this.opts, data);

            return this;
        },

        render: function () {
            switch (this.opts.type) {
                case "more":
                    this.renderMore();
                    break;
                default:
                    this.renderPage();
            }

            return this;
        },

        renderPage: function () {
            var _this = this, i;
            var footer = $('<div class="listFooter">').appendTo(_this.opts.panel);
            var pageInfo = $('<span class="pageInfo">').appendTo(footer);
            if (_this.opts.simpleFlag) {
                pageInfo.append("每页");
            } else {
                pageInfo.append("每页显示");
            }
            var pageSize = $('<select class="_pageSize">').appendTo(pageInfo);
            for (i = 0; i < _this.opts.pageSizeOption.length; i++) {
                $('<option value="' + _this.opts.pageSizeOption[i] + '">').html(_this.opts.pageSizeOption[i]).appendTo(pageSize);
            }
            pageInfo.append("条");
            if (!_this.opts.simpleFlag) {
                pageInfo.append("，当前显示第 ");
                $('<span class="pageInfoNum _infoStart">').html(0).appendTo(pageInfo);
                pageInfo.append(" 到 ");
                $('<span class="pageInfoNum _infoEnd">').html(0).appendTo(pageInfo);
                pageInfo.append(" 条");
            }
            pageInfo.append("，共 ");
            $('<span class="pageInfoNum _infoTotal">').html(0).appendTo(pageInfo);
            pageInfo.append(" 条记录。");

            $('<nav class="pagination">').addClass(_this.opts.paginationClass).appendTo(footer);

            //event
            pageSize.change(function () {
                _this.opts.pageSize = this.value;
                if (typeof _this.opts.onChangePageSize == "function") {
                    _this.opts.onChangePageSize.call(_this);
                }
                if (typeof _this.opts.onChange == "function") {
                    _this.opts.onChange.call(_this);
                }
            });

            return this;
        },
        renderMore: function () {
            var _this = this;
            this.moreButton = $('<button type="button" class="btn btn-default btn-block default-hidden">点击加载更多</button>').click(function () {
                _this.opts.pageNumber++;
                if (typeof _this.opts.onChangePageNumber == "function") {
                    _this.opts.onChangePageNumber.call(_this);
                }
                if (typeof _this.opts.onChange == "function") {
                    _this.opts.onChange.call(_this);
                }
            }).appendTo(this.opts.panel);

            return this;
        },

        refresh: function () {
            switch (this.opts.type) {
                case "more":
                    this.refreshMore();
                    break;
                default:
                    this.refreshPage();
            }

            return this;
        },

        refreshPage: function () {
            var _this = this;
            if (!_this.data) {
                _this.data = {total: 0};
            }
            //======== pagination
            var pagination = '', totalPage = Math.ceil(_this.data.total / _this.opts.pageSize);

            pagination += '<ul class="pagination">';
            pagination += '	<li class="' + (_this.opts.pageNumber <= 1 ? 'disabled' : '') + '"><a class="' + (_this.opts.pageNumber > 1 ? 'changePage' : '') + '" targetPage="' + (_this.opts.pageNumber - 1) + '" href="javascript:void(0)" aria-label="Previous"> <span';
            pagination += '			aria-hidden="true">&laquo;</span>';
            pagination += '	</a></li>';
            if (totalPage > 5) {
                if (this.opts.pageNumber > 3) {
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + 1 + '">' + 1 + '</a></li>';
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + (_this.opts.pageNumber - 3) + '">...</a></li>';
                }
            }
            var startCount = _this.opts.pageNumber - 3;
            if (_this.opts.pageNumber < 3 || totalPage <= 5) {
                startCount = 0;
            } else if (totalPage > 5 && _this.opts.pageNumber > totalPage - 3) {
                startCount = totalPage - 5;
            }
            for (var i = 0; i < Math.min(totalPage, 5); i++) {
                pagination += '	<li class="' + (startCount + i + 1 == _this.opts.pageNumber ? 'active' : '') + '"><a class="changePage" href="javascript:void(0)" targetPage="' + (startCount + i + 1) + '">' + (startCount + i + 1) + '</a></li>';
            }
            if (totalPage > 5) {
                if (_this.opts.pageNumber < totalPage - 2) {
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + (_this.opts.pageNumber - 0 + 3) + '">...</a></li>';
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + totalPage + '">' + totalPage + '</a></li>';
                }
            }
            pagination += '	<li class="' + (_this.opts.pageNumber >= totalPage ? 'disabled' : '') + '"><a class="' + (_this.opts.pageNumber < totalPage ? 'changePage' : '') + '" targetPage="' + (_this.opts.pageNumber - 0 + 1) + '" href="javascript:void(0)" aria-label="Next"> <span';
            pagination += '			aria-hidden="true">&raquo;</span>';
            pagination += '	</a></li>';
            pagination += '</ul>';

            $(_this.opts.panel).find('nav').html(pagination);
            $(_this.opts.panel).find('.changePage').bind('click', function () {
                _this.opts.pageNumber = $(this).attr('targetPage');
                if (typeof _this.opts.onChangePageNumber == "function") {
                    _this.opts.onChangePageNumber.call(_this);
                }
                if (typeof _this.opts.onChange == "function") {
                    _this.opts.onChange.call(_this);
                }
            });

            //========= pageInfo
            $(_this.opts.panel).find('._pageSize').val(_this.opts.pageSize);
            $(_this.opts.panel).find('._infoStart').html(Math.min((_this.opts.pageSize * (_this.opts.pageNumber - 1) + 1), _this.data.total));
            $(_this.opts.panel).find('._infoEnd').html(Math.min((_this.opts.pageSize * _this.opts.pageNumber), _this.data.total));
            $(_this.opts.panel).find('._infoTotal').html(_this.data.total);

            return this;
        },
        refreshMore: function () {
            if (!this.data || this.opts.pageSize * this.opts.pageNumber > this.data.total) {
                this.moreButton.hide();
            } else {
                this.moreButton.show();
            }
            return this;
        },
        empty: function () {
            this.data = {total: 0};
            this.refresh();
        }
    };

    thisTool.PAGINATION = PAGINATION;
})(jQuery);
/*!/dolphin/js/list.js*/
(function ($) {
    var thisTool = Dolphin;

    function LIST(param) {
        this.init(param);
        if (this.opts.data) {
            this.loadData(this.opts.data);
        } else if (this.opts.url) {
            this.load();
        }
    }

    LIST.defaults = {
        id: null,											//随机id
        panel: "#planList",								//生成区别，遵循jQuery选择器规则
        columns: null,									//列属性，[{code:"", title:"", width:"", formatter:function(val, row, index){}, orderFlag:boolean, groupFlag:boolean, children:[]}]
        hideHeader: false,								//是否隐藏表头
        striped: true,									//是否隔行变色
        bordered: true,									//是否有边框
        hover: true,										//是否鼠标移上时变色
        rowIndex: true,									//是否带行号
        checkbox: true,									//是否有选择框
        multiple: true,									//是否多选
        clickForCheck: true,								//单击行时是否切换选择状态
        width: null,										//列表总宽度
        height: null,										//列表总高度

        title: null, 										//列表标题
        panelType: 'panel-primary',					//面板颜色
        titleIcon: 'glyphicon-list',					//表头图标

        groupIcon: {										//分组图标
            group: 'glyphicon-list',
            unGroup: 'glyphicon-tags'
        },
        orderIcon: {										//排序图标
            no: 'glyphicon-sort',
            asc: 'glyphicon-sort-by-attributes',
            desc: 'glyphicon-sort-by-attributes-alt'
        },

        data: null,										//前台数据{total:40, rows:[]}
        idField: 'id',
        url: null,										//远程数据url
        queryParams: null,								//查询条件
        sortName: null,									//排序属性
        sortOrder: null,									//排序方式
        sortFlag: false,									//默认是否带排序
        ajax: thisTool.ajax,								//统一ajax事件
        ajaxType: "get",									//ajax默认提交类型
        pathData: null,									//路径参数

        pagination: true,									//是否带分页，分页请求参数pageSize, pageNumber
        pageSize: 10,										//每页条数
        pageNumber: 1,										//当前页数
        paginationClass: null,							//分页条class
        pageSizeOption: [5, 10, 20, 50],					//每页显示条数选项
        paginationSimpleFlag: false, 					//简化分页条

        editFlag: false,									//可编辑列表
        editListName: 'tableName',						//属性名称

        checkedOverCurPage: false,						//分页选中
        checkedData: null,								//初始选中状态

        onClick: null,									//单击行事件
        onCheck: null,									//选中状态切换事件
        onChecked: null,									//选中事件
        onUnchecked: null,								//取消选中事件
        onLoad: null,										//列表加载完成时调用
        onLoadSuccess: null,								//列表加载成功时调用
        dataFilter: null,								//请求事件过滤
        onAddRow: null,									//列表编辑，添加行时触发
        onRemoveRow: null,								//列表编辑，删除行时触发

        mockPathData: null,								//测试数据
        loadingFlag: true,								//加载状态

        __id__: null										//虚拟id
    };

    LIST.prototype = {
        /* ==================== property ================= */
        constructor: LIST,
        __columns: null,
        data: null,
        pagination: null,
        tbody: null,
        panelTitleDOM: null,
        groupCount: 0,
        groupCode: null,


        /* ===================== method ================== */
        init: function (param) {
            var thisList = this,
                panel, panelHeader, panelTitle;
            this.opts = $.extend({}, LIST.defaults, param);

            $(this.opts.panel).data('dolphin', thisList);

            if (!this.opts.id) {
                this.opts.id = Math.round(Math.random() * Math.pow(10, 6));
            }

            if (this.opts.title) {
                panel = $('<div class="panel">').addClass(this.opts.panelType).appendTo(this.opts.panel);

                panelHeader = $('<div class="panel-heading">').appendTo(panel);
                thisList.panelTitleDOM = $('<h3 class="panel-title">').appendTo(panelHeader);
                $('<span class="glyphicon">').addClass(this.opts.titleIcon).appendTo(thisList.panelTitleDOM);
                thisList.panelTitleDOM.append(" ");
                thisList.panelTitleDOM.append(this.opts.title);
            } else {
                panel = $(this.opts.panel);
            }

            var div = $('<div class="list-table">').addClass('dolphin_list').appendTo(panel);
            var table = $('<table>').addClass('table').appendTo(div);
            //table-style
            if (this.opts.width) {
                div.css({
                    'width': this.opts.width
                });
            }
            if (this.opts.height) {
                div.css('height', this.opts.height);
            }
            if (this.opts.maxHeight) {
                div.css('max-height', this.opts.maxHeight);
            }
            if (this.opts.striped) {
                table.addClass('table-striped');
            }
            if (this.opts.bordered) {
                table.addClass('table-bordered');
            }
            if (this.opts.hover) {
                table.addClass('table-hover');
            }
            if (this.opts.editFlag) {
                $(this.opts.panel).addClass('table-edit');
                $(this.opts.panel).attr('tableName', this.opts.editListName);
            }
            //table-header
            this.initTheader(table);

            //table-body
            this.tbody = $('<tbody class="list_body">').appendTo(table);

            //bind function
            if (this.opts.checkbox && this.opts.multiple) {
                table.find('.checkAll').bind('click', function () {
                    var checkAll = this;
                    table.find('.selectedItem').each(function () {
                        this.checked = checkAll.checked;
                    });
                });
            }
            if (this.opts.editFlag) {
                table.find('.editButtonCol .addRow').bind('click', function () {
                    thisList.addRowWithData({}, null);
                });
            }
            if (this.opts.pagination) {
                this.pagination = new thisTool.PAGINATION({
                    panel: div,
                    pageSize: this.opts.pageSize,
                    pageNumber: this.opts.pageNumber,
                    pageSizeOption: this.opts.pageSizeOption,
                    simpleFlag: this.opts.paginationSimpleFlag,
                    onChange: function () {
                        thisList.opts.pageSize = this.opts.pageSize;
                        thisList.opts.pageNumber = this.opts.pageNumber;
                        thisList.load();
                    }
                });
            }
            if (this.opts.loadingFlag) {
                this.initLoading(div);
            }

            return this;
        },
        initTheader: function (tablePanel) {
            var table = tablePanel || $(this.opts.panel).find('table');
            var thisList = this,
                tHead, tr, checkAll,
                button, orderButton, groupButton,
                th, checkboxTh, rowIndexTh, editButtonTh,
                header = [], maxLevel;
            this.__columns = [];
            maxLevel = initHeaderData(this.opts.columns, 0).level;

            function initHeaderData(data, level) {
                var callee = arguments.callee,
                    size = {level: 1, length: 0};
                header[level] = (header[level] || []).concat(data);

                data.forEach(function (d, i) {
                    var childrenSize;
                    if (d.children) {
                        childrenSize = callee(d.children, level + 1);
                        size.level = Math.max(size.level, childrenSize.level + 1);
                        d.maxLevel = size.level;
                        d.colspan = childrenSize.length;
                        size.length += childrenSize.length;
                    } else {
                        size.length++;
                        thisList.__columns.push(d);
                    }
                });

                data.forEach(function (d, i) {
                    if (d.maxLevel) {
                        d.rowspan = size.level - d.maxLevel + 1;
                    } else {
                        d.rowspan = size.level;
                    }
                });

                return size;
            }

            tHead = $('<thead>');
            if (this.opts.hideHeader) {
                tHead.hide();
            }
            tr = $('<tr>').appendTo(tHead);

            if (this.opts.checkbox) {
                checkboxTh = $('<th class="checkboxTh" >').attr({
                    rowspan: maxLevel
                }).appendTo(tr);
                if (this.opts.multiple) {
                    checkAll = $('<input type="checkbox" class="checkAll" />').appendTo(checkboxTh);
                }
            }

            if (this.opts.rowIndex) {
                rowIndexTh = $('<th class="rowIndexTh" >').attr({
                    rowspan: maxLevel
                }).html('#').appendTo(tr);
            }

            function renderTHeaderCol(column, i, panel) {
                th = $('<th>').attr({
                    'colCode': column.code,
                    'rowspan': column.rowspan,
                    'colspan': column.colspan
                }).html(column.title || column.code).appendTo(panel);
                if (column.hidden) {
                    th.addClass('hiddenCol');
                }
                if (column.orderFlag || thisList.opts.orderFlag) {
                    orderButton = $('<span class="glyphicon iconButton">').addClass(thisList.opts.orderIcon.no).attr({
                        'aria-hidden': true,
                        colOrderCode: column.code
                    }).bind('click', function () {
                        var style = $(this).hasClass(thisList.opts.orderIcon.asc) ? "asc" : ($(this).hasClass(thisList.opts.orderIcon.desc) ? "desc" : "no");
                        var code = $(this).attr('colOrderCode');
                        table.find('.' + thisList.opts.orderIcon.asc + "," + '.' + thisList.opts.orderIcon.desc)
                            .removeClass(thisList.opts.orderIcon.asc).removeClass(thisList.opts.orderIcon.desc);
                        switch (style) {
                            case "no":
                                $(this).addClass(thisList.opts.orderIcon.asc);
                                thisList.sort(code, "asc");
                                break;
                            case "asc":
                                $(this).addClass(thisList.opts.orderIcon.desc);
                                thisList.sort(code, "desc");
                                break;
                            case "desc":
                                thisList.sort(null, null);
                                break;
                            default :
                                console.log("Error in order by " + code);
                        }
                    }).appendTo(th);
                }
                if (column.groupFlag) {
                    groupButton = $('<span class="glyphicon iconButton">').addClass(thisList.opts.groupIcon.group).attr({
                        'aria-hidden': true,
                        colOrderCode: column.code
                    }).bind('click', function () {
                        if ($(this).hasClass(thisList.opts.groupIcon.group)) {
                            table.find('.' + thisList.opts.groupIcon.unGroup).removeClass(thisList.opts.groupIcon.unGroup).addClass(thisList.opts.groupIcon.group);
                            $(this).addClass(thisList.opts.groupIcon.unGroup).removeClass(thisList.opts.groupIcon.group);
                            thisList.group($(this).attr('colGroupCode'));
                        } else {
                            $(this).addClass(thisList.opts.groupIcon.group).removeClass(thisList.opts.groupIcon.unGroup);
                            thisList.group(null);
                        }
                    }).appendTo(th);
                }
            }

            header.forEach(function (headers, i) {
                var panel;
                if (i == 0) {
                    panel = tr;
                } else {
                    panel = $('<tr>').appendTo(tHead);
                }
                headers.forEach(function (column, i) {
                    renderTHeaderCol(column, i, panel);
                })
            });

            if (thisList.opts.editFlag) {
                editButtonTh = $('<th class="editButtonCol" >').attr({
                    rowspan: maxLevel
                }).appendTo(tr);
                button = $('<button type="button" class="btn btn-success btn-xs addRow">').appendTo(editButtonTh);
                $('<span class="glyphicon glyphicon-plus"></span>').appendTo(button);
            }

            table.append(tHead);

            return this;
        },
        initLoading: function (panel) {
            this.loadingPanel = thisTool.initLoadingPanel(panel);
        },
        setColumns: function (columns, param) {
            this.opts.columns = columns;
            $.extend(this.opts, param);
            $(this.opts.panel).empty();

            this.init(this.opts);
            if (this.opts.data) {
                this.loadData(this.opts.data);
            } else if (this.opts.url) {
                this.load();
            }

            return this;
        },
        setTitle: function (title, icon) {
            var _this = this;
            if (_this.opts.title) {
                _this.panelTitleDOM.empty();
                $('<span class="glyphicon">').addClass(icon || this.opts.titleIcon).appendTo(_this.panelTitleDOM);
                _this.panelTitleDOM.append(" ");
                _this.panelTitleDOM.append(title || this.opts.title);
            }
            return _this;
        },

        empty: function () {
            this.data = {rows: [], total: 0};
            this.tbody.empty();
            if (this.opts.pagination) {
                this.pagination.empty();
            }

            return this;
        },
        loadData: function (newData) {
            this.empty();
            this.data = newData;

            if (typeof this.opts.dataFilter === 'function') {
                this.data = this.opts.dataFilter.call(this, newData) || this.data;
            }

            this.groupCount = 0;
            this.groupCode = null;

            if (this.opts.pagination) {
                this.pagination.initData({
                    total: newData.total,
                    pageSize: this.opts.pageSize,
                    pageNumber: this.opts.pageNumber
                }).refresh();
            }

            this.initRows();

            if (typeof this.opts.onLoadSuccess === 'function') {
                this.opts.onLoadSuccess.call(this, this.data);
            }
            if (typeof this.opts.onLoad === 'function') {
                this.opts.onLoad.call(this, this.data);
            }

            return this;
        },
        load: function (url, queryParams) {
            if (this.opts.loadingFlag) {
                this.loadingPanel.show();
            }

            var thisList = this;
            if (url) {
                this.opts.url = url;
            } else {
                url = this.opts.url;
            }
            if (queryParams) {
                this.opts.queryParams = queryParams;
            }


            this.groupCount = 0;

            var queryCondition = $.extend({}, this.opts.queryParams);
            if (this.opts.pagination) {
                url = thisTool.urlAddParam(url, {
                    pageSize: this.opts.pageSize,
                    pageNumber: this.opts.pageNumber - 1
                });
                $.extend(queryCondition, {
                    pageSize: this.opts.pageSize,
                    pageNumber: this.opts.pageNumber - 1
                });
            }
            if (this.opts.sortName) {
                url = thisTool.urlAddParam(url, {
                    sortName: this.opts.sortName,
                    sortOrder: this.opts.sortOrder
                });
            }
            if (this.groupCode) {
                $.extend(queryCondition, {groupCode: this.groupCode});
            }

            var _data;
            if (this.opts.ajaxType == 'get') {
                _data = queryCondition;
            } else {
                _data = Dolphin.json2string(queryCondition);
            }

            this.opts.ajax({
                url: url,
                data: _data,
                type: this.opts.ajaxType,
                mockPathData: this.opts.mockPathData,
                pathData: this.opts.pathData,
                onSuccess: function (data, textStatus) {
                    thisList.empty();

                    if (typeof thisList.opts.dataFilter === 'function') {
                        data = thisList.opts.dataFilter.call(thisList, data) || data;
                    }
                    thisList.data = data;
                    if (thisList.opts.pagination) {
                        thisList.pagination.initData({
                            total: data.total,
                            pageSize: thisList.opts.pageSize,
                            pageNumber: thisList.opts.pageNumber
                        }).refresh();
                    }

                    thisList.initRows();

                    if (typeof thisList.opts.onLoadSuccess === 'function') {
                        thisList.opts.onLoadSuccess.call(thisList, thisList.data);
                    }
                    if (typeof thisList.opts.onLoad === 'function') {
                        thisList.opts.onLoad.call(thisList, thisList.data);
                    }
                },
                onComplete: function (XMLHttpRequest, textStatus) {
                    if (thisList.opts.loadingFlag) {
                        thisList.loadingPanel.hide();
                    }
                }
            });
            return this;
        },
        reload: function (url, queryParams) {
            if (this.opts.pagination) {
                this.opts.pageNumber = 1;
            }
            this.load(url, queryParams);

            return this;
        },
        reloadCurPage: function (url, queryParams) {
            this.load(url, queryParams);

            return this;
        },
        reloadData: function () {
            this.empty();
            this.initRows();

            return this;
        },
        query: function (queryParams, pathData) {
            this.opts.pageNumber = 1;
            if (queryParams) {
                this.opts.queryParams = queryParams;
            }
            if (pathData) {
                this.opts.pathData = pathData;
            }
            this.load();

            return this;
        },
        group: function (code) {
            this.opts.sortName = null;
            this.opts.sortOrder = null;
            this.opts.groupCode = code;
            this.opts.pageNumber = 1;
            this.load();

            return this;
        },
        sort: function (sortName, sortOrder, queryParams) {
            this.opts.sortName = sortName;
            this.opts.sortOrder = sortOrder;
            this.opts.groupCode = null;
            this.opts.pageNumber = 1;
            if (queryParams) {
                this.opts.queryParams = queryParams;
            }
            this.load();

            return this;
        },
        goPage: function (pageNo) {
            this.opts.pageNumber = pageNo;
            this.load();

            return this;
        },

        initRows: function () {
            if (this.opts.checkbox && this.opts.multiple) {
                $(this.opts.panel).find('.checkAll')[0].checked = false;
            }

            if (this.data && this.data.rows) {
                for (var i = 0; i < this.data.rows.length; i++) {
                    this.addRow(this.data.rows[i], i + 1);
                }
                if (this.opts.pagination) {
                    this.pagination.refresh();
                }
            } else {

            }
            return this;
        },
        addRow: function (data, rowIndex) {
            if (data.__type == "group_total_row") {
                return this.addTotalRow(data, rowIndex);
            } else {
                return this.addDataRow(data, rowIndex);
            }
        },
        addRowWithData: function (data, rowIndex) {
            this.addRow(data, rowIndex);
            this.data.rows.push(data);
        },
        addTotalRow: function (data, rowIndex) {
            var thisList = this;
            this.groupCount++;

            var row = $('<tr>').addClass('total_row').appendTo(thisList.tbody);

            var colspan = 0, colName = "";
            if (this.opts.checkbox) {
                colspan++;
            }
            if (this.opts.rowIndex) {
                colspan++;
            }
            for (var i = 0; i < this.__columns.length; i++) {
                if (!this.__columns[i].hidden) {
                    colspan++;
                }
                if (this.__columns[i].code == data.__group_code) {
                    colName = this.__columns[i].title;
                }
            }

            var col = $('<td>').attr('colspan', colspan).appendTo(row);

            if (typeof this.opts.totalFormatter == 'function') {
                col.append(this.opts.totalFormatter.call(thisList, data, colName));
            } else {
                $('<span class="listGroupTotal">').html(colName + "：" + data.__group_value).appendTo(col);
                $('<span class="listGroupTotal">').html("总计" + "：" + data.__count + "条").appendTo(col);
            }

            return this;
        },
        addDataRow: function (data, rowIndex) {
            var thisList = this;
            data.__id__ = thisTool.random(8);

            var row = $('<tr>');
            row.data('data', data).attr("__id__", data.__id__);

            var html = '', col = null;
            if (this.opts.checkbox) {
                var checkboxInput = $('<input value="' + data[thisList.opts.idField] + '" name="' + thisList.opts.id + 'selectedItem" class="selectedItem" >');
                checkboxInput.attr('type', (thisList.opts.multiple ? 'checkbox' : 'radio'));
                //(this.opts.multiple&&typeof(this.opts.check)!= "undefined"&&this.opts.check?'checked':'')

                var checkboxCol = $('<td>').append(checkboxInput).appendTo(row);
            }
            if (this.opts.rowIndex) {
                $('<td scope="row">').html(rowIndex - this.groupCount).appendTo(row);
            }
            $.each(this.__columns, function (i, column) {
                var value, valueArr, level, curLevelData;
                col = $('<td>').attr('columnCode', column.code).appendTo(row);
                if (column.width) {
                    col.css('width', column.width);
                }
                if (column.textAlign) {
                    col.css('text-align', column.textAlign);
                }
                if (column.wrap) {
                    col.css('white-space', 'nowrap');
                }
                if (column.hidden) {
                    col.addClass('hiddenCol');
                }

                if (typeof column.code == "string" && column.code.indexOf('.') > 0) {
                    valueArr = column.code.split('.');
                    value = data;
                    for (level = 0; level < valueArr.length; level++) {
                        value = value[valueArr[level]];
                    }
                } else {
                    value = data[column.code];
                }

                if (column.formatter) {
                    col.html(column.formatter.call(this, value, data, rowIndex));
                } else {
                    if (thisList.opts.editFlag) {
                        var inputItem = null;
                        switch (column.editType) {
                            case "select":
                                inputItem = $('<select class="form-control">').attr({
                                    "options": column.options
                                });
                                thisTool.form.parseSelect(inputItem);
                                break;
                            case "number":
                                inputItem = $('<input type="number" class="form-control">').attr({
                                    placeholder: column.title
                                });
                                break;
                            default :
                                inputItem = $('<input type="text" class="form-control">').attr({
                                    placeholder: column.title
                                });
                        }
                        col.html(inputItem);

                        inputItem.attr({
                            "id": column.code,
                            "listName": column.code
                        });
                        if (column.readonly) {
                            inputItem.attr('readonly', 'readonly');
                        }

                        if (value) {
                            inputItem.val(value);
                        }

                        inputItem.bind('change.binding', function (e) {
                            if (column.code.indexOf('.') > 0) {
                                valueArr = column.code.split('.');
                                curLevelData = data;
                                for (level = 0; level < valueArr.length; level++) {
                                    if (level == (valueArr.length - 1)) {
                                        curLevelData[valueArr[level]] = this.value;
                                    } else {
                                        curLevelData = curLevelData[valueArr[level]];
                                    }
                                }
                            } else {
                                data[column.code] = this.value;
                            }
                        });
                    } else {
                        if (value === undefined || value === null) {
                            col.html("");
                        } else {
                            col.html(value + "");
                        }
                    }
                }
            });

            if (this.opts.editFlag) {
                var deleteButton = $('<button type="button" class="btn btn-danger btn-xs removeRow">')
                    .html('<span class="glyphicon glyphicon-trash"></span>')
                    .click(function (e) {
                        if (typeof thisList.opts.onRemoveRow == 'function') {
                            if (thisList.opts.onRemoveRow.call(thisList, data, event, row) === false) {

                            } else {
                                removeRow()
                            }
                        } else {
                            removeRow()
                        }

                        function removeRow() {
                            thisList.removeRow(data.__id__);
                        }
                    });
                $('<td class="editButtonCol">').html(deleteButton).appendTo(row);

            }

            $(thisList.tbody).append(row);

            if (this.opts.checkbox) {
                checkboxInput.bind('change', function (event) {
                    if (thisList.opts.checkedData) {
                        if (this.checked) {
                            thisList.opts.checkedData.push(data);
                        } else {
                            thisList.opts.checkedData.splice(thisTool.objIndexOfArray(data, thisList.opts.checkedData, function (a, b) {
                                return a[thisList.opts.idField] === b[thisList.opts.idField];
                            }), 1);
                        }
                    }

                    if (typeof thisList.opts.onCheck === 'function') {
                        thisList.opts.onCheck.call(thisList, data, row, this);
                    }
                    if (typeof thisList.opts.onChecked === 'function') {
                        if (this.checked) {
                            thisList.opts.onChecked.call(thisList, data, row, this);
                        }
                    }
                    if (typeof thisList.opts.onUnchecked === 'function') {
                        if (!this.checked) {
                            thisList.opts.onUnchecked.call(thisList, data, row, this);
                        }
                    }
                });
            }
            if (this.opts.checkbox && this.opts.clickForCheck) {
                row.bind('click', function (event) {
                    if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'select' && event.target.tagName.toLowerCase() !== 'button' && event.target.tagName.toLowerCase() !== 'a') {
                        if (thisList.opts.multiple) {
                            thisTool.toggleCheck(row.find('.selectedItem'));
                        } else {
                            thisTool.toggleCheck(row.find('.selectedItem'), true);
                        }
                    }
                });
            }
            if (typeof this.opts.onClick === 'function') {
                row.bind('click', function (event) {
                    if (!$(event.target).hasClass('selectedItem') && !$(event.target).hasClass('btn')) {
                        thisList.opts.onClick.call(thisList, data, row, event);
                    }
                });
            }

            //backfill
            if (thisList.opts.checkbox
                && thisList.opts.checkedData
                && (thisTool.objInArray(data[thisList.opts.idField], thisList.opts.checkedData, function (a, b) {
                    return a == b[thisList.opts.idField];
                }) || data.__checked === true)) {
                checkboxInput.attr('checked', 'checked').change();
            }

            //避免第一条被选中时，勾中全选框
            if (this.opts.checkbox && this.opts.multiple) {
                checkboxInput.bind('change', function (event) {
                    var selectedItem = $(thisList.opts.panel).find('.selectedItem'), checkAllFlag = true;
                    for (var i = 0; i < selectedItem.length; i++) {
                        if (!selectedItem[i].checked) {
                            checkAllFlag = false;
                            break;
                        }
                    }
                    $(thisList.opts.panel).find('.checkAll')[0].checked = checkAllFlag;
                });
            }

            return this;
        },

        removeRow: function (id) { //TODO
            for (var i = 0; i < this.data.rows.length; i++) {
                if (this.data.rows[i][this.opts.idField] == id || this.data.rows[i]['__id__'] == id) {
                    this.data.rows.splice(i, 1);
                    if (this.data.total) {
                        this.data.total--;
                    }
                    $(this.opts.panel).find("input[type=checkbox][value='" + id + "'],tr[__id__='" + id + "']").closest('tr').remove();
                }
            }
        },
        removeRowsById: function (ids) {
            for (var i = 0; i < ids.length; i++) {
                this.removeRow(ids[i])
            }
        },
        removeRows: function (data) {
            for (var i = 0; i < data.length; i++) {
                this.removeRow(data[i][this.opts.idField]);
            }
        },
        getRows: function () {
            return this.data.rows;
        },

        check: function (id) {
            if ($.isArray(id)) {
                for (var i = 0; i < id.length; i++) {
                    this.check(id[i]);
                }
            } else {
                var checkId = null;
                if (typeof id === "string") {
                    checkId = id;
                } else {
                    checkId = id[this.opts.idField];
                }
                thisTool.toggleCheck($(this.opts.panel).find('input[value="' + checkId + '"]'), true);
            }
            return this;
        },
        unCheckAll: function () {
            thisTool.toggleCheck($(this.opts.panel).find('input[value="' + checkId + '"]'), false);
            this.checkedData = [];
        },
        getChecked: function () {
            if (this.opts.checkedOverCurPage) {
                return this.opts.checkedData;
            } else {
                var thisList = this;
                var selectedItem = $(this.opts.panel).find('.selectedItem:checked');
                var returnData = [];

                for (var i = 0; i < selectedItem.length; i++) {
                    returnData.push(selectedItem.eq(i).closest('tr').data('data'));
                }

                return returnData;
            }
        },
        length: function () {
            return this.data.rows.length;
        },
        getName: function (data) {
            var name;
            if (typeof this.opts.nameField == 'function') {
                name = this.opts.nameField.call(this, data);
            } else {
                name = data[this.opts.nameField];
            }
            return name;
        }
    };

    thisTool.LIST = LIST;
})(jQuery);
/*!/dolphin/js/tree.js*/
(function ($) {
    var thisTool = Dolphin;

    function TREE(param) {
        this.init(param);
    }

    TREE.defaults = {
        id: null,	//随机id
        url: null,
        data: null,
        panel: "body",

        idField: 'id',
        nameField: 'name',

        queryParams: null,
        ajax: thisTool.ajax,
        defaultId: -1,
        requestKey: 'id',

        checkbox: true,
        multiple: true,
        cascadeCheck: true,
        onlyLeafCheck: false,
        clickForCheck: true,

        checkedOverCurPage: false,							//分页选中
        checkedData: [],

        onload: null,
        onClick: null,
        onQuery: null,
        onChecked: null,

        icon: {
            folder_open: 'glyphicon glyphicon-folder-open',
            folder_close: 'glyphicon glyphicon-folder-close',
            file: 'glyphicon glyphicon-file'
        }
    };

    TREE.prototype = {
        /* ==================== property ================= */
        constructor: TREE,
        data: null,

        lastQueryStr: null,
        queryResult: null,
        queryCount: null,


        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, TREE.defaults, param);
            if (!this.opts.id) {
                this.opts.id = Math.round(Math.random() * Math.pow(10, 6));
            }

            if (this.opts.data) {
                this.loadData(this.opts.data);
                this.initData(this.data, null);
                this.render(this.data, $(this.opts.panel));
                if (typeof this.opts.onLoad == 'function') {
                    this.opts.onLoad.call(this);
                }
            } else if (this.opts.url) {
                this.load(function (data) {
                    this.initData(this.data, null);
                    this.render(this.data, $(this.opts.panel));
                    if (typeof this.opts.onLoad == 'function') {
                        this.opts.onLoad.call(this);
                    }
                });
            }
        },
        reload: function () {
            this.load(function (data) {
                this.initData(this.data, null);
                this.render(this.data, $(this.opts.panel));

                if (typeof this.opts.onLoad == 'function') {
                    this.opts.onLoad.call(this);
                }
            });
        },
        empty: function () {
            $(this.opts.panel).empty();
        },
        loadData: function (newData) {
            this.data = newData;
        },
        load: function (callback) {
            var thisTree = this;
            var queryCondition = $.extend({}, this.opts.queryParams);
            var _url = this.opts.url.replace('{' + this.opts.requestKey + '}', this.opts.defaultId);
            this.opts.ajax({
                url: _url,
                data: queryCondition,
                mockPathData: this.opts.mockPathData,
                onSuccess: function (data) {
                    thisTree.data = data.rows;
                    if (typeof callback == 'function') {
                        callback.call(thisTree, data);
                    }
                },
                onError: function (data) {
                    thisTree.data = [];
                }
            });
        },
        initData: function (dataList, _parent) {
            var thisTree = this;
            var callee = arguments.callee;
            $.each(dataList, function (i, data) {
                if (_parent != null) {
                    data._parent = _parent;
                }
                if (typeof thisTree.opts.dataFilter == 'function') {
                    data = thisTree.opts.dataFilter.call(thisTree, data);
                }

                if (data.children) {
                    callee.call(thisTree, data.children, data);
                }
            });
        },
        render: function (nodeList, panel) {
            var thisTree = this;

            panel.addClass('Dolphin-tree');
            panel.empty();

            var callee = arguments.callee;
            var table = $("<table></table>").attr("id", thisTree.opts.id + "_grid").addClass("tree-table").appendTo(panel);
            var tbody = $("<tbody></tbody>").attr("id", thisTree.opts.id + "_body").appendTo(table);

            $.each(nodeList, function (i, node) {
                var treeItem = $("<tr>").addClass("treeItem").attr('itemType', node.type).appendTo(tbody);
                node.target = treeItem;

                //节点图标
                var treeItemIcon = $("<td>").css({width: "20px"}).appendTo(treeItem);
                if (node.type == 'folder') {
                    treeItemIcon.html('<span class="' + thisTree.opts.icon.folder_close + ' toggleIcon" aria-hidden="true"></span>');
                } else {
                    treeItemIcon.html('<span class="' + thisTree.opts.icon.file + '" aria-hidden="true"></span>');
                }

                //复选框
                if (thisTree.opts.checkbox) {
                    if (thisTree.opts.onlyLeafCheck && node.type == 'folder') {
                        $("<td>").css({width: "20px"}).appendTo(treeItem);
                    } else {
                        var treeItemCheckbox = $("<td>").css({width: "20px"}).appendTo(treeItem);
                        var itemCheckbox = $('<input id="' + thisTree.opts.id + '_item_1" name="' + thisTree.opts.id + 'selectedItem" class="selectedItem" title="' + thisTree.getName(node) + '" style="margin-top: 0px;" >');
                        itemCheckbox.attr('type', (thisTree.opts.multiple ? 'checkbox' : 'radio')).val(node[thisTree.opts.idField]).appendTo(treeItemCheckbox);
                    }
                }

                var treeItemLabel = $("<td>").addClass('tree-label').html(thisTree.getName(node)).appendTo(treeItem);
                if (node.type == 'folder' && node.children) {
                    var childrenItemTr = $('<tr class="treeChildren" hidden >').appendTo(tbody);
                    node.childrenTarget = childrenItemTr;
                    var childrenItem = $('<td style="padding-left: 20px;padding-right: 0px;" colspan="3">').appendTo(childrenItemTr);
                    callee.call(thisTree, node.children, childrenItem);
                    node.hasLoadChildren = true;
                } else {
                    node.hasLoadChildren = false;
                }

                //bind function
                if (thisTree.opts.onClick) {
                    treeItemLabel.bind('click', function () {
                        thisTree.opts.onClick.call(thisTree, node);
                    });
                }
                if (thisTree.opts.checkbox && thisTree.opts.clickForCheck) {
                    treeItem.bind('click', function (event) {
                        if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'select' && event.target.tagName.toLowerCase() !== 'button' && event.target.tagName.toLowerCase() !== 'a' && !$(event.target).hasClass('toggleIcon')) {
                            if (thisTree.opts.multiple) {
                                thisTool.toggleCheck(itemCheckbox);
                            } else {
                                thisTool.toggleCheck(itemCheckbox, true);
                            }
                        }
                    });
                }
                if (thisTree.opts.checkbox) {
                    itemCheckbox.bind('change.onChekced', function () {
                        if (this.checked) {
                            if (typeof thisTree.opts.onChecked === 'function') {
                                thisTree.opts.onChecked.call(thisTree, node);
                            }
                        } else {
                            if (typeof thisTree.opts.onUnChecked === 'function') {
                                thisTree.opts.onUnChecked.call(thisTree, node);
                            }
                        }
                        if (typeof thisTree.opts.onCheck === 'function') {
                            thisTree.opts.onCheck.call(thisTree, node, this);
                        }
                    });
                }


                //切换子节点显示隐藏
                treeItem.find(".toggleIcon").click(function () {
                    if ($(this).hasClass(thisTree.opts.icon.folder_close)) {
                        thisTree.expend(node);
                    } else {
                        thisTree.collapse(node);
                    }
                });

                //操作选中数据
                if (thisTree.opts.checkedOverCurPage && itemCheckbox) {
                    itemCheckbox.bind('change.checkedData', function (event) {
                        if (this.checked) {
                            if (!thisTool.objInArray(node, thisTree.opts.checkedData, function (a, b) {
                                    return a[thisTree.opts.idField] === b[thisTree.opts.idField];
                                })) {
                                thisTree.opts.checkedData.push(node);
                            }
                        } else {
                            thisTree.opts.checkedData.splice(thisTool.objIndexOfArray(node, thisTree.opts.checkedData, function (a, b) {
                                return a[thisTree.opts.idField] === b[thisTree.opts.idField];
                            }), 1);
                        }
                    });
                }
                //复选框，父子联动
                if (thisTree.opts.checkbox && thisTree.opts.cascadeCheck && thisTree.opts.multiple && !thisTree.opts.onlyLeafCheck) {
                    itemCheckbox.bind('change.parent', function () {
                        var childrenItem = $(this).closest(".treeChildren");
                        if (childrenItem.length != 0) {
                            var selectedItem = childrenItem.prev().find(".selectedItem");
                            if (this.checked) {
                                var thisItem = $(this).closest(".treeItem");
                                var items = thisItem.siblings(".treeItem");
                                var allChecked = true;
                                $.each(items, function (i, item) {
                                    if ($(item).find(".selectedItem")[0].checked == false) {
                                        allChecked = false;
                                        return false;
                                    }
                                });
                                if (allChecked) {
                                    selectedItem[0].checked = true;
                                    selectedItem.triggerHandler("change.checkedData");
                                }
                            } else {
                                selectedItem[0].checked = false;
                                selectedItem.triggerHandler("change.checkedData");
                            }
                            selectedItem.triggerHandler("change.parent");
                        }
                    }).bind('change.children', function () {
                        var thisCheckbox = this;
                        var thisItem = $(this).closest(".treeItem");
                        if (thisItem.attr('itemType') == 'folder') {
                            var childrenItem = thisItem.next();
                            if (childrenItem.length != 0) {
                                childrenItem.find(".selectedItem").each(function () {
                                    this.checked = thisCheckbox.checked;
                                    $(this).triggerHandler("change.checkedData");
                                });
                            }
                        }
                    });
                }

                //backfill
                if (thisTree.opts.checkbox) {
                    if (itemCheckbox && (thisTool.objInArray(node[thisTree.opts.idField], thisTree.opts.checkedData, function (a, b) {
                            return a == b[thisTree.opts.idField];
                        }) || node.__checked)) {
                        itemCheckbox.attr('checked', 'checked').change();
                    }
                }
            });
        },
        find: function (queryStr, dataSource) {
            var thisTree = this;
            var callee = arguments.callee;
            var returnNodeList = [], name;
            dataSource = dataSource || thisTree.data;
            $.each(dataSource, function (i, data) {
                if ((data[thisTree.opts.idField] && data[thisTree.opts.idField].indexOf(queryStr) >= 0) || (thisTree.getName(data) && thisTree.getName(data).indexOf(queryStr) >= 0)) {
                    if (thisTree.opts.onlyLeafCheck === false || (thisTree.opts.onlyLeafCheck === true && !(data.children && data.children.length > 0))) {
                        returnNodeList.push(data);
                    }
                }

                if (data.children) {
                    returnNodeList = returnNodeList.concat(callee.call(thisTree, queryStr, data.children));
                }
            });

            return returnNodeList;
        },
        findById: function (queryStr, dataSource) {
            var thisTree = this;
            var callee = arguments.callee;
            var returnNode = null;
            dataSource = dataSource || thisTree.data;
            for (var i = 0; i < dataSource.length; i++) {
                data = dataSource[i];
                if (data[thisTree.opts.idField] == queryStr) {
                    returnNode = data;
                    return returnNode;
                }

                if (data.children) {
                    returnNode = callee.call(thisTree, queryStr, data.children);
                    if (returnNode != null) {
                        break;
                    }
                }
            }

            return returnNode;
        },
        findByIds: function (queryIds, dataSource) {
            var thisTree = this;
            var callee = arguments.callee;
            var returnNodeList = [];
            dataSource = dataSource || thisTree.data;
            $.each(dataSource, function (i, data) {
                if (thisTool.objInArray(data[thisTree.opts.idField], queryIds)) {
                    returnNodeList.push(data);
                }

                if (data.children) {
                    returnNodeList = returnNodeList.concat(callee.call(thisTree, queryIds, data.children));
                }
            });

            return returnNodeList;
        },
        findByText: function (queryStr) {

        },
        expend: function (node) {
            var thisTree = this, _url, queryParams;
            node.target.find('.toggleIcon').removeClass(thisTree.opts.icon.folder_close);

            if (!node.hasLoadChildren) {
                _url = this.opts.url.replace('{' + this.opts.requestKey + '}', node[this.opts.idField]);
                queryParams = {};
                queryParams[this.opts.requestKey] = node[this.opts.idField];
                this.opts.ajax({
                    url: _url,
                    mockPathData: this.opts.mockPathData,
                    data: queryParams,
                    onSuccess: function (returnData) {
                        var childrenData = returnData.rows;
                        thisTree.initData(childrenData, node);

                        node.children = childrenData;

                        var childrenItemTr = $('<tr class="treeChildren" hidden>');
                        node.target.after(childrenItemTr);
                        node.childrenTarget = childrenItemTr;
                        var childrenItem = $('<td style="padding-left: 20px;padding-right: 0px;" colspan="3">').appendTo(childrenItemTr);
                        thisTree.render(node.children, childrenItem);
                        node.hasLoadChildren = true;

                        node.target.find('.toggleIcon').addClass(thisTree.opts.icon.folder_open);
                        node.target.next().toggle();
                    }
                });
            } else {
                node.target.find('.toggleIcon').addClass(thisTree.opts.icon.folder_open);
                node.target.next().toggle();
            }
        },
        expandTo: function (node) {
            var thisTree = this;
            var callee = arguments.callee;
            if (node && node._parent) {
                node._parent.target.next().show();
                node._parent.target.find(".toggleIcon").removeClass(thisTree.opts.icon.folder_close).addClass(thisTree.opts.icon.folder_open);

                callee.call(thisTree, node._parent);
            }
        },
        expandAll: function () {
            $(this.opts.panel).find(".toggleIcon").removeClass(this.opts.icon.folder_close).addClass(this.opts.icon.folder_open);
            $(this.opts.panel).find("tr.treeChildren").show();
        },
        collapse: function (node) {
            node.target.find('.toggleIcon').toggleClass(this.opts.icon.folder_close).toggleClass(this.opts.icon.folder_open);
            node.target.next().toggle();
        },
        collapseAll: function () {
            $(this.opts.panel).find(".toggleIcon").removeClass(this.opts.icon.folder_open).addClass(this.opts.icon.folder_close);
            $(this.opts.panel).find("tr.treeChildren").hide();
        },
        scrollTo: function (node) {
            if (node) {
                node.target.find('input').eq(0).focus();
            }
        },
        hightLight: function (node) {
            if (node) {
                node.target.addClass("highLight");
            }
        },
        cleanHightLight: function () {
            $(this.opts.panel).find(".treeItem.highLight").removeClass("highLight");
        },
        query: function (queryStr) {
            if (this.lastQueryStr == queryStr) {
                if (this.queryCount < this.queryResult.length) {

                } else {
                    this.queryCount = 0;
                }
            } else {
                this.queryResult = this.find(queryStr);
                this.queryCount = 0;
                this.lastQueryStr = queryStr;
            }
            this.collapseAll();
            this.cleanHightLight();

            this.hightLight(this.queryResult[this.queryCount]);
            this.expandTo(this.queryResult[this.queryCount]);

            if (typeof this.opts.onQuery === 'function') {
                this.opts.onQuery.call(this, this.queryResult, this.queryCount);
            }

            this.queryCount++;
        },
        check: function (node, changeFlag) {
            if (node) {
                node.target.find('.selectedItem')[0].checked = true;
                if (changeFlag) {
                    node.target.find('.selectedItem').change();
                }
            }
        },
        uncheck: function (node) {
            if (node) {
                node.target.find('.selectedItem')[0].checked = false;
                if (changeFlag) {
                    node.target.find('.selectedItem').change();
                }
            }
        },
        getChecked: function () {
            var thisTree = this;
            if (thisTree.opts.checkedOverCurPage) {
                return this.opts.checkedData;
            } else {
                var selectedItemList = $(this.opts.panel).find('.selectedItem:checked');
                var checkedList = [], returnData = [];
                for (var i = 0; i < selectedItemList.length; i++) {
                    checkedList.push(selectedItemList.eq(i).val());
                }

                returnData = this.findByIds(checkedList);

                return returnData;
            }
        },
        getName: function (data) {
            var _this = this, name;
            if (typeof _this.opts.nameField == 'function') {
                name = _this.opts.nameField.call(_this, data);
            } else {
                name = data[_this.opts.nameField];
            }
            return name;
        }
    };
    thisTool.TREE = TREE;
})(jQuery)
;
/*!/dolphin/js/horizontalTree.js*/
/**
 * ### Attention please: we don't need the Node Type[folder,leaf], when we use horizontalTree --Anjing
 */

(function ($) {
    var thisTool = Dolphin;

    function HORIZONTAL_TREE(param) {
        this.init(param);
        if (this.opts.data) {
            this.loadData(this.opts.data);
        } else if (this.opts.url) {
            this.load(null, null);
        }

        return this;
    }

    HORIZONTAL_TREE.defaults = {
        //required
        panel: null,								//
        url: null,
        data: null,

        //options
        fluid: false,
        idField: "id",
        nameField: "name",
        childrenField: "children",
        loadingFlag: true,
        ajax: thisTool.ajax,
        mockPathData: null,
        levelTitle: null,
        singleRoot: false,
        itemType: null,
        defaultId: -1,
        requestKey: 'id',

        buttons: [],
        buttonDefaultClass: 'btn-primary',
        itemButtons: [],

        //icon
        icon: {},

        queryParams: null,

        dataFilter: null
    };


    HORIZONTAL_TREE.prototype = {
        /* ==================== property ================= */
        constructor: HORIZONTAL_TREE,
        __panel__: null,
        panel: null,
        data: null,
        selectedItem: null,
        itemPanel: {},
        //TODO 强制触发刷新
        reloadFlag: false,

        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, HORIZONTAL_TREE.defaults, param);

            this.initLayout();

            return this;
        },

        initLayout: function () {
            var _this = this,
                horizontal_tree, table, tbody, tr, td,
                i;

            horizontal_tree = $('<div class="_horizontal_tree">').appendTo(this.opts.panel);
            if (_this.opts.fluid) {
                horizontal_tree.addClass('_horizontal_fluid');
            }
            table = $('<table>').appendTo(horizontal_tree);
            tbody = $('<tbody>').appendTo(table);
            this.panel = $('<tr>').appendTo(tbody);
            this.__panel__ = horizontal_tree;

            return this;
        },

        loadData: function (node, data) {
            var _this = this;
            if (node) {
                node[_this.opts.childrenField] = data;
            } else {
                this.data = data;
            }
            this.renderLevel(data, node);
            this.complete();

            return this;
        },
        load: function (node, url, param) {
            var _this = this,
                data = $.extend(true, {}, this.opts.queryParams);
            if (url) {
                _this.opts.url = url;
            } else {
                url = _this.opts.url;
            }

            if (node) {
                data[_this.opts.requestKey] = node[_this.opts.idField];
                url = _this.opts.url.replace('{' + _this.opts.requestKey + '}', node[_this.opts.idField]);
            } else {
                data[_this.opts.requestKey] = _this.opts.defaultId;
                url = _this.opts.url.replace('{' + _this.opts.requestKey + '}', _this.opts.defaultId);
            }

            this.opts.ajax({
                url: url,
                mockPathData: _this.opts.mockPathData,
                loading: _this.opts.loadingFlag,
                data: data,
                onSuccess: function (reData) {
                    if (typeof _this.opts.dataFilter == 'function') {
                        reData = _this.opts.dataFilter.call(_this, reData);
                    }

                    if (node) {
                        node[_this.opts.childrenField] = reData.rows;
                    } else {
                        _this.data = reData.rows;
                        _this.panel.empty();
                    }
                    _this.renderLevel(reData.rows, node);

                    _this.complete();
                }
            });
        },

        renderLevel: function (data, parent) {
            //在商品新增的品类选择界面，不需要在扩展新的列出来
            if (parent != null
                && this.opts.buttons.length == 0
                && parent[this.opts.childrenField].length == 0)
                return;

            var _this = this, _data = data || this.data,
                col, title, level, items, item, buttons, button,
                i, _level = $(this.panel).children('td').length;

            col = $('<td>').appendTo(_this.panel);

            level = $('<div class="_level">').attr('data-parentId', parent && parent[_this.opts.idField]).appendTo(col);

            if (_data.title) {
                title = $('<div class="_title">').html(_data.title).appendTo(level);
            } else if (_this.opts.levelTitle) {
                title = $('<div class="_title">').appendTo(level);
                if (_level < _this.opts.levelTitle.length) {
                    title.html(_this.opts.levelTitle[_level]);
                } else {
                    title.html("level : " + _level);
                }
            }

            items = $('<div class="_items">').appendTo(level);
            $.each(_data, function (i, itemData) {
                //将节点拼接起来，使每个叶子节点可以追溯到根节点
                itemData.parent = parent;

                //设置其type为folder or leaf
                if (itemData.children && itemData.children.length > 0) {
                    itemData.type = 'folder';
                } else {
                    itemData.type = 'leaf';
                }
                _this.addItem(itemData, items);
            });

            if (!_this.opts.singleRoot || (_this.opts.singleRoot && parent)) {
                buttons = $('<div class="_button">').appendTo(level);
                $.each(_this.opts.buttons, function (i, buttonData) {
                    button = $('<button class="btn btn-xs">').addClass(buttonData.class || _this.opts.buttonDefaultClass)
                        .html(buttonData.name).attr(buttonData.attr).appendTo(buttons);
                    if (typeof buttonData.click == 'function') {
                        button.click(function (event) {
                            buttonData.click.call(_this, data, parent, this, event);
                        });
                    }
                });
            }

            return _this;
        },
        addItem: function (data, panel, parent) {
            var _this = this,
                item, i, buttons, name;
            item = $('<div class="_item">').attr('id', data[_this.opts.idField]).appendTo(panel);

            if (typeof _this.opts.nameField === 'function') {
                name = _this.opts.nameField.call(_this, data)
            } else {
                name = data[_this.opts.nameField];
            }

            $('<span class="_itemName">').attr('title', name).html(name).appendTo(item);
            if (data.type == "folder") {
                $('<span class="glyphicon glyphicon-play float-right">').appendTo(item);
            }

            if (_this.opts.itemButtons) {
                buttons = $('<span class="_itemButtons">').appendTo(item);

                $.each(_this.opts.itemButtons, function (i, b) {
                    $('<span class="glyphicon">').addClass(b.icon).click(function (event) {
                        b.click.call(_this, data, parent, item);
                        event.stopPropagation();
                        return false;
                    }).appendTo(buttons);
                });
            }

            item.click(function (event) {
                _this.click.call(_this, data, this, event);
            });

            if (parent && parent[_this.opts.childrenField]) {
                parent[_this.opts.childrenField].push(data);
            }
        },
        reload: function (url, param) {
            this.load(null, url, param);
        },
        reloadLevel: function (parentId) {
            if (parentId) {
                //TODO 强制触发刷新
                this.reloadFlag = true;
                $('div._item[id="' + parentId + '"]').click();
            } else {
                this.reload();
            }
        },
        reloadItem: function (id, data) {
            var _this = this;
            var item, itemPanel, name, _url, _data;
            if (typeof id === 'string') {
                item = _this.findItem(id);
            } else {
                item = _this.findItem(id[_this.opts.idField]);
            }
            itemPanel = $('div._item[id="' + item[_this.opts.idField] + '"]');

            if (data) {
                $.extend(item, data);
                if (typeof _this.opts.nameField === 'function') {
                    name = _this.opts.nameField.call(_this, data)
                } else {
                    name = data[_this.opts.nameField];
                }
                itemPanel.find('._itemName').attr('title', name).html(name);

                itemPanel.click();
            } else {
                _data = $.extend({}, _this.opts.queryParams);
                if (item[_this.opts.idField]) {
                    _data[_this.opts.requestKey] = item[_this.opts.idField];
                    _url = _this.opts.url.replace('{' + _this.opts.requestKey + '}', item[_this.opts.idField]);
                } else {
                    _data[_this.opts.requestKey] = _this.opts.defaultId;
                    _url = _this.opts.url.replace('{' + _this.opts.requestKey + '}', _this.opts.defaultId);
                }

                this.opts.ajax({
                    url: _url,
                    data: _data,
                    mockPathData: _this.opts.mockPathData,
                    loading: _this.opts.loadingFlag,
                    onSuccess: function (reData) {
                        if (reData.rows && reData.rows[0]) {
                            $.extend(Dolphin.emptyObj(item), reData.rows[0]);
                            if (typeof _this.opts.nameField === 'function') {
                                name = _this.opts.nameField.call(_this, item)
                            } else {
                                name = item[_this.opts.nameField];
                            }
                            itemPanel.find('._itemName').attr('title', name).html(name);
                            itemPanel.removeClass('active');
                            itemPanel.click();
                        }
                    }
                });

            }
        },
        findItem: function (id) {
            var item, _this = this;
            item = traversal(_this.data);

            function traversal(data) {
                var i, item;
                for (i = 0; i < data.length; i++) {
                    if (data[i][_this.opts.idField] == id) {
                        return data[i];
                    } else {
                        if (data[i][_this.opts.childrenField]) {
                            item = arguments.callee(data[i][_this.opts.childrenField]);
                            if (item) {
                                return item
                            }
                        }
                    }
                }

                return null;
            }

            return item;
        },

        click: function (itemData, thisItem, event) {
            var _this = this;
            //TODO 强制触发刷新
            if (!$(thisItem).hasClass('active') || _this.reloadFlag) {
                $(thisItem).closest('td').nextAll().remove();

                $(thisItem).siblings(".active").removeClass('active');
                $(thisItem).addClass('active');

                //if(itemData.type == "folder" || _this.opts.buttons.length>0){
                if (itemData[_this.opts.childrenField] && !_this.reloadFlag) {
                    _this.loadData(itemData, itemData[_this.opts.childrenField]);
                } else {
                    _this.load(itemData);
                }
                _this.reloadFlag = false;
                //}
            }

            $(thisItem).closest('table').find('.selected').removeClass('selected');
            $(thisItem).addClass('selected');
            _this.selectedItem = itemData;

            var levelTd = $(thisItem).closest('td');
            var scrollLeft = 0;
            levelTd.prevAll('td').each(function () {
                scrollLeft += $(this).width();
            });
            this.__panel__.animate({scrollLeft: scrollLeft}, 500);

            if (typeof _this.opts.click === 'function') {
                _this.opts.click.call(thisItem, itemData, event);
            }
        },

        complete: function () {

        }
    };

    thisTool.HORIZONTAL_TREE = HORIZONTAL_TREE;
})(jQuery);
/*!/dolphin/js/grid.js*/
(function ($) {
    var thisTool = Dolphin;

    function GRID(param) {
        this.init(param);
        if (this.opts.data) {
            this.loadData();
        } else if (this.opts.url) {
            this.load();
        }
    }

    GRID.defaults = {
        id: null,											//生成随机id
        panel: "#planList",
        url: null,
        data: null,
        queryParams: null,
        idField: 'pkId',
        ajax: thisTool.ajax,
        ajaxType: 'get',

        titleFormatter: null,
        operationFormatter: null,
        columns: [],
        checkbox: false,
        multiple: true,
        childrenField: 'children',
        pagination: true,
        pageSize: 5,
        pageNum: 1,
        pageElements: 0,

        onCheck: null,
        dataFilter: null									//请求事件过滤
    };


    GRID.prototype = {
        /* ==================== property ================= */
        constructor: GRID,
        data: null,
        target: [],

        /* ===================== method ================== */
        init: function (param) {
            this.opts = $.extend({}, GRID.defaults, param);
            if (!this.opts.id) {
                this.opts.id = Math.round(Math.random() * Math.pow(10, 6));
            }

            if ($(this.opts.panel).children('table').length == 0) {
                $('<table>').addClass('grid').append('<tbody></tbody>').appendTo(this.opts.panel);
            }
            if (this.opts.pagination) {
                if ($(this.opts.panel).children('nav.pagination-nav').length == 0) {
                    $('<nav>').addClass('pagination-nav').appendTo(this.opts.panel);
                }
            }
        },
        empty: function () {
            $(this.opts.panel).find('tbody, nav').empty();
        },
        loadData: function (newData) {
            this.empty();
            this.data = newData;

            this.initRows();
        },
        load: function () {
            this.empty();
            var queryCondition = $.extend({}, this.opts.queryParams);
            var url = this.opts.url;
            if (this.opts.pagination) {
                url = thisTool.urlAddParam(this.opts.url, {
                    pageSize: this.opts.pageSize,
                    pageNum: this.opts.pageNum
                });
            }
            this.opts.ajax({
                url: url,
                data: queryCondition,
                type: this.opts.ajaxType,
                onSuccess: function (data) {
                    if (typeof this.opts.dataFilter === 'function') {
                        data = this.opts.dataFilter.call(this, data);
                    }
                    this.data = data;
                    this.initRows();
                }
            });
        },
        reload: function () {
            this.opts.pageNum = 1;
            this.load();
        },
        query: function (queryParams) {
            this.opts.pageNum = 1;
            this.opts.queryParams = queryParams;
            this.load();
        },
        goPage: function (pageNo) {
            this.opts.pageNum = pageNo;
            this.load();
        },
        initRows: function () {
            $(this.opts.panel).find('.no-result').remove();
            if (this.data && this.data.rows) {
                this.target = [];
                if (this.data.rows.length > 0) {
                    for (var i = 0; i < this.data.rows.length; i++) {
                        this.addRow(this.data.rows[i], i);
                    }
                } else {
                    $(this.opts.panel).prepend('<span class="no-result">查询结果为空。</span>');
                }
                if (this.opts.pagination) {
                    this.refreshPagination();
                }

                if (typeof this.opts.onLoad === 'function') {
                    this.opts.onLoad.call(this);
                }
            } else {

            }

        },
        addRow: function (data, index) {
            var thisGrid = this;
            var tbody = $(this.opts.panel).find('tbody');
            var DOM = {title: null, line: []};

            if (thisTool.browser.ismobile && index > 0) {
                $('<tr>').html($('<td>').attr("colspan", this.opts.columns.length).css({
                    border: 0,
                    height: '15px'
                })).appendTo(tbody);
            }

            var titleRow = $('<tr class="planTitle">').appendTo(tbody), lineRow = null;
            var row = '';
            row += '	<td colspan="' + this.opts.columns.length + '" class="title">';
            if (this.opts.checkbox) {
                row += '<span><input type="' + (this.opts.multiple ? 'checkbox' : 'radio') + '" index="' + index + '" value="' + data[this.opts.idField] + '" name="selectedItem" class="selectedItem"/></span>';
            }
            if (this.opts.titleFormatter) {
                row += this.opts.titleFormatter.call(this, data, index);
            } else {
                row += '<span>' + data.title + '</span>';
            }
            if (this.opts.operationFormatter && !thisTool.browser.ismobile) {
                row += this.opts.operationFormatter.call(this, data, index);
            }
            row += '	</td>';
            titleRow.html(row);

            DOM.title = titleRow;

            if (data[this.opts.childrenField]) {
                for (var i = 0; i < data[this.opts.childrenField].length; i++) {
                    var obj = data[this.opts.childrenField][i];
                    lineRow = $('<tr class="details">').appendTo(tbody);
                    row = '';
                    for (var j = 0; j < this.opts.columns.length; j++) {
                        row += '<td class="' + (this.opts.columns[j].className || '') + '" style="' + (this.opts.columns[j].width ? ('width:' + this.opts.columns[j].width) : '') + '"  >';
                        if (this.opts.columns[j].formatter) {
                            row += this.opts.columns[j].formatter.call(this, obj[this.opts.columns[j].code], obj, data, i, index);//(当前值，行数据，完成主表数据，行序号，主表数据序号)
                        } else {
                            row += obj[this.opts.columns[j].code];
                        }
                        row += '</td>';
                    }
                    lineRow.html(row);

                    DOM.line.push(lineRow);
                }
            }
            this.target.push(DOM);

            if (this.opts.operationFormatter && thisTool.browser.ismobile) {
                var buttonRow = $('<tr class="buttonRow">').appendTo(tbody);
                row = '<td colspan="' + this.opts.columns.length + '">';
                row += this.opts.operationFormatter.call(this, data, index);
                row += '</td>';
                buttonRow.html(row);
            }

            if (typeof this.opts.onLoadRow === 'function') {
                this.opts.onLoadRow.call(this, data, index);
            }
            if (this.opts.onCheck) {
                titleRow.find('.selectedItem').bind('change', function () {
                    thisGrid.opts.onCheck.call(thisGrid, data, index, this);
                });
            }
        },
        getChecked: function () {
            var selectedItem = $(this.opts.panel).find('.selectedItem:checked');
            var returnData = [];
            var thisGrid = this;

            for (var i = 0; i < this.data.rows.length; i++) {
                if (thisTool.objInArray(this.data.rows[i], selectedItem, function (v, o) {
                        return v[thisGrid.opts.idField] === o.value;
                    })) {
                    returnData.push(this.data.rows[i]);
                }
            }

            return returnData;
        },
        checkedAll: function () {
            $(this.opts.panel).find('.selectedItem').each(function () {
                this.checked = true;
            }).change();
        },
        getDataByIndex: function (index) {
            return this.data.rows[index];
        },
        refreshPagination: function () {
            var thisGrid = this;
            var pagination = '';
            var totalPage = Math.ceil(this.data.total / this.opts.pageSize);
            var buttonNum1 = 5, buttonNum2 = 3;

            pagination += '<ul class="pagination ' + (thisTool.browser.ismobile ? 'pagination-sm' : '') + '">';
            pagination += '	<li class="' + (this.opts.pageNum <= 1 ? 'disabled' : '') + '"><a class="' + (this.opts.pageNum > 1 ? 'changePage' : '') + '" targetPage="' + (this.opts.pageNum - 1) + '" href="javascript:void(0)" aria-label="Previous"> <span';
            pagination += '			aria-hidden="true">&laquo;</span>';
            pagination += '	</a></li>';
            if (totalPage > 5) {
                if (this.opts.pageNum > 3) {
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + 1 + '">' + 1 + '</a></li>';
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + (this.opts.pageNum - 3) + '">...</a></li>';
                }
            }
            var startCount = this.opts.pageNum - 3;
            if (this.opts.pageNum < 3) {
                startCount = 0;
            } else if (totalPage > 5 && this.opts.pageNum > totalPage - 3) {
                startCount = totalPage - 5;
            }
            for (var i = 0; i < Math.min(totalPage, 5); i++) {
                pagination += '	<li class="' + (startCount + i + 1 == this.opts.pageNum ? 'active' : '') + '"><a class="changePage" href="javascript:void(0)" targetPage="' + (startCount + i + 1) + '">' + (startCount + i + 1) + '</a></li>';
            }
            if (totalPage > 5) {
                if (this.opts.pageNum < totalPage - 2) {
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + (this.opts.pageNum - 0 + 3) + '">...</a></li>';
                    pagination += '	<li class=""><a class="changePage" href="javascript:void(0)" targetPage="' + totalPage + '">' + totalPage + '</a></li>';
                }
            }
            pagination += '	<li class="' + (this.opts.pageNum >= totalPage ? 'disabled' : '') + '"><a class="' + (this.opts.pageNum < totalPage ? 'changePage' : '') + '" targetPage="' + (this.opts.pageNum - 0 + 1) + '" href="javascript:void(0)" aria-label="Next"> <span';
            pagination += '			aria-hidden="true">&raquo;</span>';
            pagination += '	</a></li>';
            pagination += '</ul>';

            $(this.opts.panel).find('nav').html(pagination);
            $(this.opts.panel).find('.changePage').bind('click', function () {
                thisGrid.opts.pageNum = $(this).attr('targetPage');
                thisGrid.opts.pageElements = ((thisGrid.opts.pageNum - 1) * thisGrid.opts.pageSize);
                thisGrid.load();
            })
        }
    };

    thisTool.GRID = GRID;
    window.GRID = GRID;
})(jQuery);
/*!/dolphin/js/templateGrid.js*/
(function () {
    var thisTool = Dolphin;

    function TEMPLATE_GRID(param) {
        if (this.init(param)) {
            if (this.opts.data) {
                this.loadData(this.opts.data, true);
            } else if (this.opts.url) {
                this.load(true);
            }
        }
    }

    TEMPLATE_GRID.defaults = {
        panel: "#productList",
        url: null,
        data: null,
        checkedData: null,
        idField: 'id',
        queryParams: null,
        ajax: thisTool.ajax,
        ajaxParam: null,

        pagination: true,
        pageSize: 12,
        pageNumber: 1,
        paginationType: "page",
        pageSizeOption: [12, 18, 36],

        loadingFlag: true,

        onLoadSuccess: null,

        template: null
    };


    TEMPLATE_GRID.prototype = {
        /* ==================== property ================= */
        constructor: TEMPLATE_GRID,
        data: null,
        dataPanel: null,
        moreButton: null,
        checkedObj: {},
        pagination: null,
        defaultUnit: null,

        /* ===================== method ================== */
        init: function (param) {
            var thisGrid = this;
            if (param.template) {
                this.opts = $.extend({}, TEMPLATE_GRID.defaults, param.template.defaults, param);
                $(this.opts.panel).addClass('dolphin_grid');
                this.initCheckedData();

                this.dataPanel = $('<div class="dolphin-row">').appendTo(this.opts.panel);

                if (this.opts.pagination) {
                    thisGrid.pagination = new thisTool.PAGINATION({
                        type: thisGrid.opts.paginationType,
                        panel: thisGrid.opts.panel,
                        pageNumber: thisGrid.opts.pageNumber,
                        pageSize: thisGrid.opts.pageSize,
                        pageSizeOption: thisGrid.opts.pageSizeOption,
                        onChange: function () {
                            thisGrid.opts.pageNumber = this.opts.pageNumber;
                            thisGrid.opts.pageSize = this.opts.pageSize;
                            thisGrid.load(thisGrid.opts.paginationType == "page");
                        }
                    });
                }

                if (typeof this.opts.template.init == "function") {
                    this.opts.template.init.call(this);
                }

                if (this.opts.loadingFlag) {
                    this.initLoading();
                }

                return this;
            } else {
                thisTool.alert('template参数为空');
            }
        },
        initCheckedData: function () {
            if (this.opts.checkedData) {
                for (var i = 0; i < this.opts.checkedData.length; i++) {
                    this.checkedObj[this.opts.checkedData[i][this.opts.idField]] = this.opts.checkedData[i];
                    this.checkedObj[this.opts.checkedData[i][this.opts.idField]].checked = true;
                }
            }
            return this;
        },
        getCheckedData: function () {
            var data = [];
            for (var key in this.checkedObj) {
                if (this.checkedObj[key].checked) {
                    data.push({
                        code: key,
                        quantity: this.checkedObj[key].quantity,
                        price: this.checkedObj[key].price,
                        additionPrice: this.checkedObj[key].additionPrice,
                        baseNum: this.checkedObj[key].baseNum,
                        zsdbl: this.checkedObj[key].divisor,
                        promotionId: this.checkedObj[key].promotionId,
                        unit: this.checkedObj[key].unit
                    })
                }
            }
            return data;
        },
        empty: function () {
            $(this.opts.panel).empty();
            return this;
        },
        loadData: function (newData, emptyFlag) {
            this.data = newData;
            this.pagination.initData({
                total: this.data.total
            });
            this.initData(emptyFlag);
            return this;
        },
        load: function (emptyFlag, callback) {
            var data = null, thisGrid = this;
            var queryCondition = $.extend({
                pageSize: this.opts.pageSize,
                pageNumber: this.opts.pageNumber - 1
            }, this.opts.queryParams);
            if (this.opts.loadingFlag) {
                this.loadingPanel.show();
            }

            this.data = this.opts.ajax($.extend({}, this.opts.ajaxParam, {
                url: this.opts.url,
                data: queryCondition,
                onSuccess: function (data) {
                    thisGrid.data = data;
                    thisGrid.pagination.initData({
                        total: data.total
                    });
                    thisGrid.initData(emptyFlag);
                    if (typeof callback == 'function') {
                        callback.call(thisGrid, data);
                    }
                },
                onComplete: function (XMLHttpRequest, textStatus) {
                    if (thisGrid.opts.loadingFlag) {
                        thisGrid.loadingPanel.hide();
                    }
                }
            }));

            return this;
        },
        query: function (queryParams, callback) {
            this.opts.queryParams = queryParams;
            this.pageNumber = 1;

            this.load(true, callback);
            return this;
        },
        initData: function (emptyFlag) {
            if (emptyFlag) {
                $(this.dataPanel).empty();
            }
            if (this.data) {
                for (var i = 0; i < this.data.rows.length; i++) {
                    this.addRow(this.data.rows[i]);
                }
                if (this.opts.pagination) {
                    this.pagination.refresh();
                }

                if (typeof this.opts.onLoadSuccess == 'function') {
                    this.opts.onLoadSuccess.call(this, this.data);
                }
            }
            return this;
        },
        addRow: function (data) {
            var productListItem = this.opts.template.item.call(this, data);

            $(this.dataPanel).append(productListItem);
            return this;
        },
        checkItem: function (thisObj, data) {
            var itemId = thisObj.value;
            if (this.checkedObj[itemId]) {
                this.checkedObj[itemId].checked = thisObj.checked;
            } else {
                this.checkedObj[itemId] = {
                    checked: thisObj.checked
                }
            }
            return this;
        },
        changeNum: function (thisObj, data) {
            var itemId = $(thisObj).attr('itemId');
            var prices = $(thisObj).attr('itemPrice').split(',');
            var unit = $(thisObj).attr('itemUnit');
            if (this.checkedObj[itemId]) {
                $.extend(this.checkedObj[itemId], data, {
                    quantity: thisObj.value,
                    price: prices[0],
                    additionPrice: prices[1],
                    baseNum: prices[2],
                    divisor: prices[3],
                    promotionId: prices[4],
                    unit: unit
                });
            } else {
                this.checkedObj[itemId] = $.extend({}, data, {
                    quantity: thisObj.value,
                    price: prices[0],
                    additionPrice: prices[1],
                    baseNum: prices[2],
                    divisor: prices[3],
                    promotionId: prices[4],
                    unit: unit
                })
            }
            return this;
        },

        initLoading: function () {
            this.loadingPanel = thisTool.initLoadingPanel(this.opts.panel);
        }
    };

    thisTool.TEMPLATE_GRID = TEMPLATE_GRID;
})();
/*!/dolphin/js/refWin.js*/
(function ($) {
    var thisTool = Dolphin;

    function REFWIN(param) {
        this.init(param);
    }

    REFWIN.defaults = {
        id: "myModal",
        className: "",
        title: "参照选择",
        url: null,
        data: null,
        idField: 'code',
        textField: 'name',

        modalSize: '',

        queryParams: null,
        queryCondition: null,
        ajax: thisTool.ajax,

        type: 'tree',
        multiple: false,
        //tree
        cascadeCheck: true,
        onlyLeafCheck: false,
        //list
        columns: [],
        striped: true,
        bordered: true,
        rowIndex: true,
        width: null,
        pagination: true,
        pageSize: 5,
        pageNum: 1,

        onload: function () {
        },
        onSubmit: null,
        onShow: null,

        mockPathData: null,
        showButton: null
    };

    REFWIN.prototype = {
        /* ==================== property ================= */
        constructor: REFWIN,
        data: null,
        win: null,
        refObj: null,
        queryform: null,

        /* ===================== method ================== */
        init: function (param) {
            var _this = this;
            this.opts = $.extend({}, REFWIN.defaults, param);

            this.render();

            if (this.opts.type == 'tree') {
                this.refObj = new thisTool.TREE($.extend({panel: this.win.find('.ref-obj-panel')}, this.defaults, param));
            } else if (this.opts.type == 'list') {
                this.refObj = new thisTool.LIST($.extend({panel: this.win.find('.ref-obj-panel')}, this.defaults, param));
            }

            if (this.opts.queryCondition) {
            }

            this.bind();

            if (this.opts.showButton) {
                $(this.opts.showButton).click(function () {
                    _this.show();
                })
            }
        },
        empty: function () {
            $(this.opts.panel).empty();
        },
        render: function () {
            var modalWin = $('<div class="modal fade ' + this.opts.className + '" id="' + this.opts.id + '" tabindex="-1" role="dialog" aria-labelledby="' + this.opts.id + 'Label" aria-hidden="true">');
            var html = '';
            html += '<div class="modal-dialog ' + this.opts.modalSize + '">';
            html += '	<div class="modal-content">';
            html += '		<div class="modal-header">';
            html += '			<button type="button" class="close" data-dismiss="modal"';
            html += '				aria-label="Close">';
            html += '				<span aria-hidden="true">&times;</span>';
            html += '			</button>';
            html += '			<h4 class="modal-title" id="' + this.opts.id + 'Label">';
            html += this.opts.title;
            if (this.opts.queryCondition) {
                html += ' <div class="ref-condition"><form class="refQueryForm">';
                html += '<div class="input-group input-group-sm">';
                html += '    <input type="text" class="form-control" name="' + this.opts.queryCondition.attr[0].code + '" placeholder="根据' + this.opts.queryCondition.attr[0].title + '查询..." dol-validate="minLength[2]" >';
                html += '    <span class="input-group-btn">';
                html += '        <button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span>&nbsp;</button>';
                html += '    </span>';
                html += '</div><!-- /input-group -->';
                html += '</form></div>';
            }
            html += '</h4>';
            html += '		</div>';
            html += '		<div class="modal-body">';
            html += '			<div class="ref-query-condition-panel"></div>';
            html += '			<div class="ref-obj-panel"></div>';
            html += '		</div>';
            html += '		<div class="modal-footer">';
            html += '			<button type="button" class="btn btn-primary submitButton">确定</button>';
            html += '			<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>';
            html += '		</div>';
            html += '	</div>';
            html += '</div>';

            this.win = modalWin;

            modalWin.html(html).appendTo('body');
        },
        renderCondition: function () {
            var condition_panel = this.win.find('.ref-query-condition-panel');
            this.queryform = new thisTool.FORM({
                panel: condition_panel
            });
            this.queryform.renderForm(this.opts.queryCondition);
            return this;
        },
        bind: function () {
            var thisRefWin = this;
            $(this.win).find('.submitButton').bind('click', function () {
                thisRefWin.submit();
            });
            if (this.opts.queryCondition) {
                var queryForm = this.win.find('.refQueryForm');
                thisRefWin.queryform = new thisTool.FORM({
                    panel: queryForm
                });
                function query() {
                    if (thisRefWin.queryform.validate()) {
                        thisRefWin.refObj.query(thisTool.form2json(queryForm));
                    }
                }

                queryForm.find('input').bind('click', function (e) {
                    if (e.keyCode == 13) {
                        query();
                    }
                }).next().children('button').bind('click', function () {
                    query();
                })
            }
        },
        find: function () {

        },
        findById: function () {

        },
        findByText: function () {

        },
        show: function () {
            if (typeof this.opts.onShow === 'function') {
                this.opts.onShow.call(this);
            }
            this.win.modal('show');
        },
        submit: function () {
            if (typeof this.opts.onSubmit === 'function') {
                var returnData = this.refObj.getChecked();
                if (returnData && returnData.length > 0) {
                    this.opts.onSubmit.call(this, returnData);
                    this.win.modal('hide');
                } else {
                    thisTool.alert('请至少选择一条数据。')
                }
            } else {
                this.win.modal('hide');
            }
        }
    };

    thisTool.REFWIN = REFWIN;
})(jQuery);