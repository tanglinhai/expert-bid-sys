<template>
    <div class="pingbiao_warp">
        <div class="complianceReviewItem">
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
                                <i class="icon iconfont icon-caozuo  mr3"></i>操作<i
                                    class="el-icon-arrow-down el-icon--right"></i>
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
            <div class="mainContentWarp lineAll " v-loading="page_loading">
                <!-- <el-button class="enterFullMode"
                        icon="iconfont icon-fullscreen"
                        size="mini"
                        @click="enterFullMode"
                    >进入全屏模式</el-button> -->
                <NavBar :msg="options" :type="type_btn" :methodType="methodType"></NavBar>
                <div class="content">
                    <div class="div_pdf">
                        <div class="div_pdf_wrap cf">
                            <div class="filters">
                                <div class="filters_wrap">
                                    <div class="filters_hd">
                                        <span class="tit">投标文件目录</span>
                                        <span class="icon iconfont icon-shouqi"
                                              @click="pdf_category_open_close($event)"></span>
                                    </div>
                                    <div class="filters_bd">
                                        <div class="filters_kvs">
                                            <div class="filters_kv cf">
                                                <div class="filters_k">审查类别：</div>
                                                <div class="filters_v">{{to_submit_prompt_name}}</div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">投标人：</div>
                                                <div class="filters_v">
                                                    <el-select v-model="filter_bidder" placeholder="请选择" size="mini" @change="filter_func_bidder">
                                                        <el-option
                                                            v-for="item in companyname_toubiao"
                                                            :key="item"
                                                            :label="item.title"
                                                            :value="item.title">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">评审因素：</div>
                                                <div class="filters_v">
                                                    <el-select v-model="filter_factor" placeholder="请选择" size="mini" @change="filter_func_factor">
                                                        <el-option
                                                            v-for="item in dingdang_tableData"
                                                            :key="item.evaluationFactors"
                                                            :label="item.evaluationFactors"
                                                            :value="item.evaluationFactors">
                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">审查标准：</div>
                                                <div class="filters_v">{{filter_standard}}</div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">评审关联点：</div>
                                                <div class="filters_v">
                                                    <div class="point"
                                                            v-for="item in filter_points"
                                                            @click="locate_pdf(item, companyname_toubiao.filter(item => item.title == filter_bidder)[0].pdf)"
                                                            :key="item">
                                                        <span class="txt">
                                                            <span class="icon iconfont icon-dingwei"></span>
                                                            {{item.name+'--P'+item.page+'--'+item.txt}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filters_tip">投标文件目录</div>
                                </div>
                            </div>
                            <pdf :pdfUrl="item.currPdfUrl" :ref="item.ref" :onload="item.onload"
                                 :queryStr="item.queryStr"
                                 :page="item.page"
                                 v-for="item in pdfItems"
                                 v-show="item.show"></pdf>
                            <!-- <div class="closePDF iconfont icon-guanbi1" @click="closePDF"></div> -->
                        </div>
                    </div>
                    <!-- <el-button class="exitFullMode"
                        icon="iconfont icon-fullscreen-exit"
                        size="mini"
                        @click="exitFullMode"
                    >退出全屏模式</el-button> -->

                    <el-row class="center_part_wrap">
                        <div class="slideBar" id="slideBar"
                             @mousedown="slideBarMousedown($event)"
                        ><span class="iconfont icon-vertical-align-middl"></span></div>
                        <div class="center_part">
                            <div class="center_con_wrap">
                                <div class="center_con cf">
                                    <div class="right_warp">
                                        <el-row class="progress_div"
                                                v-if="$store.state.failureEnery.parent_progress_show">
                                            <el-col :span="12">
                                                <el-row class="red">
                                                    <el-col style="width: 70px;font-size: 14px;">
                                                        <div>我的进度：</div>
                                                    </el-col>
                                                    <el-col style="width: 278px">
                                                        <el-progress :percentage="completePercent"></el-progress>
                                                    </el-col>
                                                </el-row>
                                            </el-col>
                                            <el-col :span="12" class="textAlignR cf">
                                                <span id="hide_btn"
                                                      :class="$store.state.failureEnery.flag==false ?'hide_div':'nohide_div'">
                                                    <el-button @click="allChecked" plain size="mini"
                                                               type="primary"
                                                               :loading="allCheckedBtnLoading"><i
                                                            class="icon iconfont icon-ic_qualified  mr3"></i>全部合格
                                                    </el-button>
                                                    <el-button size="mini" type="primary" @click="allSubmit"
                                                               :loading="allSubmitBtnLoading"><i
                                                            class="icon iconfont icon-tijiao  mr3"></i>全部提交
                                                    </el-button>
                                                        </span>
                                                <el-button type="primary" size="mini" @click="personalAuditForm"
                                                           class="ml10">
                                                    <i class="icon iconfont icon-zigeshenchazhuti"></i>
                                                    {{personalAuditFormBtn}}
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                        <div class="weitijiao">
                                            <el-table
                                                    :data="dingdang_tableData"
                                                    style="width: 100% " class="dingdang_table mt15"
                                                    @row-click="handleRowClick"
                                                    highlight-current-row>
                                                <el-table-column
                                                        type="index"
                                                        width="50" fixed>
                                                </el-table-column>
                                                <el-table-column
                                                        label="评审因素"
                                                        width="250" fixed prop="evaluationFactors">
                                                </el-table-column>

                                                <el-table-column label="投标人">
                                                    <el-table-column :label="item.title"
                                                                     v-for="(item,index ) in companyname_toubiao"
                                                                     min-width="250" :key="index">
                                                        <template slot="header" slot-scope="scope">
                                                            <a v-if="companyname_toubiao[scope.$index].pdf.length<2"
                                                               @click="show_pdf(companyname_toubiao[scope.$index].pdf[0])"
                                                               class="common_a_style" title="投标文件">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                            </a>
                                                            <el-dropdown v-else trigger="click">
                                                              <span class="el-dropdown-link" title="投标文件列表">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                                {{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="show_pdf(pdfItem)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao[scope.$index].pdf"
                                                                    >{{pdfItem.pdf_name}}<i
                                                                            class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <el-radio-group
                                                                    v-model="scope.row['value' + (index + 1)]"
                                                                    v-if="$store.state.failureEnery.flag"
                                                                    @change="changeRadios(scope.$index,index + 1,scope.row['value'+(index+1)],scope.row,item.title)">
                                                                <el-radio :label="val.num"
                                                                          v-for="val in scope.row.radioList">
                                                                    {{val.typeTitle}}
                                                                </el-radio>
                                                            </el-radio-group>
                                                            <span class="red" v-else> {{scope.row['value' + (index + 1)]=="合格"?"合格":"不合格"}}</span>
                                                            <span> {{scope.row['gradeExplain' + (index + 1)]}}</span>
                                                            <!-- pdf operation start -->
                                                            <a class="btn_locate common_a_style" v-if="companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.evaluationFactors)[0]
                                                                        .relativePoints.length==1"
                                                               @click="locate_pdf(companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.evaluationFactors)[0]
                                                                        .relativePoints[0],
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf
                                                                        )" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                            </a>
                                                            <el-dropdown class="btn_locate" v-else-if="companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.evaluationFactors)[0]
                                                                        .relativePoints.length>1" trigger="click">
                                                              <span class="el-dropdown-link" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                              <el-dropdown-menu slot="dropdown" class="table_pdf_drop_menu">
                                                                <el-dropdown-item
                                                                        @click.native="locate_pdf(pdfItem,
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf)"
                                                                        v-for="(pdfItem ,index) in companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.evaluationFactors)[0]
                                                                        .relativePoints"
                                                                >
                                                                    <i class="icon iconfont icon-dingwei"></i>
                                                                    {{pdfItem.name+'--P'+pdfItem.page+'--'+pdfItem.txt}}
                                                                    <i class="icon iconfont icon-pdf"></i>
                                                                </el-dropdown-item>
                                                              </el-dropdown-menu>
                                                            </el-dropdown>
                                                            <!-- pdf operation end -->
                                                        </template>
                                                    </el-table-column>
                                                </el-table-column>
                                            </el-table>
                                            <div class="dingWeiDiv" style="text-align: center;line-height: 50px;"><span
                                                    class="biaozhunTitle"></span>审查标准：<span
                                                    class="biaozhunConent"></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="positionDiv"><span class="biaozhunTitle"></span>审查标准：<span
                                        class="biaozhunConent"></span></div>
                            </div>
                        </div>
                    </el-row>
                </div>
            </div>
            <el-dialog
                    title="不合格录入"
                    :visible.sync="failureEntryDialog"
                    width="700px"
                    class="failureEntryDialogWarp"
            >
                <div class="failureEntry">
                    <div class="failureoOject">
                        不合格对象： <span class="red">{{to_failure_entry_company_name}}</span>
                        <span>&nbsp;&nbsp;的&nbsp;</span> <span class=red>{{to_failure_entry_answer}}</span>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-form-item prop="desc">
                            <label><span class="red">*</span>不合格理由：（50汉字或者100汉字之内）：</label>
                            <el-input type="textarea" v-model="ruleForm.desc" class="textarea" autosize></el-input>
                        </el-form-item>
                        <el-form-item class="textAlignC">
                            <el-button type="primary" @click="failureEntryConfirmBtn('ruleForm')" size="small"><i
                                    class="icon iconfont icon-baocun1 mr5"></i> 确定
                            </el-button>
                            <el-button @click="$store.state.failureEnery.show=false" size="small" type="primary"><i
                                    class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <el-dialog
                    title="审查提示"
                    :visible.sync="$store.state.failureEnery.submitPrompt"
                    width="700px"
            >
                <SubmitPrompt :name="to_submit_prompt_name" :pro_num="completePercent"
                              :baohao="to_submit_prompt_baohao"></SubmitPrompt>
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
            <!--全部选中提示弹框-->
            <el-dialog
                    title="全部选中提示"
                    :visible.sync="determineOperatingDialog"
                    width="30%"
            >
                <el-row class="textAlignC fs14" style="line-height: 30px">
                    您确定要执行此操作！
                </el-row>
                <el-row class="textAlignC pt20">
                    <el-button size="small" type="primary" @click="comfrimAllChecked">确认</el-button>
                    <el-button size="small" type="primary" @click="rebackAllChecked">取消</el-button>
                </el-row>
            </el-dialog>
            <!--点击个人形式审计表按钮弹框-->
            <el-dialog
                    :title="personalAuditFormBtn"
                    :visible.sync="personalAuditFormDialog"
                    width="1300px"
            >
                <!--点击个人形式审计表按钮显示-->
                <el-row class="personalAuditFormTable">
                    <div class="FormTableTitle cf fs14 mb10">
                        <div class="fl">
                            <span>分包号：{{grzgTitleData.bagName}}</span>
                            <span>评标委员会：{{grzgTitleData.groupName}}</span>
                        </div>
                        <div class="fr">{{grzgTitleData.professorName}}</div>
                    </div>
                    <!--个人形式审计表表格-->
                    <template>
                        <el-table
                                :data="msgBox"
                                size="small"
                                tooltip-effect="dark"
                                border
                                class="changePriceTable"
                                el-table__header-wrapper
                        >
                            <el-table-column prop="number" label="序号" header-align="left"
                                             align="left" fixed width="50"></el-table-column>
                            <el-table-column prop="evaluationFactors" header-align="left"
                                             label="评审因素"
                                             fixed width="165"></el-table-column>
                            <el-table-column header-align="left" label="投标人">
                                <el-table-column :label="item.companyName"
                                                 v-for="(item,index ) in grcsMsgBoxTitle"
                                                 width="165">
                                    <tempalte slot-scope="scope">
                                        <span v-for="(amt,idx ) in  item.zhaunjiadata_gs">
                                            <span>{{amt.zhaunjia1[scope.$index]}}</span>
                                        </span>
                                    </tempalte>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                        <el-row class="fs14 table_tips mt5">
                            <el-col style="line-height: 24px">注：1、凡资格审查项中任何一条未通过评审要求的投标人，即界定为无效投标人。
                            </el-col>
                            <el-col style="line-height: 24px">
                                &nbsp;   &nbsp;  &nbsp;  &nbsp;2、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打"√",不符合要求打"×",结论为"合格",或"不合格"'。
                            </el-col>
                        </el-row>
                    </template>
                        <ul v-for="(item,index) in grzgscFailureData" >
                            <li  style="line-height: 22px">
                                {{item.zhaunjia}}对{{item.gongsi}}在&nbsp;“&nbsp;{{item.pingshenyinsu}}&nbsp;”&nbsp;中排除的理由：{{item.reason}}
                            </li>
                        </ul>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import SubmitPrompt from '../../components/publicVue/SubmitPrompt';//审查提示
    import NavBar from '../../components/publicVue/NavBar';// 导航
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    import JSON from 'JSON';

    export default {
        props: {},
        components: {
            SubmitPrompt,
            NavBar,
            AbandonedTender,//废标
            StandardChallengeInformation,
            pdf: () => import('../../components/publicVue/Pdf')
        },
        data() {
            return {
                page_loading: false,
                tableData: [],//table1数据
                msgBox: [],//个人形式审计表table数据
                grcsMsgBoxTitle: [],//个人形式审计表table的公司名以及内部数据数据
                grzgTitleData: {},//个人形式审计表按钮切换table表头数据
                grzgscFailureData:[],//个人形式审计表不合格数据
                idradionoprss: '',//table不合格的id
                operationType: [],
                /* -------头部包信息-----*/
                name: "",//标包名称
                biaoNum: '',
                baohao: '',
                options: [],//头部按钮
                /* -------头部包信息end-----*/
                /*-------------------左侧背景部分数据------------------*/
                personalAuditFormBtn: "",//个人资格审查项按钮数据
                /*-------------------右侧主体部分数据-------------------*/
                obj: {},//接受每次点击的数据
                radioArr: [],//所有table的radio
                type_btn: '',//导航传值类型
                to_submit_prompt_name: "",//传给全部提交弹框的值
                to_submit_prompt_baohao: "",//传给全部提交弹框的值
                to_failure_entry_company_name: "",//传给不合格弹框的弹框的公司名
                to_failure_entry_answer: "",//传给不合格弹框的弹框的问题
                dialogAbandonedTender: false, //废标
                dialogStandardChallengeInformation: false,//标中质询信息表
                cities: [],
                tableDataTwo: [],
                bzzxLoading: true, //标中质询loading
                son_all_checked: [],//子节点全选
                son_all_che: [],//子节点全选
                /* ----------------------------pdf start------------------------------- */
                filter_bidder:'',
                filter_factor:'',
                currPdfUrl: '',//当前点击pdf的url
                pdfItems: [],//动态插入pdf
                /* ----------------------------pdf end------------------------------- */
                allCheckedBtnLoading: false,//父级全选按钮loadding
                allSubmitBtnLoading: false,//父级提交按钮loadding
                sonAllSubmitBtnLoading: false,//子级提交按钮loadding
                sonAllCheckedBtnLoading: false,//父级提交按钮loadding
                methodType: '',//区分那种方法
                personalAuditFormDialog: false,//个人资格审查项按钮弹框
                companyname_toubiao: [],//投标人数据
                dingdang_tableData: [],//资格审查table数据
                standardReviewTips: '',//
                rowIndex: "",//记录点击的是那个行
                colIndex: "",//记录点击的是那个列
                ruleForm: {//不合格理由
                    desc: '',
                },
                rules: {//不合格理由
                    desc: [
                        {required: true, message: '请填写申请原因', trigger: 'blur',},
                    ]
                },
                failureEntryDialog: false,//不合格录入弹框
                determineOperatingDialog: false,//点击全部选中提示弹框
            }
        },
        created() {
            this.methodType = this.$route.query.methodType;
            // console.log(this.type_btn);
            if (this.$route.query.type == undefined) {
                this.type_btn = 1;
            } else {
                this.type_btn = this.$route.query.type;
            }
        },
        mounted() {
            $(".positionDiv").hide();
            $(".dingWeiDiv").hide();
            this.init();
            this.$commonJs.pdfOperations.pdf_init.call(this);
        },
        computed: {
            filter_standard(){
                for(var i=0;i<this.companyname_toubiao.length;i++){
                    if(this.companyname_toubiao[i].title == this.filter_bidder){
                        var fses = this.companyname_toubiao[i].factors_standards;
                        for(var j=0;j<fses.length;j++){
                            if(fses[j].factor == this.filter_factor){
                                return fses[j].standard;
                            }
                        }
                        break;
                    }
                }
                return '';
            },
            filter_points() {
                for(var i=0;i<this.companyname_toubiao.length;i++){
                    if(this.companyname_toubiao[i].title == this.filter_bidder){
                        var fses = this.companyname_toubiao[i].factors_standards;
                        for(var j=0;j<fses.length;j++){
                            if(fses[j].factor == this.filter_factor){
                                return fses[j].relativePoints;
                            }
                        }
                        break;
                    }
                }
                return '';
            },
            currentPdfShow() {
                for (var i = 0; i < this.pdfItems.length; i++) {
                    if (this.pdfItems[i].show) {
                        var _tm = this.$refs[this.pdfItems[i].ref];
                        if (typeof _tm != null && _tm.length == 1) {
                            return $(_tm[0].$el);
                        } else {
                            return $(_tm.$el);
                        }
                    }
                }
            },
            completePercent() {//进度条
                let num = 0;
                let allNum = this.dingdang_tableData.length * this.companyname_toubiao.length;
                this.dingdang_tableData.forEach(e => {
                    this.companyname_toubiao.forEach((k, i) => {
                        if (e[`value${i + 1}`] !== '' && e[`value${i + 1}`].length != 0) {
                            num++;
                        }
                    });
                });
                return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
            }
        },
        methods: {
            jsonParse(obj) {
                return JSON.parse(obj);
            },
            init() {
                this.page_loading = true;
                this.$axios.post('/api/table_msg', {type: this.type_btn}).then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.to_submit_prompt_baohao = this.baohao.split('/')[1];//以/为分割线，将字符串截成数组，数组就只有两项，取第二项
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.msgBox = res.data.bidMsg.msg;//个人形式审计表table数据
                        this.grcsMsgBoxTitle = res.data.bidMsg.companyNameData;//个人形式审计表table数据
                        this.grzgTitleData = res.data.bidMsg.grcs_titile_data;
                        this.grzgscFailureData=res.data.bidMsg.grzgscFailureData;
                        this.personalAuditFormBtn = res.data.bidMsg.eviewrItemsMsg.viewnBtnName;
                        this.to_submit_prompt_name = res.data.bidMsg.eviewrItemsMsg.shenchaName;
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;//头部导航数据
                        if (res.data.bidMsg.type === 0) {
                            this.$store.state.failureEnery.flag = true;//未提交
                        } else {
                            this.$store.state.failureEnery.flag = false;//已提交
                            $("#hide_btn").hide();
                        }
                        this.companyname_toubiao = res.data.bidMsg.eviewrItemsMsg.companyNameList;
                        this.dingdang_tableData = res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
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


            /*----------------- pdf start ----------------------*/

            pdf_category_open_close($event) {
                this.$commonJs.pdfOperations.pdf_category_open_close.call(this, $event);
            },
            getIframeDocument(refStr) {
                return this.$commonJs.pdfOperations.getIframeDocument.call(this, refStr);
            },
            getIframeWindow(refStr) {
                return this.$commonJs.pdfOperations.getIframeWindow.call(this, refStr);
            },
            //定位到关联投标文件说明处
            locate_pdf(relativePoint, pdfs) {
                this.$commonJs.pdfOperations.locate_pdf.call(this, relativePoint, pdfs);
            },
            show_pdf(obj, queryStr, page) {//查看pdf
                this.$commonJs.pdfOperations.show_pdf.call(this, obj, queryStr, page);
            },
            slideBarMousedown(e) {
                this.$commonJs.pdfOperations.slideBarMousedown.call(this, e);
            },
            slideBarMouseup() {
                this.$commonJs.pdfOperations.slideBarMouseup.call(this);
            },
            slideBarMousemove(e) {
                this.$commonJs.pdfOperations.slideBarMousemove.call(this, e);
            },
            exitFullMode() {
                this.$commonJs.pdfOperations.exitFullMode.call(this);
            },
            initFullMode(modeType, isFirstInPresentation) {
                return this.$commonJs.pdfOperations.initFullMode.call(this, modeType, isFirstInPresentation);
            },
            fullModeColumn() {
                this.$commonJs.pdfOperations.fullModeColumn.call(this);
            },
            fullModeRow() {
                this.$commonJs.pdfOperations.fullModeRow.call(this);
            },
            closePDF() {
                this.$commonJs.pdfOperations.closePDF.call(this);
            },
            showPDF() {
                this.$commonJs.pdfOperations.showPDF.call(this);
            },
            /*----------------- pdf end ----------------------*/


          /*-------------资格审查start-------------------------*/
            allChecked() {//全选（不用区分url）
                this.determineOperatingDialog = true;
            },
            allSubmit() {//父级提交
                this.allSubmitBtnLoading = true;
                this.$store.state.failureEnery.submitPrompt = true;
                let url;
                if (this.type_btn == 3) {
                    url = '/api/alltijiao_fhx';
                } else if (this.type_btn == 1) {
                    url = '/api/alltijiao';
                }
                else if (this.type_btn == 5) {
                    url = '/api/alltijiao_xxjs';
                }
                this.$axios.post(url, {type: parseInt(this.type_btn) + 1,}).then(res => {
                    if (res.status == 200) {
                        this.allSubmitBtnLoading = false;
                        this.options = res.data.vue_type;
                    } else {
                        this.allSubmitBtnLoading = false;
                    }
                })
            },
            rebackAllChecked() {//取消全选
                this.determineOperatingDialog = false;
            },
            personalAuditForm() {
                this.personalAuditFormDialog = true;
                console.log(this.dingdang_tableData);
            },
            comfrimAllChecked() {//确定全选
                this.allCheckedBtnLoading = true;
                this.determineOperatingDialog = false;
                this.$axios.post('/api/allChecked_fhx', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        this.dingdang_tableData.forEach((e, i) => {
                            this.companyname_toubiao.forEach((k, j) => {
                                e[`value${j + 1}`] = '合格';
                            });
                            this.allCheckedBtnLoading = false;
                        })
                    }
                });
            },
            changeRadios(rowIndex, colIndex, val, obj, title) {//scope.$index是哪一行  index+1是哪一列, obj:这一条数据， title:投标人，val:点击的是合格还是不合格（0:不合格，1合格）
                // console.log(rowIndex, colIndex, val, obj, title);
                this.rowIndex = rowIndex;
                this.colIndex = colIndex;
                this.to_failure_entry_company_name = title;
                this.to_failure_entry_answer = obj.evaluationFactors;
                this.$axios.post('/api/isFailure', 'post', {
                    type: val
                }).then(res => {
                    if (res.status == 200) {
                        if (val == "不合格") {
                            this.failureEntryDialog = true;
                        }
                    }
                })
            },
            failureEntryConfirmBtn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/save', 'post', {
                            data: this.$data.ruleForm.desc,
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.dingdang_tableData[this.rowIndex]['gradeExplain' + this.colIndex] = this.$data.ruleForm.desc;
                                this.$data.ruleForm.desc = '';
                                this.$message({
                                    type: 'success',
                                    message: '录入成功',
                                    center: true
                                });
                                this.failureEntryDialog = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleRowClick(row, column, event) {//资格审查表点击行数据出现审查标准
                // console.log(row, column, event);
                this.standardReviewTips = row.standardReview;
                $(".biaozhunConent").text(row.standardReview);
                if (document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) === true) {//判读页面是否出现滚动条
                    $(".positionDiv").show()
                } else {
                    $(".dingWeiDiv").show();
                }
            },
            /*-------------资格审查end-------------------------*/
        }
    }
</script>

<style lang="scss">
    @import '@/assets/css/common/mixin.scss';

    .table_pdf_drop_menu {
        .icon-pdf {
            margin-left: 7px;
        }
    }

    /*.hide_div {*/
    /*display: none;*/
    /*}*/

    /*.nohide_div {*/
    /*display: block;*/
    /*}*/

    .el-progress__text {
        font-size: 14px;
        color: #606266;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        line-height: 1;
    }
    .pingbiao_warp {
        overflow: hidden;
        padding-top: 15px;
        background: #ededed;
        .complianceReviewItem {
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
                .center_part {
                    .right_warp {
                        border-radius: 5px;
                        .el-progress__text {
                            color: red;
                        }
                        .el-progress-bar__outer {
                            background-color: #ededed;
                            height: 14px !important;
                        }
                        .title_msg {
                            .commonTitle {
                                font-size: 15px !important;
                                margin-top: 20px;
                            }
                            .commonTitle:before {
                                margin-top: -1px;
                                margin-bottom: 20px;
                            }
                        }
                    }
                    .personalAuditFormTable {
                        display: none;
                        padding-left: 15px;
                        border-radius: 5px;
                        .FormTableTitle {
                            margin-bottom: 10px;
                            span {
                                margin-right: 20px;
                            }
                        }
                        .table_tips {
                            line-height: 23px;
                            color: #606266;
                            border-left: 1px solid #ebeef5;
                            border-right: 1px solid #ebeef5;
                            border-bottom: 1px solid #ebeef5;
                            padding-top: 5px;
                            padding-bottom: 5px;
                        }
                    }
                    .el-table__body tr.current-row > td {
                        background-color: #b3d8ff !important;
                    }
                    .positionDiv {
                        text-align: center;
                        line-height: 50px;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        height: 50px;
                        background: #fff6ec;
                        border: 1px solid #ffdcb3;
                        left: 0;
                        z-index: 999;
                    }
                    .dingWeiDiv {
                        width: 100%;
                        height: 50px;
                        background: #fff6ec;
                        border: 1px solid #ffdcb3;
                    }
                }
            }

            @include pdf_operation;
        }
        .failureEntryDialogWarp {
            .failureEntry {
                .failureoOject {
                    line-height: 38px;
                    height: 38px;
                    border-top: 1px dotted #ccc;
                    border-bottom: 1px dotted #ccc;
                }
                .demo-ruleForm {
                    .el-textarea__inner {
                        min-height: 220px !important;
                    }
                }
            }
        }
    }

</style>