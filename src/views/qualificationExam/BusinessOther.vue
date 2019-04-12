<template>
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
                        <el-row>
                            <el-col :span="12">
                                <div class="grid-content bg-purple">
                                    <div style="width:122px" class="my_progress_word fl">进度：</div>
                                    <el-progress :percentage="completePercent" class="progress fl"></el-progress>
                                </div>
                            </el-col>
                            <el-col :span="12" class="mb15">
                                <div class="grid-content bg-purple btnBox" style="text-align:right;">
                                    <!--<span class="hide_div">-->
                                    <!--<el-button size="small" plain-->
                                    <!--@click="check_schedule">查看定档表</el-button>-->
                                    <!--<el-button size="small" plain-->
                                    <!--@click="check_unfinished_items">查看未完成项</el-button>-->
                                    <!--</span>-->
                                    <el-button size="small" plain @click="saveBtn" class="ml10">保存</el-button>
                                    <!--<el-button size="small" plain @click="submit_business">提交商务</el-button>-->
                                    <el-button size="small" plain @click="submit_filing_comments">提交定档评议</el-button>
                                </div>
                            </el-col>
                            <!--table-->
                        </el-row>
                        <el-row>
<!------------------------------------定档评议table-------------------------------->
                            <template>
                                <el-table
                                        :data="dingdang_tableData"
                                        style="width: 100%">
                                    <el-table-column
                                            label="打分项"
                                            width="450" fixed>
                                        <template  slot-scope="scope">
                                           商务1（50.00分）
                                        </template>
                                    </el-table-column>
                                        <el-table-column label="投标人">
                                            <el-table-column   :label="item" v-for="(item,index ) in companyname_toubiao"  width="450" :key="item.id">
                                                <template  slot-scope="scope">
                                                    <el-radio-group v-model="scope.row.resource" class="radio_group" >
                                                        <el-radio label="1">是否是官方配置？（50.00分）</el-radio>
                                                        <el-radio label="-1" style=" margin-left: 13px!important;">减</el-radio>
                                                    </el-radio-group>
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
    </div>
</template>

<script>
    import NavBar from '../../components/publicVue/NavBar';

    export default {
        name: "business-other",
        components: {
            NavBar,
        },
        data() {
            return {
                page_loading: false,
                type: '',//路由传递的参数：区分是那个导航
                options: [],//头部导航按钮数组
                companyname_toubiao:[],//定档评议table的投标人数组
                dingdang_tableData:[],//定档评议table
            }
        },
        created() {
            this.type = this.$route.query.type;
            console.log( this.type)
        },
        mounted() {
            this.init();
        },
        computed: {},
        methods: {
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
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.companyname_toubiao=res.data.bidMsg.eviewrItemsMsg.companyName;
                        this.dingdang_tableData=res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
                        // console.log(this.companyname_toubiao,res.data.bidMsg.eviewrItemsMsg.dingdang_tableData);
                    }
                    this.page_loading = false;
                })
            },
            check_schedule() {//查看定档表

            },
            check_unfinished_items() {//查看未完成项

            },
            saveBtn() {//保存
                console.log(this.companyname_toubiao);

            },
            submit_business() {//提交商务

            },
            submit_filing_comments(){//提交定档评议

            },
          handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
             },
            handleCurrentChange(val) {
                this.pageLoading=true;
                this.init();
        },
        }
    }
</script>

<style lang="scss">
    .business_other {
        background-color: #ededed;
        padding: 15px;
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
                    .pageBox{
                        text-align: right;
                        padding:  15px;
                    }
                }
            }
        }
    }
</style>