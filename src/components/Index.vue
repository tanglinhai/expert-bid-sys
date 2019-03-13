<template>
    <div class="index">
        <!--首页-->
        <el-row>
            <el-col :span="24">
                <div class="tips ">
                    <p>欢迎您，<br><span class="fs24">成功登陆中招联合电子招标平台！</span></p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col  class="mb60">
                <el-row class="serve ">
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <i class=" icon iconfont icon-1  col606266 mr20 ver_al_m" ></i><span
                                class="col606266 fs19 ver_al_m">客服支持：400-092-8199</span>
                        </div>
                    </el-col>
                    <el-col :span="11">
                        <div class="grid-content bg-purple">
                            <i class=" icon iconfont icon-2 col606266  ver_al_m mr20"></i><span
                                class="col606266 fs19 ver_al_m">客服邮箱：zzlh@365trade.com.cn</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row >
                    <el-col :span="10"  class="fl">
                            <el-row>
                                <el-col>
                                    <div class="fwb fs20 mb50" >
                                        稳定可靠的电子交易平台专业化顾问式的资讯平台
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row class="col606266 mb40 " style="  line-height:2em;">
                                <el-col>
                                    <div class="fwb fs18" >效率：符合互联网行业“快、大、好”的特点。
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="fwb fs18" >规则：体制内外的规则均要无条件遵守。
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="fwb fs18" >责任：从高层到每一个员工，任务贯穿工作始终。
                                    </div>
                                </el-col>
                            </el-row>
                        <el-row style=" line-height: 2.3em;">
                            <el-col >
                                <i class=" icon iconfont icon-duochucunzhichi  col606266 mr20 ver_al_m"
                                  ></i> <span class="mr20 col606266 ">工信支持</span><span class="mr20 col606266 ">强强联合</span>
                            </el-col>
                            <el-col >
                                <i class=" icon iconfont icon-scale1  col606266 mr20 ver_al_m"
                                   ></i> <span  class="mr20 col606266 ">诚信透明</span><span  class="mr20 col606266 ">公正权威</span>
                            </el-col>
                            <el-col >
                                <i class=" icon iconfont icon-ziyuan  col606266 mr20 ver_al_m"
                                   ></i><span  class="mr20 col606266 ">资源众多</span><span  class="mr20 col606266 ">客户至上</span>
                            </el-col>
                            <el-col >
                                <i class=" icon iconfont icon-ronghepindao  col606266  mr20 ver_al_m"
                                  ></i><span  class="mr20 col606266 ">跨界融合</span><span  class="mr20 col606266 ">专注极致</span>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="13" class="fr" style="overflow: hidden">
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
                font-size: 28px;
                color: #5e6d82;
                line-height: 1.5em;
            }
        }
        .serve {
            padding: 60px 0 60px 0;
               i{
                   font-size: 34px;
               }
        }
    }
</style>
