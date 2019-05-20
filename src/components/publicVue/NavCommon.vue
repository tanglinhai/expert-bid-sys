<template>
    <div class="navcommon_wrap" v-show="$store.state.navIsShow">
        <el-scrollbar style="width:100%;overflow-x:hidden;height:100%;" ref="myScrollbar">
            <!--<ul ref="wrap" class="NavsUls" style="display:none">
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
                            <!--</template>
                            <template v-else-if="item.typestaus==2">
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-jinhangzhong"></i>{{item.label}}</el-button>  <!--0可点-->
                            <!--</template>
                            <template v-else-if="item.typestaus==3">
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-tbd-project-task-number"></i>{{item.label}}</el-button>  <!--0可点-->
                            <!--</template>
                            <template v-else-if="item.typestaus==4">
                                <el-button slot="reference"><i class="iconfont icon-jinyong"></i>{{item.label}}</el-button>  <!--0可点-->
                            <!--</template>
                            <template v-else>
                                <el-button @click="ToChangePage(item.types)" slot="reference"><i class="iconfont icon-wancheng"></i>{{item.label}}</el-button>  <!--0可点-->
                            <!--</template>
                        </el-popover>
                        <span class="navcommon_line"></span>
                    </template>
                </li> 
            </ul>-->
            <ul class="NavsUls">
                <li v-for="(item,index) in navcommonsList" :key="index" :id="item.types">
                    <template v-if="item.children !== undefined && item.children.length >0 ">
                        <h5 :id="item.types" :class="['Firstnav',item.typestaus==1?'firstGreen':item.typestaus==2?'firstBlue':'firstblack']" :aid="item.typestaus">
                            <i :class="item.typestaus==1?'el-icon-success':item.typestaus==2?'el-icon-edit':'iconfont icon-jinyong'"></i>
                            <span>{{item.label}}</span>
                            <em class="el-icon-arrow-down"></em>
                        </h5>
                    </template>
                    <template v-else>
                       <h5 @click="ToChangePage(item.types)" :id="item.types" :class="['Firstnav',item.typestaus==1?'firstGreen':item.typestaus==2?'firstBlue':'firstblack']" :aid="item.typestaus">
                            <i :class="item.typestaus==1?'el-icon-success':item.typestaus==2?'el-icon-edit':'iconfont icon-jinyong'"></i>
                            <span>{{item.label}}</span>
                            <em style="display:none" class="el-icon-arrow-down"></em>
                        </h5> 
                    </template>
                    <ol class="Secondnav" v-for="(item2,index2) in item.children" :key="index2">
                        <template v-if="item2.typestaus==1||item2.typestaus==2">
                            <li @click="ToChangePage(item2.types)" :id="item2.types" :aid="item2.typestaus" :class="item2.typestaus==1?'green':item2.typestaus==2?'blue':'DoNotPoint'">
                                <i></i>
                                <el-tooltip class="item" effect="light" :content="item2.label" placement="left-start">
                                    <el-button>{{item2.label}}</el-button>
                                </el-tooltip>
                            </li>
                        </template>
                        <template v-else>
                            <li :aid="item2.typestaus" :class="item2.typestaus==1?'green':item2.typestaus==2?'blue':'DoNotPoint'">
                                <i></i>
                                <el-tooltip class="item" effect="light" :content="item2.label" placement="left-start">
                                    <el-button>{{item2.label}}</el-button>
                                </el-tooltip>
                            </li>
                        </template>
                    </ol>
                </li>
                <!-- <li>
                    <h5 class="Firstnav"><i class="iconfont icon-wancheng"></i><span>推举组长</span></h5>
                </li>
                <li>
                    <h5 class="Firstnav"><i class="iconfont icon-wancheng"></i><span>评标</span><em class="el-icon-arrow-down"></em></h5>
                    <ol class="Secondnav">
                        <li>
                            <i></i>
                            <el-tooltip class="item"  effect="light" content="Left Top 提示文字" placement="left-start">
                                <el-button>资格审查</el-button>
                            </el-tooltip>
                        </li>
                        <li>
                            <i></i>
                            <el-tooltip class="item" effect="light" content="Left Top 提示文字" placement="left-start">
                                <el-button>资格审查汇总</el-button>
                            </el-tooltip>
                        </li>
                    </ol>
                </li> -->
                
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
            $(document).on('click','.Firstnav',function(){    //导航点击带二级导航
                //console.log("1111")
                if($(this).parent().find("ol").is(':hidden')){
                    $(this).find("em").removeClass("el-icon-arrow-up");
                    $(this).find("em").addClass("el-icon-arrow-down");
                    $(this).parent().find("ol").show();
                }else{
                    $(this).find("em").removeClass("el-icon-arrow-down");
                    $(this).find("em").addClass("el-icon-arrow-up");
                    $(this).parent().find("ol").hide();
                }
            })
        },
        methods: {
            goto(url){ //路由
                this.$router.push({
                    path: url
                });
            },
           ToChangePage(types){   //导航点击值//types
                //console.log(this.currentpage,types,666666)
                $(".Secondnav li").removeClass("LiActives");
                $(".NavsUls>li").removeClass("LiActives");
                $("#"+types).addClass("LiActives");
                if(types=="1-1"){  //承诺书
                    this.$router.push("/index/LetterCommitment?types="+types+"&currentpage="+this.currentpage);
                }else if(types=="1-2"){  //参加评标
                    this.$router.push("/index/AllInformation?types="+types+"&currentpage="+this.currentpage);
                }else if(types==2){   //推举组长
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
            });
        }
        
    }
</script>

<style  lang="scss">
    .navcommon_wrap{
        min-width:200px; 
        background:white;
        float:left;
        .el-scrollbar__wrap{
            overflow-x:hidden;
            .el-scrollbar__view{
               
            }
        }
        .el-scrollbar__bar .el-scrollbar__thumb {
            background: #348fed;
        }
        
        .NavsUls{
            margin-left:24px;
            margin-bottom:10px;
            border-left:1px solid #e3e3e3;
            padding-top:20px;
            >li{
                width: 100%;
                margin-bottom: 20px;
                .Firstnav{
                    height:40px;
                    width:100%;
                    color:#c0c4d5;
                    font-weight:bold;
                    line-height:40px;
                    cursor: pointer;
                    i{
                        font-size:24px;
                        float:left;
                        margin-left:-14px;
                        margin-top: 6px;
                    }
                    .icon-jinyong{
                        background: #ccc;
                        color: white;
                        border-radius: 75%;
                        font-size: 14px;
                        height: 26px;
                        width: 26px;
                        text-align: center;
                        line-height: 27px;
                    }
                    .el-icon-edit{
                        width: 26px;
                        border-radius: 50%;
                        height: 26px;
                        background: #348fe2;
                        color: white;
                        font-size: 14px;
                        line-height: 26px;
                        text-align: center;
                    }
                    span{
                        font-size:14px;
                        margin-left:20px;
                    }
                    em{
                        float: right;
                        font-size:24px;
                        line-height:40px;
                        margin-right:5px;
                    }
                }
                .Secondnav{
                    color:#c0c4d5;
                    li{
                        height:40px;
                        line-height:40px;
                        i{
                            width:10px; 
                            height:10px; 
                            border-radius:50%; 
                            background:#ccc;
                            float:left;
                            margin-left:-6px;
                            margin-top:14px;
                        }
                        button{
                            display:block;
                            width:160px;
                            height:40px;
                            font-size:14px;
                            border:none;
                            color:#c0c4d5;
                            padding:12px 0px 12px 20px;
                            span{
                                display: block;
                                width: 100%;
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
                    }
                    
                }
            }
        }
    }
</style>