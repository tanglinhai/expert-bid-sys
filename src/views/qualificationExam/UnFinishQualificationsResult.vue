<template>
    <div class="unFinishQualificationsResult">
        <el-row class="fs14 bid_msg mb15">
            <el-col :span="4">
                <div class="grid-content bg-purple"><span>标名称：</span><span>{{name}}</span></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light"><span>标号：</span><span>{{biaoNum}}</span></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"><span>包号：</span><span>{{baohao}}</span></div>
            </el-col>
            <el-col :span="12" class="fs14 textAlignR select">
                <div class="grid-content bg-purple">
                    <el-dropdown @command="handleCommand">
                        <el-button type="primary" size="small">
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">废标</el-dropdown-item>
                            <el-dropdown-item command="b">标中质询</el-dropdown-item>
                            <el-dropdown-item command="c">查看投标文件</el-dropdown-item>
                            <el-dropdown-item command="d">查看开标一览表</el-dropdown-item>
                            <el-dropdown-item command="e">评审结果签字</el-dropdown-item>
                            <el-dropdown-item command="f">资质审查签字</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <div class="mainContentWarp" v-loading="page_loading">
            <NavBar :msg="options"></NavBar>
            <el-row class="center_part">
                <el-col :span="24">
                    <template>
                        <el-table
                                :data="msgBox"
                                border
                                style="width: 100%"
                                class="pro_table" v-if="$store.state.failureEnery.isshow">
                            <el-table-column
                                    prop="name"
                                    label="评审专家"
                                    width="120px"
                                    align="center">
                            </el-table-column>
                            <el-table-column
                                    label="资格审查项进度"
                                    align="center">
                                <template slot-scope="scope">
                                    <el-progress :percentage="scope.row.dates"></el-progress>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="是否提交资格审查结果"
                                    align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.row.isFinish}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="unlock_table-warp fs14" v-else>
                            <el-row style="line-height:40px;">
                                <el-col :span="12">
                                    <div class="grid-content bg-purple">
                                        <span>评标委员会组长：{{evaluationLeader}}</span>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content bg-purple btnBox" style="text-align:right;">
                                        <span class="hide_div"><el-button size="small" plain
                                                                          @click="submit">提交</el-button>
                                            <el-button size="small" plain
                                                       @click="individualTrial">查看个人资格审查项表</el-button></span>

                                        <el-button size="small" plain @click="checkUnlockRecord">查看资格审查项解锁记录</el-button>
                                        <el-button size="small" plain @click="quaUnlockApplication">资格审查项解锁</el-button>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-table
                                    :data="unlock_table"
                                    border
                                    style="width:100%"
                            >
                                <el-table-column
                                        prop="num"
                                        label="序号"
                                        width="120px">
                                </el-table-column>
                                <el-table-column
                                        prop="factor"
                                        label="评审因素">
                                </el-table-column>
                                <el-table-column
                                        label="投标人">
                                    <el-table-column
                                            prop="name"
                                            label="重庆网控科技发展有限公司">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name1"
                                            label="普瑞太阳能有限公司">
                                    </el-table-column>
                                    <el-table-column
                                            prop="name2"
                                            label="夏丰热工研究院有限公司">
                                    </el-table-column>
                                </el-table-column>
                            </el-table>
                            <el-row class="unlock_table_msginfo">
                                <el-col :span="24">
                                    <div class="grid-content bg-purple">
                                        <div class="letter">注：1、对于实质性响应项，凡资格审查项中有任何一条未通过评审要求，即界定为无效投标人。</div>
                                        <div class="letter pad">2、对于非实质响应项，当启用废标设置并且未通过评审要求的项数大于最大偏离项，即界定为无效投标人。</div>
                                        <div class="pad">
                                            3、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打“√”，不符合要求打“×”。结论为“合格”或“不合格”。
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="2">
                                    <div class="grid-content bg-purple textSty mt10">
                                        <p>其他说明：<br>
                                            (1000字以内)
                                        </p>
                                    </div>
                                </el-col>
                                <el-col :span="16">
                                    <div class="grid-content bg-purple">
                                        <el-input type="textarea" v-model="form.desc"></el-input>
                                        <!--{{other_explain}}-->
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </template>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="解锁申请记录"
                :visible.sync="$store.state.failureEnery.unlock_record"
                width="700px"
        >
            <ViewUnlockRecord :msg="look_unlock_dialog"></ViewUnlockRecord>
        </el-dialog>
        <el-dialog
                title="资格审查项汇总解锁申请"
                :visible.sync="$store.state.failureEnery.qualificationUnlock"
                width="700px"
        >
            <QualificationUnlock></QualificationUnlock>
        </el-dialog>
        <el-dialog
                title="个人初审类活动表"
                :visible.sync="$store.state.failureEnery.individualTrial"
                width="952px"
        >
            <IndividualTrial :msgBox="individualTrialData" :msg="companyName"></IndividualTrial>
        </el-dialog>
        <!--废标弹框-->
        <el-dialog
            title="废标"
            :visible.sync="dialogAbandonedTender"
            width="700px"
            >
            <AbandonedTender @sonToFather="dialogAbandonedTender=false"></AbandonedTender>
        </el-dialog>
        <!--废标弹框-->

        <!--标中质询弹框-->
        <el-dialog
            title="标中质询信息列表"
            :visible.sync="dialogStandardChallengeInformation"
            width="900px"
            >
            <StandardChallengeInformation :cities="cities" :tableData="tableData" :bzzxLoading="bzzxLoading"></StandardChallengeInformation>
        </el-dialog>
        <!--标中质询弹框-->
        <el-dialog
                title="审查提示"
                :visible.sync="$store.state.failureEnery.submitPrompt"
                width="700px"
        >
            <SubmitPrompt></SubmitPrompt>
        </el-dialog>
    </div>
</template>

<script>
    import ViewUnlockRecord from '../../components/publicVue/ViewUnlockRecord';
    import QualificationUnlock from '../../components/publicVue/QuaUnlockApplication';
    import IndividualTrial from '../../components/publicVue/IndividualTrial';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询

    export default {
        name: "unFinishQualificationsResult",
        props: {
            type: Number,
            default: 2
        },
        components: {
            ViewUnlockRecord,
            QualificationUnlock,
            IndividualTrial,
            NavBar,
            AbandonedTender,   //废标  
            StandardChallengeInformation,
        },
        data() {
            return {
                page_loading: false,
                tableData: [],//table1数据
                /* -------头部包信息-----*/
                name: "",//标包名称
                biaoNum: '',
                baohao: '',
                options: [],//头部按钮
                /* -------头部包信息end-----*/
                msgBox: [],
                completePercent: 0,
                evaluationLeader: "",//评标委员会组长
                unlock_table: [],//所有专家都是100%的时候显示的table
                look_unlock_dialog: [],//解锁申请记录
                other_explain: "",//其他说明
                individualTrialData: [],//查看个人资格审查项表弹框数据
                companyName: '',
                form: {
                    desc: ''
                },
                type: '',//导航传值类型

                dialogAbandonedTender:false, //废标
                dialogStandardChallengeInformation:false,//标中质询信息表
                cities:[],
                tableData:[],
                bzzxLoading:true, //标中质询loading
            }
        },
        created() {
            this.type = this.$route.query.type;
        },
        mounted() {
            this.init();
        },
        computed: {},
        methods: {
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/table_data', {type: this.type}, {//通过包id
                    // id:id
                    // type:2
                }).then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.msgBox = res.data.bidMsg.eviewrItemsMsg.mylist;
                        this.unlock_table = res.data.bidMsg.eviewrItemsMsg.unlock_table;
                        this.evaluationLeader = res.data.bidMsg.eviewrItemsMsg.evaluationLeader;
                        this.other_explain = res.data.bidMsg.eviewrItemsMsg.other_explain;
                        this.look_unlock_dialog = res.data.bidMsg.eviewrItemsMsg.unlock_dialog_check;
                        this.individualTrialData = res.data.bidMsg.eviewrItemsMsg.msgBox;
                        this.companyName = res.data.bidMsg.eviewrItemsMsg.companyName;
                        this.$store.state.failureEnery.isshow = false;
                        if (res.data.bidMsg.eviewrItemsMsg.isShow === 0) {//1：解锁的那个页面显示，反之进度条的那个显示
                            this.$store.state.failureEnery.isshow = true;
                        } else {
                            this.$store.state.failureEnery.isshow = false;
                        }
                    }
                    this.page_loading = false;
                })
            },
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    //alert('1');
                    this.dialogAbandonedTender=true;
                } else if (val === 'b') {//交通费标准
                    //alert('0')
                    this.dialogStandardChallengeInformation=true;
                    this.bzzxLoading=true;
                     this.$axios.post('/api/StandardChallengeList',{
                        }).then(res=>{
                            if(res.status == 200){
                                //console.log(res.data)
                               this.cities=res.data.cityOptions;
                               this.tableData=res.data.standList;
                               this.bzzxLoading=false;
                            }
                    })
                } else if (val === 'c') {//报销汇总表
                    //alert('2')
                   window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf', '_blank',);
                } else if (val === 'd') {//报销汇总表-财政
                    //alert('3')
                    window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf', '_blank',);
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol+'//'+window.location.host+'/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    //alert('5')
                    window.open(window.location.protocol+'//'+window.location.host+'/SignaturePage', '_blank',);
                }
            },
            checkUnlockRecord() {
                this.$store.state.failureEnery.unlock_record = true;
            },
            quaUnlockApplication() {
                this.$store.state.failureEnery.qualificationUnlock = true;
            },
            submit() {
                console.log(parseInt(this.type) + 1);
                 let url;
                if(this.type==4){
                    url='/api/tijiao_fhx';
                }else if(this.type==2){
                    url='/api/tijiao';
                }
                else if(this.type==6){
                    url='/api/tijiao_xxjs';
                }
                this.$axios.post(url, {
                    data: this.form.desc,
                    type:parseInt(this.type)+ 1
                }).then(res => {
                    if (res.status == 200) {
                        this.options = res.data.vue_type;
                        console.log(this.options);
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        $(".hide_div").hide();
                        // this.$router.push("/elect/complianceReviewItem");
                    }
                })
            },
            individualTrial() {
                this.$store.state.failureEnery.individualTrial = true;
            },
        },
    }
</script>

<style lang="scss">
    .unFinishQualificationsResult {
        padding: 15px;
        background-color: #ededed;
        .bid_msg {
            line-height: 32px;
            .select {
                .el-dropdown {
                    vertical-align: top;
                }
                .el-dropdown + .el-dropdown {
                    margin-left: 15px;
                }
                .el-icon-arrow-down {
                    font-size: 12px;
                }
            }
        }
        .mainContentWarp {
            background: white;
            border-radius: 5px;
            .btns_grounp {
                .el-button + .el-button {
                    margin-left: 15px;
                }
                .el-button--warning {
                    background-color: #ff6600;
                    border-color: #ff6600;
                    border: 1px solid #ff6600;
                }
                .el-button--warning:hover {
                    background: #ff8600 !important;
                }
                .el-button--warning[data-v-4774750c]:hover {
                    background: #e47932 !important;
                    border-color: #e47932 !important;
                    color: #fff !important;
                }
            }
            .line {
                border: 1px solid #e5e9ec;
                position: relative;
                top: 50px;
            }
            .center_part {
                padding: 15px;
                .pro_table {
                    .icon-queren {
                        color: #35D437;
                    }
                    .el-progress-bar__inner {
                        background: #35D437;
                    }
                    .el-progress-bar {
                        width: 35%;
                    }
                }
                .unlock_table-warp {
                    color: #606266;
                    .unlock_table_msginfo {
                        border: 1px solid #ebeef5;
                        border-top: none;
                        padding: 15px;
                        .letter {
                            padding-bottom: 5px;
                        }
                        .pad {
                            padding-left: 28px;
                        }
                    }
                    .textSty {
                        line-height: 21px;
                        padding-left: 15px;
                    }
                }
            }
        }
    }
</style>