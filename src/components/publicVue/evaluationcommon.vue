<template>
    <div class="evaluationcommon">
        <el-row class="evaluationcommon_title">
            <el-col :span="6">
                <div class="grid-content bg-purple">项目名称：单信封-0305-1</div>
            </el-col>
            <el-col :span="5" :offset="1">
                <div class="grid-content bg-purple-light">项目编号：0635-1909qwerN1133</div>
            </el-col>
        </el-row>
        <!---->
        <el-collapse class="evaluationcommon_second" accordion v-model="activeNames">
            <el-collapse-item name="1">
                
                    <template slot="title">
                        <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                            <h5 class="commonTitle col348fe2 oneanonter">项目资料</h5>
                        </div>
                    </template>
                    <div class="evaluationcommon_ziliao">
                        <el-scrollbar style="width:100%;">
                            <ul>
                                <li v-for="(item,index) in projectZiliao" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span>{{index+1}}</span>
                                        {{item.ziliaoName}}
                                    </a>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>

                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 twoanonter">招标文件查看</h5>
                    </div>
                    <div class="evaluationcommon_chakan">
                        <el-scrollbar style="width:100%; height:88%;">
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===0">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#348fed">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===1">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#da2138">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===2">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#51cb1b">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===3">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#f2c71b">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===4">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#e234ed">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===5">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#3d34ed">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                            <ol v-for="(item,index) in projectChaxun" :key="index" :name="index" v-if="index===6">
                                <li v-for="(item,index) in item.children" :key="index" :name="index">
                                    <a href="javascript:;">
                                        <span style="background:#ff9000">{{index+1}}</span>
                                        <div class="evaluationcommon_chakan_right">
                                            <img src="../../assets/img/pdf_icon.png" alt="">
                                            <p>
                                                <em>{{item.bianhao}}</em>
                                                <em>{{item.name}}</em>
                                            </p>
                                        </div>
                                    </a>
                                </li>
                            </ol>
                        </el-scrollbar>
                    </div>

                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 twoanonter">雷同性分析</h5>
                    </div>
                    <div class="evaluationcommon_ziliao">
                        <el-scrollbar style="width:100%;">
                            <ul>
                                <li v-for="(item,index) in projectLeiFenxi" :key="index">
                                    <a href="javascript:;">
                                        <span>{{index+1}}</span>
                                        {{item.ziliaoName}}
                                    </a>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>

                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 twoanonter">硬件特征码防串围标分析</h5>
                    </div>
                    <div class="evaluationcommon_ziliao">
                        <el-scrollbar style="width:100%;">
                            <ul>
                                <li>
                                    <a href="javascript:;">
                                        <span>1</span>
                                        硬件特征码
                                    </a>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>

            </el-collapse-item>
        </el-collapse>
        <!---->

        

    </div>
</template>

<script>
    export default {
        name: "evaluationcommon",
        data(){
            return {
                activeNames: ['1'], //默认展开
            }
        },
        // 父组件传过来的值
        props:{
           projectZiliao:{   //项目资料
               type:Array
           },
           projectChaxun:{  //招标文件查看
               type:Array
           },
           projectLeiFenxi:{  //雷同性分析
               type:Array
           }
        },
        components:{

        },
        mounted(){
        },
        methods: {
            goto(url){
                this.$router.push({
                    path: url
                });
            },
        }
    }
</script>

<style  lang="scss">
    .evaluationcommon{
        background:white;
        border-radius:5px;
        padding:15px;
        .evaluationcommon_title{
            font-size:14px;
            font-weight:bold;
            color:#333333;
        }
        .evaluationcommon_second{
            border:none;
            .oneanonter:before{
                margin-top:16px;
            }
            .twoanonter{
                height:48px;
                line-height:48px;
                &:before{
                    margin-top:16px;
                }
            }
            .evaluationcommon_ziliao{
               .el-scrollbar__wrap {
                    overflow-y: hidden;
                }
                .el-scrollbar__bar{
                    .el-scrollbar__thumb{
                        background:#348fed;
                        &:hover{
                           background:#348fed; 
                        }
                    }
                }
                ul{
                    margin-bottom:10px;
                    float: left;
                    white-space: nowrap;
                    padding-right:20px;
                    li{
                        display: inline-block;
                        margin-right:5px;
                        a{
                            display:block;
                            border:1px solid #c4c4c4;
                            border-radius:6px;
                            height:34px;
                            line-height:34px;
                            overflow:hidden;
                            padding-right:20px;
                            color:#414141;
                            span{
                                display:inline-block;
                                background:#348fed;
                                color:white;
                                line-height:34px;
                                text-align: center;
                                width:16px;
                                margin-right:7px;
                            }
                        }
                    }
                }
            }
            .evaluationcommon_chakan{
                height:340px;
                .el-scrollbar__wrap {
                    overflow:hidden;
                    overflow-y:scroll;
                    height:97%;
                }
                .el-scrollbar__bar{
                    .el-scrollbar__thumb{
                        background:#348fed;
                        &:hover{
                           background:#348fed; 
                        }
                    }
                }
                ol{
                    margin-bottom:10px;
                    float: left;
                    white-space: nowrap;
                    padding-right:20px;
                    width:100%;
                    li{
                        display: inline-block;
                        margin-right:5px;
                        a{
                            display:block;
                            border:1px solid #c4c4c4;
                            border-radius:6px;
                            padding:5px 10px 3px 20px;
                            overflow:hidden;
                            color:#414141;
                            position: relative;
                            &:hover{
                                background:#ededed;
                            }
                            span{
                                position: absolute;
                                display:inline-block;
                                background:#348fed;
                                color:white;
                                width:18px;
                                height:18px;
                                border-radius:0 0 100%;
                                text-indent:2px;
                                top:0px;
                                left:0px;
                                line-height:18px;
                            }
                        }
                        .evaluationcommon_chakan_right{
                            img{
                                float:left;
                                width:22px; 
                                margin-top:7px;
                            }
                            p{
                                float:left;
                                margin-left:7px;
                                em{
                                    display:block;
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
</style>