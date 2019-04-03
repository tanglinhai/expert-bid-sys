<template>
    <div class="submitPrompt ">
        <el-row class="textAlignC fs14" style="line-height: 30px">您的{{name}}工作已进行 [&nbsp;<span
                class="red">{{pro_num}}%</span>&nbsp;], 请确认您已经完成本包 [&nbsp;<span class="red">{{baohao}}</span>&nbsp;]的{{name}}工作
        </el-row>
        <el-row>
            <el-row class="textAlignC fs16" style="line-height: 30px">确认后您将不能再更改{{name}}结果！</el-row>
        </el-row>
        <el-row class="textAlignC pt20">
            <el-button size="small" type="primary" @click="comfrim">确认</el-button>
            <el-button size="small" type="primary" @click="reback">返回</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "submit-prompt",
        props: {
            name: {
                type: String
            },
            pro_num: {
                type: Number
            },
            baohao: {
                type: String
            }
        },
        data() {
            return {}
        },
        methods: {
            reback() {
                this.$store.state.failureEnery.submitPrompt = false;
            },
            comfrim() {//确定提交
                this.$axios.post('/api/all_submit_confirm').then(res => {
                    if (res.status == '200') {
                        if (this.pro_num != 100.0) {
                            this.$message({
                                message: '资格审查还未完成，不能提交审查数据!',
                                center: true,
                                type: 'error',
                            });
                        } else {
                            this.$store.state.failureEnery.submitPrompt = false;
                            this.$store.state.failureEnery.flag = false;
                        }

                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .submitPrompt {

    }
</style>