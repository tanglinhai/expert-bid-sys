<template>

    <div class="beginEvaluation" v-loading="pageLoading">
        <!--开始评标页面-->
        <!--公共部分组件-->
        <evaluationcommonVue :PorjectName="PorjectName" :ProjectBianhao="ProjectBianhao" :projectZiliao="projectZiliaoList" :projectChaxun="projectChaxunList" :projectLeiFenxi="projectLeiFenxiList" :projectYinjianFenxi="projectYinjianFenxiList"></evaluationcommonVue>
        <!--公共部分组件-->
        <div class="evaluationcommon">
            <el-collapse accordion v-model="activeNames2">
                <el-collapse-item  name="1">
                    <template slot="title">
                        <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                            <h5 class="commonTitle col348fe2 oneanonter">项目分包</h5>
                        </div>
                        <div class="bidevaluationexperts">
                            <div class="bidexpert">
                                评标专家：
                                <span>1</span>
                            </div>
                            <el-button size="small" type="primary"><i class="icon iconfont icon-zhuanjiazhuye"></i>&nbsp;&nbsp;查看推举情况</el-button>           
                        </div>
                    </template>
                    <!--表格-->
                    <div>
                        <template>
                            <el-table
                            :data="projectTableData"
                            :header-cell-style="getRowClass"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="baohao"
                                label="包号"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="baoName"
                                label="包名称"
                                width="400"
                                >
                            </el-table-column>
                             <el-table-column
                                prop="baostatuss"
                                label="状态">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" size="small">评标</el-button>
                                    <el-button size="small">调整评标价</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <!--表格-->
                </el-collapse-item>
            </el-collapse>
             <!--分页-->
            <div class="pageBox">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </div>
            <!--分页-->
        </div>

    </div>
</template>

<script>
    import evaluationcommonVue from '../components/publicVue/evaluationcommon.vue';
import { setTimeout } from 'timers';
    export default {
        name: 'index',
        props: {},
        components: {
            evaluationcommonVue
        },
        data(){
            return {
                pageLoading:true,  //loading
                activeNames2: ['1'], //项目分包默认展开
                projectTableData: [],  //项目分包信息
                currentPage4: 1,   //分页
                projectZiliaoList:[],  //项目资料列表
                projectChaxunList:[],  //招标文件查看
                projectLeiFenxiList:[], //雷同性分析
                projectYinjianFenxiList:[], //硬件特征码防串围标分析
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
            }
        },
        mounted(){
            this.ProjectSubcontract();//项目分包数据
            this.ProjectZiliao() //项目，资料，分析，硬件分析查看
            
        },
        methods:{
            getRowClass({row,column,rowIndex,columnIndex}){  //项目分包表头添加背景颜色
                if(rowIndex==0){
                    return 'background:#efefef';
                }else{
                    return '';
                }
            },

            //项目分包数据
            ProjectSubcontract(){   
                 this.$axios.post('/api/ProjectSubcontract',{
                    //invitioninpval:this.invitioninpval,   //传值关键词
                    //redshow:this.redshow,    //四个按钮选中的是id
                }).then(res=>{
                    if(res.status == 200){
                       this.projectTableData=res.data.projectTables;
                    }
                })
            },

            //项目，资料，分析，硬件分析查看
            ProjectZiliao(){   
                 this.$axios.post('/api/ProjectZiliao',{
                }).then(res=>{
                    if(res.status == 200){
                        console.log(res.data)
                        this.pageLoading=false;
                        this.projectZiliaoList=res.data.projectZiliao;
                        this.projectChaxunList=res.data.projectChaxun;
                        this.projectLeiFenxiList=res.data.projectLeiFenxi;
                        this.projectYinjianFenxiList=res.data.projectYinjianFenxi;
                        this.PorjectName=res.data.PorjectName;
                        this.ProjectBianhao=res.data.ProjectBianhao;
                        $(".el-collapse-item__wrap").hide()
                        setTimeout(function(){
                            $(".el-collapse-item__wrap").show()
                        },50)
                    }
                })
            },
        }
    }
</script>
<style lang="scss">
    .beginEvaluation {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .el-collapse,.el-collapse-item__wrap{
            border:none;
        }
        .pageBox {
            text-align: right;
            padding: 0 15px 15px 15px;
        }
        .evaluationcommon{
            margin-bottom:20px;
            .oneanonter{
                &:before{
                    margin-top:15px;
                }
            }
            .bidevaluationexperts{
                position:absolute;
                right:70px;
                .bidexpert{
                    float:left;
                    margin-right:20px;
                    span{
                        color: #da2138;
                        border:1px solid #da2138;
                        padding:2px 5px;
                    }
                }
            }
        }
    }
</style>
