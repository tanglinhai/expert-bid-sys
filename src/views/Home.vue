<template>
  <div class="home">
  	<Head :ProjectInformationsAll='ProjectInformationsAll' v-loading="CommonLeftNavsLoading"/>
    <div class="WrapBig">
      <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"  v-loading="CommonLeftNavsLoading"></NavCommon>
      <transition :name="transitionName">
        <router-view class="Router" :key="$route.fullPath"/>
      </transition>
    </div>
  	<Foot/>
  </div>
</template>
<style lang="scss">
.home{
  .WrapBig{
    position: relative;
    .Router{
      padding-left:115px;
    }
    .NavCommon{
      height:95%;
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
  .green{ //完成可点
    button{   
        border:2px solid #84bb3c;
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
    button{   
        border:2px solid #348fe2;
        color:#348fe2;
        &:hover {
            border:2px solid #348fe2;
            color:#348fe2;
            background:white;
        }
        span{
            .kuai{
              background:#348fe2;
            }
            
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
      number:'',   //导航当前第几步
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
  created() {
    if (this.$route.query.types == undefined) {
        this.$store.state.navCommon.types=1;
    } else {
        this.$store.state.navCommon.types=this.$route.query.types;
        this.number=this.$store.state.navCommon.types
    }
    // console.log(this.$store.state.navCommon.types,this.$route.query.types,55555555555)
            
  },
  mounted(){
      this.navcommonsListFun(); //导航接口
  },
  methods:{
    navcommonsListFun(){
        this.pageloadding=true;
        this.CommonLeftNavsLoading=true;
        this.$axios.post('/api/navcommons',{
            //step:this.number,  //点击时候当前第几步
            //id:id    //哪个用户
        }).then(res=>{
            if(res.status == 200){
                // console.log(res.data)
                this.navcommonsList=res.data.navsAll; 
                this.ProjectInformationsAll=res.data.ProjectInformationsAll;
                this.pageloadding=false;
                this.CommonLeftNavsLoading=false;
                
            }
        })
    },
  },
  updated(){
    //2正在进行中，1已完成 3.可点 4.不可点,5.提交已完成
    //this.navcommonsListFun(); //导航接口
    //console.log(this.$store.state.navCommon.types,99999)
    this.number=this.$store.state.navCommon.types
    // console.log(this.number,this.navcommonsList,77777777)
    if(this.$route.query.methodType==1){//合理低价

    }
    var Allzhuagntai;
    if(this.number==1){
      Allzhuagntai=[{
          statusType:2
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==2){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:2
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==3){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==4){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:5
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==5){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==6){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:3
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==7){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==8){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:3
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        },{
          statusType:4
        }]
    }else if(this.number==9){
      Allzhuagntai=[
        {
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:1
        },{
          statusType:2
        },{
          statusType:4
        },{
          statusType:3
        },{
          statusType:3
        },{
          statusType:3
        },{
          statusType:3
        }]
    }
    // console.log(Allzhuagntai,this.navcommonsList,this.$route.query.methodType)
    for(var i=0;i<this.navcommonsList.length;i++){
      this.navcommonsList[i].typestaus=Allzhuagntai[i].statusType
      //console.log(this.navcommonsList[i].typestaus)
    }
    //this.Allzhuagntai=Allzhuagntai;
    //$(".NavCommon ul li>span").removeClass("backblue");
   // $(".NavCommon ul #"+this.number+">span").addClass("backblue");
  }
}
</script>
