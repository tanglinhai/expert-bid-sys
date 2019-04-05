<template>
    <div id="pdf">
        <div id="pdfShow"></div>
        <div class="tips_pdf">
            <b class="check_pdf_icon">
                <img src="../../assets/img/check_pdf.png" alt="" />
            </b>
            <b class="fr no_message_div">
                <h3 class="no_message_h1">对不起,您还没有安装PDF阅读器,为了方便预览PDF文档,请选择安装！</h3>
                <a href="http://ardownload.adobe.com/pub/adobe/reader/win/9.x/9.3/chs/AdbeRdr930_zh_CN.exe" class="adobe">安装PDF阅读器软件 </a>
                <a href="/documents/younojsxia.pdf">下载PDF</a>
            </b>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {}
    },
    mounted(){
        var pdfresult=this.isAcrobatPluginInstall();
        if(!pdfresult){
            $('#pdfShow').css('display','none');
            $('.tips_pdf').css('display','block');
        }else{
            $('.tips_pdf').css('display','none');
        }
        this.$commonJs.getScriptFile.call(this, {
            url: '/js/plugins/pdfobject/pdfobject.min.js',
            download_files_key: 'pdfobject',
            callback: this.setPdf
        });
    },
    methods:{
        setPdf({pdfUrl, loadingInstance} = {}){
            //var pdfUrl = this.pdfUrl// || "/documents/younojsxia.pdf";
            if(!pdfUrl){
                return;
            }
            let pdfShow=$("#pdfShow");
            let options={
                page:1,
                width: "100%",
                height: "auto",
                PDFJS_URL: '/js/plugins/pdfjs-2.0.943/web/viewer.html',
                forcePDFJS: true,
                pdfOpenParams: {
                    toolbar:0,
                    view:'FitH'
                 },
                // fallbackLink: "<p>在线浏览PDF，您的浏览器需要安装adobe pdf阅读器,<a href='https://get.adobe.com/cn/reader/download/?installer=Reader_DC_2019.008.20071_Chinese_Simp_for__Windows&os=Windows%2010&browser_type=KHTML&browser_dist=Chrome&d=McAfee_Security_Scan_Plus_Chrome_Browser&dualoffer=false&mdualoffer=false&cr=false&stype=7752'>点击我安装adobePdf</a>,<br/>不安装，直接下载PDF文件使用本地阅读器浏览<a href='"+pdfUrl+"'>下载PDF文件</a></p>"
            };
            setTimeout(function(){
                PDFObject.embed(pdfUrl, pdfShow, options);
                
                /*pdfShow.find('.pdfobject').get(0).onreadystatechange = function(e){
                    console.log(e, '====================================')
                };*/
                

                /*this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });*/
            }, 1000);
        },
        isAcrobatPluginInstall() {
            //下面代码都是处理IE浏览器的情况 
            if((window.ActiveXObject)||(navigator.userAgent.indexOf("Trident") > -1)) {
                for(x = 2; x < 10; x++) {
                    try {
                        oAcro = eval("new ActiveXObject('PDF.PdfCtrl." + x + "');");
                        if(oAcro) {
                            return true;
                        }
                    } catch(e) {}
                }
                try {
                    oAcro4 = new ActiveXObject('PDF.PdfCtrl.1');
                    if(oAcro4)
                        return true;
                } catch(e) {}
                try {
                    oAcro7 = new ActiveXObject('AcroPDF.PDF.1');
                    if(oAcro7)
                        return true;
                } catch(e) {}
            }else{
            //chrome和FF、safrai等其他浏览器
                return true;
            }
        },
    }
}
</script>
<style lang="scss">
#pdf{
    background: #fff;
    height: 100%;
    overflow: hidden;
    position: relative;
    #pdfShow{
        height: 100%;
    }
    .tips_pdf{
        display: none;
        width: 37%;
        height: 115px;
        margin: 15px auto;
        padding-right: 7px;
        border:1px solid #d9e0e7;
        img{
            margin-top: 15px;
            margin-left: 15px;
        }
        .no_message_div{
            margin-top: 30px;
        }
        a{  
            display: inline-block;
            margin-top:15px;
            margin-right: 142px;
        }
    }
}
</style>
