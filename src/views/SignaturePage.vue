<template>
  <div>
    <div class="row" >
      <div class="col-md-3 contentLeft">
          <a href="javascript:;" class="logo">
              <img src="@/assets/img/logo_qianzi.png"/>
          </a>
          <div class="leaderWrap">
              <a class="leader" @click="ToLeaderPage" href="javascript:;" style="visibility: inherit;">查看所有文档</a>
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
        <a id="more" @click="more" style="display:block;" href="javascript:;" class="btns"><i v-if="moreLoading" class="el-icon-loading"></i>&nbsp;&nbsp;批量签字</a>
        <a id="more2" href="http://localhost:7000/img/download.svc" download="" class="btn2">签名回执</a>
    </div>

    <!-- 模态框（Modal） -->
    <div class="model_tk">
        <div class="ChangeCA" @click.stop>
            <img class="tkGuanbi" src="@/assets/img/guanbi.png"/>
            <a href="javascript:;" @click="SelectBj" v-loading="BjLoading">
                <img src="@/assets/img/logo222.png"/>
                北京CA
            </a>
            <a href="javascript:;" @click="SelectHebei" v-loading="HbLoading">
                <img src="@/assets/img/logo111.png"/>
                河北CA
            </a>
        </div>
        <div class="HebeiQianzi" @click.stop>
            <img class="tkGuanbi" src="@/assets/img/guanbi.png"/>
            <img class="logo111" src="@/assets/img/logo111.png"/>
            <span>河北签章入口</span>
            <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="130px" class="demo-ruleForm">
                <el-form-item
                    label="证书编号："
                    prop="Zhengshubianhao"
                    :rules="[
                    { required: true, message: '证书编号不能为空'}
                    ]"
                >
                    <el-input type="Zhengshubianhao" v-model.number="numberValidateForm.Zhengshubianhao" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="签章密码："
                    prop="Qianzhangpasword"
                    :rules="[
                    { required: true, message: '签章密码不能为空'}
                    ]"
                >
                    <el-input type="Qianzhangpasword" v-model.number="numberValidateForm.Qianzhangpasword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="hebeiBtns">
                    <el-button type="primary" :loading="HbTjLoaing" @click="submitForm('numberValidateForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
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
    <!--不是组长而且组长未选择签字地区判断-->
    <el-dialog
        title="系统提示"
        :visible.sync="TipdialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>请等待专家组长选择签名方式！</span>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="TipdialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="TipdialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    <!--不是组长而且组长未选择签字地区判断-->
  </div>
</template>
<style lang="scss">
@import '../assets/css/common/mixin.scss';
.model_tk{
    .ChangeCA{
        position: absolute;
        width: 500px;
        height: 440px;
        top: 50%;
        margin-top: -220px;
        left: 50%;
        margin-left: -250px;
        background: white;
        border-radius: 20px;
        padding-top:80px;
        a{
            display:inline-block;
            width:160px;
            height:240px;
            margin-left:60px;
            border:1px solid #ccc;
            border-radius:10px;
            font-size:16px;
            text-align: center;
            color:#BEBEBE;
            background:white;
            img{
                display:block;
                margin:20px auto;
                margin-top:65px;
            }
            &:hover{
                background:#1295F2;
                color:white;
            }
        }
        .tkGuanbi{
           right: 12px;
           top: 14px;
           position: absolute;
        }
    };
    .HebeiQianzi{
        position: absolute;
        width: 500px;
        height: 440px;
        top: 50%;
        margin-top: -220px;
        left: 50%;
        margin-left: -250px;
        background: white;
        border-radius: 20px;
        .tkGuanbi{
           right: 12px;
           top: 14px;
           position: absolute;
        }
        .logo111{
            display:block;
            margin:20px auto;
        }
        >span{
            display: block;
            text-align: center;
            font-size:16px;
            font-weight:bold;
            margin-bottom:20px;
        }
        .hebeiBtns{
            text-align: center;
            margin-left:-130px;
        }
        .el-input{
            width:80%;
        }
    }
} 
</style>
<script>
var t;
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

      TipdialogVisible:false,  //未选择签字地区且不是组长得提示弹框
      numberValidateForm: {
          Zhengshubianhao: '',  //证书编号
          Qianzhangpasword:'',  //签章密码
      },
      moreLoading:false,  //批量签字按钮的loading
      BjLoading:false,  //选择北京ca的loading
      HbLoading:false,  //选择河北ca的loading
      HbTjLoaing:false, //选择河北ca输入信息提交loading
      
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

    ToLeaderPage(){  //签字页面得查看所有文档跳转点击
        window.open(window.location.protocol+'//'+window.location.host+'/LeaderSignaturePage','_blank');
    },
    
     //$("#more").click(function(){    //签名按钮
    more(){  //签名按钮
        this.moreLoading=true;
        this.$axios.post('/api/BeijingOrHebei', 'post', {
            // id: id,
            // type: radio
        }).then(res => {
            if (res.data.resultCode == 200) {
                this.moreLoading=false;
                console.log(res.data.resultBody.role,res.data.resultBody.system,777)
                if(res.data.resultBody.role==0&&res.data.resultBody.system===' '){
                    console.log(res.data.resultBody.role,res.data.resultBody.system,88888)
                    this.TipdialogVisible=true;
                }else if((res.data.resultBody.role==0&&res.data.resultBody.system=='0')||(res.data.resultBody.role==1&&res.data.resultBody.system=='0')){
                    //console.log("111111")
                    $(".model_tk").show();
                    $(".modal-body").show();
                    $(".HebeiQianzi").hide();
                    $(".ChangeCA").hide();
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
                    t = setTimeout(function(){
                        $(".ewmsx").show();
                    },300000)
                }else if((res.data.resultBody.role==0&&res.data.resultBody.system=='1')||(res.data.resultBody.role==1&&res.data.resultBody.system=='1')){
                    $(".model_tk").show();
                    $(".modal-body").hide();
                    $(".ChangeCA").hide();
                    clearTimeout(t);
                    $(".HebeiQianzi").show();
                }else if(res.data.resultBody.role==1&&res.data.resultBody.system===' '){
                    $(".model_tk").show();
                    $(".modal-body").hide();
                    clearTimeout(t);
                    $(".HebeiQianzi").hide();
                    $(".ChangeCA").show();
                }
            }

        })
        
    },
    //});
    SelectBj(){  //选择北京ca签章
        this.BjLoading=true;
        this.$axios.post('/stamp/chooseSys', 'post', {
                systemId:0  //选择北京
        }).then(res => {
            if (res.data.resultCode == 200) {
                this.BjLoading=false;
                $(".modal-body").show();
                $(".HebeiQianzi").hide();
                $(".ChangeCA").hide();
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
                t = setTimeout(function(){
                    $(".ewmsx").show();
                },300000)
            }
        })
    },
    SelectHebei(){//选择河北ca签章
        this.HbLoading=true;
        this.$axios.post('/stamp/chooseSys', 'post', {
                systemId:1  //选择河北
        }).then(res => {
            if (res.data.resultCode == 200) {
                 this.HbLoading=false;
                 $(".modal-body").hide();
                 $(".ChangeCA").hide();
                 clearTimeout(t);
                 $(".HebeiQianzi").show();
            }
        })
    },

    submitForm(formName) {   //河北签章
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //console.log(this.$data.numberValidateForm.Qianzhangpasword); //签章密码
            this.HbTjLoaing=true;
            this.$axios.post('/stamp/seal', 'post', {
                 code:this.$data.numberValidateForm.Zhengshubianhao, //证书编号
                 pwd:this.$data.numberValidateForm.Qianzhangpasword  //签章密码
            }).then(res => {
                if (res.data.resultCode == 200) {
                    this.HbTjLoaing=false;
                    $(".model_tk").hide();
                    this.$refs[formName].resetFields();
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
