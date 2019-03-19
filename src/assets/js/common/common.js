
import $ from 'jquery'

import recruit from './recruit'
/*$(window).resize(function() {
    var size;
    if(window.innerWidth != null)  // ie9 +  最新浏览器
    {
        size = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    else if(document.compatMode === "CSS1Compat")  // 标准浏览器
    {
        size = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else
        size = {   // 怪异浏览器
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    if(size.width<1200){
        window.resizeTo(1200,size.height);
    }
});
*/
window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {
    return setTimeout(fn, 16.67)
}
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;


var EleResize = {
    _handleResize: function (e) {
        var ele = e.target || e.srcElement;
        var trigger = ele.__resizeTrigger__;
        if (trigger) {
            var handlers = trigger.__z_resizeListeners;
            if (handlers) {
                var size = handlers.length;
                for (var i = 0; i < size; i++) {
                    var h = handlers[i];
                    var handler = h.handler;
                    var context = h.context;
                    handler.apply(context, [e]);
                }
            }
        }
    },
    _removeHandler: function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            var size = handlers.length;
            for (var i = 0; i < size; i++) {
                var h = handlers[i];
                if (h.handler === handler && h.context === context) {
                    handlers.splice(i, 1);
                    return;
                }
            }
        }
    },
    _createResizeTrigger: function (ele) {
        var obj = document.createElement('object');
        obj.setAttribute('style',
            'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;');
        obj.onload = EleResize._handleObjectLoad;
        obj.type = 'text/html';
        ele.appendChild(obj);
        obj.data = 'about:blank';
        return obj;
    },
    _handleObjectLoad: function (evt) {
        this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__;
        this.contentDocument.defaultView.addEventListener('resize', EleResize._handleResize);
    }
};
if (document.attachEvent) {//ie9-10
    EleResize.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (!handlers) {
            handlers = [];
            ele.__z_resizeListeners = handlers;
            ele.__resizeTrigger__ = ele;
            ele.attachEvent('onresize', EleResize._handleResize);
        }
        handlers.push({
            handler: handler,
            context: context
        });
    };
    EleResize.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            EleResize._removeHandler(ele, handler, context);
            if (handlers.length === 0) {
                ele.detachEvent('onresize', EleResize._handleResize);
                delete  ele.__z_resizeListeners;
            }
        }
    }
} else {
    EleResize.on = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (!handlers) {
            handlers = [];
            ele.__z_resizeListeners = handlers;

            if (getComputedStyle(ele, null).position === 'static') {
                ele.style.position = 'relative';
            }
            var obj = EleResize._createResizeTrigger(ele);
            ele.__resizeTrigger__ = obj;
            obj.__resizeElement__ = ele;
        }
        handlers.push({
            handler: handler,
            context: context
        });
    };
    EleResize.off = function (ele, handler, context) {
        var handlers = ele.__z_resizeListeners;
        if (handlers) {
            EleResize._removeHandler(ele, handler, context);
            if (handlers.length === 0) {
                var trigger = ele.__resizeTrigger__;
                if (trigger) {
                    trigger.contentDocument.defaultView.removeEventListener('resize', EleResize._handleResize);
                    ele.removeChild(trigger);
                    delete ele.__resizeTrigger__;
                }
                delete  ele.__z_resizeListeners;
            }
        }
    }
}


//http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp
//{"api":"mtop.common.getTimestamp","v":"*","ret":["SUCCESS::接口调用成功"],"data":{"t":"1540873959215"}}
//http://quan.suning.com/getSysTime.do
//{"sysTime1":"20181030123217","sysTime2":"2018-10-30 12:32:17"}
export default {
    /**
     * [iEVersion 获取ie浏览器的版本]
     * @return {[type]} [版本号]
     */
    iEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6; //IE版本<=7
            }
        } else if (isEdge) {
            return 'edge'; //edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return -1; //不是ie浏览器
        }
    },
    /**
     * [getCssFile 动态获取css文件]
     * @param  {[type]} params {
     *                         url:css文件的路径,
     *                         download_files_key:'vue store中存的值的keyname,表示该文件是否已经下载过'
     *                         }
     */
    getCssFile(params) {
        if (!this.$store.state.download_files[params.download_files_key]) {
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = params.url;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
            this.$store.state.download_files[params.download_files_key] = true;
        }
    },
    /**
     * [getScriptFile 动态获取js文件]
     * @param  {[type]} params {
     *                         url:js文件的路径,
     *                         download_files_key:'vue store中存的值的keyname,表示该文件是否已经下载过',
     *                         callback: 下载完文件的回调函数，如果已经下载文件则直接执行，如果未下载，则先下载js文件，下载完成再执行该回调
     *                         }
     */
    getScriptFile(params) {
        if (!this.$store.state.download_files[params.download_files_key]) {
            var _this = this;
            $.ajax({
                url: params.url,
                type: 'get',
                dataType: "script",
                cache: true,
                success: function (xml) {
                    _this.$store.state.download_files[params.download_files_key] = true;
                    params.callback && params.callback();
                },
                error: function (xml) {
                    console.log('下载失败：' + xml);
                }
            });
        } else {
            params.callback && params.callback();
        }
    },
    /**
     * [getCurrDateTime 获取系统时间]
     * @return {[type]} [description]
     */
    getCurrDateTime() {
        var res;
        $.ajax({
            url: '/api/getCurrDateTime',
            dataType: "json",
            method: "post",
            async: false,
            success: function (data) {
                res = data.data;
            },
            error: function (data) {

            }
        });
        // console.log(res);
        return res;
    },
    /**
     * [includeDropDown() 函数,用于页面中得上拉收起功能]
     * $(this).find("i")[当前点击得标签里面得i标签 ]
     * 调用方法直接this.$commonJs.includeDropDown();

     */
    includeDropDown() {

        $("#app .dropDown .drop_Content").hide();
        $("#app .dropDown .xialaA").click(function () {
            var spans = $(this).find("i");
            if (spans.hasClass("el-icon-arrow-up")) {
                //spans.text("精选筛选条件");
                $(this).find("i").removeClass("el-icon-arrow-up");
                $(this).find("i").addClass("el-icon-arrow-down");
                $(this).parent().parent().find(".drop_Content").slideUp();
            } else {
                //spans.text("精选筛选条件");
                $(this).find("i").removeClass("el-icon-arrow-down");
                $(this).find("i").addClass("el-icon-arrow-up");
                $(this).parent().parent().find(".drop_Content").slideDown();
            }
        })
    },
    // },
    // **
    //  * [upload js兼容ie9的上传方法]
    //  *   * @param  {[type]} obj [ 传递的参数，必填项]
    //  *                         {
    //  *                         content:this,
    //  *                         key:ref的值,
    //  *                         callbacks: 上传成功之后执行的方法
    //  *                         }
    upload(obj) {
        //  * obj.key       [{type}]     [ref的值]
        //  * a             [{type}]  string  [接受refdom]
        //  * fileElement   [{type}] [点击那个上传的el-upload__input]
        //  *  url  [{type} [是否需要安全协议，一般设置为false]
        //  *  dataType     [返回值类型 一般设置为json]
        //  *  success      [服务器成功响应处理函数]
        //  *  back         [判断upload.vue里的是否有back有没有，如果有执行反之提示]
        //  *  error        [服务器响应失败处理函数]
        //  * obj.context.$refs[a].onSuccess  [就是on-success：文件上传成功时的钩子参数为：response, file, fileList]
        //  *obj.context.$refs[a].onError    [就是on-error：文件上传失败时的钩子参数为：err, file, fileList]
        // * fileList   [{type}]  arry      [所有上传文件的数组]
        //  */obj.context  this
        // console.log(obj,'-------');
        var a = '';
        a = obj.key;
        var b = obj.id;
        // console.log(obj.id==undefined,'111');
        var _this = this;
        var ieVer = _this.iEVersion();
        // console.log($("#"+b))//定义的iddom
        if (ieVer < 10 && ieVer != -1) {//ie6789
            if (obj.id ==undefined) {
                // console.log(obj.context.$refs[a],'2222');
                var $lis = $(obj.context.$refs[a].$children[2].$children[0].$options.parent.$el.children);//$(".el-upload-list li")
                $.ajaxFileUpload({
                    url: '/upload',
                    secureuri: false,
                    fileElement: obj.context.$refs[a].$children[0].$refs.input,//$("el-upload__input")
                    dataType: 'json',
                    success: function (data, status) {
                        // console.log(data, status);
                        $barInner.css('width', '100%');
                        $barText.html('100%');
                        clearInterval(supTimeout);
                        $(obj.context.$refs[a].$children[0].$refs.input).wrap('<form></form>');
                        $(obj.context.$refs[a].$children[0].$refs.input).parent()[0].reset();
                        $(obj.context.$refs[a].$children[0].$refs.input).unwrap();
                        if (obj.callbacks == '') {
                            console.log("callback函数为空")
                        } else {
                            obj.callbacks(data, status);
                        }
                    },
                    error: function (data, status, e) {
                        clearInterval(supTimeout);
                        console.log(data, status, e);
                        // obj.error(data,status);
                    }
                })

            } else {
                var $lis = $("#" + b).parent().parent().parent().next().next().children().children().children().eq(1).children();//$(".el-upload-list li")
                $.ajaxFileUpload({
                    url: '/upload',
                    secureuri: false,
                    fileElement: $("#" + b).children().children().eq(1),//$("el-upload__input")
                    dataType: 'json',
                    success: function (data, status) {
                        // console.log(data, status);
                        $barInner.css('width', '100%');
                        $barText.html('100%');
                        clearInterval(supTimeout);
                        $(obj.context.$refs[a].$children[0].$refs.input).wrap('<form></form>');
                        $(obj.context.$refs[a].$children[0].$refs.input).parent()[0].reset();
                        $(obj.context.$refs[a].$children[0].$refs.input).unwrap();
                        if (obj.callbacks == '') {
                            console.log("callback函数为空")
                        } else {
                            obj.callbacks(data, status);
                        }
                    },
                    error: function (data, status, e) {
                        clearInterval(supTimeout);
                        console.log(data, status, e);
                        // obj.error(data,status);
                    }
                })
            }
            var $progressbar = $(`<div role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" class="el-progress el-progress--line">
              <div class="el-progress-bar">
                <div class="el-progress-bar__outer" style="height: 2px;">
                  <div class="el-progress-bar__inner" style="width: 0%;"></div>
                </div>
              </div>
              <div class="el-progress__text" style="font-size: 12.8px;">正在下载中...</div>
            </div>`);
            $lis.eq($lis.length - 1).append($progressbar);
            var $barInner = $progressbar.find('.el-progress-bar__inner');
            var $barText = $progressbar.find('.el-progress__text');
            var percent = 0;
            // var fileId = 'uploadFileInput_'+new Date().getTime()+parseInt(Math.random()*10000,0);
            var supTimeout = setInterval(function () {
                percent = percent == 100 ? 0 : percent + 1;
                $barInner.css('width', percent + '%');
            }, 100);
        }
        else {
            obj.context.$refs[a].submit();
            obj.context.$refs[a].onSuccess = function (response, file, fileList) {
                if (obj.callbacks == '') {
                    console.log("callback函数为空")
                } else {
                    obj.callbacks(response, file, fileList)
                }
            };
            obj.context.$refs[a].onError = function (err, file, fileList) {
                console.log(err, file, fileList)
            }
        }
    },
    /**
     * [deepClone js对象深度拷贝函数]
     * @param  {[type]} iobj [被拷贝对象，必填]
     * @param  {[type]} fobj [附加信息对象，将信息加入生成对象的属性里面， 非必填]
     * @return {[type]}      [返回新的对象]
     */
    deepClone(iobj, fobj) {
        var obj___ = fobj || {};
        return (function fn(iobj, obj___) {
            for (var i in iobj) {
                var prop = iobj[i];
                // 避免相互引用对象导致死循环，如iobj.a = iobj的情况
                if (prop === obj___) {
                    continue;
                }
                if (typeof prop === 'object') {
                    obj___[i] = (prop.constructor === Array) ? [] : {};
                    fn(prop, obj___[i]);
                } else if (typeof prop === 'function') {
                    eval('obj[i] = ' + prop.toString());
                    //obj[i] = new Function(prop.toString());
                } else {
                    obj___[i] = prop;
                }
            }
            return obj___;
        })(iobj, obj___);
    },
    /**
     * div resize function
     */
    EleResize,
    /**
     * [fixScrollTop 滚动条动画函数]
     * @param  {[type]} $t [被滚动div dom jquery元素]
     */
    fixScrollTop($t) {
        $('html, body').animate({'scrollTop': $t.offset().top + 'px'}, 500);
    },
    /**
     * [openCalendarDialog 打开今日开标日历窗口]
     * @param  {[type]} context [上下对象,如果在方法里面就是this,如果是在template模板里面写就是self]
     */
    openCalendarDialog(context) {
        context.$store.state.head.dialog_bid_open_today = true;
        setTimeout(function () {
            context.$root.$children[0].$children[0].$children[0].$refs.calendar.beginClock();
        }, 0);
    }
}
