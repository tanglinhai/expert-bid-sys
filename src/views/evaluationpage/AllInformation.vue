<template>
    <div class="Allinforation_wrap">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation cf" v-loading="pageLoading">
            <!--开始评标页面-->
            <div class="evaluationcommon cf">
               <MessageCommon :tableData3="tableData3" :dianji="0"></MessageCommon>
                <el-row class="LayoutRightSide">
                    <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                        <h5 class="commonTitle col348fe2 oneanonter">操作信息</h5>
                    </div>
                    <div class="fr mr20">
                        当前状态
                        <el-tag>已完成</el-tag>
                    </div>
                    <div class="grid-content bg-purple fl" style="margin-left:30px;">
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
              
            }
        },
        created() {
            // console.log(this.$route.query.types,999)
            //this.number=this.$route.query.types
            this.$store.state.navCommon.types=this.$route.query.types;
            // console.log(this.$store.state.navCommon.types,5)
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
                            path: '/index/ElectedLeader?types=3',
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
                width: 266px;
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
                    width:80%;
                    .commonTitle:before{
                        margin-left:15px;
                    }
                    .el-button{
                        width:100px;
                        height:74px;
                    }
                }
            }
        }
    }
}
</style>
