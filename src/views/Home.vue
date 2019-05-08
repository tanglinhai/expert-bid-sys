<template>
  <div class="home">
  	<Head :ProjectInformationsAll='ProjectInformationsAll' v-loading="CommonLeftNavsLoading"/>
    <div class="WrapBig">
      <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number" v-loading="CommonLeftNavsLoading"></NavCommon>
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
        border-left:2px solid #ddd;
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
  .DoNotPoint{
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
  .backblue{
    background:#348fe2!important;
    color:white!important;
    border:2px solid #348fe2!important;
    margin-left:-12px;
    width:115px;
    border-radius:0px;
    position: relative;
    &:before{
      content:"";
      // border-top: 10px solid transparent;
      // border-bottom: 10px solid transparent;
      // border-right: 10px solid #348fed;
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
                //console.log(res.data)
                this.navcommonsList=res.data.navsAll;
                this.ProjectInformationsAll=res.data.ProjectInformationsAll;
                this.pageloadding=false;
                this.CommonLeftNavsLoading=false;
                
            }
        })
    },
  },
  updated(){
    this.number=this.$store.state.navCommon.types
    //console.log(this.number,77777777)
    $(".NavCommon ul li button").removeClass("backblue");
    $(".NavCommon ul #"+this.number).find("button").addClass("backblue");
  }
}
</script>
