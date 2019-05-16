<template>
    <div class="navcommon_wrap">
        <el-scrollbar style="width:100%;overflow-x:hidden;height:100%;" ref="myScrollbar">
            <ul ref="wrap" class="NavsUls">
                <li v-for="(item,index) in navcommonsList" :key="index" :id="item.types" :aid="item.typestaus">
                    <template>
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            :ref='item'
                            :class="item.typestaus ==1 ? 'green':item.typestaus ==3 ? 'blue':item.typestaus ==2 ? 'backblue':item.typestaus==5?'backblue2':'DoNotPoint'"
                            >
                            <template v-if="item.typestaus==1">
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-wancheng"></i>{{item.label}}</el-button>  <!--0可点-->
                            </template>
                            <template v-else-if="item.typestaus==2">
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-jinhangzhong"></i>{{item.label}}</el-button>  <!--0可点-->
                            </template>
                            <template v-else-if="item.typestaus==3">
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-tbd-project-task-number"></i>{{item.label}}</el-button>  <!--0可点-->
                            </template>
                            <template v-else-if="item.typestaus==4">
                                <el-button slot="reference"><i class="iconfont icon-jinyong"></i>{{item.label}}</el-button>  <!--0可点-->
                            </template>
                            <template v-else>
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-wancheng"></i>{{item.label}}</el-button>  <!--0可点-->
                            </template>
                        </el-popover>
                        <span class="navcommon_line"></span>
                    </template>
                    <!-- <template v-else>
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            class="DoNotPoint"
                            >
                            <el-button slot="reference"><i class="kuai"></i>{{item.label}}</el-button>
                            
                        </el-popover>
                        
                        <span class="navcommon_line">
                        </span>
                    </template> -->
                </li> 
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
    export default {
        name: "evaluationcommon",
        data(){
            return {
               
            }
        },
        // 父组件传过来的值
        props:{
            navcommonsList:{
                type:Array,
            },
            currentpage:{    //导航走到哪一步了
                type:Number,
            },
            
        },
        components:{

        },
        mounted(){

        },
        methods: {
            goto(url){ //路由
                this.$router.push({
                    path: url
                });
            },
           ToChangePage(types){   //导航点击值//types
                //console.log(this.currentpage)
                if(types==1){  //承诺书
                    this.$router.push("/index/LetterCommitment?types="+types+"&currentpage="+this.currentpage);
                }else if(types==2){  //参加评标
                   // $(".NavCommon ul #1>span").removeClass("backblue");

                    this.$router.push("/index/AllInformation?types="+types+"&currentpage="+this.currentpage);
                }else if(types==3){   //推举组长
                    this.$router.push("/index/ElectedLeader?types="+types+"&currentpage="+this.currentpage);
                } 
           }
        },
        updated(){
            let _this=this;
            let div = _this.$refs["myScrollbar"].$refs["wrap"];
            _this.$nextTick(()=>{
                let sortsSelectHeight = ($(".backblue").parent().parent().index()+1)*60;
               // console.log($(".backblue").parent().parent().index(),buttonHeight,lineHeight,666666)
                let zongHeightHalf=($("body").height()-290)/2;
                // console.log(zongHeightHalf)
                //div.scrollTop=div.scrollHeight;
                if(sortsSelectHeight>=zongHeightHalf){
                    div.scrollTop=sortsSelectHeight-zongHeightHalf;
                }else{
                }
            })
        }
        
    }
</script>

<style  lang="scss">
    .navcommon_wrap{
        border-radius:5px;
        padding:15px 0px;
        min-width:115px; 
        float:left;
        .el-scrollbar__wrap{
            overflow-x:hidden;
            .el-scrollbar__view{
                ul{
                    margin-bottom:10px;
                }
            }
        }
        .el-scrollbar__bar .el-scrollbar__thumb {
            background: #348fed;
        }
        
        ul{
            width:133px;
            li{
                padding-left:12px;
                background: white;
                width: 100px;
                &:first-child{
                    padding-top:15px;
                }
                button{
                    display:block;
                    width:90px;
                    height:38px;
                    border-radius:3px;
                   
                    font-size:12px;
                    &:hover {
                       
                        background:white;
                    }
                    span{
                        display: block;
                        width: 80px;
                        margin-left: -10px;
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .kuai{
                            width:10px;
                            height:10px;
                            
                            float:left;
                            margin-right:2px;
                        }
                        
                    }
                }
                .navcommon_line{
                    display:block;
                    height:15px;
                    border-left:1px solid #f3f3f3;
                    margin-left:42px;
                }
                
                 &:last-child{
                    padding-bottom:10px;
                   .navcommon_line{
                       display:none;
                   }
                }
            }
        }
    }
</style>