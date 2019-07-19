<template>
  <div class="home">
  	<Head :ProjectInformationsAll='ProjectInformationsAll' v-loading="CommonLeftNavsLoading"/>
    <div class="WrapBig">
      <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :currentpage="currentpage"  v-loading="CommonLeftNavsLoading"></NavCommon>
      <transition :name="transitionName">
        <router-view class="Router" :key="$route.fullPath"/>
      </transition>
    </div>
  	<Foot/>
  </div>
</template>
<style lang="scss">
.home{
  background-color: #d9e0e7;
  .WrapBig{
    position: relative;
    .Router{
      padding-left:200px;
    }
    .NavCommon{
      height:100%;
      position:absolute;
      .is-horizontal{
        display:none;
      }
    }
   
  }
  .el-button.is-disabled{
    span{
      .kuai{
        background:#c0c4cc!important;
      }
    }
  }

  //导航选中样式
  .LiActives{
      background:#f3f3f3;
      position: relative;
      &:before{
          content:"";
          background: url(../assets/img/io.png) right 0px no-repeat;
          position: absolute;
          right: 0px;
          top: 9px;
          width:10px;
          height:23px;
      }
      button{
          background:#f3f3f3;
      }
  }
  //一级导航的完成绿色
  .firstGreen{
    color:#84bb3c!important;
  }
  //一级导航灰色
  .firstblack{
    color:#ccc!important;
  }
  //一级导航的进行中蓝色
  .firstBlue{
    color:#348fe2!important;
  }

  .green{ //二级完成可点
    i{
      background:#84bb3c!important;
    }
    button{  
        color:#84bb3c!important;
        &:hover {
            color:#84bb3c;
        }
    }
  }
  .blue{ ////二级蓝色可点进行中
    i{
      background:#348fe2!important;
    }
    button{ 
        color:#348fe2!important;
        &:hover {
            color:#348fe2;
        }
    }
  }
  .DoNotPoint{  //二级灰色不可点
    i{
      background:#ccc!important;
    }
    button{
      color:#ccc!important;
      cursor:default;
    }
  }
  .backblue{  //进行中
    button{
      background:#348fe2!important;
      color:white!important;
      border:2px solid #348fe2!important;
      margin-left:-12px;
      width:115px;
      border-radius:0px;
      position: relative;
      &:before{
        content:"";
        background: url(../assets/img/io.png) right 0px no-repeat;
        position: absolute;
        right: -20px;
        top: 7px;
        width:10px;
        height:23px;
      }
      span{
          .kuai{
              background:white!important;
          }
      }
      &:hover{
          color:white!important;
      }
      &:visited,&:focus{
          color:white!important; 
      }
    }
  }
  .backblue2{  //提交的完成
    button{
      background:#84bb3c!important;
      color:white!important;
      border:2px solid #84bb3c!important;
      margin-left:-12px;
      width:115px;
      border-radius:0px;
      position: relative;
      &:before{
        content:"";
        background: url(../assets/img/io.png) right 0px no-repeat;
        position: absolute;
        right: -20px;
        top: 7px;
        width:10px;
        height:23px;
      }
      span{
          .kuai{
              background:white!important;
          }
      }
      &:hover{
          color:white!important;
      }
      &:visited,&:focus{
          color:white!important; 
      }
    }
  }
  
  /* .Router{
    position: absolute;
    width: 100%;
    transition: all .8s ease;
    top: 40px;
  }
  .slide-left-enter,
  .slide-right-leave-active{
    opacity: 0;
    transform: translate(100%, 0);
  }
  .slide-left-leave-active,
  .slide-right-enter{
    opacity: 0;
    transform: translate(-100% 0);
  } */
}
</style>
<script>
// @ is an alias to /src
import Head from '@/components/Head.vue'
import Foot from '@/components/Foot.vue'
import NavCommon from '@/components/publicVue/NavCommon.vue'
import { setTimeout } from 'timers';
export default {
  name: 'home',
  data() {
    return {
      transitionName: 'slide-right',  // 默认动态路由变化为slide-right
      navcommonsList:[],  //导航数据
      currentpage:'',  //导航到哪一步了
      //Allzhuagntai:[], //所有状态返回
      //CommonLeftNavsLoading:true,  //左侧导航添加loading 事件
      ProjectInformationsAll:'',  //头部项目信息
    }
  },
  components: {
    Head,
    Foot,
    NavCommon
  },
  watch: {
    '$route.path': function (newVal, oldVal) {
      if (newVal === '/index/LetterCommitment') {
        //console.log(this.$route.query.types,666);
        this.navcommonsListFun(); //导航接口
        // console.log("9999")
      }
      if (newVal === '/index/AllInformation') {
        //console.log(this.$route.query.types,666);
        this.navcommonsListFun(); //导航接口
      }
      if (newVal === '/index/ElectedLeader') {
        //console.log(this.$route.query.types,666);
        this.navcommonsListFun(); //导航接口
      }if(newVal === '/elect/StartEvaluation'){
            console.log(this.$route.query.types,'审查项');
            this.navcommonsListFun(); //导航接口
      }if(newVal === '/elect/UnFinishQualificationsResult'){
            this.navcommonsListFun(); //导航接口
            console.log(this.$route.query.types,'审查汇总');
      }
    }
  },
  created() {
    // if (this.$route.query.currentpage == undefined||this.$route.query.is_submit_type == undefined) {
    //     this.$route.query.currentpage=1;   //进行到哪一步
    //     this.$route.query.is_submit_type=1;  //是否提交
    // }
    // console.log(this.$route.query.currentpage,this.$route.query.is_submit_type,55555555555)
  },
  mounted(){
    this.navcommonsListFun(); //导航接口
    // let _this=this;
    // setInterval(function(){
    //     _this.navcommonsListFun(); //定时器导航接口
    //     console.log("哈哈哈哈")
    // },5000)
    this.getProjectInformation();
  },
  methods:{
    //头部项目信息接口
    getProjectInformation(){
      this.$axios.get('/api/getProjectInformation',{
        projectId:1,
      }).then(res=>{
        // console.log(res,888888888)
        this.ProjectInformationsAll=res.data.ProjectInformationsAll;
      })
    },
    navcommonsListFun(){
        var leaderOrExpert = eval('(' + window.sessionStorage.getItem('user') + ')');
        // console.log(leaderOrExpert);
        if(leaderOrExpert.roles[0] == 'expert'){
         if (this.$route.query.currentpage == undefined) {
           this.$route.query.currentpage=1;   //进行到哪一步
         }
         // if(this.$route.query.is_submit_type == undefined){
         //   this.$route.query.is_submit_type=0;  //是否提交
         // }
         let arr = [0, 1];
         let is_submit_type = arr[Math.floor(Math.random()*arr.length)];
         //console.log(is_submit_type,8884444);
         if(this.$route.query.types == undefined){
           this.$route.query.types=0;  //点击是哪一步
         }
         this.pageloadding=true;
         this.CommonLeftNavsLoading=true;
         this.$axios.post('/api/navcommons',{
             currentpage:parseFloat(this.$route.query.currentpage),  //进行到哪一步
             is_submit_type:parseFloat(this.$route.query.is_submit_type),    //是否提交
             types:parseFloat(this.$route.query.types)    //点击是哪一步
         }).then(res=>{
             if(res.status == 200){
                 //console.log(res.data,this.$route.query.currentpage,this.$route.query.is_submit_type,777)
                 this.navcommonsList=res.data.navsAll; 
                 this.pageloadding=false;
                 this.CommonLeftNavsLoading=false;
             }
         })
       }else if(leaderOrExpert.roles[0] == 'leader'){
         this.$axios.post('./api/navMesgList').then(res => {
           if(res.status == 200){
            //  console.log(res)
            this.CommonLeftNavsLoading=false;
            this.navcommonsList=res.data;
           }
         })
       }
    },
  },

  updated(){
    //console.log(this.$route.query.currentpage,this.$route.query.is_submit_type,666666666)
    this.currentpage=parseFloat(this.$route.query.currentpage);
      // console.log(this.currentpage,'当前进行到那步HOME');
  }
}
</script>
