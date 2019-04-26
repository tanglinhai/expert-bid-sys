<template>
    <div class="reviewLockRequest">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="提出专家：" prop="type">
                    <el-checkbox-group v-model="ruleForm.type">
                        <el-checkbox label="张三" name="type"></el-checkbox>
                        <el-checkbox label="李四" name="type"></el-checkbox>
                        <el-checkbox label="王五" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="解锁申请类别：" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                        <el-radio label="1">商务</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="申请原因：" prop="desc">
                    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" size="small"> <i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
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
                ruleForm: {
                    type: [],
                    desc: '',
                    resource: '1',
                },
                rules: {
                    type: [
                        { type: 'array', required: true, message: '请至少选择一个提出专家', trigger: 'change' }
                    ],
                    resource: [
                        { required: true, message: '请选择活动资源', trigger: 'change' }
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
            reviewLockRequest() {
                this.dialogFormVisible = true;
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            reback(){

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .reviewLockRequest {

    }
</style>


