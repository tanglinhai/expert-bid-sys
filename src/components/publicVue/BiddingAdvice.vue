<template>
    <div class="biddingAdvice">
          <el-form ref="form" :model="form" class="demo-ruleForm">
              <el-form-item class="border_div">
                  <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
              <el-form-item class="text-center">
                  <el-button type="primary" @click="save" size="small"><i class="icon iconfont icon-baocun1 mr5"  ></i>保存</el-button>
                  <el-button @click="reback" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
              </el-form-item>
          </el-form>
    </div>
</template>
<script>
    export default {
        name: 'SelectionDirector',
        components: {},
        data() {
            return {
                form: {
                    desc: `
本项目共有3家投标单位参加投标，分别是：“重庆网控科技发展有限公司、普瑞太阳能有限公司、夏丰热工研究院有限公司”。

根据招标文件确定的评分原则，评标专家们上述3家分别进行了，符合性审查和综合打分。

经过综合评分及排序， 评标结果如下：

第一中标候选人：普瑞太阳能有限公司          得分：91.13分     投标总价：人民币34.50万元
第二中标候选人：重庆网控科技发展有限公司     得分：94.13分    投标总价：人民币34.68万元
第三中标候选人：夏丰热工研究院有限公司       得分：91.13分    投标总价：人民币34.80万元

评标委员会推荐普瑞太阳能有限公司为对外经贸大学广播站改造工程项目第一中标候选人。`
                }
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            save() {
                this.$emit('savePbyj', this.form.desc);
            },
            reback() {

            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .biddingAdvice {
          .border_div {
              padding: 5px;
              border: 1px dotted #ccc;
          }
          .demo-ruleForm {
              .el-textarea__inner {
                  min-height: 220px !important;
              }
          }
    }
</style>


