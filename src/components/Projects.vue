<template>
    <div class="projects">
        <!-- 项目列表页面-->
        <div class="main">
            <el-row class="pro_msg_warp cf">
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                    <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>我的评审项目</h5>
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
                    <div class="nowProject">
                        <el-row v-if="projectBagMsg.length == 0" class="no_data">
                            <el-col :span="24">
                                <div class="grid-content bg-purple zeroBox">
                                      <el-button class="btnBg" @click="refreshBtn"   >  <i  class="icon iconfont icon-fresh  mr3 fs14" ></i>刷新</el-button>
                                    <p class="countdown_prompt">&nbsp;{{count}}&nbsp;秒后自动刷新！</p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-collapse v-model="arr" @change="handleChange" class="collBox" v-else>
                            <el-collapse-item v-for="(item,index) in projectBagMsg" :key="index" :name="index" class="outMain">
                                <!--头部-->
                                <template slot="title">
                                    <div class="titBg">
                                        <el-row>
                                            <div class="inviteType overflowText fl">
                                                <img src="../assets/img/gk.jpg" alt="" v-if="item.status === 0">
                                                <img src="../assets/img/jz.jpg" alt="" v-if="item.status === 1">
                                                <img src="../assets/img/yq.jpg" alt="" v-if="item.status === 2">
                                            </div>
                                            <div class="projectName overflowText setText fl">
                                                {{item.projectName}}
                                            </div>
                                            <div class="principal  overflowText setText fl">项目负责人：{{item.functionary}}</div>
                                        </el-row>
                                    </div>
                                </template>
                                <el-row v-for="(item,index) in msgBox" :key="index" class="bag_msg" >
                                    <el-col class=' border_col'>
                                        <el-col style="width:15%" class="bagNum">
                                            <span class="col409">{{item.bagName }}</span>
                                        </el-col>
                                        <el-col style="width:25%" class="expertName">
                                            <span>标包名称：{{item.biaobaomingcheng }}</span>
                                        </el-col>
                                        <el-col style="width:40%" :span="10" class="time_div">
                                            <el-col style="width:50%" class="beginTime">
                                                <span>评标开始时间：<span class="cole02">{{item.starTime }}</span></span>
                                            </el-col>
                                            <el-col style="width:50%" class="endTime">
                                                <span>评标截至时间：<span class="cole02">{{item.stopTime }}</span></span>
                                            </el-col>
                                        </el-col>
                                        <el-col style="width:20%" class="btns_div">
                                            <el-col :span="11" class="begin_bidding" style="text-align: right">
                                                <el-button size="small" class="btnBg"    @click="beginPingbiao(item.methodType)" >
                                                    <i  class="icon iconfont icon-kaishi mr3"></i>开始评标
                                                </el-button>
                                            </el-col>
                                        </el-col>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
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

    export default {
        name: 'projects',
        props: {},
        components: {
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
                count:5
            }
        },
        mounted() {
            this.childMsg();
            $(".NavCommon").hide();
            $(".CommonProject").hide();
            if(this.timer){
                clearInterval(this.timer);
            }else{
                this.timer=setInterval(()=>{
                    this.childMsg();
                },5000);
                this.goGrdoupRecor()
            }
        },
        methods: {
            refreshBtn(){
                this.childMsg();
            },
            beginPingbiao(val){
                this.$router.push(`/index/LetterCommitment?methodType=${val}`);
            },
            childMsg() {
                this.pageLoading = true;
                this.$axios.post('/api/bagMsg').then(res => {
                    if (res.status === 200) {
                        this.pageLoading = false;
                        this.btn_search_loading = false;
                        this.projectBagMsg = res.data.projectBagMsg;
                        if (this.projectBagMsg.length == 0) {
                            $('.pageBox').hide();
                            $(".search_warp ").hide();
                            $(".no_data ").css('padding-top', '200px');
                            $(".no_data ").css('padding-bottom', '200px');
                            this.count=5;
                        }else if(this.projectBagMsg.length != 0){
                            $('.pageBox').show();
                            $(".search_warp ").show();
                            clearInterval(this.timer);
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
                // this.childMsg();
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
            },
            goGrdoupRecor() {//倒计时
                const TIME_COUNT = 5;
                if (!this._timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this._timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this._timer);
                            this._timer = null;
                            this.$store.state.failureEnery.tijiao100 = false;
                        }
                    }, 1000)
                }
            },
        },
    }
</script>
<style lang="scss">
    .projects {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        padding-left:20px!important;
        min-height: 800px;
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
                .nowProject {
                    .zeroBox{
                        margin: auto;
                        border-bottom: 1px solid #f3f3f3;
                        position: relative;
                        width: 631px;
                        height: 245px;
                        .btnBg  {
                            position: absolute;
                            top: 150px;
                            right: 235px;
                        }
                        img{
                            display: inline-block;
                            vertical-align: middle;
                        }
                        .countdown_prompt{
                            padding: 12px 39px;
                            background-color: #ecf8ff;
                            -webkit-border-radius: 4px;
                            -moz-border-radius: 4px;
                            -ms-border-radius: 4px;
                            -o-border-radius: 4px;
                            border-radius: 4px;
                            margin: 20px 0;
                            position: absolute;
                            top: 130px;
                            right: 15px;
                        }
                    }
                    .collBox {
                        overflow-x: hidden;
                        .outMain {
                            overflow-x: hidden;
                            margin-bottom: 15px;
                            padding-left: 15px;
                            padding-right: 15px;
                            .el-collapse-item__header {
                                background-color: #f0f3f5;
                                padding-left: 18px;
                                padding-right: 8px;
                                border: 1px solid #d9e0e7;
                            }
                            .el-collapse-item__wrap {
                                border-bottom: none;
                            }
                            .titBg {
                                font-size: 14px;
                                float: left;
                                width: 96%;
                                height: 50px;
                                color: #000104;
                                .inviteType {
                                    width: 50px;
                                    height: 50px;
                                    text-align: center;
                                    img {
                                        width: 50px;
                                        height: 50px;
                                        vertical-align: middle;
                                    }
                                }
                                .projectName {
                                    float: left;
                                    width: 33.5%;
                                    height: 50px;
                                    padding-left: 15px;
                                    line-height: 50px;
                                }
                                .principal {
                                    width: 24%;
                                }
                                .proxyCo {
                                    float: right;
                                    width: 15%;
                                }
                                span {
                                    padding: 12px 30px;
                                    background: #409eff;
                                    color: #fff;
                                }
                                .el-col-2 {
                                    padding-left: 1.3%;
                                }
                            }
                            .el-collapse-item__arrow {
                                color: #000104;
                                font-weight: bold;
                                font-size: 14px;
                            }
                            .el-collapse-item__content {
                                padding-bottom: 0;
                            }
                            .bag_msg {
                                height: 70px;
                                line-height: 70px;
                                .border_col {
                                    border-bottom: 1px solid #d9e0e7;
                                    padding-left: 15px;
                                    padding-right: 15px;
                                    border-left: 1px solid #d9e0e7;
                                    border-right: 1px solid #d9e0e7;
                                }
                                .bagNum {
                                    span {
                                        border: 1px solid #409EFF;
                                        border-radius: 20px;
                                        padding: 4px 7px;
                                        font-size: 10px;
                                    }
                                }
                                .btns_div {
                                    .btnBg {
                                        background: #ff6600 !important;
                                        border: 1px solid #ff6600 !important;
                                        color: #fff !important;
                                    }
                                    .btnBg:hover {
                                        background: #ff8600 !important;
                                    }
                                    .btnBg[data-v-4774750c]:hover {
                                        background: #e47932 !important;
                                        border-color: #e47932 !important;
                                        color: #fff !important;
                                    }
                                }
                            }
                        }
                    }
                    @media screen and (max-width: 1660px) {
                        .beginTime {
                            width: 63% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                    }
                    @media screen and (max-width: 1530px) {
                        .beginTime {
                            width: 73% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 24% !important;
                        }
                    }
                    @media screen and (max-width: 1330px) {
                        .beginTime {
                            width: 75% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 25% !important;
                        }
                    }
                    @media screen and (max-width: 1250px) {
                        .beginTime {
                            width: 75% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 27% !important;
                        }
                    }
                    @media screen and (max-width: 1165px) {
                        .beginTime {
                            width: 75% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 29% !important;
                        }
                    }
                    @media screen and (max-width: 1095px) {
                        .beginTime {
                            width: 75% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 30% !important;
                        }
                    }
                    @media screen and (max-width: 1057px) {
                        .beginTime {
                            width: 75% !important;
                            margin-right: 20px;
                        }
                        .endTime {
                            width: 75% !important;
                        }
                        .time_div {
                            width: 32% !important;
                        }
                        .btns_div {
                            width: 28% !important;
                        }
                    }
                    .doc_list_dialog {
                        .fist_section_text, .second_section_text, .third_section_text, .four_section_text, .five_section_text {
                            padding-top: 15px;
                            padding-bottom: 15px;
                            .information {
                                line-height: 35px;
                            }
                        }
                    }
                }
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



