<template>
    <div class="index">
        <!--首页-->
        <el-row>
            <el-col :span="24">
                <div class="tips">
                    <p>欢迎您，<br><span class="fs16">成功登陆中招联合电子招标平台！</span></p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1">
                <el-row class="serve ">
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <i class=" icon iconfont icon-1  col606266"
                               style="margin-right: 20px;font-size: 32px;vertical-align: middle;"></i><span
                                class="col606266">客服支持：400-092-8199</span>
                        </div>
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <i class=" icon iconfont icon-2 col606266 "
                               style="margin-right: 20px;font-size: 32px;vertical-align: middle;"></i><span
                                class="col606266">客服支持：400-092-8199</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="7" style="float: left">
                            <el-row>
                                <el-col>
                                    <div class="fwb" style="font-size: 17px;margin-bottom: 30px;">
                                        稳定可靠的电子交易平台专业化顾问式的资讯平台
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="col606266" style="margin-bottom: 30px;">
                                <el-col>
                                    <div class="fwb" style="font-size: 17px;
        line-height: 1.5em;
    ">效率：符合互联网行业“快、大、好”的特点。
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="fwb" style="font-size: 17px;
        line-height: 1.5em;
    ">规则：体制内外的规则均要无条件遵守。
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="fwb" style="font-size: 17px; line-height: 1.5em;
    ">责任：从高层到每一个员工，任务贯穿工作始终。
                                    </div>
                                </el-col>
                            </el-row>
                        <el-row>
                            <el-col style=" line-height: 1.8em;">
                                <i class=" icon iconfont icon-duochucunzhichi  col606266"
                                   style="margin-right: 20px;vertical-align: middle;"></i> <span style="margin-right: 20px">工信支持</span><span  style="margin-right: 20px">强强联合</span>
                            </el-col>
                            <el-col style=" line-height: 1.8em;">
                                <i class=" icon iconfont icon-scale1  col606266"
                                   style="margin-right: 20px;vertical-align: middle;"></i> <span  style="margin-right: 20px">诚信透明</span><span  style="margin-right: 20px">公正权威</span>
                            </el-col>
                            <el-col style=" line-height: 1.8em;">
                                <i class=" icon iconfont icon-ziyuan  col606266"
                                   style="margin-right: 20px;vertical-align: middle;"></i><span  style="margin-right: 20px">资源众多</span><span  style="margin-right: 20px">客户至上</span>
                            </el-col>
                            <el-col style=" line-height: 1.8em;">
                                <i class=" icon iconfont icon-ronghepindao  col606266"
                                   style="margin-right: 20px;vertical-align: middle;"></i><span  style="margin-right: 20px">跨界融合</span><span  style="margin-right: 20px">专注极致</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="17" style="float:right">
                        <div >
                            <img src="../assets/img/index_icon.jpg" alt="" >
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'index',
        props: {}
    }
</script>
<style lang="scss">
    .index {
        background-color: #FFFFFF !important;
        padding: 20px;
        .tips {
            padding: 8px 16px;
            background-color: #ecf8ff;
            border-radius: 4px;
            border-left: 5px solid #50bfff;
            p {
                font-size: 18px;
                color: #5e6d82;
                line-height: 1.5em;
            }
        }
        .serve {
            padding: 40px 0 40px 0;
            .ml21 {

            }
        }

    }
</style>
