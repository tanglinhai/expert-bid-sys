<template>
  <div>
    <div class="row" v-loading="signatureLoading">
      <div class="col-md-3 contentLeft">
          <a href="javascript:;" class="logo">
              <img src="@/assets/img/logo_qianzi.png"/>
          </a>
          <div class="xialalist leaders">
              <a class="leader2"><span class="userName">{{userNickname}}</span></a>
              <button class="btn repairSign" data-target=".bs-example-modal-lg" style="background-image:none;text-indent:0px;display:none;" role="button">补签</button>
                <a class="btn downBtn" href="#" role="button">下载全部</a>
                <div class="btn-group btn-group-md bgBtn">
                    <template>
                        <el-select size="small" class="selectOptions" v-model="value"  @change="selectAll" placeholder="请选择" style="width:180px; border:1px solid #f79d3c; border-radius:3px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :id="item.id"
                            :label="item.label"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </div>
          </div>
          <div class="zjList Gdscroll" id="sucai">
              <div class="indexPerson" v-for="(item,index) in fileMenuList" :key="index" :name="index" :id="item.id">
                    <h5 style="text-align:left!important; text-indent:14px;">{{item.menuName}}</h5>
                    <div class="personTitle">
                        <span>文件名称</span>
                        <span>创建时间</span>
                        <span>状态</span>
                      </div>
                      <ul class="personUl" >
                        <li v-for='(item2,index) in item.fileList' :key="index" :id='item2.fileId'>
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
                      <div id="callBack2"><span>1</span>/<em></em></div>
                  </div>
              </div>
          </div>
    </div>

  

  </div>
</template>
<style lang="scss">
@import '../assets/css/common/mixin.scss';
    .leaders{
        position: relative; 
        z-index: 5;
        background: white;
        .btn-group{
            height:40px!important; 
            float:right; 
            background:white;
        }
        .leader2{
            margin-top:0px;
        }
    }
    #sucai{
        position: relative;
        z-index: 2;
    }
    .selectOptions {
        .el-input__inner{
            border:1px solid white;
            &:focus {
                border-color: white;
            }
        }
    }
</style>
<script>
export default {
  name: 'SignaturePage',
  data() {
    return {
       options: [{
          value: '全部',
          id:'000',
          label: '全部'
        },{
          value: '专家一号',
          id:'111',
          label: '专家一号'
        }, {
          value: '专家二号',
          id:'222',
          label: '专家二号'
        }, {
          value: '专家三号',
          id:'333',
          label: '专家三号'
        }],
        value: '000',
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
        url: '/js/plugins/bootstrap/css/groupLeader.css',
        download_files_key: '/js/plugins/bootstrap/css/groupLeader.css'
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

    selectAll(){
        console.log(this.value)
        if(this.value=="000"){
            $(".indexPerson").show();
        }else{
            $(".indexPerson").hide();
            $("#"+this.value).show();
        }
    },
    leaderList(){  //签字列表和项目信息展示
        this.signatureLoading=true;
        this.$axios.post('/api/leaderAllList', 'post', {
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
                this.fileMenuList=res.data.resultBody.fileMenuList;
                //console.log(this.fileMenuList)
                this.signatureLoading=false;
                
            }
        })
    },
   

  },

  mounted(){
    this.leaderList(),  //签字列表和项目信息展示
    this.autodivheight(),
    window.onresize=this.autodivheight(); 
    $("#sucai").height($(document.body).height()-140);
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
