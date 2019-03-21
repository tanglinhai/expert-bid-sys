<template>
    <div class="evaluationcommon">
        <el-row class="evaluationcommon_title">
            <el-col :span="6">
                <div class="grid-content bg-purple">项目名称：{{PorjectName}}</div>
            </el-col>
            <el-col :span="5" :offset="1">
                <div class="grid-content bg-purple-light">项目编号：{{ProjectBianhao}}</div>
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
                                    <a href="http://localhost:7002/img/download.svc" :download="item.ziliaoName">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in item.children" :key="index" :name="index" @click="ChakanTk(item)">
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
                                <li v-for="(item,index) in projectLeiFenxi" :key="index" @click="LeitongcenterDialogVisible=true">
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
                                <li v-for="(item,index) in projectYinjianFenxi" :key="index" @click="YinjiancenterDialogVisible=true">
                                    <a href="javascript:;">
                                        <span>{{index+1}}</span>
                                        {{item.ziliaoName}}
                                    </a>
                                </li>
                            </ul>
                        </el-scrollbar>
                    </div>

            </el-collapse-item>
        </el-collapse>
        <!---->

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
                            <a class="ml15" href="http://localhost:7002/img/download.svc" download=""><el-button size="small"><i class="el-icon-download"></i>&nbsp;&nbsp;下载</el-button></a>
                        </template>
                    </el-table-column>
                    </el-table>
                </template>
                <el-pagination
                    class="fr mt10"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="ChakanPage1"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                </el-pagination>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="chakancenterDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <!--文件查看弹框-->

        <!--雷同性分析弹框-->
        <el-dialog
            title="标书雷同性分析"
            :visible.sync="LeitongcenterDialogVisible"
            width="60%"
            center>
            <span></span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="LeitongcenterDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <!--雷同性分析弹框-->
        <!--硬件特征码防串围标分析弹框-->
        <el-dialog
            title="硬件特征码分析"
            :visible.sync="YinjiancenterDialogVisible"
            width="90%"
            center>
            <span>
                <template>
                    <el-table
                    :data="YinjiantableData"
                    style="width: 100%">
                        <el-table-column
                            prop="gongyinshang"
                            label="供应商名称"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="cpu"
                            label=""
                            >
                        </el-table-column>
                        <el-table-column
                            prop="yinpan"
                            label="">
                        </el-table-column>
                        <el-table-column
                            prop="wangka"
                            label="">
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            label="">
                        </el-table-column>
                        <el-table-column
                            prop="ruanjian"
                            label="">
                        </el-table-column>
                        <el-table-column
                            prop="caozuo"
                            label="">
                        </el-table-column>
                        <el-table-column
                            prop="shijian"
                            label="">
                        </el-table-column>
                    </el-table>
                </template>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="YinjiancenterDialogVisible = false">返回</el-button>
            </span>
        </el-dialog>
        <!--硬件特征码防串围标分析弹框-->
    </div>
</template>

<script>
    export default {
        name: "evaluationcommon",
        data(){
            return {
                ChakanPage1: 1,
                activeNames: ['1'], //默认展开
                chakancenterDialogVisible: false, //文件查看弹框默认隐藏
                LeitongcenterDialogVisible:false, //雷同性分析弹框默认隐藏
                YinjiancenterDialogVisible:false, //硬件分析弹框默认隐藏
                ChakanTableData:[{
                    bianhao:"",
                    baoname:"",
                    name:"",
                }],//招标文件查看弹框内容
                YinjiantableData: [{  //硬件特征码分析弹框数据
                    gongyinshang: '益达天然产物有限公司（测试）',
                    cpu: 'CPU序号',
                    yinpan: '硬盘序列号',
                    wangka: '网卡MAC地址',
                    ip: 'IP地址',
                    ruanjian: '软件序列号',
                    caozuo: '操作系统及版本号',
                    shijian: '操作时间'
                }, {
                    gongyinshang: '北京蓝天环境保护有限公司',
                    cpu: 'CPU序号',
                    yinpan: '硬盘序列号',
                    wangka: '网卡MAC地址',
                    ip: 'IP地址',
                    ruanjian: '软件序列号',
                    caozuo: '操作系统及版本号',
                    shijian: '操作时间'
                }]
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
           },
           projectYinjianFenxi:{   //硬件特征码防串围标分析
               type:Array   
           },
           PorjectName:{   //项目名称
               type:String
           },
           ProjectBianhao:{  //项目编号
               type:String
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
            getRowClass({row,column,rowIndex,columnIndex}){  //项目分包表头添加背景颜色
                if(rowIndex==0){
                    return 'background:#efefef';
                }else{
                    return '';
                }
            },
            ChakanTk(item){  //招标文件查看点击事件
                this.chakancenterDialogVisible=true;
                this.ChakanTableData[0].bianhao=item.bianhao;
                this.ChakanTableData[0].baoname=item.baoname;
                this.ChakanTableData[0].name=item.name;
            },
            ChakanhandleClick(row){   //招标文件查看弹框的查看事件
                console.log(row,999)
                 window.open('http://localhost:7002/img/receipt.pdf');
            }
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