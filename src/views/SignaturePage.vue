<template>
  <div>
    <div class="row">
      <div class="col-md-3 contentLeft">
          <a href="javascript:;" class="logo">
              <img src="@/assets/img/logo_qianzi.png"/>
          </a>
          <div class="leaderWrap">
              <a class="leader" target="_blank" href="javascript:;" style="visibility: inherit;">查看所有文档</a>
              <a class="leader2"><span class="userName">新增专家一号</span></a>
          </div>
          <div class="zjList Gdscroll" id="sucai">
              <div class="indexPerson">
                    <h5>我的签名文档</h5>
                    <div class="personTitle">
                        <span>文件名称</span>
                        <span>创建时间</span>
                        <span>状态</span>
                      </div>
                      <ul class="personUl">
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                     </ul>
                     <p style="font-size:14px; text-align:center;margin-top:20px; display:none">您，暂无签名文档！</p>
              </div>
              <div class="indexPerson">
                    <h5>我的会签文档</h5>
                    <div class="personTitle">
                        <span>文件名称</span>
                        <span>创建时间</span>
                        <span>状态</span>
                      </div>
                      <ul class="personUl">
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                        <li><p>资格审查汇总报表</p><span>2019-01-11 18:25:04</span><em>待完成</em></li>
                     </ul>
                     <p style="font-size:14px; text-align:center;margin-top:20px; display:none">您，暂无签名文档！</p>
              </div>
          </div>
      </div>
      <div class="col-md-9 contentRight">
              <h5 class="projectName">
                  <div class="container titleBox">
                      <div class="row" style="color:#666;">
                          <div class="col-xs-6">项目名称:</div>
                          <div class="col-xs-2">项目编号:</div>
                          <div class="col-xs-2">包编号:</div>
                          <div class="col-xs-2">包名称:</div>
                      </div>
                      <div class="row projects" style="font-weight:bold; line-height:20px; font-size:16px;">
                          <div class="col-xs-6"></div>
                          <div class="col-xs-2"></div>
                          <div class="col-xs-2"></div>
                          <div class="col-xs-2"></div>
                      </div>
                  </div>
              </h5>
              <div class="rightCon" style="float:left; width:100%; margin-top:110px; position:relative">
                  <img class="morenImg" src="@/assets/img/moren.gif"/>
                  <div class="scrollHei" style="width:100%; overflow:scroll;">
                      <div class="content_width">
                          <div id="svgDiv">  
                              <!-- <img style="float:left;width:100%; position:relative!important;cursor: pointer;" src="" type="image/svg+xml" class="svgimg div1" id="testsvg"/>   -->
                              <img class="imgsvgRightone" style="float:left;width:80%; position:relative!important;cursor: pointer; left:10%; display:none;" src="@/assets/img/rightone.png" type="image/svg+xml"/>
                              <img class="imgsvgRighttwo" style="float:left;width:80%; position:relative!important;cursor: pointer; left:10%; display:none;" src="@/assets/img/righttwo.png" type="image/svg+xml"/>
                          </div>  
                      </div>
                  </div>
                  <div class="btnsFixed">
                      <div id="inner" style="width: 100%;text-align: center;">  
                          <button class="svgZoomBtn big" title="放大" zoom="1" svg="testsvg" data-inline="true"></button>  
                          <button class="svgZoomBtn small" title="缩小" zoom="-1" svg="testsvg" data-inline="true"></button>  
                      </div>  
                      <div id="page2" class="paging"></div>
                      <div id="callBack2"><span>1</span>/<em></em></div>
                  </div>
              </div>
          </div>
    </div>

    <div class="indexFix">
        <span class="tishimsgs" style="font-size:12px; position:absolute;left:50%; color:#c01717; margin-left:-150px; top:3px;">请稍侯，系统正在处理签名，完成后系统会自动刷新</span>
        <a id="more" style="display:block;" href="javascript:;" class="btns">批量签字</a>
        <a id="more2" href="javascript:;" download="" class="btn2">签名回执</a>
    </div>

    <!-- 模态框（Modal） -->
    <div class="model_tk">
        <div class="modal-body">
            <img class="tkGuanbi" src="@/assets/img/guanbi.png"/>
            <strong class="ewm_tishimsg">请扫描二维码提交签名</strong>
            <div class="ewm">
                <input  id="text" type="hidden" value="" style="width:80%" />
                <!-- <div id="qrcode"></div> -->
                <p class="ewmsx">
                    <span>二维码已失效</span>
                    <a href="javascript:;" class="btnRefush">请刷新页面</a>
                </p>
                <img src="@/assets/img/ewm.png" alt="">
                <strong>如果签名已完成，该页面会自动刷新</strong>
                <a target="_blank" class="ewm_lianjie" style="display:none;">电脑端签名</a>
            </div>
        </div>
    </div>

  </div>
</template>
<style lang="scss">
@import '../assets/css/common/mixin.scss';

</style>
<script>
export default {
  name: 'SignaturePage',
  data() {
    return {
      
    };
  },
  components: {
    
  },
  created(){
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/bootstrap/css/bootstrap.min.css',
        download_files_key: '/js/plugins/bootstrap/css/bootstrap.min.css'
    });
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/bootstrap/css/index.css',
        download_files_key: '/js/plugins/bootstrap/css/index.css'
    });
    this.$commonJs.getCssFile.call(this, {
        url: '/js/plugins/bootstrap/css/page.css',
        download_files_key: '/js/plugins/bootstrap/css/page.css'
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/jquery.nicescroll.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/jquery.nicescroll.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/bootstrap.min.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/bootstrap.min.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/qrcode.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/qrcode.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/qrcode.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/qrcode.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/url.js',
        download_files_key: '/js/plugins/bootstrap/js/url.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/index1.js',
        download_files_key: '/js/plugins/bootstrap/js/index1.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/jquery.svgmagic.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/jquery.svgmagic.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/plugin/paging.js',
        download_files_key: '/js/plugins/bootstrap/js/plugin/paging.js',
        callback: this.init
    });
    this.$commonJs.getScriptFile.call(this, {
        url: '/js/plugins/bootstrap/js/Tdrag.js',
        download_files_key: '/js/plugins/bootstrap/js/Tdrag.js',
        callback: this.init
    });

  },
  methods: {
   
    autodivheight(){
        $(".scrollHei").height($(document.body).height()-110);//加载进来右侧滚动条显示位置
        $("#sucai").height($(document.body).height()-240);
    },
  },

  mounted(){
    this.autodivheight()
    window.onresize=this.autodivheight(); 
    $("#sucai").height($(document.body).height()-240);
    setTimeout(function(){
        $("#sucai").niceScroll({ 
            cursorcolor:"#348fe2",  
            cursoropacitymax:1,  
            touchbehavior:false,  
            cursorwidth:"3px",  
            cursorborder:"0",  
            cursorborderradius:"3px"  
        }); 
    },1000)
    $(".personUl li:even").click(function(){
        $(".imgsvgRighttwo").hide();
        $(".imgsvgRightone").show();
    })
    $(".personUl li:odd").click(function(){
        $(".imgsvgRightone").hide();
        $(".imgsvgRighttwo").show();
    })
  },
  watch:{
   

  }
}
    
    // $(document).ready(function(){  
    //     $(".div1").Tdrag();
    //     //如果浏览器不支持SVG图片，则会转为PNG  
    //     $('.svgimg').svgmagic();  
    //     $(".svgZoomBtn").click(function(){ 
    //         var zoom = $(this).attr("zoom");  
    //         var svgId = $(this).attr("svg");  
    //         var cWidth = $("#"+svgId).width();  
    //         var cHeight = $("#"+svgId).height(); 
    //         if(zoom>0){  
    //             cWidth += cWidth*0.2;  
    //             cHeight += cHeight*0.2;
    //             if(cWidth>=$("#svgDiv").width()){
    //                 $(".content_width").width(3000);
    //             }
    //         }else if(zoom<0){  
    //             cWidth -= cWidth*0.2;  
    //             cHeight -=  cHeight*0.2;  
    //         }
    //         $("#"+svgId).width(cWidth);  
    //         $("#"+svgId).height(cHeight);  
    //     })
    // });
</script>
