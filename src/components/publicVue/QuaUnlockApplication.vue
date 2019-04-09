<template>
    <div class="changePassword">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="提出专家：" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <el-checkbox label="张三" name="type"></el-checkbox>
                    <el-checkbox label="李四" name="type"></el-checkbox>
                    <el-checkbox label="王五" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="申请原因：" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"   :loading="mydataloading" size="small"> <i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
                <el-button @click="resetForm('ruleForm')" size="small" type="primary"> <i class="icon iconfont icon-eraser mr5"  ></i>重置</el-button>
                <el-button @click="reback" size="small" type="primary"> <i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'changePrice',
        components: {},
        data() {
            return {
                dialogFormVisible: false,//调转评标价弹框
                ruleForm: {
                    type: [],
                    desc: '',
                    mydataloading: false,  //保存按钮loading
                },
                rules: {
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个提出专家', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: '请填写申请原因', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // console.log( this.$data.ruleForm);
                        this.mydataloading = true;
                        this.$axios.post('/api/save_apply_unlock', 'post', {
                            data: JSON.stringify(this.$data.ruleForm)
                        }).then(res => {
                            if (res.data.code == 200) {
                                // console.log(res.data);
                                this.mydataloading = false;
                                this.$message({
                                    type: 'success',
                                    message: '保存成功',
                                    center: true
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            reback(){
                this.$store.state.failureEnery.qualificationUnlock=false;
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .changePassword {
        .insolvProWrap {
        }
    }
</style>


