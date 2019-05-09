
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
     * [fullscreen 全屏函数]
     */
    fullscreen() {
        var elem = document.body;
        if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.requestFullScreen) {
            elem.requestFullscreen();
        } else {
            //浏览器不支持全屏API或已被禁用  
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
    },

    /**
     * [draw_bezier_curves draw bezier curves]
     * @param  {[array]} input [输入]
     * @param  {[number]} num [数量]
     * @param  {[array]} output [输处]
     */
    draw_bezier_curves(input,num, output) {  
        var step = 1.0 / num;
        var t =0;
        var count = input.length;
        for(var i=0; i<num; i++)
        {
            var tmp_points = [];
            for (var j = 1; j < count; ++j)
            {
                for (var k = 0; k < count - j; ++k)
                {
                    var tmp_point = [];
                    if (j == 1)
                    {
                        tmp_point[0] = input[k][0] * (1 - t) + input[k + 1][0] * t;
                        tmp_point[1] = input[k][1] * (1 - t) + input[k + 1][1] * t;
                        tmp_points[k] = tmp_point;
                        continue;
                    }
                    tmp_point[0] = tmp_points[k][0] * (1 - t) + tmp_points[k + 1][0] * t;
                    tmp_point[1] = tmp_points[k][1] * (1 - t) + tmp_points[k + 1][1] * t;
                    tmp_points[k] = tmp_point;
                }
            }
            t += step;  
            output[i] = tmp_points[0];  
        }
        output.splice(output.length -1 , 1, input[input.length - 1]);
    },
    /**
     * [pdf操作函数工具 公用函数：评标页面]
     */
    pdfOperations:{
        /**
         * [pdf操作初始化]
         */
        pdf_init(){
            this._dom_c = {
                $dom_body: $('body'),
                $div_pdf: $('.div_pdf'),
                $div_pdf_wrap: $('.div_pdf_wrap'),
                $center_part_wrap: $('.center_part_wrap'),
                $center_part: $('.center_part'),
                $content: $('.content'),
                $slidebar: $('.slideBar'),
            };
            this._dom_c.$dom_body.mouseup(this.slideBarMouseup);
            window.fullModeColumn = this.fullModeColumn;
            window.fullModeRow = this.fullModeRow;
            window.exitFullMode = this.exitFullMode;
            window.closePDF = this.closePDF;
            /*this.$commonJs.getScriptFile.call(this, {
                url: '/js/plugins/html2canvas.js',
                download_files_key: 'html2canvas.js'
            });*/
        },
        pdf_category_open_close($event){
            var $t = $($event.target).closest('.div_pdf_wrap');
            if($t.hasClass('close_pdf_sidebar')){
                $t.removeClass('close_pdf_sidebar');
            }else{
                $t.addClass('close_pdf_sidebar');
            }
        },
        /**
         * [pdf iframe document]
         */
        getIframeDocument(refStr) {
            return this.getIframeWindow(refStr).document;
        },
        /**
         * [pdf iframe window]
         */
        getIframeWindow(refStr) {
            var iframe;
            if (this.$refs[refStr] != null && this.$refs[refStr].length == 1) {
                iframe = $(this.$refs[refStr][0].$el).find('iframe');
            } else {
                iframe = $(this.$refs[refStr].$el).find('iframe');
            }
            return iframe.get(0).contentWindow;
        },
        /**
         * [pdf 定位到关联投标文件说明处]
         */
        locate_pdf(relativePoint, pdfs) {
            /*if (relativePoints.length == 0) {
                this.$confirm('该项在投标文件中没有关联！, 是否要打开投标文件?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.show_pdf(tempArr[0].pdf[0]);
                }).catch(() => {

                });
                return;
            }*/
            var pdf;
            for(var i=0;i<pdfs.length;i++){
                if(pdfs[i].id == relativePoint.id){
                    pdf = pdfs[i];
                    break;
                }
            }
            this.show_pdf(pdf, relativePoint.txt, relativePoint.page);
        },
        /**
         * [pdf 显示PDF]
         */
        show_pdf(obj, queryStr, page) {//查看pdf
            //this.$commonJs.fullscreen();
            //pdfItems: [],//动态插入pdfcurrPdfUrl
            var currPDF;
            for (var i = 0; i < this.pdfItems.length; i++) {
                if (this.pdfItems[i].ref == "pdf_" + obj.id) {
                    currPDF = this.pdfItems[i];
                }
                this.$set(this.pdfItems[i], 'show', false);
            }
            if (currPDF) {//exist
                currPDF && this.$set(currPDF, 'show', true);
                if (this._dom_c.$content.hasClass('presentation_mode_row') || this._dom_c.$content.hasClass('presentation_mode_column')) {
                    this.getIframeDocument(currPDF.ref).getElementById('presentationMode_exit').style.display = 'block';
                }
                var iframeWindow = this.getIframeWindow(currPDF.ref);
                if(page){
                    iframeWindow.PDFViewerApplication.pdfViewer.currentPageNumber = page;
                }
                if (queryStr) {
                    iframeWindow.PDFViewerApplication.findBar.findField.value = queryStr;
                    iframeWindow.PDFViewerApplication.findBar.dispatchEvent('');
                }
            } else {// not exist <pdf :pdfUrl="item.currPdfUrl" :ref="item.ref" v-for="item in pdfItems" v-show="item.show"></pdf>
                var _this = this;
                this.pdfItems.push({
                    currPdfUrl: obj.url1,
                    queryStr: queryStr || '',
                    page: page || 1,
                    //currPdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
                    ref: "pdf_" + obj.id,
                    show: true,
                    /*loadingInstance: ELEMENT.Loading.service({
                        target: this._dom_c.$div_pdf.get(0),
                        text: '拼命加载中...',
                        background: 'rgba(0,0,0,.75)'
                    }),*/
                    onload: function () {

                        $(this.contentWindow.document.getElementById('secondaryToolbarButtonContainer')).append(
                            `<button 
                                id="presentationMode_column2" 
                                class="secondaryToolbarButton presentationMode_column" 
                                onclick="document.getElementById('presentationMode_exit').style.display='block';
                                document.getElementById('presentationMode_exit2').style.display='block';
                                parent.fullModeColumn()"
                                title="切换到列模式">
                                <span>列模式</span>
                            </button>
                            <button 
                                id="presentationMode_row2" 
                                class="secondaryToolbarButton presentationMode_row" 
                                onclick="document.getElementById('presentationMode_exit').style.display='block';
                                document.getElementById('presentationMode_exit2').style.display='block';
                                parent.fullModeRow()"
                                title="切换到行模式">
                                <span>行模式</span>
                            </button>
                            <button 
                                id="presentationMode_exit2" 
                                class="secondaryToolbarButton presentationMode_exit" 
                                ${_this._dom_c.$content.hasClass('presentation_mode_row') || _this._dom_c.$content.hasClass('presentation_mode_column') ? '' : 'style="display:none;"'}
                                onclick="parent.exitFullMode();this.style.display='none';
                                document.getElementById('presentationMode_exit').style.display='none';"
                                title="退出行/列模式">
                                <span>退出行/列模式</span>
                            </button>
                            <button 
                                id="closePdfDocument2" 
                                class="secondaryToolbarButton closePdfDocument" 
                                onclick="parent.closePDF();
                                document.getElementById('presentationMode_exit').style.display='none';
                                document.getElementById('presentationMode_exit2').style.display='none';"
                                title="关闭文档">
                                <span>关闭文档</span>
                            </button>`
                        );
                        $(this.contentWindow.document.getElementById('toolbarViewerRight')).prepend(
                            `<button 
                                id="presentationMode_column" 
                                class="toolbarButton presentationMode_column hiddenLargeView" 
                                onclick="document.getElementById('presentationMode_exit').style.display='block';
                                document.getElementById('presentationMode_exit2').style.display='block';
                                parent.fullModeColumn()"
                                title="切换到列模式">
                                <span>列模式</span>
                            </button>
                            <button 
                                id="presentationMode_row" 
                                class="toolbarButton presentationMode_row hiddenLargeView" 
                                onclick="document.getElementById('presentationMode_exit').style.display='block';
                                document.getElementById('presentationMode_exit2').style.display='block';
                                parent.fullModeRow()"
                                title="切换到行模式">
                                <span>行模式</span>
                            </button>
                            <button 
                                id="presentationMode_exit" 
                                class="toolbarButton presentationMode_exit hiddenLargeView" 
                                ${_this._dom_c.$content.hasClass('presentation_mode_row') || _this._dom_c.$content.hasClass('presentation_mode_column') ? '' : 'style="display:none;"'}
                                onclick="parent.exitFullMode();this.style.display='none';
                                document.getElementById('presentationMode_exit2').style.display='none';"
                                title="退出行/列模式">
                                <span>退出行/列模式</span>
                            </button>`
                        ).append(`<button 
                                id="closePdfDocument" 
                                class="toolbarButton closePdfDocument hiddenLargeView" 
                                onclick="parent.closePDF();
                                document.getElementById('presentationMode_exit').style.display='none';
                                document.getElementById('presentationMode_exit2').style.display='none';"
                                title="关闭文档">
                                <span>关闭文档</span>
                            </button>`);
                    }
                });
            }

            this.showPDF();
        },


        /**
         * [pdf 鼠标滑条按下事件]
         */
        slideBarMousedown(e) {
            this.hDiff = this._dom_c.$content.hasClass('presentation_mode_row') ? e.clientY - this._dom_c.$div_pdf.height() :
                this._dom_c.$content.hasClass('presentation_mode_column') ? this._dom_c.$center_part_wrap.width() - e.clientX :
                    e.clientY - this._dom_c.$slidebar.offset().top;
            this.slideBarIsControl = true;
            this._dom_c.$dom_body.bind('mousemove.slideBarMousemove', this.slideBarMousemove);
            this.currentPdfShow.append('<div class="floating_div"></div>');
        },
        /**
         * [pdf 鼠标滑条取消按下事件]
         */
        slideBarMouseup() {
            this.slideBarIsControl = false;
            this._dom_c.$dom_body.unbind('mousemove.slideBarMousemove');
            this.currentPdfShow && this.currentPdfShow.find('.floating_div').remove();
        },
        /**
         * [pdf 鼠标滑条移动事件]
         */
        slideBarMousemove(e) {
            e.originalEvent.preventDefault();
            e.originalEvent.cancelBable = true;
            e.originalEvent.stopPropagation();
            if (this.slideBarIsControl) {
                if (this._dom_c.$content.hasClass('presentation_mode_row')) {
                    var totalH = this._dom_c.$content.height();
                    this._dom_c.$div_pdf.css('height', ((e.clientY - this.hDiff) / totalH) * 100 + '%');
                    this._dom_c.$center_part_wrap.css({
                        'height': ((totalH - e.clientY + this.hDiff) / totalH) * 100 + '%',
                        'top': ((e.clientY - this.hDiff) / totalH) * 100 + '%'
                    });
                } else if (this._dom_c.$content.hasClass('presentation_mode_column')) {
                    var totalW = this._dom_c.$content.width();
                    this._dom_c.$div_pdf.css({
                        'width': ((totalW - e.clientX - this.hDiff) / totalW) * 100 + '%',
                        'left': ((e.clientX + this.hDiff) / totalW) * 100 + '%'
                    });
                    this._dom_c.$center_part_wrap.css('width', ((e.clientX + this.hDiff) / totalW) * 100 + '%');
                } else if (this._dom_c.$content.hasClass('showPDF_content')) {
                    this._dom_c.$div_pdf.height(
                        e.clientY - this.hDiff - parseInt(this._dom_c.$slidebar.css('margin-top')) - this._dom_c.$div_pdf.offset().top + 'px');
                }

            }
        },
        /**
         * [pdf 退出全屏模式]
         */
        exitFullMode() {
            this._dom_c.$div_pdf.attr('style', "");
            this._dom_c.$center_part_wrap.attr('style', "");
            this._dom_c.$content.removeClass('fullMode presentation_mode_column presentation_mode_row');
            if (this.currentPdfShow.children().length == 1) {
                this._dom_c.$content.addClass('showPDF_content');
            }
        },


        /**
         * [pdf 全屏模式动画初始化]
         */
        initFullMode(modeType, isFirstInPresentation){

            if(!isFirstInPresentation){
                
                if(modeType == 'column'){
                    pdf_l = 0;
                    pdf_t = 0;
                    pdf_w = parseFloat(this._dom_c.$div_pdf.get(0).style.width);
                    pdf_h = parseFloat(this._dom_c.$div_pdf.get(0).style.height);
                    
                    cen_l = parseFloat(this._dom_c.$center_part_wrap.get(0).style.left);
                    cen_t = parseFloat(this._dom_c.$center_part_wrap.get(0).style.top);
                    cen_w = parseFloat(this._dom_c.$center_part_wrap.get(0).style.width);
                    cen_h = parseFloat(this._dom_c.$center_part_wrap.get(0).style.height);
                }else{
                    pdf_l = parseFloat(this._dom_c.$div_pdf.get(0).style.left);
                    pdf_t = parseFloat(this._dom_c.$div_pdf.get(0).style.top);
                    pdf_w = parseFloat(this._dom_c.$div_pdf.get(0).style.width);
                    pdf_h = parseFloat(this._dom_c.$div_pdf.get(0).style.height);
                    
                    cen_l = 0;
                    cen_t = 0;
                    cen_w = parseFloat(this._dom_c.$center_part_wrap.get(0).style.width);
                    cen_h = parseFloat(this._dom_c.$center_part_wrap.get(0).style.height);
                }
            }

            var bodyH = document.body.clientHeight;
            var conW = this._dom_c.$content.removeClass('presentation_mode_column presentation_mode_row').width();
            this._dom_c.$div_pdf.attr('style',"");
            this._dom_c.$center_part_wrap.attr('style',"");
            this._dom_c.$div_pdf_wrap.css({
                'width': conW+'px',
                'height': bodyH+'px',
            });




            if (modeType == 'column') {
                this._dom_c.$div_pdf.css({
                    overflow: 'hidden',
                    "z-index": 2
                });
                this._dom_c.$center_part_wrap.css({
                    overflow: 'hidden',
                    "z-index": 1
                });
                //this._dom_c.$slidebar.css('width', conW+'px');
            } else {
                this._dom_c.$div_pdf.css({
                    overflow: 'hidden',
                    "z-index": 1
                });
                this._dom_c.$center_part_wrap.css({
                    overflow: 'hidden',
                    "z-index": 2
                });
                //this._dom_c.$slidebar.css('width', conW+'px');
            }


            var pdf_l;
            var pdf_t;
            var pdf_w;
            var pdf_h;

            var cen_l;
            var cen_t;
            var cen_w;
            var cen_h;

            var pdfInput1;
            var pdfLeftTop;
            var pdfInput2;
            var pdfWH;
            var centerInput1;
            var centerLeftTop;
            var centerInput2;
            var centerWH;
            var num = 50;

            if (isFirstInPresentation) {
                var conH = this._dom_c.$content.height();
                var bodyW = document.body.clientWidth;
                
                var scrollTop = $('html,body').scrollTop();


                var pdfOffset = this._dom_c.$div_pdf.offset();
                var part_wrapOffset = this._dom_c.$center_part_wrap.offset();
                var pdfW = this._dom_c.$div_pdf.width();
                var pdfH = this._dom_c.$div_pdf.height();
                var partW = this._dom_c.$center_part_wrap.width();
                var partH = this._dom_c.$center_part_wrap.height();


                pdf_l = pdfOffset.left/bodyW*100;
                pdf_t = (pdfOffset.top - scrollTop)/bodyH*100;
                pdf_w = pdfW/bodyW*100;
                pdf_h = pdfH/bodyH*100;
                
                cen_l = part_wrapOffset.left/bodyW*100;
                cen_t = (part_wrapOffset.top - scrollTop)/bodyH*100;
                cen_w = partW/bodyW*100;
                cen_h = partH/bodyH*100;

                this._dom_c.$div_pdf.css({
                    position: 'absolute',
                    top: pdf_t+'%',
                    left: pdf_l+'%',
                    width: pdf_w+'%',
                    height: pdf_h+'%'
                });
                this._dom_c.$center_part_wrap.css({
                    position: 'absolute',
                    top: cen_t+'%',
                    left: cen_l+'%',
                    width: cen_w+'%',
                    height: cen_h+'%'
                });

                if (modeType == 'column') {
                    /**
                     * .div_pdf {
                            top: 30% !important;
                            left: 52% !important;
                            bottom: 30% !important;
                            right: 36% !important;
                        }
                     .center_part_wrap {
                            top: 30% !important;
                            left: 36% !important;
                            bottom: 30% !important;
                            right: 52% !important;
                        }
                     */
                    //pdf
                    pdfInput1 = [
                        [pdf_l, pdf_t],
                        [90, -20],
                        [80, pdf_t / 3],
                        [60, pdf_t],
                        [52, 30]
                    ];
                    pdfLeftTop = [];
                    pdfInput2 = [
                        [pdf_w, pdf_h],
                        [13, 30],
                        [15, 49],
                        [18, 45],
                        [13, 35]
                    ];
                    pdfWH = [];

                    //center_part_wrap

                    centerInput1 = [
                        [cen_l, cen_t],
                        [-15, -35],
                        [5, -5],
                        [15 * 4, 15],
                        [36, 30]
                    ];
                    centerLeftTop = [];
                    centerInput2 = [
                        [cen_w, cen_h],
                        [4, 5],
                        [8, 49],
                        [20, 40],
                        [13, 35]
                    ];
                    centerWH = [];
                } else {
                    /*.presentation_mode_row_animate {
                        .div_pdf {
                            top: 30% !important;
                            left: 40% !important;
                            bottom: 52% !important;
                            right: 40% !important;
                        }
                        .center_part_wrap {
                            top: 52% !important;
                            left: 40% !important;
                            bottom: 30% !important;
                            right: 40% !important;
                        }
                    }*/
                    //pdf
                    pdfInput1 = [
                        [pdf_l, pdf_t],
                        [38, 30],
                        [80, 0],
                        [45, -20],
                        [40, 30]
                    ];
                    pdfLeftTop = [];
                    pdfInput2 = [
                        [pdf_w, pdf_h],
                        [40, 20],
                        [30, 33],
                        [25, 28],
                        [25, 14]
                    ];
                    pdfWH = [];

                    //center_part_wrap
                    centerInput1 = [
                        [cen_l, cen_t],
                        [-20, -30],
                        [cen_l * 1.2, 0],
                        [cen_l * 4, 20],
                        [40, 52]
                    ];
                    centerLeftTop = [];
                    centerInput2 = [
                        [cen_w, cen_h],
                        [40, 20],
                        [30, 33],
                        [25, 28],
                        [25, 14]
                    ];
                    centerWH = [];
                }
            } else {

                if(modeType == 'column'){
                    //pdf 1
                    pdfInput1 = [
                        [pdf_l,pdf_t],
                        [80, 20],
                        [60, 50],
                        [25, 20],
                        [52,30]
                    ];
                    pdfLeftTop = [];
                    pdfInput2 = [
                        [pdf_w,pdf_h],
                        [4,5],
                        [8,49],
                        [20,40],
                        [13,35]
                    ];
                    pdfWH = [];

                    //center_part_wrap
                    centerInput1 = [
                        [cen_l,cen_t],
                        [75, 28],
                        [35, 65],
                        [10, 27],
                        [36,30]
                    ];
                    centerLeftTop = [];
                    centerInput2 = [
                        [cen_w, cen_h],
                        [4, 5],
                        [8, 49],
                        [20, 40],
                        [13, 35]
                    ];
                    centerWH = [];
                }else{
                    //pdf 
                    pdfInput1 = [
                        [pdf_l,pdf_t],
                        [-30, 15],
                        [50, 46],
                        [100, 23],
                        [40,30]
                    ];
                    pdfLeftTop = [];
                    pdfInput2 = [
                        [pdf_w, pdf_h],
                        [40, 20],
                        [30, 33],
                        [25, 28],
                        [25, 14]
                    ];
                    pdfWH = [];

                    //center_part_wrap
                    centerInput1 = [
                        [cen_l,cen_t],
                        [-70, 53],
                        [37, 90],
                        [90, 50],
                        [40,52]
                    ];
                    centerLeftTop = [];
                    centerInput2 = [
                        [cen_w, cen_h],
                        [40, 20],
                        [30, 33],
                        [25, 28],
                        [25, 14]
                    ];
                    centerWH = [];
                }
            }

            this.$commonJs.draw_bezier_curves(pdfInput1, num, pdfLeftTop);
            this.$commonJs.draw_bezier_curves(pdfInput2, num, pdfWH);
            this.$commonJs.draw_bezier_curves(centerInput1, num, centerLeftTop);
            this.$commonJs.draw_bezier_curves(centerInput2, num, centerWH);


            return {
                pdfLeftTop,
                pdfWH,
                centerLeftTop,
                centerWH,
                num
            };
        },

        /**
         * [pdf 全屏列模式]
         */
        fullModeColumn() {
            /*if(this._dom_c.$content.hasClass('presentation_mode_column')){
                this.$message({
                  message: '当前已经是列阅读模式!',
                  type: 'warning'
                });
                return;
            }*/
            var _this = this;
            var isFirstInPresentation = !_this._dom_c.$content.hasClass('fullMode');
            var points = _this.initFullMode('column', isFirstInPresentation);
            _this._dom_c.$content.addClass('fullMode presentation_mode_column');

            var win = window;
            win.cancelAnimationFrame(win._requestAnimationFrame_reqestId);
            var count = 0;

            function render() {
                if (count < points.num) {
                    _this._dom_c.$div_pdf.css({
                        top: points.pdfLeftTop[count][1] + '%',
                        left: points.pdfLeftTop[count][0] + '%',
                        width: points.pdfWH[count][0] + '%',
                        height: points.pdfWH[count][1] + '%'
                    });
                    _this._dom_c.$center_part_wrap.css({
                        top: points.centerLeftTop[count][1] + '%',
                        left: points.centerLeftTop[count][0] + '%',
                        width: points.centerWH[count][0] + '%',
                        height: points.centerWH[count][1] + '%'
                    });
                    win._requestAnimationFrame_reqestId = win.requestAnimationFrame(render);
                } else {
                    _this._dom_c.$div_pdf.animate({
                        top: '0',
                        left: '50%',
                        width: '50%',
                        height: '100%'
                    }, {
                        duration: 1000,
                        easing: 'easeInOutBack',

                        complete: function(){
                            _this._dom_c.$div_pdf_wrap.css({
                                'width': 'auto',
                                'height': '100%',
                            });
                            _this._dom_c.$slidebar.attr('style',"");

                        }
                    });
                    _this._dom_c.$center_part_wrap.animate({
                        top: '0',
                        left: '0',
                        width: '50%',
                        height: '100%'
                    }, {
                        duration: 1000,
                        easing: 'easeInOutBack',
                        complete: function () {

                        }
                    });
                }
                count++;
            }

            win._requestAnimationFrame_reqestId = win.requestAnimationFrame(render);
        },



        /**
         * [pdf 全屏行模式]
         */
        fullModeRow() {
            /*if(this._dom_c.$content.hasClass('presentation_mode_row')){
                this.$message({
                  message: '当前已经是行阅读模式!',
                  type: 'warning'
                });
                return;
            }*/
            var _this = this;
            var isFirstInPresentation = !this._dom_c.$content.hasClass('fullMode');
            var points = this.initFullMode('row', isFirstInPresentation);
            this._dom_c.$content.addClass('fullMode presentation_mode_row');
            var win = window;
            win.cancelAnimationFrame(win._requestAnimationFrame_reqestId);
            var count = 0;

            function render() {
                if (count < points.num) {
                    _this._dom_c.$div_pdf.css({
                        top: points.pdfLeftTop[count][1] + '%',
                        left: points.pdfLeftTop[count][0] + '%',
                        width: points.pdfWH[count][0] + '%',
                        height: points.pdfWH[count][1] + '%'
                    });
                    _this._dom_c.$center_part_wrap.css({
                        top: points.centerLeftTop[count][1] + '%',
                        left: points.centerLeftTop[count][0] + '%',
                        width: points.centerWH[count][0] + '%',
                        height: points.centerWH[count][1] + '%'
                    });
                    win._requestAnimationFrame_reqestId = win.requestAnimationFrame(render);
                } else {
                    _this._dom_c.$div_pdf.animate({
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '60%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutExpo',

                        complete: function(){
                            _this._dom_c.$div_pdf_wrap.css({
                                'width': 'auto',
                                'height': '100%',
                            });
                            _this._dom_c.$slidebar.attr('style',"");

                        }
                    });
                    _this._dom_c.$center_part_wrap.animate({
                        top: '60%',
                        left: '0',
                        width: '100%',
                        height: '40%'
                    }, {
                        duration: 1000,
                        easing: 'easeOutExpo',
                        complete: function () {

                        }
                    });
                }
                count++;
            }

            win._requestAnimationFrame_reqestId = win.requestAnimationFrame(render);
        },

        /**
         * [pdf 关闭PDF]
         */
        closePDF() {
            if (this._dom_c.$content.hasClass('presentation_mode_column') || this._dom_c.$content.hasClass('presentation_mode_row')) {
                this.exitFullMode();
            }
            this._dom_c.$content.removeClass('showPDF_content');
        },
        /**
         * [pdf 显示PDF]
         */
        showPDF() {
            this._dom_c.$content.addClass('showPDF_content');
        }
    }
}


