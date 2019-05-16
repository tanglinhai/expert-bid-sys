<template>
    <div class="huizong_warp">
        <div class="unFinishQualificationsResult">
            <el-row class="fs14 bid_msg mb15">
                <el-col :span="12">
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
                                <el-dropdown-item command="g">调整评标基准价</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
            <div class="mainContentWarp lineAll" v-loading="page_loading">
                <NavBar :msg="options" :type="type" :methodType="methodType"></NavBar>
                <el-row class="center_part">
                    <el-col :span="24">
                        <template>
                            <el-table
                                    :data="msgBox"
                                    border
                                    style="width: 100%"
                                    class="pro_table" v-if="$store.state.failureEnery.isshow">
                                <el-table-column
                                        v-for='(col) in tableHead'
                                        :label="col.dataName"
                                        :key="col.dataItem"
                                     >
                                    <template slot-scope="scope">
                                        <span v-if="col.type === '1' ">{{
                                            scope.row[col.dataItem]
                                            }}</span>
                                        <el-progress v-else :percentage="scope.row[col.dataItem]"></el-progress>
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
                                    <el-col :span="12" class="mb10">
                                        <div class="grid-content bg-purple btnBox" style="text-align:right;">
                                        <span class="hide_div">
                                            <el-button size="small" type="primary"
                                                                          @click="submit" :loading="submit_huizong"><i class=" icon iconfont icon-tijiao2 mr3"></i>提交</el-button>
                                            <el-button size="small" type="primary" plain
                                                       @click="individualTrial"> <i class="icon iconfont icon-zigeshenchazhuti mr3"></i>查看个人资格审查项表</el-button>
                                        </span>
                                            <el-button size="small" type="primary" plain @click="checkUnlockRecord" class="ml10">
                                                <i class=" icon iconfont icon-chakanjilu mr3"></i>
                                                查看资格审查项解锁记录
                                            </el-button>
                                            <el-button size="small" type="primary" plain  @click="quaUnlockApplication">
                                                <i class=" icon iconfont icon-jiesuo1 mr3"></i>资格审查项解锁
                                            </el-button>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-table
                                        :data="unlock_table"
                                        size="small"
                                        tooltip-effect="dark"
                                        border
                                        class="changePriceTable"
                                        el-table__header-wrapper
                                >
                                    <el-table-column prop="number" label="序号" header-align="left"
                                                     align="left" fixed width="50"></el-table-column>
                                    <el-table-column prop="evaluationFactors" header-align="left" label="评审因素" fixed
                                                     width="165"></el-table-column>
                                    <el-table-column header-align="left" label="投标人">
                                        <el-table-column :label="item.companyName"
                                                         v-for="(item,index ) in unlock_table_company_name">
                                            <tempalte slot-scope="scope">
                                                        <span v-for="(amt,idx ) in  item.zhaunjiadata_gs">
                                                            <span>{{amt.zhaunjia1[scope.$index]}}</span>
                                                        </span>
                                            </tempalte>
                                        </el-table-column>
                                    </el-table-column>
                                </el-table>
                                <el-row class="unlock_table_msginfo">
                                    <el-col :span="24">
                                        <div class="grid-content bg-purple">
                                            <div class="letter">注：1、对于实质性响应项，凡资格审查项中有任何一条未通过评审要求，即界定为无效投标人。</div>
                                            <div class="letter pad">2、对于非实质响应项，当启用废标设置并且未通过评审要求的项数大于最大偏离项，即界定为无效投标人。
                                            </div>
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
                                    <el-col :span="16" class="mt15">
                                        <div class="grid-content bg-purple">
                                            <el-input type="textarea" v-model="form.desc"
                                                      class="qita_expalin_input"></el-input>
                                            <div class="qita_expalin"></div>
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
                    width="80%"
            >
                <IndividualTrial :msgBoxData="individualTrialData" :msg="companyName"
                                 :title_data="grcs_titile_data"></IndividualTrial>
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
                <StandardChallengeInformation :cities="cities" :tableData="tableDataTwo"
                                              :bzzxLoading="bzzxLoading"></StandardChallengeInformation>

            </el-dialog>
            <!--标中质询弹框-->
            <el-dialog
                    title="汇总提交提示"
                    :visible.sync="$store.state.failureEnery.huizongSubmit"
                    width="30%"
            >
                <el-row class="textAlignC fs14" style="line-height: 30px">
                    您确定进行{{huizongSubmitTips }}操作吗？
                </el-row>
                <el-row class="textAlignC pt20">
                    <el-button size="small" type="primary" @click="comfrimAllChecked">确认</el-button>
                    <el-button size="small" type="primary" @click="rebackAllChecked">取消</el-button>
                </el-row>
                <el-dialog
                        width="30%"
                        title="消息提示"
                        :visible.sync="$store.state.failureEnery.tijiaoHuizong"
                        append-to-body>
                    <el-row style="margin:10px auto;">
                        <el-row style="  border:1px solid #ccc;">
                            <el-row class="textAlignC fs14" style="line-height: 30px">
                                <div class="xiaolian" style="width:100%; background:#ebeff3; height:76px;">
                                    <img src="../../assets/img/xiaolian.png" alt=""
                                         style="display: block;  height:80px;  margin:0px auto; vertical-align: middle;">
                                </div>
                            </el-row>
                            <el-row>
                                <p class="tishi_wenzi" style="text-align: center;color:#000000;line-height:40px;">  {{huizongSubmitTips }}提交成功！</p>
                            </el-row>
                        </el-row>
                        <el-row>
                            <div class="djsTime" style="text-align: center; color:#000000; line-height:40px;">[<span id="sec">{{count}}</span>]秒后自动关闭</div>
                        </el-row>
                        <el-row class="textAlignC pt20">
                            <el-button size="small" type="primary" @click="huizongSubmitSucceed">确认</el-button>
                        </el-row>
                    </el-row>
                </el-dialog>
            </el-dialog>
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
    import ViewUnlockRecord from '../../components/publicVue/ViewUnlockRecord';
    // import DetermineOperating from '../../components/publicVue/DetermineOperating';
    import QualificationUnlock from '../../components/publicVue/QuaUnlockApplication';//资格审查项汇总解锁申请
    import IndividualTrial from '../../components/publicVue/IndividualTrial';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    import ChangePrice from '../../components/publicVue/ChangePrice.vue';  //调整评标基准价

    export default {
        name: "unFinishQualificationsResult",
        components: {
            ViewUnlockRecord,
            QualificationUnlock,
            IndividualTrial,
            NavBar,
            AbandonedTender,   //废标  
            ChangePrice,//调整评标基准价
            StandardChallengeInformation,
            // DetermineOperating
        },
        data() {
            return {
                huizongSubmitTips:'',
                page_loading: false,
                tableData: [],//table1数据
                /* -------头部包信息-----*/
                name: "",//标包名称
                biaoNum: '',
                baohao: '',
                options: [],//头部按钮
                /* -------头部包信息end-----*/
                msgBox: [],//专家进度页面数据
                completePercent: 0,
                evaluationLeader: "",//评标委员会组长
                unlock_table: [],//所有专家都是100%的时候显示的table
                look_unlock_dialog: [],//解锁申请记录
                other_explain: "",//其他说明
                individualTrialData: [],//查看个人资格审查项表弹框数据
                companyName: [],//查看个人资格审查项表弹框投标人
                form: {//其他说明
                    desc: ''
                },
                type: '',//导航传值类型
                dialogAbandonedTender: false, //废标
                dialogStandardChallengeInformation: false,//标中质询信息表
                cities: [],
                tableDataTwo: [],
                bzzxLoading: true, //标中质询loading
                grcs_titile_data: {},//个人初审弹框的头部数据
                unlock_table_company_name: [],//汇总页面table（评审因素汇总）
                submit_huizong:false,//汇总页面提交
                count: '5',   //汇总页面提交成功弹框倒计时5秒
                methodType:'',

                ChangedialogVisible:false,  //调整评标价弹框
                TkOneloading:true,
                ChangePriceTk:[],  //投标人最新报价列表弹框里面表格得数据
            }
        },
        created() {
            // console.log(this.$route.query.methodType);
            this.methodType=this.$route.query.methodType;
            this.type = this.$route.query.type;
        },
        mounted() {
            if(this.type==2){
                this.huizongSubmitTips='资格审查汇总';
            }else if(this.type==4){
                this.huizongSubmitTips='符合项审查汇总';
            }else if(this.type==6){
                this.huizongSubmitTips='详细评审（技术）汇总';
            }
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
                        this.msgBox = res.data.bidMsg.eviewrItemsMsg.tables;//进度条表格数据
                        this.tableHead=res.data.bidMsg.eviewrItemsMsg.tableData;//进度条表格表头数据
                        this.unlock_table = res.data.bidMsg.eviewrItemsMsg.unlock_table_data;
                        this.unlock_table_company_name = res.data.bidMsg.eviewrItemsMsg.unlock_table_company_name;
                        this.evaluationLeader = res.data.bidMsg.eviewrItemsMsg.evaluationLeader;
                        this.other_explain = res.data.bidMsg.eviewrItemsMsg.other_explain;
                        this.look_unlock_dialog = res.data.bidMsg.eviewrItemsMsg.unlock_dialog_check;
                        this.individualTrialData = res.data.bidMsg.eviewrItemsMsg.msgBox;//个人初审活动表
                        this.grcs_titile_data = res.data.bidMsg.eviewrItemsMsg.grcs_titile_data;
                        this.companyName = res.data.bidMsg.eviewrItemsMsg.companyNameData;
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
            sonToFather(val){  //调整评标基准价子集得返回点击关闭事件传值
                this.ChangedialogVisible = val;
            },
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    this.dialogAbandonedTender = true;
                } else if (val === 'b') {//交通费标准
                    this.dialogStandardChallengeInformation = true;
                    this.bzzxLoading = true;
                    this.$axios.post('/api/StandardChallengeList', {}).then(res => {
                        if (res.status == 200) {
                            this.cities = res.data.cityOptions;
                            this.tableDataTwo = res.data.standList;
                            this.bzzxLoading = false;
                        }
                    })
                } else if (val === 'c') {//报销汇总表
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'd') {//报销汇总表-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                }else if (val === 'g') {//调整评标基准价
                    //调整评标价点击事件
                    this.ChangedialogVisible = true;
                    this.TkOneloading=true;
                    //console.log(row.id)
                    //调整评标价点击弹框传值到子页面
                    this.$axios.post('/api/NewChangePrice',{
                        //id:row.id,   //点击得id
                    }).then(res=>{
                        if(res.status == 200){
                            //console.log(res.data,99999)
                        this.ChangePriceTk=res.data.msgBox;
                        this.TkOneloading=false;
                        }
                    })
                }
            },
            checkUnlockRecord() {
                this.$store.state.failureEnery.unlock_record = true;
            },
            quaUnlockApplication() {
                this.$store.state.failureEnery.qualificationUnlock = true;
            },
            submit() {//审查汇总
                this.$store.state.failureEnery.huizongSubmit = true;
                // this.submit_huizong=true;
                // let url;
                // if (this.type == 4) {
                //     url = '/api/tijiao_fhx';
                // } else if (this.type == 2) {
                //     url = '/api/tijiao';
                // }
                // else if (this.type == 6) {
                //     url = '/api/tijiao_xxjs';
                // }
                // this.$axios.post(url, {
                //     data: this.form.desc,
                //     type: parseInt(this.type) + 1
                // }).then(res => {
                //     if (res.status == 200) {
                //         this.submit_huizong=false;
                //         this.options = res.data.vue_type;
                //         this.$message({
                //             message: '提交成功',
                //             type: 'success'
                //         });
                //         $(".hide_div").hide();
                //         $('.qita_expalin').show();
                //         $(".qita_expalin").text(this.form.desc);
                //         $('.qita_expalin_input').hide()
                //     }
                // })
            },
            individualTrial() {//查看个人资格审查项表
                this.$store.state.failureEnery.individualTrial = true;
            },
            comfrimAllChecked(){
                this.submit_huizong=true;
                this.$store.state.failureEnery.huizongSubmit = false;
                let url;
                if (this.type == 4) {
                    url = '/api/tijiao_fhx';
                } else if (this.type == 2) {
                    url = '/api/tijiao';
                }
                else if (this.type == 6) {
                    url = '/api/tijiao_xxjs';
                }
                this.$axios.post(url, {
                    data: this.form.desc,
                    type: parseInt(this.type) + 1
                }).then(res => {
                    if (res.status == 200) {
                        this.submit_huizong=false;
                        this.options = res.data.vue_type;
                        this.$store.state.failureEnery.tijiaoHuizong=true;
                    }
                })
            },
            huizongSubmitSucceed(){
                this.$store.state.failureEnery.tijiaoHuizong=false;
                $(".hide_div").hide();
                $('.qita_expalin').show();
                $(".qita_expalin").text(this.form.desc);
                $('.qita_expalin_input').hide()
            },
            rebackAllChecked(){
                this.$store.state.failureEnery.huizongSubmit = false;
            },
        },
    }
</script>

<style lang="scss">
    .huizong_warp {
        padding-top: 15px;
        background-color: #ededed;
        overflow: hidden;
        min-height: 800px;
        .unFinishQualificationsResult {
            padding: 0px 0% 15px 0%;
            width: 98%;
            float: left;
            margin-left: 1%;
            margin-right: 1%;
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
    }
</style>