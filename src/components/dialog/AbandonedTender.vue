<template>
    <div class="abandoned-tender">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="废标理由：" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"   placeholder="最多输入500字！" ></el-input>
        </el-form-item>
        <el-row class="textAlignC">
          <el-button type="primary" @click="submitForm('ruleForm')" size="small">确定废标</el-button>
          <el-button @click="reback" size="small">返回</el-button>
        </el-row>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "abandoned-tender",
      data() {
        return {
          ruleForm: {
            desc: ''
          },
          rules: {
            desc: [
              { required: true, message: '请填写内容废标理由!', trigger: 'blur' },
            ]
          },
          dialogGuanBi:false, //当前弹框关闭
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              console.log(this.$data.ruleForm)
              //alert('submit!');
              this.$confirm('废标后,将无法更改评审结果,确定要将本标包废标么?', '信息', {
                confirmButtonText: '确认废标',
                cancelButtonText: '不废标，返回',
                type: 'warning',
                center: true
              }).then(() => {
                this.$axios.post('/api/FeiBiao', 'post', {
                    // desc:this.$data.ruleForm.desc
                }).then(res => {
                    if (res.data.code == 200) {
                      this.$emit('sonToFather',this.dialogGuanBi);
                      this.$message({
                        message: '废标成功',
                        type: 'warning'
                      });
                      this.$data.ruleForm.desc="";
                    }
                });
              }).catch(() => {
                this.$emit('sonToFather',this.dialogGuanBi);
              });
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        reback() {
          this.$emit('sonToFather',this.dialogGuanBi);
        }
      }


    }
</script>

<style lang="scss">
.abandoned-tender{
  .el-textarea{
    .el-textarea__inner{
      min-height: 240px!important;
    }
  }
}
</style>
