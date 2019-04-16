<template>
    <div class="Elected_wrap">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation cf" v-loading="pageLoading">
            <!--开始评标页面-->
            <div class="evaluationcommon cf">
                <!--表格-->
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
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
                </el-table>
                <!--表格-->
                <div class="eletedChange fl">
                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL mt20">
                        <h5 class="commonTitle col348fe2 oneanonter">项目分包</h5>
                    </div>
                    <!-- <div class="bidevaluationexperts">
                        <div class="bidexpert">
                            评标专家：
                            <span>张三</span>
                        </div>
                        <el-button size="small" type="primary" @click.stop="LookTuiju"><i class="icon iconfont icon-zhuanjiazhuye"></i>&nbsp;&nbsp;查看推举情况</el-button>           
                    </div> -->
                </div>
                <!-- </template> -->
                <!--表格-->
                <div class="fl mt20" style="width:100%;">
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
                </div>
                <!--表格-->
            </div>
            <!--推举情况弹框-->
            <!-- <el-dialog
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
            </el-dialog> -->
            <!--推举情况弹框-->
            <!--调整评标价弹框-->
            <el-dialog
                title="投标人最新报价列表"
                :visible.sync="ChangedialogVisible"
            >
                <ChangePrice v-loading="TkOneloading" @sonToFather="sonToFather" :msgBox="ChangePriceTk"></ChangePrice>
            </el-dialog>
            <!--调整评标价弹框-->
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
                    <!-- <el-pagination
                        class="fr mt10"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="ChakanPage1"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination> -->
                </span>
                <span slot="footer" class="dialog-footer">
                    <el-button size="small" type="primary" @click="chakancenterDialogVisible = false">返回</el-button>
                </span>
            </el-dialog>
            <!--文件查看弹框-->
        </div>
    </div>
</template>

<script>
    // import NavCommon from '../../components/publicVue/NavCommon.vue';
    import ChangePrice from '../../components/publicVue/ChangePrice.vue';
    export default {
        name: 'index',
        props: {},
        components: {
            ChangePrice,
            // NavCommon
        },
        data(){
            return {
                // navcommonsList:[],  //导航数据
                 number:'',   //导航当前第几步

                TkOneloading:true,
                pageLoading:true,  //loading

                // ElevatedSituationLoading:false, //推举情况弹框loading
                ProjectFbLoading:false,  //项目分包表格loading
                projectTableData: [],  //项目分包信息
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                // dialogSelectionDirector:false,  //推举情况弹框默认隐藏
                leader:'',  //推举主任情况组长
                baohao:'',  //推举主任情况包号
                // CheckReferralsList:[],  //推举主任情况弹框数据
                ChangedialogVisible:false,  //调整评标价弹框
                ChangePriceTk:[],  //投标人最新报价列表弹框里面表格得数据

                tBrMsgLoading:false,  //投标人信息列表loading效果
                chakancenterDialogVisible: false, //文件查看弹框默认隐藏
                tableData3:[  //投标人信息
                    
                ],
                ChakanTableData:[{
                    bianhao:"",
                    baoname:"",
                    name:"",
                }],//招标文件查看弹框内容
                BtnLoading:false,  //评标按钮loadding

            }
        },
        created() {
            if (this.$route.query.types == undefined) {
                this.$store.state.navCommon.types=1;
            } else {
                this.$store.state.navCommon.types=this.$route.query.types;
                console.log(this.$store.state.navCommon.types,6)
            }
        },
        mounted(){
            var _this=this;
            setInterval(function(){
              _this.ProjectSubcontract();//项目分包数据  
            },15000)
            this.ProjectSubcontract();//项目分包数据

            //this.navcommonsListFun(); //导航接口

            this.AllInformation(); //专家个人信息,投标人信息接口

            $(".NavCommon").show();
            
            
        },
        methods:{
            evaluationBidBtn(){
                this.BtnLoading=true;
                this.$axios.post('/api/evaluationBidBtn','post',{

                }).then(res=>{
                    if(res.status == 200){
                        this.BtnLoading=false;
                        this.$router.push({
                            // path: '/elect/StartEvaluation?types=4',
                            path: '/elect/StartEvaluation',
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
            //查看推举情况按钮事件
            // LookTuiju(){
            //     this.dialogSelectionDirector=true;
            //     this.ElevatedSituationLoading=true;
            //     this.$axios.post('/api/CheckReferralsTuiju',{

            //     }).then(res=>{
            //         if(res.status==200){
            //            //console.log(res.data,88888) 
            //             this.leader=res.data.leader;
            //             this.baohao=res.data.baohao;
            //             this.CheckReferralsList = res.data.CheckReferralsList;
            //             this.ElevatedSituationLoading=false;
            //         }
            //     })
            // },

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
                        //console.log(res.data,99999)
                       this.ChangePriceTk=res.data.msgBox;
                       this.TkOneloading=false;
                    }
                })
            },

             navcommonsListFun(){
                this.$axios.post('/api/navcommons',{
                    //invitioninpval:this.invitioninpval,   //传值关键词
                    //redshow:this.redshow,    //四个按钮选中的是id
                }).then(res=>{
                    if(res.status == 200){
                       //console.log(res.data)
                        this.navcommonsList=res.data.navsAll;
                        this.$nextTick(function(){
                            $("#3 button").addClass("backblue");
                        })
                    }
                })
            },

            AgreeXieYi(){  //参加评标
                this.$router.push({
                    path: '/index/WheelPushing?types=3',
                })
                
            },

            //专家个人信息,投标人信息接口
            AllInformation(){
                this.$axios.post('/api/CheckReferrals',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data.personInformation)
                        
                        this.tableData3=res.data.toubiaorenInformation;
                        //this.projectInformation[0].projectInformation_name=res.data.personInformation.projectInformation_name;
                        //this.projectInformation[0].projectInformationbian_hao=res.data.personInformation.projectInformationbian_hao;
                        this.tBrMsgLoading=false;
                        this.pageLoading=false;

                    }
                })
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
             background:white;
            border-radius:5px;
            padding:15px;
            .oneanonter{
              height:20px;
              line-height:20px;
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
