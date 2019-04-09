<template>
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
            <el-button class="enterFullMode" 
                    icon="iconfont icon-fullscreen" 
                    size="mini"
                    @click="enterFullMode"
                >进入全屏模式</el-button>
            <NavBar :msg="options" :type="type_btn"></NavBar>
            <div class="content">
                <div class="div_pdf">
                    <pdf :pdfUrl="currPdfUrl" ref="pdf"></pdf>
                    <div class="closePDF iconfont icon-guanbi1" @click="closePDF"></div>
                </div>
                <el-button class="exitFullMode" 
                    icon="iconfont icon-fullscreen-exit" 
                    size="mini"
                    @click="exitFullMode"
                >退出全屏模式</el-button>

                <el-row class="center_part_wrap">
                    <div class="slideBar" id="slideBar"
                        @mousedown="slideBarMousedown($event)"
                    ><span class="iconfont icon-vertical-align-middl"></span></div>
                    <el-row class="center_part">
                        <el-row class="center_con">
                            <el-col class="left_examine  " :span="3">
                                <el-row class="div_header">
                                    <el-col class="textAlignC mt20 mb15">
                                        <el-button type="primary" size="small" class="personalAuditFormBtn">
                                            <i class="icon iconfont icon-zigeshenchazhuti  mr3"></i>
                                            {{personalAuditFormBtn}}
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <h6 class="pl15  col747 pt15 pb10">审查项</h6>
                                    <div class="content_wrap">
                                        <div class="zTreeDemoBackground left">
                                            <ul id="treeDemo" class="ztree">{{msg}}</ul>
                                        </div>
                                    </div>
                                </el-row>
                            </el-col>
                            <!--点击ztree树显示-->
                            <el-col class="right_warp" :span="21">
                                <el-row class="progress_div" v-if="$store.state.failureEnery.parent_progress_show">
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple  cf">
                                            <div style="width:122px" class="my_progress_word fl">我的进度</div>
                                            <el-progress :percentage="completePercent" class="progress fl"></el-progress>
                                        </div>
                                    </el-col>
                                    <el-row :span="10" style="padding:0; float:right;" class="hide_btn">
                                        <el-button @click="allChecked" plain size="mini" type="primary"><i
                                                class="icon iconfont icon-ic_qualified  mr3"></i>全部合格
                                        </el-button>
                                        <el-button size="mini" type="primary" @click="allSubmit"><i
                                                class="icon iconfont icon-tijiao  mr3"></i>全部提交
                                        </el-button>
                                    </el-row>
                                </el-row>
                                <div class="weitijiao">
                                    <div class="first_warp" v-for="(item,index) in zNodes.children" :key="index" :id="item.name"
                                         v-if="item.show==true||item.show==undefined">
                                        <!-------------分支进度条以及提交------------------>
                                        <el-row class="progress_div" v-if="$store.state.failureEnery.start_sublevel_show">
                                            <el-col :span="12">
                                                <div class="grid-content bg-purple  cf">
                                                    <div style="width:122px" class="my_progress_word fl">进度：</div>
                                                    <el-progress :percentage="completePercent" class="progress fl"></el-progress>
                                                </div>
                                            </el-col>
                                            <el-row :span="10" style="padding:0; float:right;" class="hide_btn">
                                                <el-button @click="sublevelAllChecked" plain size="mini" type="primary"><i
                                                        class="icon iconfont icon-ic_qualified  mr3"></i>全部合格
                                                </el-button>
                                                <el-button size="mini" type="primary" @click="sublevelSubmit"><i
                                                        class="icon iconfont icon-tijiao  mr3"></i>提交
                                                </el-button>
                                            </el-row>
                                        </el-row>
                                        <!-------------分支进度条以及提交end------------------>
                                        <el-row class="title_msg">
                                            <el-col>
                                                <p class="commonTitle fs14  col65">
                                                    <span class="ml3 col409">{{item.fristTableData.question}}</span><span
                                                        class="ml3  col409">{{item.fristTableData.answer}}</span><span
                                                        class="ml15 mr10"> /</span><span
                                                        class="ml3">{{item.fristTableData.question1}}</span><span>{{item.fristTableData.answer1}}</span>
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
                                                <span style="margin-left: 10px">
                                                      <i class="el-icon-close mr5 " v-if="scope.row.radio=='不合格'"
                                                         style="color: red"></i>
                                                       <i class="el-icon-check mr5 "
                                                          style="color: #67c23a"
                                                          v-if="scope.row.radio=='合格'"></i>投标人：
                                                    <a @click="show_pdf(scope.$index, scope.row)" class="common_a_style">
                                                        <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}
                                                        <i class="icon iconfont icon-pdf "></i>
                                                    </a></span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                    prop="pass"
                                                    label="是否合格">
                                                <template slot-scope="scope">
                                            <span style="margin-left: 10px" class="radios" v-if="$store.state.failureEnery.flag">
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
                            </el-col>
                            <!--点击个人形式审计表按钮显示-->
                            <el-col class="personalAuditFormTable" :span="21">
                                <div class="FormTableTitle">
                                    <span>分包号：0635-1909N987/1[第一包]</span>
                                    <span>评标委员会：0635-1909N987/1评委会</span>
                                </div>
                                <!--表格-->
                                <template>
                                    <el-table
                                            :data="msgBox"
                                            style="width: 100%">
                                        <el-table-column
                                                prop="number"
                                                align="center"
                                                label="序号"
                                                width="100">
                                        </el-table-column>
                                        <el-table-column
                                                prop="date"
                                                align="center"
                                                label="评审因素">
                                        </el-table-column>
                                        <el-table-column
                                                label="投标人"
                                                align="center"
                                        >
                                            <el-table-column
                                                    prop="province"
                                                    align="center"
                                                    label="重庆网控科技发展有限公司">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="city"
                                                    align="center"
                                                    label="普瑞太阳能有限公司">
                                            </el-table-column>
                                            <el-table-column
                                                    prop="name"
                                                    align="center"
                                                    label="夏丰热工研究院有限公司">
                                            </el-table-column>
                                        </el-table-column>
                                    </el-table>
                                    <el-row class="fs14 table_tips">
                                        <el-col>注：1、凡资格审查项中任何一条未通过评审要求的投标人，即界定为无效投标人。
                                        </el-col>
                                        <el-col>2、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打"√",不符合要求打"×",结论为"合格",或"不合格"'。</el-col>
                                    </el-row>
                                </template>
                            </el-col>
                        </el-row>
                    </el-row>
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
            <SubmitPrompt :name="to_submit_prompt_name" :pro_num="completePercent" :baohao="to_submit_prompt_baohao"></SubmitPrompt>
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
            <StandardChallengeInformation :cities="cities" :tableData="tableDataTwo" :bzzxLoading="bzzxLoading"></StandardChallengeInformation>
        </el-dialog>
        <!--标中质询弹框-->
    </div>
</template>

<script>
    import FailureEntry from '../../components/publicVue/FailureEntry';
    import SubmitPrompt from '../../components/publicVue/SubmitPrompt';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    export default {
        props: {},
        components: {
            FailureEntry,
            SubmitPrompt,
            NavBar,
            AbandonedTender,   //废标  
            StandardChallengeInformation,
            pdf: () => import('../../components/publicVue/Pdf')
        },
        data() {
            return {
                page_loading: false,
                tableData: [],//table1数据
                msgBox: [],//个人形式审计表table数据
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
                cities:[],
                tableDataTwo:[],
                bzzxLoading:true, //标中质询loading
                son_all_checked:[],//子节点全选
                son_all_che:[],//子节点全选
                currPdfUrl: '',//当前点击pdf的url
                slideBarIsControl: false,//全屏模式下 控制pdf区域和操作区域的范围按钮开关
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
                $pdfShow: $('#pdfShow'),
                $content: $('.content'),
                $slidebar: $('.slideBar'),
            };
            this._dom_c.$dom_body.mouseup(this.slideBarMouseup);
        },
        computed: {
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
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/table_msg', {type: this.type_btn}).then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.to_submit_prompt_baohao=this.baohao.split('/')[1];//以/为分割线，将字符串截成数组，数组就只有两项，取第二项
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.msgBox = res.data.bidMsg.msg;//个人形式审计表table数据
                        this.personalAuditFormBtn = res.data.bidMsg.eviewrItemsMsg.viewnBtnName;
                        this.zNodes = res.data.bidMsg.eviewrItemsMsg.zTreeData;//树形图数据
                        this.to_submit_prompt_name = this.zNodes.name;//树形图父级的值
                        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);//渲染树形图
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;//头部导航数据
                        if (res.data.bidMsg.type === 0) {
                            this.$store.state.failureEnery.flag = true;//未提交
                        } else {
                            this.$store.state.failureEnery.flag = false;//已提交
                            $(".hide_btn").hide();
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
                this.$axios.post('/api/allChecked_fhx', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        for (var i = 0; i < this.radioArr.length; i++) {
                            this.radioArr[i].radio = '合格';
                        }
                    }
                });
            },
            isAllFilled() {//判断radio是否选中，全部选择为true，反之为false
                let isAllF = true;
                for (var i = 0; i < this.radioArr.length; i++) {
                    if (!this.radioArr[i].radio) {
                        isAllF = false;
                        break;
                    }
                }
                return isAllF;
            },
            allSubmit() {
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
                            this.options = res.data.vue_type;
                            this.$store.state.failureEnery.submitPrompt = true;
                            $(".hide_btn").hide();
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
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    this.dialogAbandonedTender=true;
                } else if (val === 'b') {//交通费标准
                    this.dialogStandardChallengeInformation=true;
                    this.bzzxLoading=true;
                    this.$axios.post('/api/StandardChallengeList',{
                    }).then(res=>{
                        if(res.status == 200){
                            this.cities=res.data.cityOptions;
                            this.tableDataTwo=res.data.standList;
                            this.bzzxLoading=false;
                        }
                    })
                } else if (val === 'c') {//报销汇总表
                    window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf', '_blank',);
                } else if (val === 'd') {//报销汇总表-财政
                    window.open(window.location.protocol+'//'+window.location.host+'/img/receipt.pdf', '_blank',);
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol+'//'+window.location.host+'/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    window.open(window.location.protocol+'//'+window.location.host+'/SignaturePage', '_blank',);
                }
            },
            /*----------------- zTree ----------------------*/
            zTreeOnClick(event, treeId, treeNode) { //treeNode是这个节点的json数据
                console.log(event, treeId, treeNode);
                if (treeNode.children) {
                        this.zNodes.children.forEach((m, i) => {
                        this.$set(m, 'show', true)
                    });
                    this.$store.state.failureEnery.start_sublevel_show=false;
                    this.$store.state.failureEnery.parent_progress_show=true;
                  } else {
                    this.son_all_checked=treeNode.fristTableData.tableData;
                     this.zNodes.children.forEach((m, i) => {
                        if (m.id == treeNode.id) {
                            this.$set(m, 'show', true)
                        } else {
                            this.$set(m, 'show', false)
                        }
                    });
                    this.$store.state.failureEnery.start_sublevel_show=true;
                    this.$store.state.failureEnery.parent_progress_show=false;
                }
                $(".right_warp").show();
                $(".personalAuditFormTable").hide();
            },
            dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            },
            /*----------------- zTree end ----------------------*/
            show_pdf(i, obj) {//查看pdf
                //this.$commonJs.fullscreen();
                this._dom_c.$pdfShow = $('#pdfShow');
                let loadingInstance = ELEMENT.Loading.service({
                    target: this._dom_c.$pdfShow.get(0),
                    text: '拼命加载中...',
                    background: 'rgba(0,0,0,.75)'
                });
                this.$refs.pdf.setPdf({
                    //pdfUrl: "http://localhost:7000/documents/younojsxia.pdf",
                    pdfUrl: "https://pdfobject.com/pdf/sample-3pp.pdf",
                    loadingInstance
                });
                this.showPDF();
            },
            sublevelAllChecked(){
                this.$axios.post('/api/allChecked_son', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        this.son_all_checked.forEach((s, f) => {
                              this.radioArr.forEach((h, j) => {
                                 if(s.id==h.id){
                                     this.son_all_che.push(h)
                                     h.radio='合格'
                                 }

                            })
                        })

                    }
                });
            },
            son_isAllFilled() {////子级全部提交：判断radio是否选中，全部选择为true，反之为false
                let isAllF = true;
                for (var i = 0; i <this.son_all_che.length; i++) {
                    if (!this.son_all_che[i].radio) {
                        isAllF = false;
                        break;
                    }
                }
                return isAllF;
            },
            sublevelSubmit(){//子级全部提交
                 if(this.son_isAllFilled()){
                     this.$axios.post('/api/son_allchecked_submit', {
                     }).then(res => {
                         if (res.status == 200) {
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
                }else{
                     this.$message({
                         message: '请选择合格/不合格',
                         center: true,
                         type: 'error',
                     });
                }

            },

            slideBarMousedown(e){
                this.hDiff = this._dom_c.$content.hasClass('pull_content') ? e.clientY - this._dom_c.$div_pdf.height()
                    : e.clientY - this._dom_c.$slidebar.offset().top;
                this.slideBarIsControl = true;
                this._dom_c.$dom_body.bind('mousemove.slideBarMousemove', this.slideBarMousemove);
                this._dom_c.$pdfShow.append('<div class="floating_div"></div>');
            },
            slideBarMouseup(){
                this.slideBarIsControl = false;
                this._dom_c.$dom_body.unbind('mousemove.slideBarMousemove');
                this._dom_c.$pdfShow.find('.floating_div').remove();
            },
            slideBarMousemove(e){
                e.originalEvent.preventDefault();
                e.originalEvent.cancelBable = true;
                e.originalEvent.stopPropagation();
                if(this.slideBarIsControl){
                    if(this._dom_c.$content.hasClass('pull_content')){
                        var totalH = this._dom_c.$content.height();
                        this._dom_c.$div_pdf.height(((e.clientY-this.hDiff)/totalH)*100+'%');
                        this._dom_c.$center_part_wrap.height(((totalH-e.clientY+this.hDiff)/totalH)*100+'%');
                    }else if(this._dom_c.$content.hasClass('showPDF_content')){
                        this._dom_c.$div_pdf.height(
                            e.clientY - this.hDiff - parseInt(this._dom_c.$slidebar.css('margin-top')) - this._dom_c.$div_pdf.offset().top  +'px');
                    }
                    
                }
            },
            exitFullMode(){
                this._dom_c.$content.removeClass('pull_content');
                if(this._dom_c.$pdfShow.children().length == 1){
                    this._dom_c.$content.addClass('showPDF_content');
                }
            },
            enterFullMode(){
                this._dom_c.$content.removeClass('showPDF_content ').addClass('pull_content');
            },
            closePDF(){
                this._dom_c.$content.removeClass('showPDF_content');
            },
            showPDF(){
                this._dom_c.$content.addClass('showPDF_content');
            }
        }
    }
</script>

<style lang="scss">
    .complianceReviewItem {
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
            position: relative;
            background: white;
            border-radius: 5px;
            .enterFullMode{
                display: block;
                position: absolute;
                top: 15px;
                right: 15px;
                z-index: 1;
                .iconfont{
                    font-size: 13px !important;
                    padding-right: 2px;
                }
            }
            .content{
                .exitFullMode{
                    display: none;
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    z-index: 2;
                    .iconfont{
                        font-size: 13px !important;
                        padding-right: 2px;
                    }
                }
                .div_pdf{
                    display: none;
                    position: relative;
                    border: 1px solid #c3c3c3;
                    .closePDF{
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
                    }
                    #pdf{
                        #pdfShow{
                            position: relative;
                            min-height: 200px;
                            .pdfobject{
                                display: block;
                            }
                            .floating_div{
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                z-index: 1;
                            }
                        }
                    }
                }
                .center_part_wrap{
                    .slideBar{
                        position: relative;
                        display: none;
                        height: 15px;
                        line-height: 15px;
                        margin-top: 15px;
                        border: 1px solid #37cac1;
                        color: #37cac1;
                        text-align: center;
                        cursor: n-resize;
                        transition: background-color,color .5s,.5s;
                        z-index: 1;
                        .iconfont{
                            font-size: 14px;
                        }
                        &:hover{
                            background-color: #37cac1;
                            color: #fff;
                        };
                    }
                    .center_part {
                        .center_con{
                            padding: 15px;
                            .left_examine {
                                background: #e4e9ec;
                                border-radius: 10px;
                                height: 820px;
                                .div_header {
                                    border-bottom: 1px solid #bfc8cd;
                                }
                            }
                            .right_warp {
                                padding-left: 15px;
                                border-radius: 5px;
                                .progress_div {
                                    padding-top: 30px;
                                    padding-bottom: 10px;
                                    padding-left: 15px;
                                    font-size: 15px;
                                    .my_progress_word {
                                        width: 224px;
                                        color: red;
                                        line-height: 14px;
                                        margin-top: 2px;
                                    }
                                    .progress {
                                        width: 280px;
                                        .el-progress-bar__outer {
                                            background-color: #ededed;
                                            height: 15px !important;
                                        }
                                        .el-progress__text {
                                            position: relative;
                                            left: -65px;
                                            color: red;
                                            font-size: 15px !important;
                                            top: -17px;
                                            width: 100px;
                                        }
                                        .el-progress-bar {
                                            padding-right: 0;
                                        }
                                    }
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
                                    .el-table__header-wrapper {
                                        display: none;
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
                                        font-size: 14px;
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
            .showPDF_content{
                .center_part_wrap{
                    .slideBar{
                        display: block;
                    }
                }
                .div_pdf{
                    display: block;
                    .closePDF{
                        display: block;
                    }
                }
            }
            .pull_content{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: white;
                z-index: 2;
                .div_pdf{
                    position: relative;
                    display: block !important;
                    height: 60%;
                    #pdf{
                        height: 100%;
                        .pdfobject-container{
                            height: 100%;
                        }
                    }
                }
                .exitFullMode{
                    display: block;
                }
                .center_part_wrap{
                    height: 40%;
                    .slideBar{
                        display: block;
                        margin-top: 0;
                    }
                    .center_part {
                        padding-top: 17px;
                        margin-top: -17px;
                        height: 100%;
                        .center_con{
                            height: 100%;
                            overflow-y: auto;
                        }
                        
                    }
                }
            }
        }
    }
</style>