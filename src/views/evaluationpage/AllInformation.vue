<template>
    <div class="Allinforation_wrap">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation cf" v-loading="pageLoading">
            <!--开始评标页面-->
            <div class="evaluationcommon cf">
                 <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                    <h5 class="commonTitle col348fe2 oneanonter">项目信息</h5>
                </div>
                <el-table
                    class="mt20 fl"
                    :data="projectInformation"
                    :show-header="false"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="projectInformationname"
                        label="1"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="projectInformation_name"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="projectInformationbianhao"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="projectInformationbian_hao"
                        label="招标文件">
                    </el-table-column>
                   
                </el-table>
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL mt20">
                    <h5 class="commonTitle col348fe2 oneanonter">专家个人信息</h5>
                </div>
                <el-table
                    class="mt20 fl"
                    :data="tableData2"
                    :show-header="false"
                    border
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="1"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="num"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="招标文件">
                    </el-table-column>
                    <el-table-column
                        prop="telNum"
                        label="招标文件">
                    </el-table-column>
                </el-table>
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL mt20">
                    <h5 class="commonTitle col348fe2 oneanonter">投标人信息</h5>
                </div>
                <el-table
                    v-loading="tBrMsgLoading"
                    class="mt20 fl"
                    :data="tableData3"
                    border
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
                            <span>{{scope.row.toubiaorenName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="toubiaorenFenbao"
                        label="投标文件">
                    </el-table-column>
                </el-table>
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
                <el-row :gutter="20" class="mt20" style="overflow:hidden; width:100%;">
                    <!-- <el-col :span="12" :offset="6">
                        <div class="grid-content bg-purple mar">
                            <el-checkbox v-model="checked"></el-checkbox>&nbsp;我已读并同意了此承诺书《承诺书协议》 
                        </div>
                    </el-col> -->
                    <el-col :span="12" :offset="6">
                        <div class="grid-content bg-purple mar mt20">
                            <el-button size="small" type="primary" @click="applyAvoid">申请回避</el-button>
                            <el-button size="small" type="primary"  @click="AgreeXieYi" :loading="BtnLoading">参加评标</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>

        <!--申请回避弹框-->
        <!-- <el-dialog
                class="mar"
                title="申请回避"
                :visible.sync="dialogApplyAvoid"
                width="700px"
            >
                <div class="ApplyAvoid">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                        <el-form-item  prop="desc" class="textAlignL">
                            <label><span  class="cole02">*</span>回避原因：</label>
                            <el-input type="textarea" v-model="ruleForm.desc" class="textarea"></el-input>
                        </el-form-item>
                        <el-form-item class="text-center">
                            <el-button type="primary" @click="submitForm('ruleForm')" size="small" > <i class="icon iconfont icon-baocun1 mr5"  ></i> 确定</el-button>
                            <el-button @click="dialogApplyAvoid=false" size="small" type="primary"> <i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
                        </el-form-item>
                    </el-form>
                </div>
        </el-dialog> -->
        <!--申请回避弹框-->
        <!--文件查看弹框-->
        <!-- <el-dialog
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
                <el-button size="small" type="primary" @click="chakancenterDialogVisible = false">返回</el-button>
            </span>
        </el-dialog> -->
        <!--文件查看弹框-->
        </div>
    </div>
</template>

<script>
    
    // import NavCommon from '../../components/publicVue/NavCommon.vue';
    export default {
        name: 'index',
        props: {},
        components: {
            // NavCommon
        },
        data(){
            return {
                // navcommonsList:[],  //导航数据
               // number:'',   //导航当前第几步

                pageLoading:false,  //loading
                tBrMsgLoading:false,  //投标人信息列表loading效果
                chakancenterDialogVisible: false, //文件查看弹框默认隐藏
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                projectInformation:[  //项目信息
                    {projectInformationname:'项目名称：',projectInformation_name:'',projectInformationbianhao:'项目编号：',projectInformationbian_hao:''}
                ],
                tableData2:[  //专家个人信息
                    {name:'姓名：',num:'',tel:"手机：",telNum:'18700000003'},
                    {name:'证件号码：',num:'352226199505120036'},
                ],
                tableData3:[  //投标人信息
                    
                ],
                // ChakanTableData:[{
                //     bianhao:"",
                //     baoname:"",
                //     name:"",
                // }],//招标文件查看弹框内容
                // ChakanPage1:1, //分页
                // dialogApplyAvoid:false,
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        { type:'string',required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                },

                BtnLoading:false,  //参加评标loading
              
            }
        },
        created() {
            //console.log(this.$route.query.type,999)
            //this.number=this.$route.query.types
            this.$store.state.navCommon.types=this.$route.query.types;
            console.log(this.$store.state.navCommon.types,5)
        },
        mounted(){
            
            this.AllInformation(); //专家个人信息,投标人信息接口
            //this.navcommonsListFun(); //导航接口
            $(".NavCommon").show();
        },
        methods:{
            goto(url){//开始评标
               this.$router.push({
                    path: url
                 });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.tBrMsgLoading=true;
                this.AllInformation();
            },
            // ChakanTk(item){  //投标人信息查看点击事件
            //     console.log(item,999)
            //     this.chakancenterDialogVisible=true;
            //     this.ChakanTableData[0].bianhao=item.toubiaorenFenbao;
            //     this.ChakanTableData[0].baoname=item.baoname;
            //     this.ChakanTableData[0].name=item.toubiaorenName;
            // },
            // ChakanhandleClick(row){   //招标文件查看弹框的查看事件
            //     console.log(row,999)
            //      window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf');
            // },

            //专家个人信息,投标人信息接口
            AllInformation(){
                this.$axios.post('/api/CheckReferrals',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data.personInformation)
                        this.tableData2[0].num=res.data.personInformation.personName;
                        this.tableData2[0].telNum=res.data.personInformation.personTel;
                        this.tableData2[1].num=res.data.personInformation.personNumber;
                        this.tableData3=res.data.toubiaorenInformation;
                        this.projectInformation[0].projectInformation_name=res.data.personInformation.projectInformation_name;
                        this.projectInformation[0].projectInformationbian_hao=res.data.personInformation.projectInformationbian_hao;
                        this.tBrMsgLoading=false;
                        this.pageLoading=false;

                    }
                })
            },
           applyAvoid(){//申请回避弹框
                this.$confirm('回避后，将无法参与该标包的评标，确定回避？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                    }).catch(() => {
                });
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
                            $("#2 button").addClass("backblue");
                        })
                    }
                })
            },

            AgreeXieYi(){  //参加评标
                this.BtnLoading=true,
                this.$axios.post('/api/EnterEvaluationButton','post',{

                }).then(res=>{
                    if(res.status == 200){
                        this.BtnLoading=false,
                        this.$router.push({
                            path: '/index/ElectedLeader?types='+3,
                        })
                        
                    }
                })
                
            },
            // submitForm(formName) { //申请回避事件
            //     this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         //console.log(this.$data.ruleForm.desc,999)  //获取到的拒绝的值
            //         //alert(1)
            //         this.dialogApplyAvoid=false;
            //         this.$axios.post('/api/refuseWhy',{
            //             yuanyin:this.$data.ruleForm.desc,
            //         }).then(res=>{
            //             if(res.data.code=="200"){
            //                 //console.log(this.$data.ruleForm.desc,888)
            //                 this.$message({
            //                     message: '回避原因提交完成',
            //                     type: 'success'
            //                 });
            //                 this.$data.ruleForm.desc="";
            //             }
            //         })
            //     } else {
            //         return false;
            //     }
            //     });

            //     // alert('提交后您将没有权限参与此项目，此模拟系统暂时不支持此操作！');
            // },

        }
    }
</script>
<style lang="scss">
.Allinforation_wrap{
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
        .ApplyAvoid {
            .demo-ruleForm{
                .el-textarea__inner{
                    min-height: 120px!important;
                }
            }
        }
        .evaluationcommon{
            background:white;
            border-radius:5px;
            padding:15px;
        }
    }
}
</style>
