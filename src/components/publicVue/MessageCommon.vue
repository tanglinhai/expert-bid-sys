<template>
    <div class="LayoutLeftSide">
        <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
            <h5 class="commonTitle col348fe2 oneanonter">投标人信息</h5>
        </div>
        <ul class="ul">
            <li v-for="(item,index) in tableData3" :key="index">
                <a href="javascript:;">
                    <span style="background: rgb(52, 143, 237);">{{item.baoname}}</span>
                    <div class="evaluationcommon_chakan_right">
                        <p v-if="dianji==1">
                            <em @click="ChakanTk(item)">{{item.toubiaorenName}}</em>
                            <a href="http://localhost:7000/img/download.svc" download="">投标文件：<b>{{item.toubiaorenFenbao}}<i class="icon iconfont icon-pdf"></i></b></a>
                        </p>
                        <p v-else>
                            <b style="display:block; color: #62a1e3; margin-bottom: 10px;">{{item.toubiaorenName}}</b>
                            <strong style="display:none">招标文件：<b>{{item.toubiaorenFenbao}}</b></strong>
                        </p>
                    </div>
                </a>
            </li>
        </ul>
        <!--文件查看弹框-->
        <el-dialog
            title="投标文件列表"
            :visible.sync="chakancenterDialogVisible"
            width="60%"
            center>
            <span class="cf">
                <template>
                    <el-table
                    :data="ChakanTableData"
                    :header-cell-style="getRowClass"
                    style="width: 100%">
                    <el-table-column
                        prop="bianhao"
                        label="分包号"
                        width="230">
                    </el-table-column>
                    <el-table-column
                        prop="baoname"
                        label="包名称"
                        width="350">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="文件名称"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            <el-button @click="ChakanhandleClick(scope.row)" size="small"><i class="el-icon-document"></i>&nbsp;&nbsp;查看</el-button>
                            <a class="ml15" href="http://localhost:7000/img/download.svc" download=""><el-button size="small"><i class="el-icon-download"></i>&nbsp;&nbsp;下载</el-button></a>  
                        </template>
                       
                    </el-table-column>
                    </el-table>
                </template>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="chakancenterDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <!--文件查看弹框-->
    </div>
</template>

<script>
    export default {
        name: "MessageCommon",
        data(){
            return {
                ChakanTableData:[{
                    bianhao:"",
                    baoname:"",
                    name:"",
                }],//招标文件查看弹框内容
                chakancenterDialogVisible: false, //文件查看弹框默认隐藏
            }
        },
        // 父组件传过来的值
        props:{
            tableData3:{
                type:Array
            },
            dianji:{
                type:Number
            }
           
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
            ChakanTk(item){  //投标人信息查看点击事件
                console.log(item,999)
                this.chakancenterDialogVisible=true;
                this.ChakanTableData[0].bianhao=item.toubiaorenFenbao;
                this.ChakanTableData[0].baoname=item.baoname;
                this.ChakanTableData[0].name=item.toubiaorenName;
            },
            ChakanhandleClick(row){   //招标文件查看弹框的查看事件
                console.log(row,999)
                 window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf');
            },
          
        },
        
    }
</script>

<style  lang="scss">
    .LayoutLeftSide{
        //margin-right:280px;
        background:white;
        .grid-content{
            background:white;
            width:100%;
            padding:20px 0px;
            border-radius:5px 5px 0px 0px;
            .commonTitle:before{
                margin-left:15px;
            }
        }
        .ul{
            border-radius:0px 0px 5px 5px;
            margin-left:15px;
            min-height:500px;
            li{
                display: inline-block;
                margin-right: 15px;
                margin-bottom:20px;
                >a{
                    display: block;
                    border: 1px solid #c4c4c4;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    -ms-border-radius: 6px;
                    -o-border-radius: 6px;
                    border-radius: 6px;
                    padding: 15px;
                    overflow: hidden;
                    color: #414141;
                    position: relative;
                    &:hover{
                        background:#ededed;
                    }
                    span{
                        position: absolute;
                        display: inline-block;
                        background: #348fed;
                        color: white;
                        width: 18px;
                        height: 18px;
                        -webkit-border-radius: 0 0 100%;
                        -moz-border-radius: 0 0 100%;
                        -ms-border-radius: 0 0 100%;
                        -o-border-radius: 0 0 100%;
                        border-radius: 0 0 100%;
                        text-indent: 2px;
                        top: 0px;
                        left: 0px;
                        line-height: 18px;
                    }
                    .evaluationcommon_chakan_right p {
                        float: left;
                        margin-left: 7px;
                        font-size:14px;
                        em{
                            display:block;
                            color:#62a1e3;
                            margin-bottom:10px;
                            &:hover{
                                color:#ba2636;
                            }
                        }
                        a{
                            b{
                                color:#5260e9;
                            }
                            &:hover{
                                b{
                                    color:#ba2636;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>