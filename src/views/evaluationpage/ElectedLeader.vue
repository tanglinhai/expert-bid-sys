<template>
    <div class="Elected_wrap">
        <NavCommon class="NavCommon" :aaa="aaa" :bbb="bbb" :ccc="ccc"></NavCommon>
        <div class="Allinformation" v-loading="pageLoading">
            <!--开始评标页面-->
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
                                    <span>张三</span>
                                </div>
                                <el-button size="small" type="primary" @click.stop="LookTuiju"><i class="icon iconfont icon-zhuanjiazhuye"></i>&nbsp;&nbsp;查看推举情况</el-button>           
                            </div>
                        </template>
                        <!--表格-->
                        <div>
                            <template>
                                <el-table
                                v-loading="ProjectFbLoading"
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
                                    label="状态">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.status==0">
                                            <el-tag>进行中</el-tag>
                                        </div>
                                        <div v-if="scope.row.status==3">
                                            <el-tag>已废标</el-tag>
                                        </div>
                                        <div v-if="scope.row.status==1">
                                            <el-tag>进行中</el-tag>
                                        </div>
                                        <div v-if="scope.row.status==2">
                                            <el-tag>已完成</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    label="操作">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.status==0" @click="goto('/index/WheelPushing')">
                                            <el-button size="small"><i class="icon iconfont icon-zhuanjiazhuye"></i>推举组长</el-button>
                                        </div>
                                        <div v-if="scope.row.status==3">
                                            <el-button size="small"><i class="el-icon-message"></i>查看</el-button>
                                        </div>
                                        <div v-if="scope.row.status==1">
                                            <el-button size="small" @click="goto('/elect/StartEvaluation')"><i class="el-icon-edit-outline"></i>评标</el-button>
                                            <el-button size="small" @click="adjustedValuation(scope.row)"><i class="el-icon-edit-outline"></i>调整评标价 </el-button>
                                        </div>
                                        <div v-if="scope.row.status==2">
                                            <el-button size="small" @click="goto('/elect/StartEvaluation')"><i class="el-icon-edit-outline"></i>评标</el-button>
                                        </div>
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
            <!--推举情况弹框-->
            <el-dialog
                title="推举主任情况"
                :visible.sync="dialogSelectionDirector"
                width="50%"
            >
                <div class="failureEntryDialog" v-loading="ElevatedSituationLoading">
                    <div class="failureoOject">
                        {{baohao}}:评委组长为[<span class="cole02">{{leader}}</span> ]
                    </div>
                    <el-row class="textAlignC dijilun" v-for="(item,index) in CheckReferralsList" :key="index">
                        <el-col :span="4">第{{item.number}}轮</el-col>
                        <el-col :span="16">
                            <span v-for="(item,index) in item.children" :key="index">{{item.name}}({{item.peopleNumber}}票)</span>
                        </el-col>
                    </el-row>
                </div>
            </el-dialog>
            <!--推举情况弹框-->
            <!--调整评标价弹框-->
            <el-dialog
                title="投标人最新报价列表"
                :visible.sync="ChangedialogVisible"
            >
                <ChangePrice v-loading="TkOneloading" @sonToFather="sonToFather" :msgBox="ChangePriceTk"></ChangePrice>
            </el-dialog>
            <!--调整评标价弹框-->
        </div>
    </div>
</template>

<script>
    // import evaluationcommonVue from '../../components/publicVue/evaluationcommon.vue';
    import NavCommon from '../../components/publicVue/NavCommon.vue';
    import ChangePrice from '../../components/publicVue/ChangePrice.vue';
    export default {
        name: 'index',
        props: {},
        components: {
            // evaluationcommonVue,
            ChangePrice,
            NavCommon
        },
        data(){
            return {
                TkOneloading:true,
                NoClick:0, //项目资料,雷同性分析,招标文件查看,硬件特征四项，0不可点，1可点
                pageLoading:true,  //loading
                activeNames2: ['1'], //项目分包默认展开

                ElevatedSituationLoading:false, //推举情况弹框loading
                ProjectFbLoading:false,  //项目分包表格loading
                projectTableData: [],  //项目分包信息
                currentPage4: 1,   //分页
                projectZiliaoList:[],  //项目资料列表
                projectChaxunList:[],  //招标文件查看
                projectLeiFenxiList:[], //雷同性分析
                projectYinjianFenxiList:[], //硬件特征码防串围标分析
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                dialogSelectionDirector:false,  //推举情况弹框默认隐藏
                leader:'',  //推举主任情况组长
                baohao:'',  //推举主任情况包号
                CheckReferralsList:[],  //推举主任情况弹框数据
                ChangedialogVisible:false,  //调整评标价弹框
                ChangePriceTk:[],  //投标人最新报价列表弹框里面表格得数据

                aaa:0,  //参加评标可点
                bbb:0,  //参加评标不可点 
                ccc:1,  //参加评标不可点
            }
        },
        mounted(){
            var _this=this;
            setInterval(function(){
              _this.ProjectSubcontract();//项目分包数据  
            },15000)
            this.ProjectSubcontract();//项目分包数据
            this.ProjectZiliao() //项目，资料，分析，硬件分析查看

            
            
        },
        methods:{
            goto(url){//开始评标
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.ProjectFbLoading=true;
                this.ProjectSubcontract();
            },

            //项目分包数据
            ProjectSubcontract(){   
                this.$axios.post('/api/ProjectSubcontract',{
                    //invitioninpval:this.invitioninpval,   //传值关键词
                    //redshow:this.redshow,    //四个按钮选中的是id
                }).then(res=>{
                    if(res.status == 200){
                       this.projectTableData=res.data.projectTables;
                       this.ProjectFbLoading=false;
                    }
                })
            },

            //项目，资料，分析，硬件分析查看
            ProjectZiliao(){   
                 this.$axios.post('/api/ProjectZiliao',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data)
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

            //查看推举情况按钮事件
            LookTuiju(){
                this.dialogSelectionDirector=true;
                this.ElevatedSituationLoading=true;
                this.$axios.post('/api/CheckReferralsTuiju',{

                }).then(res=>{
                    if(res.status==200){
                       console.log(res.data,88888) 
                        this.leader=res.data.leader;
                        this.baohao=res.data.baohao;
                        this.CheckReferralsList = res.data.CheckReferralsList;
                        this.ElevatedSituationLoading=false;
                    }
                })
            },

            //调整评标价点击事件
            adjustedValuation(row){
                this.ChangedialogVisible = true;
                this.TkOneloading=true;
                console.log(row.id)
                //调整评标价点击弹框传值到子页面
                this.$axios.post('/api/NewChangePrice',{
                    id:row.id,   //点击得id
                }).then(res=>{
                    if(res.status == 200){
                        console.log(res.data,99999)
                       this.ChangePriceTk=res.data.msgBox;
                       this.TkOneloading=false;
                    }
                })
            },


            sonToFather(val){  //子集得返回点击关闭事件传值
                this.ChangedialogVisible = val;
            },

        }
    }
</script>
<style lang="scss">
.Elected_wrap{
    overflow:hidden; 
    padding-top:15px; 
    background:#ededed;
    .NavCommon{
        width:8%; 
        float:left; 
        min-height:100px;
    }
    .Allinformation {
        background-color: #ededed;
        padding:0px 0% 15px 0%;
        width:90%;
        float:left;
        margin-left:1%;
        margin-right:1%;
        .el-collapse,.el-collapse-item__wrap{
            border:none;
        }
        .pageBox {
            text-align: right;
            padding: 0 15px 15px 15px;
        }
        .evaluationcommon{
             background:white;
            border-radius:5px;
            padding:15px;
            .oneanonter{
              height:20px;
              line-height:20px; 
              margin-top:-25px;
              &:before{
                  margin-top:1px;
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
        .failureEntryDialog{
            .failureoOject{
            line-height: 38px;
            height: 38px;
            border-top: 1px dotted #ccc;
            border-bottom: 1px dotted #ccc;
            }
            .dijilun{
            line-height: 38px;
            height: 38px;
            border-bottom: 1px dotted #ccc;
            margin-bottom: 25px;
            }
        }
    }
}
</style>
