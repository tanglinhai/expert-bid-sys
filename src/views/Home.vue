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
    .lineAll{
        border-left:1px solid #ddd;
        border-image: -webkit-linear-gradient(#f1f8fe,#348fed,#f1f8fe) 30 30;
        border-image: -moz-linear-gradient(#f1f8fe,#348fed,#f1f8fe) 30 30;
        border-image: linear-gradient(#f1f8fe,#348fed,#f1f8fe) 30 30; 
    }
  }
  .el-button.is-disabled{
    span{
      .kuai{
        background:#c0c4cc!important;
      }
    }
  }
  //一级导航的完成绿色
  .firstGreen{
    color:#84bb3c!important;
  }
  .firstBule{
    color:#348fe2!important;
  }
  //一级导航的完成绿色
  .green{ //完成可点
    button{   
        //border:2px solid #84bb3c;
        color:#84bb3c;
        &:hover {
            border:2px solid #84bb3c;
            color:#84bb3c;
            background:white;
        }
        span{
            .kuai{
              background:#84bb3c;
            }
            
        }
    }
  }
  .blue{ //蓝色可点同时操作
    i{
      background:#348fe2!important;
    }
    button{ 
        color:#348fe2!important;
        &:hover {
            border:2px solid #348fe2;
            color:#348fe2;
            background:white;
        }
    }
  }
  .DoNotPoint{  //不可点
    button{
      border:2px solid #ccc;
      color:#ccc;
      cursor:default;
      &:hover {
        border:2px solid #ccc;
        color:#ccc;
        background:white;
      }
      .kuai{
        background:#ccc;
      }
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
export default {
  name: 'home',
  data() {
    return {
      transitionName: 'slide-right',  // 默认动态路由变化为slide-right
      navcommonsList:[],  //导航数据
      currentpage:'',  //导航到哪一步了
      //Allzhuagntai:[], //所有状态返回
      CommonLeftNavsLoading:true,  //左侧导航添加loading 事件
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
        console.log('页面1');
        this.navcommonsListFun(); //导航接口
        
      }
      if (newVal === '/index/AllInformation') {
        console.log('页面2');
        this.navcommonsListFun(); //导航接口
      }
      if (newVal === '/index/ElectedLeader') {
        console.log('页面3');
        this.navcommonsListFun(); //导航接口
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
  },
  methods:{
    navcommonsListFun(){
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
                console.log(res.data,this.$route.query.currentpage,this.$route.query.is_submit_type,777)

                this.navcommonsList=res.data.navsAll; 
                this.ProjectInformationsAll=res.data.ProjectInformationsAll;
                this.pageloadding=false;
                this.CommonLeftNavsLoading=false;
            }
        })
    },
  },
  updated(){
    //console.log(this.$route.query.currentpage,this.$route.query.is_submit_type,666666666)
    this.currentpage=parseFloat(this.$route.query.currentpage);
  }
}
</script>
