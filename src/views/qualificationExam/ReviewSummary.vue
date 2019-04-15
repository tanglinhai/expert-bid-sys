<template>
    <div class="pingshenhuizong_warp">
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
                            <div class="unlock_table-warp fs14">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-dark  pro_msg_div textAlignL mb20">
                                            <h5 class="commonTitle col348fe2" style="margin-top: 7px">评审汇总</h5>
                                        </div>
                                    </el-col>
                                    <el-col :span="12" class="textAlignR btns"
                                            v-if="!this.$store.state.failureEnery.is_pingshen_show">
                                        <el-button type="primary" size="small" @click="bidEvaluation_btn"> 报价评审
                                        </el-button>
                                        <el-button type="primary" size="small" @click="submit_btn('ruleForm')"> 提交
                                        </el-button>
                                        <el-button type="primary" size="small" class="sort_btn" @click="sort_btn">排序
                                        </el-button>
                                    </el-col>
                                    <el-col :span="12" class="textAlignR mian_btns" v-else>
                                        <el-button @click="submited_goback" type="primary" size="small">返回</el-button>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width:100%">
                                        <el-table-column
                                                width="120px"
                                                prop="num"
                                                label="投标序号">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="投标人">
                                        </el-table-column>
                                        <el-table-column
                                                prop="tender_offer"
                                                label="投标报价(人民币)">
                                        </el-table-column>
                                        <el-table-column
                                                prop="total"
                                                label="评标价(人名币)">
                                        </el-table-column>
                                        <el-table-column
                                                prop="ranking"
                                                label="排名">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                                <el-row class="mt15">
                                    <el-col :span="18">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px"
                                                 class="demo-ruleForm">
                                            <el-form-item label="评标意见 (2000字之内)：" prop="desc">
                                                <el-input type="textarea" v-model="ruleForm.desc" ref="textarea_input"
                                                          :disabled="is_disabled"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                            </div>
                        </template>
                    </el-col>
                </el-row>
            </div>
            <!----------------------投标人排序调整--------------------->
            <el-dialog
                    title="投标人排序调整"
                    :visible.sync="$store.state.failureEnery.sort"
                    width="700px"
                    class="sortDialog"
            >
                <div class="sort">
                    <div class="warp cf">
                        <div class="sortDiv fl">
                            <ul v-for="(item,index) in msg_box" class="sort_ul">
                                <li @click="getData(item,index,msg_box)" :key="item.key"
                                    :class="{'bc_66b': index === i}">
                                    {{item.company_name}}
                                </li>
                            </ul>
                        </div>
                        <ul class="right_icon fl">
                            <li><i class="el-icon-arrow-up" @click="sort_up"></i></li>
                            <li><i class="el-icon-arrow-down" @click="sort_down"></i></li>
                        </ul>
                    </div>
                    <div class="textAlignC pt20">
                        <el-button size="small" @click="save" type="primary"><i
                                class="icon iconfont icon-baocun1 mr5"></i>保存
                        </el-button>
                        <el-button size="small" @click="reback" type="primary"><i
                                class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!----------------------报价计算--------------------->
            <el-dialog
                    title="报价计算"
                    :visible.sync="$store.state.failureEnery.bidEvaluation"
                    width="1000px"
            >
                <div class="BidEvaluation">
                    <div class="warp cf">
                        <template>
                            <el-table
                                    :data="msg_data"
                                    style="width: 100%"
                                    border
                            >
                                <el-table-column
                                        prop="bid_name"
                                        label="投标人名称"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="tender_offer"
                                        label="投标报价（元）"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="bid_price"
                                        label="评标价（元）">
                                </el-table-column>
                                <el-table-column
                                        prop="base_rice"
                                        label="基准价（元）">
                                </el-table-column>
                                <el-table-column
                                        prop="bias_ratio"
                                        label="偏离率β（%）"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="radio"
                                        label="报价是否有效" width="200">
                                    <template slot-scope="scope">
                                        <el-radio-group
                                                @change="radio_is_valid(scope.row.radio,scope.row.id,scope.row,scope.$index,msg_data)"
                                                ref="shet" v-model="scope.row.radio">
                                            <el-radio :label="1">有效</el-radio>
                                            <el-radio :label="2">无效</el-radio>
                                        </el-radio-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="textAlignC pt20">
                        <el-button size="small" @click="bidEvaluation_submit" type="primary"><i
                                class="icon iconfont icon-baocun1 mr5"></i>提交
                        </el-button>
                        <el-button size="small" @click="bidEvaluation_reback" type="primary"><i
                                class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!----------------------报价计算end--------------------->
            <el-dialog title="成功提示"
                       :visible.sync="$store.state.failureEnery.success_warning"
                       width="700px">
                <div class="textAlignC">
                    <p>请先点击页面【报价审核页面】按钮，设置投标人是否有效!</p>
                </div>
                <div class="textAlignC pt20">
                    <el-button size="small" @click="confirm_btn" type="primary"><i
                            class="icon iconfont icon-fanhuishouye1 mr5"></i>确定
                    </el-button>
                </div>
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
                    title="审查提示"
                    :visible.sync="$store.state.failureEnery.submitPrompt"
                    width="700px"
            >
                <SubmitPrompt></SubmitPrompt>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    // import Sort from '../../components/publicVue/Sort';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询

    export default {
        name: "unFinishQualificationsResult",
        props: {},
        components: {
            // Sort,
            // BidEvaluation,
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
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        {required: true, message: '评标意见不能为空!', trigger: 'blur'},
                        {min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur'}
                    ]
                },
                msg_data: [],//评审报价(子组件)
                /*-----------------排序----------*/
                msg_box: [],//排序数据(子组件)
                i: '',//排序记录下标
                obj: {},//排序当前的对象
                sort_msg: [],//排序的数据
                /*---------------排序end---------*/
                /*--------------报价计算-----------------*/
                table_data: [],//报价计算table数据
                /*--------------报价计算end-----------------*/
                a: [],//radio存在有效(1)的数组
                dialogAbandonedTender: false, //废标
                dialogStandardChallengeInformation: false,//标中质询信息表
                cities: [],
                tableDataTwo: [],
                bzzxLoading: true, //标中质询loading
                is_disabled: false
            }
        },
        created() {
            this.$route.query.type
        },
        mounted() {
            this.init();
        },
        computed: {},
        methods: {
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/pingshen_huizong', {type: this.$route.query.type})
                    .then(res => {
                        if (res.status === 200) {
                            console.log(res.data);
                            this.name = res.data.bidMsg.name;
                            this.baohao = res.data.bidMsg.baohao;
                            this.biaoNum = res.data.bidMsg.biaoNum;
                            this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                            this.msg_data = res.data.bidMsg.eviewrItemsMsg.bidEvaluation;//报价计算
                            this.msg_box = res.data.bidMsg.eviewrItemsMsg.sort_data;//排序
                            this.tableData = res.data.bidMsg.eviewrItemsMsg.review_summary;
                            this.$store.state.failureEnery.isshow = false;
                            if (res.data.bidMsg.eviewrItemsMsg.isShow === 0) {//0：提交前那个页面显示，1:提交前的页面
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
                }
            },
            /*------------------------评审汇总-----------------*/
            submit_btn(formName) {//提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/pshz_tijiao', {
                            type: this.$route.query.type,
                            data: this.ruleForm.desc
                        }).then(res => {
                            if (res.status == 200) {
                                this.options = res.data.vue_type;
                                this.msg_data.forEach((m, i) => {
                                    if (m.radio == 1) {
                                        this.a.push(m.radio)
                                    }
                                });
                                if (this.a.length != 0) {
                                    // alert('有效选中');
                                    this.$message({
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                    this.$store.state.failureEnery.is_pingshen_show = true;
                                    this.is_disabled = true;
                                } else {
                                    this.$store.state.failureEnery.success_warning = true;
                                }
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submited_goback() {//掉接口
                this.$axios.post('/api/pingshenhuizong_fanhui', {}).then(res => {
                    if (res.status == 200) {
                        this.$store.state.failureEnery.is_pingshen_show = false;
                        this.is_disabled = false;
                    }
                });
            },
            /*------------------------评审汇总end-----------------*/
            /*-----------排序弹框----------*/
            sort_btn() {//排序
                this.$store.state.failureEnery.sort = true;
            },
            bidEvaluation_btn() {//报价评审
                this.$store.state.failureEnery.bidEvaluation = true;
            },
            reback() {
                this.$store.state.failureEnery.sort = false;
            },
            getData(a, index, msg_box) {//每一个排序的li
                this.i = index;//点击上去的下标
                this.obj = a;
                this.sort_msg = msg_box;//当前的这个数据
            },
            sort_down() {//向下排序
                if (this.i !== this.msg_box.length - 1) {
                    let item = this.msg_box[this.i];
                    this.msg_box.splice(this.i, 1);//把当前点击的这条先删掉，然后把这条的数据插到它下一条数据的后面去
                    this.msg_box.splice(this.i + 1, 0, item);
                    this.i = this.i + 1;
                }
                else if (this.i = this.msg_box.length - 1) {//如果是向下排序，最后一个就不能向下了
                    this.i = this.msg_box.length - 1;
                }
            },
            sort_up() {//向上排序
                if (this.i > 0) {
                    let item = this.msg_box[this.i];
                    this.msg_box.splice(this.i - 1, 0, item);
                    this.msg_box.splice(this.i + 1, 1);
                    this.i = this.i - 1;
                }//如果是向上排序，最后一个就不能向上了
            },
            save() {//排序保存
                this.$axios.post('/api/sort_tijaio', 'post', {
                    data: this.msg_box
                    // id:id
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                })
            },
            /*------------------------------排序弹框end-----------------------------------------*/
            /*-------------------------------报价计算弹框---------------------------------------*/
            radio_is_valid(radio, id, tableKey, index, msg_box) {//报价审核是否有效
                // radio:radio选中的状态：1：有效、2：无效, id：当选选中id, tableKey当选选中行数据, index：下标, msg_box：当前的table表数据
                this.$axios.post('/api/radio_is_valid', {
                    id: id,
                    type: radio,
                }).then(res => {
                    if (res.status == 200) {
                        var store_radio = null;
                        for (var i = 0; i < this.msg_data.length; i++) {
                            if (this.msg_data[i].id == id) {
                                radio = this.msg_data[i].radio;
                                break;
                            }
                        }
                    }
                });
            },
            bidEvaluation_submit() {// 报价计算弹框提交
                this.$axios.post('/api/radio_is_valid_tijiao', {
                    data: this.msg_data
                }).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            message: '最新报价保存完成！',
                            type: 'success'
                        });
                        this.$store.state.failureEnery.bidEvaluation = false;
                    }
                })
            },
            bidEvaluation_reback() {
                this.$store.state.failureEnery.bidEvaluation = false;
            },
            /*-------------报价计算end----------------*/
            confirm_btn() {
                this.$store.state.failureEnery.success_warning = false;
            }
        }
    }
</script>

<style lang="scss">
    .pingshenhuizong_warp {
        overflow: hidden;
        padding-top: 15px;
        background: #ededed;
        .unFinishQualificationsResult {
            background-color: #ededed;
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
                .el-form-item {
                    margin-bottom: 0;
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
                    }
                }
            }
            .sort {
                .warp {
                    .sortDiv {
                        width: 600px;
                        height: 200px;
                        border: 1px solid #ccc;
                        padding-left: 3px;
                        li {
                            line-height: 20px;
                        }
                    }
                    .right_icon {
                        padding-top: 89px;
                        padding-left: 5px;
                        li {
                            i {
                                color: #409EFF;
                            }
                        }
                    }
                }
                .bc_66b {
                    background: #66b1ff;
                }
                .bc_none {
                    background: none;
                }
            }
        }
    }
</style>