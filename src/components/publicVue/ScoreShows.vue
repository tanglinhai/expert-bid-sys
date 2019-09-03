<template>
    <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label=" 评分说明： " prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item class="mb15 textAlignC mt30 el-row" style="margin-left: -50px">
                <el-button type="primary" @click="saveForm('ruleForm')" size="small">保存</el-button>
                <el-button @click="rebackForm('ruleForm')" size="small" type="primary">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "score-shows",
        data() {
            return {
                ruleForm: {
                    desc: ''
                },
                rules: {
                     desc: [
                        { required: true, message: '请填写活动形式', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            saveForm(formName) {
                console.log( this.$data.ruleForm.desc);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/saveEditor', 'post', {
                            data: this.$data.ruleForm.desc ,
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$emit("childByValue",this.$data.ruleForm.desc);
                                this.$data.ruleForm.desc='';
                                this.$store.state.failureEnery.ScoreShows = false;
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功',
                                    center: true,
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            rebackForm(formName) {
                this.$store.state.failureEnery.ScoreShows = false;
                this.ruleForm.desc='';
            }
        }
    }
</script>

<style lang="scss">

</style>