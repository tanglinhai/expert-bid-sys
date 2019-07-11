<template>
    <div class="Elected_wrap">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation cf" v-loading="pageLoading">
            <!--开始评标页面-->
            <el-row class="fs14 bid_msg mb15">
                <el-col :span="7">
                    <div class="grid-content bg-purple"><span>标包名称：</span><span>{{name}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light"><span>标包号：</span><span>{{biaoNum}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>招标文件：</span><span><a href="http://localhost:7000/img/download.svc" download=""><b>{{projectWenjian}}<i class="icon iconfont icon-pdf"></i></b></a></span></div>
                </el-col>
                <!-- <el-col :span="4">
                    <div class="grid-content bg-purple"><span>当前状态：</span><span>{{TheCurrentStatus}}</span></div>
                </el-col> -->
            </el-row>
            <div class="evaluationcommon lineAll cf">
               <MessageCommon :tableData3="tableData3" :dianji="1"></MessageCommon>
                <el-row class="LayoutRightSide">
                    <!-- <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 oneanonter">操作信息</h5>
                    </div> -->
                    <!-- <div class="fr mr20">
                        当前状态
                        <template v-if="projectTableData.status==3">
                            <el-tag>已废标</el-tag>
                        </template>
                        <template v-if="projectTableData.status==0||projectTableData.status==1||projectTableData.status==4||projectTableData.status==5">
                            <el-tag>进行中</el-tag>
                        </template>
                        <template v-if="projectTableData.status==2||projectTableData.status==6">
                            <el-tag>已完成</el-tag>
                        </template>
                    </div> -->
                    <div class="grid-content bg-purple fl">
                        <template v-if="projectTableData.status==0" >
                            <el-button size="small" type="primary" @click="AgreeXieYi"><i class="icon iconfont icon-zhuanjiazhuye"></i>推举组长</el-button>
                        </template>
                        <!-- <template v-if="projectTableData.status==3">
                            <el-button   size="small" @click="goto('/elect/StartEvaluation?types=4&methodType='+val)"><i class="el-icon-message"></i>查看</el-button>
                        </template> -->
                        <!-- <template v-if="projectTableData.status==1">
                            <el-button size="small" @click="adjustedValuation(projectTableData.id)"><i class="el-icon-edit-outline"></i>调整评标价 </el-button>
                            <el-button size="small" type="primary" @click="evaluationBidBtn"  :loading="BtnLoading" ><i class="el-icon-edit-outline"></i>评标</el-button>
                        </template> -->
                        <template v-if="projectTableData.status==2">
                            <el-button  size="small" type="primary" @click="goto('/elect/StartEvaluation?types=4&methodType='+val)"><i class="el-icon-edit-outline"></i>评标</el-button>
                        </template>
                        <template v-if="projectTableData.status==4">
                            <el-button  size="small" type="primary" @click="evaluationBidBtn"><i class="el-icon-edit-outline"></i>第一信封评标</el-button>
                        </template>
                        <!-- <template v-if="projectTableData.status==5">
                            <el-button size="small" @click="adjustedValuation(projectTableData.id)"><i class="el-icon-edit-outline"></i>调整评标价 </el-button>
                            <el-button size="small" type="primary" @click="evaluationBidBtn"><i class="el-icon-edit-outline"></i>第二信封评标</el-button>
                            <el-button size="small" @click="goto('/elect/StartEvaluation?types=4&methodType='+val)"><i class="el-icon-edit-outline"></i>第一信封查看</el-button>
                        </template>
                        <template v-if="projectTableData.status==6">
                            <el-button size="small" @click="goto('/elect/StartEvaluation?types=4&methodType='+val)"><i class="el-icon-edit-outline"></i>第一信封查看</el-button>
                            <el-button size="small" @click="goto('/elect/StartEvaluation?types=4&methodType='+val)"><i class="el-icon-edit-outline"></i>第二信封查看</el-button>
                        </template> -->
                    </div>
                </el-row>
            </div>
                <!--表格-->
                <!-- <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                    <h5 class="commonTitle col348fe2 oneanonter">投标人信息</h5>
                </div>
                <el-table
                    v-loading="tBrMsgLoading"
                    class="mt20 fl"
                    :data="tableData3"
                    :header-cell-style="getRowClass"
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="toubiaorenName"
                        label="投标人名称">
                        <template slot-scope="scope">
                            <a href="javascript:;" @click="ChakanTk(scope.row)">{{scope.row.toubiaorenName}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="toubiaorenFenbao"
                        label="投标文件">
                        <template slot-scope="scope">
                            <a href="http://localhost:7000/img/download.svc" download="">{{scope.row.toubiaorenFenbao}}<i class="icon iconfont icon-pdf"></i></a>
                            
                        </template>
                    </el-table-column>
                </el-table> -->
                <!--表格-->
                <!-- <div class="eletedChange fl">
                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL mt20">
                        <h5 class="commonTitle col348fe2 oneanonter">项目分包</h5>
                    </div>
                </div> -->
                <!-- </template> -->
                <!--表格-->
                <!-- <div class="fl mt20" style="width:100%;">
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
                                <div v-if="scope.row.status==0" @click="AgreeXieYi">
                                    <el-button size="small"><i class="icon iconfont icon-zhuanjiazhuye"></i>推举组长</el-button>
                                </div>
                                <div v-if="scope.row.status==3">
                                    <el-button size="small"><i class="el-icon-message"></i>查看</el-button>
                                </div>
                                <div v-if="scope.row.status==1">
                                    <el-button size="small" @click="evaluationBidBtn"  :loading="BtnLoading" ><i class="el-icon-edit-outline"></i>评标</el-button>
                                    <el-button size="small" @click="adjustedValuation(scope.row)"><i class="el-icon-edit-outline"></i>调整评标价 </el-button>
                                </div>
                                <div v-if="scope.row.status==2">
                                    <el-button size="small" @click="goto('/elect/StartEvaluation?type=1')"><i class="el-icon-edit-outline"></i>评标</el-button>
                                </div>
                            </template>
                        </el-table-column>
                        </el-table>
                    </template>
                </div> -->
                <!--表格-->
            
            
            
        </div>
    </div>
</template>

<script>
    import MessageCommon from '../../components/publicVue/MessageCommon.vue'
    
    export default {
        name: 'index',
        props: {},
        components: {
            //ChangePrice,
            MessageCommon
            // NavCommon
        },
        data(){
            return {
              
                //dianji:'',   0不可点 1可点击
                pageLoading:true,  //loading

                
                ProjectFbLoading:false,  //项目分包表格loading
                projectTableData: {},  //项目分包信息
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                leader:'',  //推举主任情况组长
                baohao:'',  //推举主任情况包号

                
                

                tBrMsgLoading:false,  //投标人信息列表loading效果
                
                tableData3:[  //投标人信息
                    
                ],
               
                BtnLoading:false,  //评标按钮loadding

                name:'',  //标名称
                biaoNum:'', //标号
                baohao:'', //包号
                projectWenjian:'',  //项目资料
                TheCurrentStatus:'', //当前状态

                val:'',  //四种方式传值

            }
        },
        created() {
            if (this.$route.query.types == undefined) {
                this.$store.state.navCommon.types=1;
            } else {
                this.$store.state.navCommon.types=this.$route.query.types;
                console.log(this.$store.state.navCommon.types,6)
            }
            console.log(this.$route.query, '000');
            //this.val=this.$route.query.methodType;
            if (this.$route.query.methodType == undefined) {
                this.val= 1;
            } else {
                this.val=this.$route.query.methodType;
            }
        },
        mounted(){
            let _this=this;
            setInterval(function(){
              _this.ProjectSubcontract();//项目分包数据  
            },300000);
            this.ProjectSubcontract();//项目分包数据

            this.AllInformation(); //专家个人信息,投标人信息接口

            $(".NavCommon").show();

            this.baoInformations(); //头部包信息
            
            
        },
        methods:{
            baoInformations(){   //头部包信息
                this.$axios.post('/api/baoInformations','post',{

                }).then(res=>{
                   // console.log(res,88888)
                    if(res.status == 200){
                        this.name=res.data.result.name;
                        this.biaoNum=res.data.result.biaoNum;
                        this.baohao=res.data.result.baohao;
                        this.projectWenjian=res.data.result.projectWenjian;
                        this.TheCurrentStatus=res.data.result.TheCurrentStatus;
                    }
                })
            },

            evaluationBidBtn(){
                this.BtnLoading=true;
                this.$axios.post('/api/evaluationBidBtn','post',{

                }).then(res=>{
                    if(res.status == 200){
                        this.BtnLoading=false;
                        this.$router.push({
                            // path: '/elect/StartEvaluation?types=4',
                            path: '/elect/StartEvaluation?types=4&methodType='+this.val,
                        })
                    }
                })
            },
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
           

            //项目分包数据
            ProjectSubcontract(){   
                this.$axios.post('/api/ProjectSubcontract',{
                    //invitioninpval:this.invitioninpval,   //传值关键词
                    //redshow:this.redshow,    //四个按钮选中的是id
                }).then(res=>{
                    if(res.status == 200){
                       this.projectTableData=res.data.projectTables;
                       this.ProjectFbLoading=false;
                       this.pageLoading=false;
                    }
                })
            },

            // navcommonsListFun(){
            //     this.$axios.post('/api/navcommons',{
            //         //invitioninpval:this.invitioninpval,   //传值关键词
            //         //redshow:this.redshow,    //四个按钮选中的是id
            //     }).then(res=>{
            //         if(res.status == 200){
            //            //console.log(res.data)
            //             this.navcommonsList=res.data.navsAll;
            //             this.$nextTick(function(){
            //                // $("#3").addClass("backblue");
            //             })
            //         }
            //     })
            // },

            AgreeXieYi(){  //推举组长
            console.log("1")
                this.$router.push({
                    path: '/index/WheelPushing?is_submit_type=0&currentpage=3&methodType='+this.val,
                })
                
            },

            //专家个人信息,投标人信息接口
            AllInformation(){
                this.$axios.post('/api/CheckReferrals',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data.personInformation)
                        
                        this.tableData3=res.data.toubiaorenInformation;
                      
                        this.tBrMsgLoading=false;
                        this.pageLoading=false;

                    }
                })
            },
            

            

        }
    }
</script>
<style lang="scss">
.Elected_wrap{
    overflow:hidden; 
    padding-top:15px; 
    background:#ededed;
    min-height: 800px;
    .Allinformation {
        background-color: #ededed;
        padding:0px 0% 15px 0%;
        width:98%;
        float:left;
        margin-left:1%;
        margin-right:1%;
        .el-collapse,.el-collapse-item__wrap{
            border:none;
        }
        .evaluationcommon{
            border-radius:5px;
            position: relative;
            
            .LayoutRightSide{
               overflow: hidden;
                width: 420px;
                background: white;
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                -ms-border-radius: 5px;
                -o-border-radius: 5px;
                border-radius: 5px;
                position: absolute;
                right: 0px;
                top:0px;
                height: 100%;
                .grid-content{
                    padding:20px 0px;
                    width:97%;
                    .commonTitle:before{
                        margin-left:15px;
                    }
                    .el-button{
                        float: right;
                        margin-left:10px;
                    }
                }
            }
            .bidevaluationexperts{
                position:absolute;
                right:70px;
                .bidexpert{
                    float:left;
                    margin-right:20px;
                    margin-top:10px;
                    span{
                        color: #da2138;
                        border:1px solid #da2138;
                        padding:2px 5px;
                    }
                }
            }
            .eletedChange{
                width:100%; 
                height:40px;
            }
        }
        // .failureEntryDialog{
        //     .failureoOject{
        //     line-height: 38px;
        //     height: 38px;
        //     border-top: 1px dotted #ccc;
        //     border-bottom: 1px dotted #ccc;
        //     }
        //     .dijilun{
        //     line-height: 38px;
        //     height: 38px;
        //     border-bottom: 1px dotted #ccc;
        //     margin-bottom: 25px;
        //     }
        // }
    }
}
</style>
