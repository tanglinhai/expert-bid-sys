<template>
    <div class="nowProject">
        <el-row v-if="projectBag.length == 0" class="no_data">
            <el-col :span="24">
                <div class="grid-content bg-purple zeroBox">
                    <img src="../../assets/img/no_data_icon.png" alt="">
                    <el-button class="btnBg" @click="refreshBtn">刷新</el-button>
                </div>
            </el-col>
        </el-row>
        <el-collapse v-model="unmsg" @change="handleChange" class="collBox" v-else>
            <el-collapse-item v-for="(item,index) in projectBag" :key="index" :name="index" class="outMain">
                <!--头部-->
                <template slot="title">
                    <div class="titBg">
                        <el-row>
                            <div class="inviteType overflowText fl">
                                <img src="../../assets/img/gk.jpg" alt="" v-if="item.status === 0">
                                <img src="../../assets/img/jz.jpg" alt="" v-if="item.status === 1">
                                <img src="../../assets/img/yq.jpg" alt="" v-if="item.status === 2">
                            </div>
                            <div class="projectName overflowText setText fl">
                                <!--<a href="javascript:void(0)" class="curStyot" @click.stop="dialogAlert()">-->
                                {{item.projectName}}
                                <!--</a>-->
                            </div>
                            <div class="principal  overflowText setText fl">项目负责人：{{item.functionary}}</div>
                        </el-row>
                    </div>
                </template>
                <el-row v-for="(item,index) in msg" :key="index" class="bag_msg" >
                    <el-col class=' border_col'>
                        <el-col style="width:15%" class="bagNum">
                           <span class="col409">{{item.bagName }}</span>
                        </el-col>
                        <el-col style="width:25%" class="expertName">
                            <span>标包名称：{{item.biaobaomingcheng }}</span>
                        </el-col>
                        <!--<el-col style="width:15%" class="bagNum">-->
                            <!--<div>包含分包：<span class="col409">{{item.bagName }}</span></div>-->
                        <!--</el-col>-->
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
                                <el-button size="small" class="btnBg"     @click="beginPingbiao(item.methodType)" >
                                    <i  class="icon iconfont icon-kaishi mr3"></i>开始评标
                                </el-button>
                            </el-col>
                            <!--<el-col :span="11" class="bidding_doc" style="margin-left: 15px">-->
                                <!--<el-button size="small" @click="bidding_doc_btn(item)"><i-->
                                        <!--class="icon iconfont icon-wenjian mr3"></i>招标相关文件-->
                                <!--</el-button>-->
                            <!--</el-col>-->
                        </el-col>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
        <!--文件列表弹框-->
        <el-dialog
                class="doc_list_dialog"
                title="文件列表"
                :visible.sync="docListDialogVisible"
                width="1300px"
        >
            <el-row>
                <el-col>
                    <div class="grid-content bg-purple-dark  ">
                        <h5 class="commonTitle col348fe2">基本信息</h5>
                    </div>
                </el-col>
            </el-row>
            <div class="fist_section_text">
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">项目业务编号：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.proBusinessNum}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">开标地点：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.bidOpeningPlace}}</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">售标起始时间：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.sellStartTime}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">开标时间：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.bidOpeningTime}}</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">售标结束时间：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.sellEndTime}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">评标地点：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.evaluationBidPlace}}</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">获取标书方式：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.getBidType}}</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="overflowText textAlignR">评标时间：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{every_msg.evaluationBidTime}}</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">支付方式：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">
                            <el-checkbox v-model="checked1" disabled class="checkedS">网上支付</el-checkbox>
                            <el-checkbox v-model="checked2" disabled class="checkedS">现金支付</el-checkbox>
                            <el-checkbox v-model="checked3" disabled class="checkedS">电汇</el-checkbox>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">上传方式：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">
                            <el-radio disabled v-model="radio1" label="禁用" class="radioS">线上</el-radio>
                            <el-radio disabled v-model="radio1" label="禁用2" class="radioS">线下</el-radio>
                            <el-radio disabled v-model="radio1" label="禁用3" class="radioS">辅助开评标</el-radio>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col>
                    <div class="grid-content bg-purple-dark  ">
                        <h5 class="commonTitle col348fe2">关联标包</h5>
                    </div>
                </el-col>
            </el-row>
            <div class="second_section_text">
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">包名称：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.bagName}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">图纸押金：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.drawingDeposit}}元</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">邮寄费：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.postage}}元</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">投标保证金：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.tenderBond}}元</div>
                    </el-col>
                </el-row>
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">标书费：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.tenderFree}}元</div>
                    </el-col>

                    <el-col :span="6">
                        <div class="overflowText textAlignR">招标代理服务费：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.bidAgencyServiceFee}}</div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col>
                    <div class="grid-content bg-purple-dark  ">
                        <h5 class="commonTitle col348fe2">招标文件</h5>
                    </div>
                </el-col>
            </el-row>
            <div class="third_section_text">
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">预览文件：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.previewFile}}</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText textAlignR">招标文件附件：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.tenderDocuments}}</div>
                    </el-col>
                </el-row>
            </div>
            <el-row>
                <el-col>
                    <div class="grid-content bg-purple-dark  ">
                        <h5 class="commonTitle col348fe2">澄清或变更文件</h5>
                    </div>
                </el-col>
            </el-row>
            <div class="four_section_text">
                <el-row class="information">
                    <el-col :span="6">
                        <div class="overflowText textAlignR">附件文件：</div>
                    </el-col>
                    <el-col :span="6">
                        <div class="overflowText">{{every_msg.attachement}}</div>
                    </el-col>
                </el-row>
            </div>
            <el-row class="five_section_text">
                <el-col>
                    <div class="grid-content bg-purple-dark  ">
                        <h5 class="commonTitle col348fe2">招标文件内容</h5>
                    </div>
                </el-col>
            </el-row>
            <Pdf class="pdf" ref="pdf_doc" style="height: 500px"></Pdf>
        </el-dialog>
        <!--文件列表弹框-->
    </div>
</template>
<script>
    import Pdf from './Pdf';

    export default {
        name: "now-project",
        components: {
            Pdf
        },
        data() {
            return {
                docListDialogVisible: false,//文件列表弹框
                checked1: '',
                checked2: '',
                checked3: '',
                radio1: '',
                every_msg: [],
            }
        },
        // 父组件传过来的值
        props: {
            projectBag: {
                type: Array
            },
            msg: {
                type: Array
            },
            projectMsg: {
                type: Array
            },
            unmsg: {
                type: Array
            }
        },
        mounted() {

        },
        methods: {
            /*  * 点击刷新触发* */
            refreshBtn(){
                this.$emit('refreshHttp');
            },
            beginPingbiao(val){
                this.$router.push(`/index/LetterCommitment?methodType=${val}`);
            },
            bidding_doc_btn(obj) {//招标相关文件
                console.log(obj.pdf_url);
                this.docListDialogVisible = true;
                if (obj.paymentType[0] == 0) {
                    this.checked1 = true;
                }
                if (obj.paymentType[1] == 1) {
                    this.checked2 = true;
                }
                if (obj.paymentType[2] == 2) {
                    this.checked3 = true;
                }
                this.every_msg = obj;
                setTimeout(() => {
                    this.$refs.pdf_doc.setPdf({pdfUrl: obj.pdf_url});
                    this.radio1 = $(".radioS")[obj.uploadWay].children[0].children[1].value;
                }, 1000)
            },
         }
    }
</script>

<style lang="scss">
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
                right: 254px;
            }
            img{
                display: inline-block;
                vertical-align: middle;
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
</style>