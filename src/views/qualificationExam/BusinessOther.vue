<template>
    <div class="dingdang_warp">
        <div class="business_other">
            <!--头部-->
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
            <!--主体-->
            <div class="mainContentWarp" v-loading="page_loading">
                <NavBar :msg="options" :type="type"></NavBar>
                <el-row class="center_part">
                    <el-col :span="24">
                        <div class="unlock_table-warp fs14">
                            <el-row class="progress_btns">
                                <el-col :span="12" v-if="type!=7">
                                    <el-row class="red">
                                        <el-col style="width: 70px;font-size: 14px;">
                                            <div>我的进度：</div>
                                        </el-col>
                                        <el-col style="width: 278px">
                                            <el-progress :percentage="completePercent"></el-progress>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12" v-else>
                                    <p>&nbsp;</p>
                                    <!--<el-row class="red">-->
                                    <!--<el-col style="width: 70px;font-size: 14px;">-->
                                    <!--<div>我的进度：</div>-->
                                    <!--</el-col>-->
                                    <!--<el-col style="width: 278px">-->
                                    <!--<el-progress :percentage="completePercent"></el-progress>-->
                                    <!--</el-col>-->
                                    <!--</el-row>-->


                                </el-col>

                                <el-col :span="12" class="mb15">
                                    <div class="grid-content bg-purple btnBox" style="text-align:right;">
                                        <span> 专家：{{evaluationExpert}}</span>
                                        <span>下拉</span>
                                        <!-- 定档评议-->
                                        <span v-if="type==7">
                                            <el-button size="small" plain @click="saveBtn" class="ml10">保存</el-button>
                                            <el-button size="small" plain @click="submitFilingComments"
                                                       class="submitFilingCommentsBtn">提交定档评议
                                            </el-button>
                                        </span>
                                        <!--商务-->
                                        <span v-if="type==8">
                                            <el-button size="small" plain
                                                       @click="checkUnfinishedItems">查看未完成项
                                            </el-button>
                                            <el-button size="small" plain @click="saveBtn" class="ml10">保存</el-button>
                                            <el-button size="small" plain
                                                       @click="checkSchedule" class="ml10">查看定档表
                                            </el-button>
                                            <el-button size="small" plain @click="submitBusiness"
                                                       class="submit_business">
                                                提交商务
                                            </el-button>
                                        </span>
                                    </div>
                                </el-col>
                                <!--table-->
                            </el-row>
                            <el-row class="table_warp">
                                <template>
                                    <!------------------------------------定档评议table-------------------------------->
                                    <el-table
                                            :data="dingdang_tableData"
                                            style="width: 100%" class="dingdang_table" @header-click="checkPdf">
                                        <el-table-column
                                                label="打分项"
                                                min-width="150" fixed prop="grade" v-if='type==7'>
                                            <!--<template slot-scope="scope">-->
                                            <!--<span class="leixing red mr20">商务</span><span>商务1（50.00分）</span>-->
                                            <!--</template>-->
                                        </el-table-column>

                                        <el-table-column
                                                label="项目"
                                                min-width="150" fixed prop="projectName" v-if='type==8'>
                                        </el-table-column>
                                        <el-table-column label="投标人">
                                            <!-- 复选法-->
                                            <el-table-column :label="item.companyName"
                                                             v-for="(item,index ) in companyname_toubiao"
                                                             min-width="250" :key="index" v-if="type==7">
                                                <template slot-scope="scope">
                                                    <el-checkbox v-model="scope.row['radio' + index]"
                                                                 :label="item.laber">
                                                        <!--是否是官方配置？（50.00分）-->
                                                    </el-checkbox>
                                                    <span @click="scoreShowsBtn">编辑</span>
                                                </template>
                                            </el-table-column>

                                            <el-table-column :label="item.title"
                                                             v-for="(item,index ) in companyname_toubiao"
                                                             min-width="250" :key="index" v-if=" type==8">
                                                <template slot-scope="scope">
                                                    <div>
                                                        <!--v-if="!bol"-->
                                                        <div>
                                                            <!--单选法-->
                                                            <div v-if="scope.row.type === 'radio'">
                                                                <el-radio-group
                                                                        v-model="scope.row['value' + (index + 1)]"
                                                                        v-if="$store.state.failureEnery.business_tijiao">
                                                                    <el-radio :label="val.num"
                                                                              v-for="val in scope.row.radioList">
                                                                        {{val.typeTitle}}
                                                                    </el-radio>
                                                                </el-radio-group>
                                                                <span v-else  style="background-color: #e1f3d8"> {{scope.row['value' + (index + 1)]}}</span>
                                                            </div>
                                                            <!--两步法-->
                                                            <div v-if="scope.row.type === 'input'">
                                                                <span v-if="$store.state.failureEnery.business_tijiao">
                                                                    <div>{{scope.row.tit}}
                                                                        ({{scope.row.min}}.00-{{scope.row.max}}.00)
                                                                    </div>
                                                                    <div class="cf">
                                                                           <el-input
                                                                                   v-model.trim="scope.row['value' + (index + 1)]"
                                                                                   size="small" placeholder="请输入内容"
                                                                                   @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   style="width: 150px"
                                                                                   class="fl"></el-input>
                                                                        <div class="fl"
                                                                             style=" line-height: 30px;margin-left: 5px">分
                                                                        </div>
                                                                    </div>
                                                                 </span>
                                                                <span v-else  style="background-color: #e1f3d8">{{scope.row['value' + (index + 1)]}}</span>
                                                            </div>
                                                            <!--商务-->
                                                            <div v-if="scope.row.type === 'numberShangwu'">
                                                                <span v-if="$store.state.failureEnery.business_tijiao">
                                                                    {{scope.row['value' + (index + 1)]}}
                                                                </span>
                                                                <span v-else>{{businesssPrice+scope.row['value' + (index + 1)]}}</span>
                                                            </div>
                                                            <!--总计是商务技术其他服务的和-->
                                                            <div v-if="scope.row.type === 'numberTotle'">
                                                                <span v-if="$store.state.failureEnery.business_tijiao">
                                                                    {{scope.row['value' + (index + 1)]}}
                                                                </span>
                                                                <span v-else style="background-color: #e1f3d8">{{businesssPrice+scope.row['value' + (index + 1)]}}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-row>
                            <!--分页-->
                            <div class="pageBox">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10, 20, 30, 40]"
                                        :page-size="100"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="400"
                                >
                                </el-pagination>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-dialog
                    title="查看定档评议表 "
                    :visible.sync="$store.state.failureEnery.viewSchedule"
                    width="80%"
            >
                <ViewSchedule :msgBox="gradeData" :msg="committeeGudges"
                              :title_data="viewScheduleTitileData"></ViewSchedule>
            </el-dialog>
            <el-dialog
                    title="未完成打分项 "
                    :visible.sync="$store.state.failureEnery.ViewUnfinishedItems"
                    width="700px"
            >
                <ViewUnfinishedItems :viewUnfinishedData="viewUnfinishedData"></ViewUnfinishedItems>
            </el-dialog>
            <el-dialog
                    title="评分说明编辑 "
                    :visible.sync="$store.state.failureEnery.ScoreShows"
                    width="700px"
            >
                <ScoreShows></ScoreShows>
            </el-dialog>
            <el-dialog
                    title="提示"
                    :visible.sync="$store.state.failureEnery.submitPrompt"
                    width="700px"
            >
                <SubmitPrompt :name="to_submit_prompt_name" :pro_num="completePercent"
                              :baohao="to_submit_prompt_baohao" :type="type"></SubmitPrompt>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    import NavBar from '../../components/publicVue/NavBar';
    import ViewSchedule from '../../components/publicVue/ViewSchedule';
    import ScoreShows from '../../components/publicVue/ScoreShows';
    import ViewUnfinishedItems from '../../components/publicVue/ViewUnfinishedItems';
    import SubmitPrompt from '../../components/publicVue/SubmitPrompt';

    export default {
        name: "business-other",
        components: {
            NavBar,
            ViewSchedule,
            ViewUnfinishedItems,
            ScoreShows,
            SubmitPrompt
        },
        data() {
            return {
                page_loading: false,
                type: '',//路由传递的参数：区分是那个导航
                options: [],//头部导航按钮数组
                companyname_toubiao: [],//定档评议table的投标人数组
                dingdang_tableData: [],//定档评议table
                evaluationExpert: "",// 专家
                leibie: '',//定档table类别
                gradeData: [],//查看定档评议表
                viewScheduleTitileData: [],//查看定档评议表头数据
                committeeGudges: [],//评委委员会
                viewUnfinishedData: [],//查看未完成项弹框数据
                checkedArr: [],//选中的复选框数量
                allRaioNum: '',// 定档table中所有的复选框数量
                // bol: false,//是否提交
                arrA: [],//存放radio,input的数组
                to_submit_prompt_name: [],
            }
        },
        created() {
            this.type = this.$route.query.type;
        },


        computed: {
            completePercent() {
                if (this.type == 7) {
                    // console.log(this.type);
                    let num = 0;
                    let allNum = this.dingdang_tableData.length * this.companyname_toubiao.length;
                    this.dingdang_tableData.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            if (`radio${i}` in e) {
                                if (e[`radio${i}`]) {
                                    num++;
                                }
                            }
                        })
                    });
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                } else if (this.type == 8) {
                    let num = 0;
                    let allNum = (this.dingdang_tableData.length - 2) * this.companyname_toubiao.length;
                    let arr = this.dingdang_tableData.slice(0, -2);//去除最后两项
                    arr.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            if (e[`value${i + 1}`] !== '') {
                                num++;
                            }
                        })
                    });
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                }
            },
            businesssPrice() {//技术性价格调整小计
                let arr = this.dingdang_tableData.slice(0, -1);
                let amt = 0;
                console.log(arr,'33');
                arr.forEach(e => {
                   console.log( Number(e.value1));
                   amt += Number(e.value1) ;
                    // console.log(e.chageCount,666666)
                });
                return amt;
            },
        },
        mounted() {
            this.init();
            if (this.type == 7) {
                $(".submit_business").hide();
            }
            else if (this.type == 8) {
                $(".submitFilingCommentsBtn").hide();
            }
        },
        methods: {
            checkPdf(column, event) {
                this.companyname_toubiao.forEach((k, i) => {
                    if (k.title == column.label) {
                        // console.log("1",k.pdfList);
                    }
                })
            },
            init() {
                this.page_loading = true;
                this.$axios.post('/api/BusinessOther', {type: this.type}, {//通过包id
                    // id:id
                    // type:2
                }).then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.to_submit_prompt_baohao = this.baohao.split('/')[1];//以/为分割线，将字符串截成数组
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.to_submit_prompt_name = res.data.bidMsg.eviewrItemsMsg.gongzuo_name;
                        this.gradeData = res.data.bidMsg.eviewrItemsMsg.msgBox;//定档弹框数据
                        this.viewScheduleTitileData = res.data.bidMsg.eviewrItemsMsg.viewScheduleTitileData;//定档弹框数据
                        this.committeeGudges = res.data.bidMsg.eviewrItemsMsg.committeeGudges;//定档弹框数据
                        this.viewUnfinishedData = res.data.bidMsg.eviewrItemsMsg.viewUnfinishedData;//查看未完成项弹框数据
                        this.evaluationExpert = res.data.bidMsg.eviewrItemsMsg.evaluationExpert;
                        this.companyname_toubiao = res.data.bidMsg.eviewrItemsMsg.companyNameList;
                        this.dingdang_tableData = res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;//打分项
                        this.allRaioNum = this.dingdang_tableData.length * this.companyname_toubiao.length;
                    }
                    this.page_loading = false;
                })
            },
            checkSchedule() {//查看定档表
                this.$store.state.failureEnery.viewSchedule = true;
            },
            checkUnfinishedItems() {//查看未完成项
                this.$store.state.failureEnery.ViewUnfinishedItems = true;
            },
            saveBtn() {//保存
                let url;
                if (this.type == 7) {
                    url = '/api/dingdang_save';
                }
                else if (this.type == 8) {
                    url = '/api/business_save';
                }
                // else if (this.type == 5) {
                //     url = '/api/alltijiao_xxjs';
                // }
                this.$axios.post(url, {type: parseInt(this.type)}).then(res => {
                    if (res.status == 200) {
                        this.$message({
                            message: '保存成功！',
                            type: 'success',
                        });
                    }
                })
            },
            submitFilingComments() {//提交定档评议（需要掉接口）
                let bool = true;//预制变量，当发现有复选框未选中时，就将值变为false
                this.dingdang_tableData.forEach(e => {
                    this.companyname_toubiao.forEach((k, i) => {
                        if (`radio${i}` in e) {//判断当前行数据是否已经有这个变量，（一进页面没点击前是没有的）(全部选中的时候都为true, 反之为false)
                            if (!e[`radio${i}`]) { //即使已经有了，也可能再次点击时把值变成了false，（如果复选框未选中）
                                bool = false;//变为false
                            }
                        } else {// 当前复选框从未被点过,所以值还是false
                            bool = false;//变为false
                        }
                    })
                });
                //如果走完上面的代码 bool的值还是true说明复选框都被选了，否则肯定有未被选中的
                if (bool) {//可提交
                    let url;
                    if (this.type == 7) {
                        url = '/api/dingdang_tijiao';
                    }
                    // else if (this.type_btn == 1) {
                    //     url = '/api/alltijiao';
                    // }
                    // else if (this.type_btn == 5) {
                    //     url = '/api/alltijiao_xxjs';
                    // }
                    this.$axios.post(url, {type: parseInt(this.type_btn)}).then(res => {
                        if (res.status == 200) {
                            alert('可提交');
                        }
                    })
                } else {
                    this.$message({
                        message: '您尚为所有投标人添加划档信息，请添加后再提交！',
                        type: 'warning',
                    });
                }
            },
            submitBusiness() {//商务提交
                // this.bol = true;
                console.log(this.dingdang_tableData);
                this.$store.state.failureEnery.submitPrompt = true;
                // this.$store.state.failureEnery.business_tijiao = false;
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageLoading = true;
                this.init();
            },
            scoreShowsBtn() {//评分说明编辑
                this.$store.state.failureEnery.ScoreShows = true;
            },
            changes(value, rowIndex, colIndex, rowList) {
                if (/[^\d]/.test(value)) {/*替换非数字字符  */
                    this.$message({
                        type: 'warning',
                        message: '请输入数字！'
                    });
                    this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                } else {
                    if (Number(value) >= rowList.min && Number(value) <= rowList.max) {
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `输入值在${rowList.min}-${rowList.max}之间`
                        });
                        this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                    }
                }
            },
        }
    }
</script>

<style lang="scss">
    .el-progress__text {
        font-size: 14px;
        color: #606266;
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        line-height: 1;
    }

    .dingdang_warp {
        overflow: hidden;
        padding-top: 15px;
        background: #ededed;
        .business_other {
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
                    padding: 0 15px;
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
                        .progress_btns {
                            .el-progress-bar__outer {
                                background-color: #ededed;
                                height: 14px !important;
                            }
                        }
                    }
                    .table_warp {
                        .dingdang_table {
                            /* div.cell {
                                 position: relative;
                                 .leixing {
                                     position: absolute;
                                     top: -4px;
                                     left: 0;
                                     width: 40px;
                                     color: red;
                                     margin-right: 10px;
                                     !*height: 24px;*!
                                     !*line-height: 24px;*!
                                     !*font-size: 16px;*!
                                     !*margin-right: 10px;*!
                                     !*text-align: center;*!

                                 }
                             }*/
                        }
                    }
                    .pageBox {
                        text-align: right;
                        padding: 15px;
                    }
                }
            }
        }
    }
</style>