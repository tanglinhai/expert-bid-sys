<template>
    <div class="failureEntry">
          <div class="failureoOject">
              不合格对象：  <span class="red">{{company_name}}</span> <span>&nbsp;&nbsp;的&nbsp;</span> <span  class=red>{{answer}}</span>
          </div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
              <el-form-item  prop="desc">
                  <label ><span  class="red">*</span>不合格理由：（50汉字或者100汉字之内）：</label>
                  <el-input type="textarea" v-model="ruleForm.desc" class="textarea"  autosize></el-input>
              </el-form-item>
              <el-form-item class="textAlignC">
                  <el-button type="primary" @click="sendToP('ruleForm')" size="small" > <i class="icon iconfont icon-baocun1 mr5" ></i> 确定</el-button>
                  <el-button @click="$store.state.failureEnery.show=false" size="small" type="primary"> <i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
              </el-form-item>
          </el-form>
    </div>
</template>
<script>

    export default {
        name: 'FailureEntry',
        components: {},
        props:{
            company_name:{
                type:String
            },
            answer:{
                type:String
            }
        },
        data() {
            return {
                ruleForm: {
                    desc: '',
                },
                rules: {
                    desc: [
                        { required: true, message: '请填写申请原因', trigger: 'blur',},
                    ]
                },
                obj:{},
            }
        },
        created() {

        },
        mounted() {

        },
        methods: {
          sendToP(formName) {
              this.obj.answer=this.answer;
              this.obj.name=this.company_name;
              this.obj.data=this.$data.ruleForm.desc;
              // console.log(this.obj);
              this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/save', 'post', {
                            data: this.obj ,
                             }).then(res => {
                            if (res.data.code == 200) {
                                this.$emit("childByValue",this.$data.ruleForm.desc);
                                this.$data.ruleForm.desc='';
                                this.$store.state.failureEnery.show = false;
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


