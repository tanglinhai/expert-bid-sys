<template>
    <div class="configuration">
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <span>评标配置</span>
                </div>
            </el-col>
            <el-col :span="20" style="text-align:right;">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" size="small">确认</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>资格审查操作人：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">评标委员会</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>其他性审查操作人：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">评标委员会</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>评委评审分工：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark rightText">
                            商务类：
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-dark">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark rightText">
                            法律类：
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-dark">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark rightText">
                            技术类：
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-dark">
                            &nbsp;
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple-dark rightText">
                            招标人代表：
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grid-content bg-purple-dark">
                            &nbsp;
                        </div>
                    </el-col>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>汇总类评审活动操作人：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">评标委员会组长</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>初审项评判原则：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">全数通过</el-radio>
                    <el-radio v-model="radio1" label="3">简单多数</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>非实质性响应项废标设置：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio2" label="on">启用</el-radio>
                    <el-radio v-model="radio2" label="off">不启用</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight" v-if="radio2 == 'on'">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>一般参数允许偏离的最高项数：
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <el-input size="small"></el-input>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-dark">项</div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>是否允许算术错误的调整：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">不允许</el-radio>
                    <el-radio v-model="radio1" label="3">允许</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>是否允许技术类专家查看报价：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">不允许</el-radio>
                    <el-radio v-model="radio1" label="3">允许</el-radio>
                </div>
            </el-col>
        </el-row>
        <el-row class="inHeight">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    <font style="color:red;">*&nbsp;</font>专家打分页面是否显示价格得分：
                </div>
            </el-col>
            <el-col :span="18">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio1" label="3">不显示</el-radio>
                    <el-radio v-model="radio1" label="3">显示</el-radio>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio1:'',
            radio2:'off'
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.configuration{
    .titBox{
            border-bottom: 1px solid #409eff;
            line-height: 40px;
    }
    .inHeight{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
