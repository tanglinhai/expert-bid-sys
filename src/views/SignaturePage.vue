<template>
  <div>
    <div class="row" >
      <div class="col-md-3 contentLeft">
          <a href="javascript:;" class="logo">
              <img src="@/assets/img/logo_qianzi.png"/>
          </a>
          <div class="leaderWrap">
              <a class="leader" @click="goto('/LeaderSignaturePage')" target="_blank" href="javascript:;" style="visibility: inherit;">查看所有文档</a>
              <a class="leader2"><span class="userName">{{userNickname}}</span></a>
          </div>
          <div class="zjList Gdscroll" id="sucai" v-loading="signatureLoading">

              <div class="indexPerson" v-for="(item,index) in fileMenuList" :key="index" :name="index">
                    <h5>{{item.menuName}}</h5>
                    <div class="personTitle">
                        <span>文件名称</span>
                        <span>创建时间</span>
                        <span>状态</span>
                      </div>
                      <ul class="personUl" >
                        <li v-for='(item2,index) in item.fileList' :key="index">
                            <p>{{item2.fileName}}</p>
                            <span>{{item2.gmt_modified}}</span>
                            <em v-if="item2.fileStatus==1">待签</em>
                            <em v-else-if="item2.fileStatus==2">待完成</em>
                            <em class="emsuccess" v-else>完成</em>
                        </li>
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
                          <div class="col-xs-6">{{projectName}}</div>
                          <div class="col-xs-2">{{peojectCode}}</div>
                          <div class="col-xs-2">{{projectPackageCode}}</div>
                          <div class="col-xs-2">{{projectPackageName}}</div>
                      </div>
                  </div>
              </h5>
              <div class="rightCon" style="float:left; width:100%; margin-top:110px; position:relative">
                  <img class="morenImg" src="@/assets/img/moren.gif"/>
                  <div class="scrollHei" style="width:100%; overflow:scroll;">
                      <div class="content_width">
                          <div id="svgDiv">  
                              <!-- <img style="float:left;width:100%; position:relative!important;cursor: pointer;" src="" type="image/svg+xml" class="svgimg div1" id="testsvg"/>   -->
                              <img class="imgsvgRightone svgimg div1" id="testsvg" style="float:left;width:80%; position:relative!important;cursor: pointer; left:10%; display:none;" src="@/assets/img/rightone.png" type="image/svg+xml"/>
                              <img class="imgsvgRighttwo svgimg div1" id="testsvg" style="float:left;width:80%; position:relative!important;cursor: pointer; left:10%; display:none;" src="@/assets/img/righttwo.png" type="image/svg+xml"/>
                          </div>  
                      </div>
                  </div>
                  <div class="btnsFixed">
                      <div id="inner" style="width: 100%;text-align: center;">  
                          <button class="svgZoomBtn big" title="放大" zoom="1" svg="testsvg" data-inline="true"></button>  
                          <button class="svgZoomBtn small" title="缩小" zoom="-1" svg="testsvg" data-inline="true"></button>  
                      </div>  
                      <div id="page2" class="paging"></div>
                      <div id="callBack2"><span>1</span><i style="display:inline-block; width:2px; font-size:16px;">/</i><em></em></div>
                  </div>
              </div>
          </div>
    </div>

    <div class="indexFix">
        <span class="tishimsgs" style="font-size:12px; position:absolute;left:50%; color:#c01717; margin-left:-150px; top:3px;">请稍侯，系统正在处理签名，完成后系统会自动刷新</span>
        <a id="more" style="display:block;" href="javascript:;" class="btns">批量签字</a>
        <a id="more2" href="http://localhost:7000/img/download.svc" download="" class="btn2">签名回执</a>
    </div>

    <!-- 模态框（Modal） -->
    <div class="model_tk">
        <div class="modal-body">
            <img class="tkGuanbi" src="@/assets/img/guanbi.png"/>
            <strong class="ewm_tishimsg">请扫描二维码提交签名</strong>
            <div class="ewm">
                <input  id="text" type="hidden" value="http://localhost:7000/page/TelPage.html" style="width:80%" />
                <div id="qrcode"></div>
                <p class="ewmsx">
                    <span>二维码已失效</span>
                    <a href="javascript:;" class="btnRefush">请刷新页面</a>
                </p>
                <!-- <img src="@/assets/img/ewm.png" alt=""> -->
                <strong>如果签名已完成，该页面会自动刷新</strong>
                <a target="_blank" href="http://localhost:7000/page/TelPage.html" class="ewm_lianjie" style="display:none;">电脑端签名</a>
            </div>
        </div>
    </div>

  </div>
</template>
<style lang="scss">
@import '../assets/css/common/mixin.scss';

</style>
<script>

import { setTimeout } from 'timers';
export default {
  name: 'SignaturePage',
  data() {
    return {
      projectName:'',
      peojectCode:'',
      projectPackageCode:'',
      projectPackageName:'',
      userNickname:'',
      fileMenuList:[],
      signatureLoading:true,
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
    // this.$commonJs.getScriptFile.call(this, {
    //     url: '/js/plugins/bootstrap/js/url.js',
    //     download_files_key: '/js/plugins/bootstrap/js/url.js',
    //     callback: this.init
    // });
    // this.$commonJs.getScriptFile.call(this, {
    //     url: '/js/plugins/bootstrap/js/index1.js',
    //     download_files_key: '/js/plugins/bootstrap/js/index1.js',
    //     callback: this.init
    // });
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
    
    goto(url){//开始评标
        this.$router.push({
            path: url
            });
    },

    qianziContent(){  //签字列表和项目信息展示
        this.signatureLoading=true;
        this.$axios.post('/api/SignaturePage', 'post', {
            // id: id,
            // type: radio
        }).then(res => {
            if (res.status == 200) {
                //console.log(res.data)
                this.projectName=res.data.resultBody.projectName;
                this.peojectCode=res.data.resultBody.peojectCode;
                this.projectPackageCode=res.data.resultBody.projectPackageCode;
                this.projectPackageName=res.data.resultBody.projectPackageName;
                this.userNickname=res.data.resultBody.userNickname;
                this.fileMenuList=res.data.fileMenuList;
                //console.log(this.fileMenuList)
                this.signatureLoading=false;
                
            }
        })
    },

    statuss(){   //判断是否签名状态接口
        this.$axios.post('/api/status', 'post', {
            // id: id,
            // type: radio
        }).then(res => {
            if (res.data.resultCode == 200) {
                if(res.data.userStampStatus==1){
                    this.qianziContent(),  //签字列表和项目信息展示 
                    $("#more2").css({"display":"block"});
                    $("#more").hide(); 
                    setTimeout(function(){
                        if($(".personUl li:last-child em").text()=="完成完成"||$(".personUl:last-child li:last-child em").text()=="完成"){
                            $(".tishimsgs").hide();
                            
                        }else{
                            $(".tishimsgs").show();
                        }
                    },2000)
                }
                
            }
        })
    },
    

  },

  mounted(){
    var timer;        
    var _this=this;
    // timer = setInterval(function(){
    //     _this.statuss();
    // },3000)

    this.qianziContent(),  //签字列表和项目信息展示 
    this.statuss(), //判断是否签名状态接口
    this.autodivheight(),
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
        $(".div1").Tdrag();
        //如果浏览器不支持SVG图片，则会转为PNG  
        $('.svgimg').svgmagic();  
        $(".svgZoomBtn").click(function(){ 
            var zoom = $(this).attr("zoom");  
            var svgId = $(this).attr("svg");  
            var cWidth = $("#"+svgId).width();  
            var cHeight = $("#"+svgId).height(); 
            if(zoom>0){  
                cWidth += cWidth*0.2;  
                cHeight += cHeight*0.2;
                if(cWidth>=$("#svgDiv").width()){
                    $(".content_width").width(3000);
                }
            }else if(zoom<0){  
                cWidth -= cWidth*0.2;  
                cHeight -=  cHeight*0.2;  
            }
            $("#"+svgId).width(cWidth);  
            $("#"+svgId).height(cHeight);  
        })
    },1000)
   $("#more").click(function(){    //签名按钮
        $(".model_tk").show();
        var qrcode = new QRCode(document.getElementById("qrcode"), {
            width : 270,
            height : 270
        });
        function makeCode () {		
            var elText = document.getElementById("text");
            if (!elText.value) {
                alert("Input a text");
                elText.focus();
                return;
            }
            qrcode.makeCode(elText.value);
        }
        makeCode ();
    });
    $(".tkGuanbi").click(function(){   //弹框关闭按钮
        $(".model_tk").hide();
        //$("#text").val('');
        $("#qrcode").html('');
        $(".ewmsx").hide();
       
     });

     $(".model_tk").click(function(){     //大弹框灰色点击
        $(this).hide();
        //$("#text").val('');
        $("#qrcode").html('');
        $(".ewmsx").hide();
       
    });

    $(".modal-body").click(function(e){   //冒泡事件
       var ev = e || event;
       ev.stopPropagation();
    });
    $(document).on('click','.personUl li:even',function(){
        $(".btnsFixed").show();
         $(".imgsvgRighttwo").hide();
         $(".imgsvgRightone").show();
    })
    
    $(document).on('click','.personUl li:odd',function(){
        $(".btnsFixed").show();
        $(".imgsvgRightone").hide();
        $(".imgsvgRighttwo").show();
    })

    
    
   
  },
  watch:{
   

  }
}
    
    
</script>
