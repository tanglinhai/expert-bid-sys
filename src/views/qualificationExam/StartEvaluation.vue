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
            <div class="mainContentWarp" v-loading="page_loading">
                <!-- <el-button class="enterFullMode"
                        icon="iconfont icon-fullscreen"
                        size="mini"
                        @click="enterFullMode"
                    >进入全屏模式</el-button> -->
                <NavBar :msg="options" :type="type_btn"></NavBar>
                <div class="content">
                    <div class="div_pdf animate">
                        <pdf :pdfUrl="item.currPdfUrl" :ref="item.ref" :onload="item.onload" :queryStr="item.queryStr"
                             v-for="item in pdfItems"
                             v-show="item.show"></pdf>
                        <!-- <div class="closePDF iconfont icon-guanbi1" @click="closePDF"></div> -->
                    </div>
                    <!-- <el-button class="exitFullMode"
                        icon="iconfont icon-fullscreen-exit"
                        size="mini"
                        @click="exitFullMode"
                    >退出全屏模式</el-button> -->

                    <el-row class="center_part_wrap animate">
                        <div class="slideBar" id="slideBar"
                             @mousedown="slideBarMousedown($event)"
                        ><span class="iconfont icon-vertical-align-middl"></span></div>
                        <div class="center_part">
                            <div class="center_con_wrap">
                                <div class="center_con cf">
                                    <div class="left_examine " style="float: left;width: 170px">
                                        <div class="div_header">
                                            <div class="textAlignC mt20 mb15">
                                                <el-button type="primary" size="small" class="personalAuditFormBtn">
                                                    <i class="icon iconfont icon-zigeshenchazhuti"></i>
                                                    {{personalAuditFormBtn}}
                                                </el-button>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 class="pl15  col747 pt15 pb10">审查项</h6>
                                            <div class="content_wrap">
                                                <div class="zTreeDemoBackground left">
                                                    <ul id="treeDemo" class="ztree">{{msg}}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--点击ztree树显示-->
                                    <div class="right_warp" style="float: left;width: calc(100% - 185px)">
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
                                            <el-row :span="10" style="padding:0; float:right;"
                                                    :class=" $store.state.failureEnery.flag==false ?'hide_div':'nohide_div'"
                                                    id="hide_btn">
                                                <el-button @click="allChecked" plain size="mini" type="primary"
                                                           :loading="allCheckedBtnLoading"><i
                                                        class="icon iconfont icon-ic_qualified  mr3"></i>全部合格
                                                </el-button>
                                                <el-button size="mini" type="primary" @click="allSubmit"
                                                           :loading="allSubmitBtnLoading"><i
                                                        class="icon iconfont icon-tijiao  mr3"></i>全部提交
                                                </el-button>
                                            </el-row>
                                        </el-row>
                                        <div class="weitijiao">
                                            <!-------------分支进度条以及提交------------------>
                                            <el-row class="progress_div"
                                                    v-if="$store.state.failureEnery.start_sublevel_show">
                                                <el-col :span="12">
                                                    <el-row class="red">
                                                        <el-col style="width: 70px;font-size: 14px;">
                                                            <div>进度：</div>
                                                        </el-col>
                                                        <el-col style="width: 278px">
                                                            <el-progress :percentage="completePercent"></el-progress>
                                                        </el-col>
                                                    </el-row>
                                                </el-col>
                                                <el-row :span="10" style="padding:0; float:right;" id="hide_btn"
                                                        :class=" $store.state.failureEnery.flag==false ?'hide_div':'nohide_div'">
                                                    <el-button @click="sublevelAllChecked" plain size="mini"
                                                               type="primary" :loading="sonAllCheckedBtnLoading">
                                                        <i   class="icon iconfont icon-ic_qualified  mr3"></i>全部合格
                                                    </el-button>
                                                    <el-button size="mini" type="primary" @click="sublevelSubmit"
                                                               :loading="sonAllSubmitBtnLoading"><i
                                                            class="icon iconfont icon-tijiao  mr3"></i>提交
                                                    </el-button>
                                                </el-row>
                                            </el-row>
                                            <div class="first_warp" v-for="(item,index) in zNodes.children" :key="index"
                                                 :id="item.name"
                                                 v-if="item.show==true||item.show==undefined">
                                                <!-------------分支进度条以及提交end------------------>
                                                <el-row class="title_msg">
                                                    <el-col>
                                                        <p class="commonTitle fs14  col65">
                                                            <span class="ml3 col409">{{item.fristTableData.question}}</span>
                                                            <span class="ml3  col409">{{item.fristTableData.answer}}</span>
                                                            <span class="ml15 mr10"> /</span>
                                                            <span class="ml3">{{item.fristTableData.question1}}</span>
                                                            <span>{{item.fristTableData.answer1}}</span>
                                                        </p>
                                                    </el-col>
                                                </el-row>
                                                <el-table
                                                        :data="item.fristTableData.tableData"
                                                        border
                                                        style="width: 100%;"
                                                        class="first_table"
                                                        :cell-style="rowStyle">
                                                    <el-table-column
                                                            prop="name"
                                                            label="名称">
                                                        <template slot-scope="scope">
                                                    <span style="margin-left: 10px;display: inline-block;">
                                                        <i class="el-icon-close mr5 " v-if="scope.row.radio=='不合格'"
                                                           style="color: red"></i>
                                                        <i class="el-icon-check mr5 "
                                                           style="color: #67c23a"
                                                           v-if="scope.row.radio=='合格'"></i>投标人：
                                                        <a v-if="scope.row.pdf.length<2"
                                                           @click="show_pdf(scope.row.pdf[0])" class="common_a_style">
                                                            <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}
                                                            <i class="icon iconfont icon-pdf"></i>
                                                        </a>
                                                        <el-dropdown v-else trigger="click">
                                                          <span class="el-dropdown-link">
                                                            <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                            {{scope.row.name}}
                                                            <i class="icon iconfont icon-pdf"></i>
                                                            <i class="el-icon-arrow-down el-icon--right"></i>
                                                          </span>
                                                          <el-dropdown-menu slot="dropdown" class="table_pdf_drop_menu">
                                                            <el-dropdown-item
                                                                    @click.native="show_pdf(pdfItem)"
                                                                    v-for="(pdfItem ,index) in scope.row.pdf"
                                                            >{{pdfItem.pdf_name}}<i
                                                                    class="icon iconfont icon-pdf"></i></el-dropdown-item>
                                                          </el-dropdown-menu>
                                                        </el-dropdown>

                                                    </span>
                                                            <div class="btn_locate iconfont icon-dingwei"
                                                                 @click="locate_pdf(item.fristTableData, scope.row)"
                                                                 title="定位到关联投标文件说明处"
                                                            ></div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                            prop="pass"
                                                            label="是否合格" width="200">
                                                        <template slot-scope="scope">
                                                            <span style="margin-left: 10px" class="radios"
                                                                  v-if="$store.state.failureEnery.flag">
                                                              <el-radio-group
                                                                      @change="failuredRadio(scope.row.radio,scope.row.id,scope.$index,item.fristTableData.tableData,scope.row,item.fristTableData.answer)"
                                                                      ref="shet" v-model="scope.row.radio">
                                                                <el-radio :label="scope.row.ra1">合格</el-radio>
                                                                <el-radio :label="scope.row.ra2">不合格</el-radio>
                                                              </el-radio-group>
                                                            </span>
                                                            <span style="margin-left: 10px;color:red;" v-else>
                                                                 <span v-if="scope.row.radio == '合格'">合格</span>
                                                                 <span v-else>不合格</span>
                                                             </span>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column
                                                            prop="kong"
                                                            min-width="30%"
                                                    >
                                                        <template slot-scope="scope">
                                                            <span style="margin-left: 10px">
                                                              {{scope.row.content}}
                                                            </span>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </div>
                                    </div>

                                    <!--点击个人形式审计表按钮显示-->
                                    <el-col class="personalAuditFormTable"
                                            style="float: left;width: calc(100% - 185px)">
                                        <div class="FormTableTitle cf fs14">
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
                                            <el-row class="fs14 table_tips">
                                                <el-col>注：1、凡资格审查项中任何一条未通过评审要求的投标人，即界定为无效投标人。
                                                </el-col>
                                                <el-col>
                                                    2、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打"√",不符合要求打"×",结论为"合格",或"不合格"'。
                                                </el-col>
                                            </el-row>
                                        </template>
                                    </el-col>
                                </div>
                            </div>
                        </div>
                    </el-row>
                </div>
            </div>
            <el-dialog
                    title="不合格录入"
                    :visible.sync="$store.state.failureEnery.show"
                    width="700px"
            >
                <FailureEntry @childByValue="childByValue" :company_name="to_failure_entry_company_name"
                              :answer="to_failure_entry_answer"></FailureEntry>
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
                    :visible.sync="$store.state.failureEnery.determineOperating"
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
        </div>
    </div>
</template>

<script>
    import FailureEntry from '../../components/publicVue/FailureEntry';
    import SubmitPrompt from '../../components/publicVue/SubmitPrompt';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    import JSON from 'JSON';

    export default {
        props: {},
        components: {
            FailureEntry,
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
                idradionoprss: '',//table不合格的id
                operationType: [],
                /* -------头部包信息-----*/
                name: "",//标包名称
                biaoNum: '',
                baohao: '',
                options: [],//头部按钮
                /* -------头部包信息end-----*/
                /*-------------------左侧背景部分数据------------------*/
                personalAuditFormBtn: "",
                /* ----------------------------------树形图-------------------------*/
                setting: {   //zTree配置
                    view: {
                        dblClickExpand: this.dblClickExpand,
                    },
                    data: {
                        simpleData: {//使用的数据格式
                            enable: true
                        }
                    },
                    callback: {//点击回调函数
                        onClick: this.zTreeOnClick
                    }
                },
                zNodes: [],
                /* ---------------------------------树形图end------------------------*/
                /*-------------------右侧主体部分数据-------------------*/
                obj: {},//接受每次点击的数据
                tableArr: [],//table数据
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
                currPdfUrl: '',//当前点击pdf的url
                slideBarIsControl: false,//全屏模式下 控制pdf区域和操作区域的范围按钮开关
                pdfItems: [],//动态插入pdf
                allCheckedBtnLoading: false,//父级全选按钮loadding
                allSubmitBtnLoading: false,//父级提交按钮loadding
                sonAllSubmitBtnLoading: false,//子级提交按钮loadding
                sonAllCheckedBtnLoading: false,//父级提交按钮loadding
            }
        },
        created() {
            if (this.$route.query.type == undefined) {
                this.type_btn = 1;
            } else {
                this.type_btn = this.$route.query.type;
            }
        },
        mounted() {
            $("#treeDemo").on('click', '#treeDemo_1_a', function () {
                $(".right_warp").show();
                $(".personalAuditFormTable").hide();
            });
            $(".personalAuditFormBtn").click(function () {
                $(".personalAuditFormTable").show();
                $(".right_warp").hide();
            });
            this.init();
            setTimeout(function () {
                $("#treeDemo_1_a").addClass("curSelectedNode");
            }, 200);
            this._dom_c = {
                $dom_body: $('body'),
                $div_pdf: $('.div_pdf'),
                $center_part_wrap: $('.center_part_wrap'),
                $content: $('.content'),
                $slidebar: $('.slideBar'),
            };
            this._dom_c.$dom_body.mouseup(this.slideBarMouseup);
            window.fullModeColumn = this.fullModeColumn;
            window.fullModeRow = this.fullModeRow;
            window.exitFullMode = this.exitFullMode;
            window.closePDF = this.closePDF;
            window._locate_pdf_ = this._locate_pdf_;
        },
        computed: {
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
            completePercent() {
                let fillCount = 0;
                for (var i = 0; i < this.radioArr.length; i++) {
                    if (this.radioArr[i].radio) {
                        fillCount++;
                    }
                }
                return fillCount === 0 ? 0 : ((fillCount / this.radioArr.length).toFixed(3) * 100).toFixed(1);
            }
        },
        methods: {
            jsonParse(obj) {
                return JSON.parse(obj);
            },
            init() {   //初始化 table的数据
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
                        this.personalAuditFormBtn = res.data.bidMsg.eviewrItemsMsg.viewnBtnName;
                        this.zNodes = res.data.bidMsg.eviewrItemsMsg.zTreeData;//树形图数据
                        this.to_submit_prompt_name = this.zNodes.name;//树形图父级的值
                        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);//渲染树形图
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;//头部导航数据
                        if (res.data.bidMsg.type === 0) {
                            this.$store.state.failureEnery.flag = true;//未提交
                        } else {
                            this.$store.state.failureEnery.flag = false;//已提交
                            $("#hide_btn").hide();
                        }
                        this.zNodes.children.forEach((m, i) => {
                            this.tableArr.push(m.fristTableData.tableData);
                            m.fristTableData.tableData.forEach((x, s) => {
                                this.radioArr.push(x)
                            })
                        })
                    }
                    this.page_loading = false;
                })
            },
            failuredRadio(radio, id, index, tableKey, obj, a) {//合格不合格
                console.log(radio, id, index, tableKey, obj, a);
                this.to_failure_entry_company_name = obj.name;
                this.to_failure_entry_answer = a;
                this.$axios.post('/api/isFailure_fhx', 'post', {
                    id: id,
                    type: radio
                }).then(res => {
                    if (res.status == 200) {
                        var store_radio = null;
                        for (var i = 0; i < tableKey.length; i++) {
                            if (tableKey[i].id == id) {
                                store_radio = tableKey[i];
                                this.obj = store_radio;
                                break;
                            }
                        }
                        if (radio == '不合格') {
                            this.$store.state.failureEnery.show = true;
                            this.idradionoprss = id;
                        } else if (radio == '合格') {
                            store_radio.content = ''
                        }
                    }
                })
            },
            childByValue: function (childValue) {       // childValue就是子组件传过来的值
                if (this.obj.id == this.idradionoprss) {
                    this.obj.content = childValue;
                }
                this.$store.state.failureEnery.show = false;
            },
            allChecked() {//全选（不用区分url）
                this.$store.state.failureEnery.determineOperating = true;
            },
            isAllFilled() {//判断radio是否选中，全部选择为true，反之为false
                let isAllF = true;
                for (let i = 0; i < this.radioArr.length; i++) {
                    if (!this.radioArr[i].radio) {
                        isAllF = false;
                        break;
                    }
                }
                return isAllF;
            },
            allSubmit() {//父级提交
                this.allSubmitBtnLoading = true;
                this.$store.state.failureEnery.submitPrompt = true;
                let url;
                if (this.isAllFilled()) {
                    if (this.type_btn == 3) {
                        url = '/api/alltijiao_fhx';
                    } else if (this.type_btn == 1) {
                        url = '/api/alltijiao';
                    }
                    else if (this.type_btn == 5) {
                        url = '/api/alltijiao_xxjs';
                    }
                    this.$axios.post(url, {type: parseInt(this.type_btn) + 1}).then(res => {
                        if (res.status == 200) {
                            this.allSubmitBtnLoading = false;
                            this.options = res.data.vue_type;
                            // this.$store.state.failureEnery.submitPrompt = true;
                        }
                    })
                } else {
                    this.allSubmitBtnLoading = false;
                }
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
            /*----------------- zTree ----------------------*/
            zTreeOnClick(event, treeId, treeNode) { //treeNode是这个节点的json数据
                if (treeNode.children) {
                    this.zNodes.children.forEach((m, i) => {
                        this.$set(m, 'show', true)
                    });
                    this.$store.state.failureEnery.start_sublevel_show = false;
                    this.$store.state.failureEnery.parent_progress_show = true;
                } else {
                    this.son_all_checked = treeNode.fristTableData.tableData;
                    this.zNodes.children.forEach((m, i) => {
                        if (m.id == treeNode.id) {
                            this.$set(m, 'show', true)
                        } else {
                            this.$set(m, 'show', false)
                        }
                    });
                    this.$store.state.failureEnery.start_sublevel_show = true;
                    this.$store.state.failureEnery.parent_progress_show = false;
                }
                $(".right_warp").show();
                $(".personalAuditFormTable").hide();
            },
            dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            },
            /*----------------- zTree end ----------------------*/
            getIframeDocument(refStr) {
                return this.getIframeWindow(refStr).document;
            },
            getIframeWindow(refStr) {
                var iframe;
                if (this.$refs[refStr] != null && this.$refs[refStr].length == 1) {
                    iframe = $(this.$refs[refStr][0].$el).find('iframe');
                } else {
                    iframe = $(this.$refs[refStr].$el).find('iframe');
                }
                return iframe.get(0).contentWindow;
            },
            _locate_pdf_() {

            },
            //定位到关联投标文件说明处
            locate_pdf(question, bidder) {
                var relativePDF = bidder.pdf.filter(item => item.id == bidder.relativePDF);
                if (!relativePDF || relativePDF.length == 0) {
                    this.$confirm('该项在投标文件中没有关联！, 是否要打开投标文件?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.show_pdf(bidder.pdf[0]);
                    }).catch(() => {

                    });
                    return;
                }
                relativePDF = relativePDF[0];
                var queryStr = question.question + question.answer;
                this.show_pdf(relativePDF, queryStr);
            },
            show_pdf(obj, queryStr) {//查看pdf
                //this.$commonJs.fullscreen();
                //pdfItems: [],//动态插入pdfcurrPdfUrl
                var currPDF;
                for (var i = 0; i < this.pdfItems.length; i++) {
                    if (this.pdfItems[i].ref == "pdf_" + obj.id) {
                        currPDF = this.pdfItems[i];
                    }
                    this.$set(this.pdfItems[i], 'show', false);
                }
                if (currPDF) {//exist
                    currPDF && this.$set(currPDF, 'show', true);
                    if (this._dom_c.$content.hasClass('presentation_mode_row') || this._dom_c.$content.hasClass('presentation_mode_column')) {
                        this.getIframeDocument(currPDF.ref).getElementById('presentationMode_exit').style.display = 'block';
                    }
                    if (queryStr) {
                        var iframeWindow = this.getIframeWindow(currPDF.ref);
                        iframeWindow.PDFViewerApplication.findBar.findField.value = queryStr;
                        iframeWindow.PDFViewerApplication.findBar.dispatchEvent('');
                    }
                } else {// not exist <pdf :pdfUrl="item.currPdfUrl" :ref="item.ref" v-for="item in pdfItems" v-show="item.show"></pdf>
                    var _this = this;
                    this.pdfItems.push({
                        currPdfUrl: obj.url1,
                        queryStr: queryStr,
                        //currPdfUrl: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
                        ref: "pdf_" + obj.id,
                        show: true,
                        /*loadingInstance: ELEMENT.Loading.service({
                            target: this._dom_c.$div_pdf.get(0),
                            text: '拼命加载中...',
                            background: 'rgba(0,0,0,.75)'
                        }),*/
                        onload: function () {
                            $(this.contentWindow.document.getElementById('toolbarViewerRight')).prepend(
                                `<button 
                                    id="presentationMode_column" 
                                    class="toolbarButton presentationMode_column hiddenLargeView" 
                                    onclick="document.getElementById('presentationMode_exit').style.display='block';
                                    parent.fullModeColumn()"
                                    title="切换到列模式">
                                    <span>列模式</span>
                                </button>
                                <button 
                                    id="presentationMode_row" 
                                    class="toolbarButton presentationMode_row hiddenLargeView" 
                                    onclick="document.getElementById('presentationMode_exit').style.display='block';
                                    parent.fullModeRow()"
                                    title="切换到行模式">
                                    <span>行模式</span>
                                </button>
                                <button 
                                    id="presentationMode_exit" 
                                    class="toolbarButton presentationMode_exit hiddenLargeView" 
                                    ${_this._dom_c.$content.hasClass('presentation_mode_row') || _this._dom_c.$content.hasClass('presentation_mode_column') ? '' : 'style="display:none;"'}
                                    onclick="parent.exitFullMode();this.style.display='none';"
                                    title="退出行/列模式">
                                    <span>退出行/列模式</span>
                                </button>`
                            ).append(`<button 
                                    id="closePdfDocument" 
                                    class="toolbarButton closePdfDocument hiddenLargeView" 
                                    onclick="parent.closePDF();"
                                    title="关闭文档">
                                    <span>关闭文档</span>
                                </button>`);
                        }
                    });
                }

                this.showPDF();
            },
            sublevelAllChecked() {
                this.sonAllCheckedBtnLoading = true;
                this.$axios.post('/api/allChecked_son', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        this.son_all_checked.forEach((s, f) => {
                            this.radioArr.forEach((h, j) => {
                                if (s.id == h.id) {
                                    this.son_all_che.push(h);
                                    h.radio = '合格';
                                }
                            })
                        });
                        this.sonAllCheckedBtnLoading = false;
                    }
                });
            },
            son_isAllFilled() {//子级全部提交：判断radio是否选中，全部选择为true，反之为false
                let isAllF = true;
                for (var i = 0; i < this.son_all_che.length; i++) {
                    if (!this.son_all_che[i].radio) {
                        isAllF = false;
                        break;
                    }
                }
                return isAllF;
            },
            sublevelSubmit() {//子级全部提交
                this.sonAllSubmitBtnLoading = true;
                if (this.son_isAllFilled()) {
                    this.$axios.post('/api/son_allchecked_submit', {}).then(res => {
                        if (res.status == 200) {
                            this.sonAllSubmitBtnLoading = false;
                            this.$store.state.failureEnery.submitPrompt = true;
                        } else {
                            this.$message({
                                message: '请选择合格/不合格',
                                center: true,
                                type: 'error',
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            message: '请选择合格/不合格',
                            center: true,
                            type: 'error',
                        });
                    })
                } else {
                    this.$message({
                        message: '请选择合格/不合格',
                        center: true,
                        type: 'error',
                    });
                }

            },

            slideBarMousedown(e) {
                this.hDiff = this._dom_c.$content.hasClass('presentation_mode_row') ? e.clientY - this._dom_c.$div_pdf.height() :
                    this._dom_c.$content.hasClass('presentation_mode_column') ? this._dom_c.$center_part_wrap.width() - e.clientX :
                        e.clientY - this._dom_c.$slidebar.offset().top;
                this.slideBarIsControl = true;
                this._dom_c.$dom_body.bind('mousemove.slideBarMousemove', this.slideBarMousemove);
                this.currentPdfShow.append('<div class="floating_div"></div>');
                this._dom_c.$div_pdf.removeClass('animate');
                this._dom_c.$center_part_wrap.removeClass('animate');
            },
            slideBarMouseup() {
                this.slideBarIsControl = false;
                this._dom_c.$dom_body.unbind('mousemove.slideBarMousemove');
                this.currentPdfShow && this.currentPdfShow.find('.floating_div').remove();
            },
            slideBarMousemove(e) {
                e.originalEvent.preventDefault();
                e.originalEvent.cancelBable = true;
                e.originalEvent.stopPropagation();
                if (this.slideBarIsControl) {
                    if (this._dom_c.$content.hasClass('presentation_mode_row')) {
                        var totalH = this._dom_c.$content.height();
                        this._dom_c.$div_pdf.height(((e.clientY - this.hDiff) / totalH) * 100 + '%');
                        this._dom_c.$center_part_wrap.height(((totalH - e.clientY + this.hDiff) / totalH) * 100 + '%');
                    } else if (this._dom_c.$content.hasClass('presentation_mode_column')) {
                        var totalW = this._dom_c.$content.width();
                        this._dom_c.$div_pdf.width(((totalW - e.clientX - this.hDiff) / totalW) * 100 + '%');
                        this._dom_c.$center_part_wrap.width(((e.clientX + this.hDiff) / totalW) * 100 + '%');
                    } else if (this._dom_c.$content.hasClass('showPDF_content')) {
                        this._dom_c.$div_pdf.height(
                            e.clientY - this.hDiff - parseInt(this._dom_c.$slidebar.css('margin-top')) - this._dom_c.$div_pdf.offset().top + 'px');
                    }

                }
            },
            exitFullMode() {
                this._dom_c.$div_pdf.css({height: 'auto', width: 'auto'});
                this._dom_c.$center_part_wrap.css({height: 'auto', width: 'auto'});
                this._dom_c.$content.removeClass('presentation_mode_column presentation_mode_row');
                if (this.currentPdfShow.children().length == 1) {
                    this._dom_c.$content.addClass('showPDF_content');
                }
            },
            fullModeColumn() {
                var _this = this;
                //this._dom_c.$content.get(0).setAttribute('class','content');

                this._dom_c.$div_pdf.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                    _this._dom_c.$content.removeClass('presentation_mode_column_animate');
                    /*_this._dom_c.$div_pdf.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                        _this._dom_c.$div_pdf.removeClass('animate');
                    });*/
                });
                this._dom_c.$center_part_wrap.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                    _this._dom_c.$content.removeClass('presentation_mode_column_animate');
                    /*_this._dom_c.$center_part_wrap.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                        _this._dom_c.$center_part_wrap.removeClass('animate');
                    });*/
                });
                this._dom_c.$content.removeClass('showPDF_content presentation_mode_row').addClass('presentation_mode_column presentation_mode_column_animate');
            },
            fullModeRow() {
                var _this = this;
                /*this._dom_c.$content.removeClass('showPDF_content presentation_mode_column').addClass('presentation_mode_row presentation_mode_row_animate');*/
                //this._dom_c.$content.get(0).setAttribute('class','content');


                this._dom_c.$div_pdf.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                    _this._dom_c.$content.removeClass('presentation_mode_row_animate');
                    /*_this._dom_c.$div_pdf.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                        _this._dom_c.$div_pdf.removeClass('animate');
                    });*/

                });
                this._dom_c.$center_part_wrap.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                    _this._dom_c.$content.removeClass('presentation_mode_row_animate');
                    /*_this._dom_c.$center_part_wrap.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransitionend transitionend', function () {
                        _this._dom_c.$center_part_wrap.removeClass('animate');
                    });*/
                });
                
                this._dom_c.$content.removeClass('showPDF_content presentation_mode_row').addClass('presentation_mode_row presentation_mode_row_animate');

            },
            closePDF() {
                if (this._dom_c.$content.hasClass('presentation_mode_column') || this._dom_c.$content.hasClass('presentation_mode_row')) {
                    this.exitFullMode();
                }
                this._dom_c.$content.removeClass('showPDF_content');
            },
            showPDF() {
                this._dom_c.$content.addClass('showPDF_content');
            },
            comfrimAllChecked() {
                this.allCheckedBtnLoading = true;
                this.$store.state.failureEnery.determineOperating = false;
                this.$axios.post('/api/allChecked_fhx', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        for (let i = 0; i < this.radioArr.length; i++) {
                            this.radioArr[i].radio = '合格';
                        }
                        this.allCheckedBtnLoading = false;
                    }
                });
            },
            rebackAllChecked() {
                this.$store.state.failureEnery.determineOperating = false;
            },
        }
    }
</script>

<style lang="scss">
    .table_pdf_drop_menu {
        .icon-pdf {
            margin-left: 7px;
        }
    }

    .hide_div {
        display: none;
    }

    .nohide_div {
        display: block;
    }

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
                position: relative;
                background: white;
                border-radius: 5px;
                /* .enterFullMode{
                    display: block;
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    z-index: 1;
                    .iconfont{
                        font-size: 13px !important;
                        padding-right: 2px;
                    }
                } */
                .content {
                    background-color: #000;
                    /* .exitFullMode{
                        display: none;
                        position: absolute;
                        top: 20px;
                        left: 20px;
                        z-index: 2;
                        .iconfont{
                            font-size: 13px !important;
                            padding-right: 2px;
                        }
                    } */
                    .animate {
                        transition: top,left,right,bottom .8s,.8s,.8s,.8s;
                    }
                    .div_pdf {
                        display: none;
                        position: relative;
                        border: 1px solid #c3c3c3;
                        /* .closePDF{
                            display: none;
                            background-color: #fff;
                            position: absolute;
                            top: -15px;
                            right: 0;
                            width: 30px;
                            height: 30px;
                            font-size: 30px;
                            border-radius: 30px;
                            color: #606266;
                            cursor: pointer;
                            z-index: 2001;
                            &:hover{
                                color: #e27575;
                            }
                        } */
                        .my-pdf {
                            .pdfShow {
                                position: relative;
                                min-height: 200px;
                                .pdfobject {
                                    display: block;
                                }
                            }
                            .floating_div {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                z-index: 1;
                            }
                        }
                    }
                    .center_part_wrap {
                        background: white;
                        .slideBar {
                            position: relative;
                            display: none;
                            height: 15px;
                            line-height: 15px;
                            margin-top: 15px;
                            border: 1px solid #37cac1;
                            color: #37cac1;
                            text-align: center;
                            cursor: n-resize;
                            //transition: background-color, color .5s, .5s;
                            background-color: #fff;
                            z-index: 1;
                            .iconfont {
                                font-size: 14px;
                            }
                            &:hover {
                                background-color: #37cac1;
                                color: #fff;
                            }
                        ;
                        }
                        .center_part {
                            height: 100%;
                            box-sizing: border-box;
                            overflow: hidden;
                            .center_con_wrap {
                                height: 100%;
                                overflow-y: auto;
                                .center_con {
                                    padding: 15px;
                                    min-width: 850px !important;
                                    .left_examine {
                                        background: #e4e9ec;
                                        border-radius: 10px;
                                        height: 820px;
                                        /*width:170px;*/
                                        .div_header {
                                            border-bottom: 1px solid #bfc8cd;
                                        }
                                        #treeDemo {
                                            li {

                                                .node_name {
                                                    width: 102px;
                                                    overflow: hidden;
                                                    float: right;
                                                    text-overflow: ellipsis;
                                                    white-space: nowrap;
                                                }
                                            }
                                        }
                                    }
                                    .right_warp {
                                        padding-left: 15px;
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
                                        .first_table {
                                            .el-dropdown {
                                                display: inline;
                                            }
                                            .el-table__header-wrapper {
                                                display: none;
                                            }
                                            .el-dropdown-link {
                                                cursor: pointer;
                                                color: #409EFF;
                                            }
                                            .el-icon-arrow-down {
                                                font-size: 12px;
                                            }
                                            div.cell {
                                                position: relative;
                                                .btn_locate {
                                                    position: absolute;
                                                    top: 0;
                                                    right: 0;
                                                    width: 30px;
                                                    height: 24px;
                                                    line-height: 24px;
                                                    font-size: 16px;
                                                    margin-right: 10px;
                                                    text-align: center;
                                                    cursor: pointer;
                                                    &:hover {
                                                        color: rgb(64, 158, 255);
                                                    }
                                                }
                                            }
                                            .cell {
                                                padding-right: 40px;
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
                                }
                            }
                        }
                    }
                }
                .showPDF_content {
                    .center_part_wrap {
                        .slideBar {
                            display: block;
                        }
                    }
                    .div_pdf {
                        display: block;
                        /* .closePDF{
                            display: block;
                        } */
                    }
                }
                .presentation_mode_column {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 4;
                    .div_pdf {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 50%;
                        float: none;
                        display: block !important;
                        /* width: 50%;
                        height: 100%; */
                        border: 0;
                        .my-pdf {
                            height: 100%;
                            .pdfobject-container {
                                height: 100%;
                            }
                        }
                    }
                    /* .exitFullMode{
                        display: block;
                    } */
                    .center_part_wrap {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        right: 50%;
                        z-index: 999;
                        .slideBar {
                            display: block;
                            position: absolute;
                            top: 0;
                            right: 0;
                            margin-top: 0;
                            width: 15px;
                            height: 100%;
                            cursor: w-resize;
                            .iconfont {
                                position: absolute;
                                top: 50%;
                                margin-top: -7px;
                                left: 0;
                                transform: rotateZ(90deg);
                            }
                        }
                        .center_part {
                            padding: 0;
                            margin: 0;
                            padding-right: 17px;
                            /* .center_con_wrap{
                                .center_con {
                                    height: 100%;
                                    overflow-y: auto;
                                    min-width: 850px !important;
                                }
                            } */
                        }
                    }
                }
                
                .presentation_mode_column_animate {
                    .div_pdf {
                        top: 30%;
                        left: 52%;
                        bottom: 30%;
                        right: 36%;
                    }
                    .center_part_wrap {
                        top: 30%;
                        left: 36%;
                        bottom: 30%;
                        right: 52%;
                    }
                }
                

                .presentation_mode_row {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 4;
                    .div_pdf {
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 50%;
                        right: 0;
                        display: block !important;
                        /* width: 100%;
                        height: 60%; */
                        .my-pdf {
                            height: 100%;
                            .pdfobject-container {
                                height: 100%;
                            }
                        }
                    }
                    /* .exitFullMode{
                        display: block;
                    } */
                    .center_part_wrap {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        bottom: 0;
                        right: 0;
                        /* width: 100%;
                        height: 40%; */
                        .slideBar {
                            display: block;
                            margin-top: 0;
                        }
                        .center_part {
                            padding-top: 17px;
                            margin-top: -17px;
                            /* .center_con_wrap{
                                height: 100%;
                                overflow-y: auto;
                                .center_con {
                                }
                            } */
                        }
                    }
                }


                .presentation_mode_row_animate {
                    .div_pdf {
                        top: 30%;
                        left: 40%;
                        bottom: 52%;
                        right: 40%;
                    }
                    .center_part_wrap {
                        top: 52%;
                        left: 40%;
                        bottom: 30%;
                        right: 40%;
                    }
                }
            }
        }
    }
</style>