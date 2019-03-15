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
        <el-collapse class="evaluationcommon_second" accordion v-model="activeNames">
            <el-collapse-item name="1">
                <template slot="title">
                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2">项目资料</h5>
                    </div>
                </template>
                <div class="evaluationcommon_ziliao">
                        <ul>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                            <li>
                                <a href="javascript:;">
                                    <span>1</span>
                                    招标文件(pdf)
                                </a>
                            </li>
                        </ul>
                    
                </div>
            </el-collapse-item>
        </el-collapse>
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
            .commonTitle:before{
                margin-top:16px;
            }
            .evaluationcommon_ziliao{
               
                ul{
                    width:100%;
                    overflow-x:scroll;
                    float: left;
                    white-space: nowrap;
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
        }
        
    }
</style>