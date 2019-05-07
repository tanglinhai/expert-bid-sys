<template>
    <div class="Allinforation_wrap">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation cf" v-loading="pageLoading">
            <!--开始评标页面-->
            <el-row class="fs14 bid_msg mb15">
                <el-col :span="7">
                    <div class="grid-content bg-purple"><span>标名称：</span><span>{{name}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-light"><span>标号：</span><span>{{biaoNum}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>包号：</span><span>{{baohao}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>项目资料：</span><span>{{projectWenjian}}</span></div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple"><span>当前状态：</span><span>{{TheCurrentStatus}}</span></div>
                </el-col>
            </el-row>
            <div class="evaluationcommon lineAll cf">
               <MessageCommon :tableData3="tableData3" :dianji="0"></MessageCommon>
                <el-row class="LayoutRightSide">
                    <!-- <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 oneanonter">操作信息</h5>
                    </div> -->
                    <div class="grid-content bg-purple fl">
                        <el-button size="small"  @click="applyAvoid">申请回避</el-button>
                        <el-button size="small" type="primary"  @click="AgreeXieYi" :loading="BtnLoading">参加评标</el-button>
                    </div>
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

        <!--多头表格-->
        <!-- <template>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="150">
                </el-table-column>
                <el-table-column label="配送信息">
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="120">
                    </el-table-column>
                    <el-table-column :label="items.aaa" v-for="(items,index3) in tableWrap" :key="index3">
                        <el-table-column
                            :label="item.province"
                            width="120" v-for="(item,index) in items.tablesNeiContent" :key="index">
                            <template slot-scope="scope">
                                <span v-for="(item2,index2) in item.zhaunjiadata_gs" :key="index2">{{item2.zhaunjia1[scope.$index]}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </template> -->
        <!--多头表格-->

        </div>
    </div>
</template>

<script>
    
    // import NavCommon from '../../components/publicVue/NavCommon.vue';
    import MessageCommon from '../../components/publicVue/MessageCommon.vue'
    export default {
        name: 'index',
        props: {},
        components: {
            // NavCommon
            MessageCommon
        },
        data(){
            return {
                pageLoading:false,  //loading
                tBrMsgLoading:false,  //投标人信息列表loading效果
                chakancenterDialogVisible: false, //文件查看弹框默认隐藏
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
               
               
                tableData3:[  //投标人信息
                    
                ],
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        { type:'string',required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                },

                BtnLoading:false,  //参加评标loading

                name:'',  //标名称
                biaoNum:'', //标号
                baohao:'', //包号
                projectWenjian:'',  //项目资料
                TheCurrentStatus:'', //当前状态

                val:'',  //四种方式传值

                //测试表格
                // tableData: [
                //     {
                //         date: '2016-05-03',
                //         name: '王小虎',
                //     }, 
                //     {
                //         date: '2016-05-02',
                //         name: '王小虎',
                //     }, 
                //     {
                //         date: '2016-05-02',
                //         name: '王小虎',
                //     }, 
                //     {
                //         date: '2016-05-02',
                //         name: '王小虎',
                //     }, 
                //     {
                //         date: '2016-05-02',
                //         name: '王小虎',
                //     }
                // ],
                // tableWrap:[{
                //     aaa:"地址一",
                //     tablesNeiContent:[{
                //         province:'公司一',
                //         'zhaunjiadata_gs':[
                //             {
                //                 'zhaunjia1':["√(5√0×)",  "√(6√0×)","√(5√0×)",'合格']
                //             } ,
                //         ]
                //     },{
                //         province:'公司二',
                //         'zhaunjiadata_gs':[
                //             {
                //                 'zhaunjia1':["√(6√0×)",  "√(5√0×)","√(6√0×)",'不合格']
                //             } ,
                //         ]
                //     }]
                // },{
                //     aaa:"地址二",
                //     tablesNeiContent:[{
                //         province:'公司三',
                //         'zhaunjiadata_gs':[
                //             {
                //                 'zhaunjia1':["√(555√0×)",  "√(6555√0×)","√(5555√0×)",'合格']
                //             } ,
                //         ]
                //     },{
                //         province:'公司四',
                //         'zhaunjiadata_gs':[
                //             {
                //                 'zhaunjia1':["√(623√0×)",  "√(545√0×)","√(6454√0×)",'不合格']
                //             } ,
                //         ]
                //     }]
                // }]
                
                //测试表格
              
            }
        },
        created() {
            // console.log(this.$route.query.types,999)
            //this.number=this.$route.query.types
            this.$store.state.navCommon.types=this.$route.query.types;
             console.log(this.$route.query.methodType,5)
            this.val=this.$route.query.methodType;
        },
        mounted(){
            
            this.AllInformation(); //专家个人信息,投标人信息接口
            //this.navcommonsListFun(); //导航接口
            $(".NavCommon").show();

            this.baoInformations(); //头部包信息
        },
        methods:{
            goto(url){//开始评标
               this.$router.push({
                    path: url
                 });
            },

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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.tBrMsgLoading=true;
                this.AllInformation();
            },
            //专家个人信息,投标人信息接口
            AllInformation(){
                this.tBrMsgLoading=true;
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
                            path: '/index/ElectedLeader?types=3&methodType='+this.val,
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
        }
    }
}
</style>
