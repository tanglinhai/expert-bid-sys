<template>
    <div class="projects">
        <!-- 项目列表页面-->
        <el-row class="mb15">
            <el-col>
                <el-button type="primary" size="medium"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>专家评审/ 我的评审项目
                </el-button>
            </el-col>
        </el-row>
        <div class="main">
            <el-row class="pro_msg_warp cf">
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                    <h5 class="commonTitle col348fe2">项目信息</h5>
                </div>
                <div class="fl search_warp textAlignR ">
                    <el-input
                            placeholder="项目名称关键字进行检索"
                            v-model="seach_input"
                            clearable size="small" class="wi260 ">
                    </el-input>
                    <el-button type="primary"
                               size="small"
                               class=" search_btn"
                               :loading="btn_search_loading"
                               @click="search()"
                               icon="el-icon-search">查询
                    </el-button>
                </div>
            </el-row>
            <div class="line"></div>
            <!-- 子组件 -->
            <div class="allContent">
                <div v-loading="pageLoading">
                    <NowProject :msg="msgBox" :projectMsg="list" :projectBag="projectBagMsg" :unmsg="arr"
                                ref="ccc" @refreshHttp="childMsg"></NowProject>
                </div>
            </div>
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
    </div>
</template>
<script>
    import NowProject from './publicVue/NowProject';

    export default {
        name: 'projects',
        props: {},
        components: {
            NowProject,

        },
        data() {
            return {
                seach_input: "",
                projectBagMsg: [],
                msgBox: [],
                list: [],
                pageLoading: false,
                currentPage: 1,
                btn_search_loading: false,
                arr: [],//默认打开折叠面板的下标数组
            }
        },
        mounted() {
            this.childMsg();
        },
        methods: {
            // 初始子组件数据获取
            childMsg() {
                this.pageLoading = true;
                this.$axios.post('/api/bagMsg').then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        this.pageLoading = false;
                        this.btn_search_loading = false;
                        this.projectBagMsg = res.data.projectBagMsg;
                        console.log(this.projectBagMsg);
                        if (this.projectBagMsg.length == 0) {
                            $('.pageBox').hide();
                            $(".search_warp ").hide();
                            $(".no_data ").css('padding-top', '200px');
                            $(".no_data ").css('padding-bottom', '200px');
                        }
                        this.msgBox = res.data.allBagMsg;
                        for (let i = 0; i < this.projectBagMsg.length; i++) {
                            this.arr.push(i)
                        }
                    } else {
                        this.btn_search_loading = false;
                        this.pageLoading = false;
                    }
                });
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageLoading = true;
                this.childMsg();
            },
            search() {
                if (this.btn_search_loading) {
                    return;
                }
                this.btn_search_loading = true;
                this.pageLoading = true;
                let _this = this;
                setTimeout(function () {
                    _this.$axios.post('/api/bagMsg', {
                        value: this.seach_input,
                    }).then(res => {
                        if (res.status === 200) {
                            _this.childMsg();
                        }
                    }).catch(e => {
                        _this.btn_search_loading = false;
                        _this.pageLoading = true;
                    });
                }, 2000)
            }
        },
    }
</script>
<style lang="scss">
    .projects {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .main {
            background: white;
            border-radius: 5px;
            .pro_msg_warp {
                padding: 15px;
                border-bottom: 1px solid #f3f3f3;
                .pro_msg_div, .search_warp {
                    width: 50%;
                }
                .pro_msg_div {
                    margin-top: 9px;
                }
                .search_warp {
                    .el-button--small {
                        border-radius: 0 3px 3px 0;
                    }
                    .el-input__inner {
                        border-radius: 4px 0 0 4px;
                    }
                }
            }
            .line {
                width: 100%;
                height: 1px;
                background-color: #f3f3f3;;
            }
            .allContent {
                margin-top: 15px;
            }
            .pageBox {
                text-align: right;
                padding: 0 15px 15px 15px;
            }
        }
        .el-collapse {
            border: none !important;
        }
    }
</style>



