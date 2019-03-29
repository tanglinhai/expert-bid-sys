<template>
  <div class="sort">
    <!----------------------投标人排序调整--------------------->
    <div class="warp cf">
      <div class="sortDiv fl">
        <ul v-for="(item,index) in msg_box" class="sort_ul">
          <!--<li @click="getData(item,index)" class="aa" :key="item.key" :class="index ===i?'bc_66b':'bc_none'">{{item.company_name}}</li>-->

          <!--<li @click="getData(item,index)" class="aa" :key="item.key" :class="['aa',{'bc_66b': index === i}]">{{item.company_name}}</li>-->
          <li @click="getData(item,index)" :key="item.key" :class="{'bc_66b': index === i}">{{item.company_name}}</li>
        </ul>
      </div>
      <ul class="right_icon fl">
        <li><i class="el-icon-arrow-up" @click="sort_up"></i></li>
        <li><i class="el-icon-arrow-down"  @click="sort_down"></i></li>
      </ul>
    </div>
    <div class="textAlignC pt20" >
      <el-button size="small" @click="save" type="primary"> <i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
      <el-button size="small" @click="reback" type="primary"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sort',
    components: {},
      props:{
          current:0,
          msg_box:{
              type:Array
          }
      },
    data() {
      return {
        dialogVisible: false,//调转评标价弹框
         i:''
      }
    },
    created() {
    },
    mounted() {


    },
    methods: {
      reback(){
          this.$store.state.failureEnery.sort = false;
      },
      save(){

      },
      sort_up(){
        console.log(this.i)

      },
      sort_down(){

      },
      getData(a,index){
        this.i=index;
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .sort {
    .warp{
      .sortDiv{
        width: 600px;
        height: 200px;
        border: 1px solid #ccc;
        padding-left: 3px;
        li{
          line-height: 20px;
        }
      }
      .right_icon{
        padding-top:89px;
        padding-left: 5px;
        li{
          i{
            color: #409EFF;
          }
        }
      }
    }
    .bc_66b{
      background: #66b1ff;
    }
    .bc_none{
      background: none;
    }
  }
</style>


