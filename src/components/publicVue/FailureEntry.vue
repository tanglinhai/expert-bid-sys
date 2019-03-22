<template>
    <div class="failureEntry">
          <div class="failureoOject">
              不合格对象：  <span class="coreds"> 夏丰热工研究院有限公司</span> <span>&nbsp;&nbsp;的&nbsp;</span> <span  class=coreds>符合性审查项1</span>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
              <el-form-item  prop="desc">
                  <label ><span  class="colred">*</span>不合格理由：（50汉字或者100汉字之内）：</label>
                  <el-input type="textarea" v-model="ruleForm.desc" class="textarea" ></el-input>
              </el-form-item>
              <el-form-item class="textAlignC">
                  <el-button type="primary" @click="sendToP('ruleForm')" size="small" > <i class="icon iconfont icon-baocun1 mr5"  ></i> 确定</el-button>
                  <el-button @click="reback" size="small" type="primary"> <i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
              </el-form-item>
          </el-form>
    </div>
</template>
<script>

    export default {
        name: 'FailureEntry',
        components: {},
        data() {
            return {
                ruleForm: {
                    desc: '',
                },
                rules: {
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
          sendToP(formName) {
              this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/save', 'post', {
                            data: JSON.stringify(this.$data.ruleForm.desc)
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$emit("childByValue",this.$data.ruleForm.desc);
                                this.$data.ruleForm.desc='';
                                    this.$message({
                                    type: 'success',
                                    message: '录入成功',
                                    center: true
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            reback(){

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .failureEntry {
        .failureoOject{
            line-height: 38px;
            height: 38px;
            border-top: 1px dotted #ccc;
            border-bottom: 1px dotted #ccc;
        }
        .demo-ruleForm{
           .el-textarea__inner{
               min-height: 220px!important;
           }
        }
    }
</style>


