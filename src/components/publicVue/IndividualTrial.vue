<template>
    <div class="IndividualTrial">
        <!----------------------查看个人资格审查项表--------------------->
            <div class="biaoba_fisrt">
                <el-row class="marginB15">
                    <el-col :span="3" ><div class="grid-content bg-purple-dark">分包号：第1包</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-dark">评标委员会：0635-1909N987/1评委会 </div></el-col>
                    <el-col :span="1" class="text-right"><div class="grid-content bg-purple-dark">1 </div></el-col>
                </el-row>
                <el-table
                        :data="msgBox"
                        size="small"
                        tooltip-effect="dark"
                        border
                        class="changePriceTable"
                        el-table__header-wrapper
                        :summary-method="getSummaries"
                        show-summary>
                    <el-table-column type="index"  label="序号" header-align="left"
                                     align="left"></el-table-column>
                    <el-table-column prop="evaluationFactors" header-align="left" label="评审因素"></el-table-column>
                    <el-table-column prop="bidder" header-align="left" label="投标人">
                        <el-table-column
                                prop="panduan1"
                                label="重庆网控科技发展有限公司"
                               >
                        </el-table-column>
                        <el-table-column label="普瑞太阳能有限公司" prop="panduan2" >
                        </el-table-column>
                        <el-table-column label="夏丰热工研究院有限公司" prop="panduan3" >
                        </el-table-column>
                    </el-table-column>
                </el-table>
                <div class="tips clearfix marginT10 marginB10">
                    <p  class="pull-left" style="margin-top: 4px">注：</p>
                    <p class="pull-left " style="line-height: 22px">1.凡资格审查项中有任何一条未通过要求的投标人，即界定为无效投标人。<br>
                    2. 评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要去打 “√”，不符合要去打 “×”，结论为“合格”或“不合格”。</p>
                </div>
            </div>
            <div class="biaoba_second">
                <el-row class="marginB15">
                    <el-col :span="3" ><div class="grid-content bg-purple-dark">分包号：第1包</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-dark">评标委员会：0635-1909N987/1评委会 </div></el-col>
                    <el-col :span="1" class="teright"><div class="grid-content bg-purple-dark">2 </div></el-col>
                </el-row>
                <el-table
                        :data="msgBox"
                        size="small"
                        tooltip-effect="dark"
                        border
                        class="changePriceTable"
                        el-table__header-wrapper
                        :summary-method="getSummaries"
                        show-summary>
                    <el-table-column type="index"  label="序号" header-align="left"
                                     align="left"></el-table-column>
                    <el-table-column prop="evaluationFactors" header-align="left" label="评审因素"></el-table-column>
                    <el-table-column prop="bidder" header-align="left" label="投标人">
                        <el-table-column
                                prop="panduan1"
                                label="重庆网控科技发展有限公司"
                        >
                        </el-table-column>
                        <el-table-column label="普瑞太阳能有限公司" prop="panduan2" >
                        </el-table-column>
                        <el-table-column label="夏丰热工研究院有限公司" prop="panduan3" >
                        </el-table-column>
                    </el-table-column>
                </el-table>
              <div class="tips clearfix marginT10 marginB10">
                <p  class="pull-left" style="margin-top: 4px">注：</p>
                <p class="pull-left " style="line-height: 22px">1.凡资格审查项中有任何一条未通过要求的投标人，即界定为无效投标人。<br>
                  2. 评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要去打 “√”，不符合要去打 “×”，结论为“合格”或“不合格”。</p>
              </div>
            </div>
            <el-row class="marginB15 text-center marginT30">
                <el-button   type="primary" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
            </el-row>
    </div>
</template>
<script>

    export default {
        name: 'individualTrial',
        components: {},
        data() {
            return {
                msgBox: [{
                    evaluationFactors: '联合体投标人',
                    bidder: '北京蓝天环境保护有限公司',
                    finalQuotation: '1,000,000,00',
                     panduan1:"√",
                     panduan2:"√",
                     panduan3:"√",
                }],

            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            changePrice1() {
                this.dialogVisible = true;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '结论';
                        return;
                    }else if(index === 1){
                        sums[index] = '是否通过资格审查项检查';
                        return;
                    }else if(index === 2){
                        sums[index] = '合格';
                        return;
                    }else if(index === 3){
                        sums[index] = '合格';
                        return;
                    }else if(index === 4){
                        sums[index] = '合格';
                        return;
                    }
                });
                return sums;
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .IndividualTrial{

  }
</style>


