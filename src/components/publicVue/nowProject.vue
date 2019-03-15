<template>
    <div class="nowProject">
        <el-collapse v-model="unmsg" @change="handleChange"  class="collBox">
            <el-collapse-item v-for="(item,index) in projectBag" :key="index" :name="index" class="outMain">
                <!--头部-->
                <template slot="title">
                    <div class="titBg">
                        <el-row>
                            <div class="inviteType overflowText fl">
                                <img src="../../assets/img/gk.jpg" alt="" v-if="item.status === 0" >
                                <img src="../../assets/img/jz.jpg" alt="" v-if="item.status === 1" >
                                <img src="../../assets/img/yq.jpg" alt="" v-if="item.status === 2" >
                            </div>
                            <div class="projectName overflowText setText fl">
                                <!--<a href="javascript:void(0)" class="curStyot" @click.stop="dialogAlert()">-->
                                    {{item.projectName}}
                                   <!--</a>-->
                            </div>
                            <div class="principal  overflowText setText fl">项目负责人：{{item.functionary}}</div>
                        </el-row>
                    </div>
                </template>
                <!--<el-row v-if="msg.length == 0">-->
                    <!--<el-col :span="24">-->
                        <!--<div class="grid-content bg-purple zeroBox">-->
                            <!--&lt;!&ndash;<img src="../../../public/img/zl.png" alt="">&ndash;&gt;-->
                            <!--<span style="padding-left:5px;">暂无数据</span>-->
                        <!--</div>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--v-else-->
                <el-row v-for="(item,index) in msg" :key="index" class="bag_msg">
                   <el-col class=' border_col' >
                    <el-col style="width:25%" class="expertName">
                       <span>专家组名称：{{item.groupName }}</span>
                    </el-col>
                    <el-col style="width:15%" class="bagNum">
                        <div>包含分包：<span class="col409" >{{item.bagName }}</span></div>
                    </el-col>
                    <el-col style="width:30%"  :span="10" class="time_div">
                        <el-col style="width:50%"  class="beginTime" >
                            <span>评标开始时间：<span class="cole02">{{item.starTime }}</span></span>
                        </el-col>
                        <el-col style="width:50%"  class="endTime">
                            <span>评标截至时间：<span class="cole02">{{item.stopTime }}</span></span>
                        </el-col>
                    </el-col>
                    <el-col style="width:30%" class="btns_div">
                        <el-col :span="11" class="begin_bidding"  style="text-align: right">
                            <el-button  size="small"  class="btnBg"><i class="icon iconfont icon-kaishi mr3"></i>开始评标</el-button>
                        </el-col>
                            <el-col :span="11" class="bidding_doc" style="margin-left: 15px">
                               <el-button   size="small"><i class="icon iconfont icon-wenjian mr3"></i>招标相关文件</el-button>
                            </el-col>
                    </el-col>
                   </el-col>
                </el-row>
            </el-collapse-item>
      </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "now-project",
        data(){
            return {

            }
        },
        // 父组件传过来的值
        props:{
            projectBag:{
                type:Array
            },
            msg:{
                type:Array
            },
            projectMsg:{
                type:Array
            },
            unmsg:{
                type:Array
            }
        },
        components:{

        },
        mounted(){


        },
        methods: {

        }
    }
</script>

<style  lang="scss">
    .nowProject{
        .collBox{
            overflow-x: hidden;
             .outMain{
                overflow-x: hidden;
                 margin-bottom: 15px;
                 padding-left: 15px;
                 padding-right: 15px;
                .el-collapse-item__header{
                    background-color: #f0f3f5;
                    padding-left: 18px;
                    padding-right: 8px;
                    border:1px solid #d9e0e7;
                }
                 .el-collapse-item__wrap{
                     border-bottom:none;
                 }
                .titBg{
                    font-size: 14px;
                    float: left;
                    width: 96%;
                    height: 50px;
                    color: #000104;
                    .inviteType{
                        width: 50px;
                        height: 50px;
                        text-align: center;
                        img{
                            width: 50px;
                            height: 50px;
                            vertical-align: middle;
                        }
                    }
                    .projectName{
                        float: left;
                        width: 33.5%;
                        height: 50px;
                        padding-left: 15px;
                        line-height: 50px;
                    }
                    .principal{
                        width: 24%;
                    }
                    .proxyCo{
                        float:right;
                        width: 15%;
                    }
                    span{
                        padding: 12px 30px;
                        background:#409eff;
                        color:#fff;
                    }
                    .el-col-2{
                        padding-left: 1.3%;
                    }
                }
                 .el-collapse-item__arrow{
                     color: #000104;
                     font-weight: bold;
                     font-size: 14px;
                 }
                 .el-collapse-item__content{
                     padding-bottom: 0px;
                 }
                 .bag_msg{
                     height: 70px;
                     line-height: 70px;
                    .border_col{
                        border-bottom: 1px solid #d9e0e7;
                        padding-left: 15px;
                        padding-right: 15px;
                        border-left:1px solid #d9e0e7;
                        border-right:1px solid #d9e0e7;
                    }
                      .bagNum{
                         span{
                             border: 1px solid #409EFF;
                             border-radius: 20px;
                             padding: 4px 7px;
                             font-size: 10px;
                         }
                     }
                    .btns_div{
                       .btnBg{
                           background: #ff6600  !important;
                           border: 1px solid #ff6600  !important;
                           color:#fff  !important;
                       }
                       .btnBg:hover{
                           background: #ff8600 !important;
                       }
                       .btnBg[data-v-4774750c]:hover{
                           background: #e47932  !important;
                           border-color: #e47932  !important;
                           color: #fff  !important;
                       }
                    }
                 }
            }
        }
        @media screen and (max-width: 1660px){
            .beginTime{
               width: 63%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
        }
        @media screen and (max-width: 1530px){
            .beginTime{
                width: 73%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:24%!important;
            }
        }
        @media screen and (max-width: 1330px){
            .beginTime{
                width: 75%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:25%!important;
            }
        }
        @media screen and (max-width: 1250px){
            .beginTime{
                width: 75%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:27%!important;
            }
        }
        @media screen and (max-width: 1165px){
            .beginTime{
                width: 75%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:29%!important;
            }
        }
        @media screen and (max-width: 1095px){
            .beginTime{
                width: 75%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:30%!important;
            }
        }
        @media screen and (max-width: 1057px){
            .beginTime{
                width: 75%!important;
                margin-right: 20px;
            }
            .endTime{
                width: 75%!important;
            }
            .time_div{
                width:32%!important;
            }
            .btns_div {
                width:28%!important;
            }
        }
    }
</style>