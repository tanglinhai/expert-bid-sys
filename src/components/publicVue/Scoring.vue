<template>
    <div class="Scoring">
        <el-row class="failureEntryDialog">
                <el-table
                        ref="multipleTable"
                        :data="msgBox"
                        size="small"
                        tooltip-effect="dark"
                        border
                        class="changePriceTable"
                        el-table__header-wrapper>
                    <el-table-column prop="name" header-align="left" label="投标人名称" width="250px"></el-table-column>
                    <el-table-column prop="toubiaoPrice" header-align="left" label="投标报价（元）"></el-table-column>
                    <el-table-column prop="evaluationBid" header-align="left" label="评标价（元）"></el-table-column>
                    <el-table-column prop="standardPrice" header-align="left" label="基准价（M）"></el-table-column>
                    <el-table-column prop="beitaValue" header-align="left" label="β（%）"></el-table-column>
                    <el-table-column prop="scoringSystem" header-align="left" label="系统计算得分"></el-table-column>
                    <el-table-column prop="expertConfirmScore" header-align="left" label="专家确认得分" width="220px">
                        <template slot-scope="scope">
                            <el-row class="clearfix">
                                    <el-input size="small" :value="scope.row.score" class="pull-left" style="width:169px"></el-input>
                               <div class="coreds pull-left text-center marginT5" style="width:25px;">&nbsp;*</div>
                            </el-row>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row class="coreds lin-height35">
                   提示：报价得分、计算基准价由系统根据招标文件中设定的计算方法自动生成。
                </el-row>
                <el-row class="text-center marginT30">
                        <el-button @click="acceptanceSystemScor" size="small" type="primary"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>接受系统计算得分</el-button>
                        <el-button @click="sumbit" size="small" type="primary"><i class="icon iconfont icon-tijiao mr5"  ></i>提交</el-button>
                        <el-button @click="reback" size="small" type="primary"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
                </el-row>
        </el-row>
    </div>
</template>
<script>
    export default {
        name: 'Scoring',
        components: {},
        data() {
            return {
                msgBox: [
                    {
                        toubiaoPrice: '31,000,00',
                        name: '夏丰热工研究院有限公司',
                        evaluationBid: '31,000,00',
                        standardPrice:'30,000,00',
                        beitaValue:'-10.00',
                        scoringSystem:'52.2',
                        score: ''
                    },{
                    toubiaoPrice: '28,000,00 ',
                    name: '普瑞太阳能有限公司',
                    evaluationBid: '28,000,00',
                    standardPrice:'30,000,00',
                    beitaValue:'-20.00',
                    scoringSystem:'45.2',
                        score: ''
                }, {
                    toubiaoPrice: '30,000,00',
                    name: '夏风热工研究有限公司',
                    evaluationBid: '30,000,00',
                    standardPrice:'30,000,00',
                    beitaValue:'-0.00',
                    scoringSystem:'53',
                        score: ''
                }],
            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            scoring() {
                this.dialogVisible = true;
            },
            sumbit() {
                var isNotFilled = false;
                for(var i=0;i<this.msgBox.length;i++){
                    if(!$.trim(this.msgBox[i].score)){
                        isNotFilled = true;
                        break;
                    }
                }
                if(isNotFilled)
                    this.$message('请先填写计算得分或者接受系统计算得分！');
                else
                    this.$emit("calcScore",this.msgBox);
            },
            reback() {

            },
          acceptanceSystemScor(){
            for(var i=0;i<this.msgBox.length;i++){
                this.msgBox[i].score = this.msgBox[i].scoringSystem;
            }
          }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .Scoring {
        .failureEntryDialog {
            .failureoOject {
                line-height: 38px;
                height: 38px;
                border-top: 1px dotted #ccc;
                border-bottom: 1px dotted #ccc;
            }
            .dijilun {
                line-height: 38px;
                height: 38px;
                border-bottom: 1px dotted #ccc;
                margin-bottom: 25px;
            }
        }
    }
</style>


