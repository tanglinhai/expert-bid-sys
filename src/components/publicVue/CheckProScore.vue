<template>
    <div class="checkProScore">
        <!----------------------查看专家个人打分表和投标人分项得分表--------------------->
        <div class="biaoba_fisrt">
            <el-row class="mb15">
                <span>分包号：{{baohao}}[第{{to_submit_prompt_baohao}}包]</span>
                <span class="ml20">专家组：{{biaoNum}}评委会 </span>
            </el-row>
            <el-table
                    :data="zhaunjiaGerenMarkData"
                    size="small"
                    tooltip-effect="dark"
                    border
                    el-table__header-wrapper
            >
                <el-table-column
                        type="index"
                        width="50" header-align="left" fixed>
                </el-table-column>
                <el-table-column prop="evaluationFactors" header-align="left"
                                 label="项目"
                                 fixed width="165"></el-table-column>
                <el-table-column header-align="left" label="评审人">
                    <el-table-column header-align="left" :label=item.name   v-for="(item,index) in  companyNameData" :key="index">
                        <el-table-column :label="a.title"
                                         v-for="(a,i) in item.companyNameList"
                                         width="175" :key="i">
                            <tempalte slot-scope="scope">
                                <span >  {{scope.row['value' +( (i+ 1) + item.companyNameList.length * index)]}}  </span>
                            </tempalte>
                        </el-table-column>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <el-row class="mab15 textAlignC mt30">
            <el-button type="primary" size="small" @click="rebackCheckProScore"><i class="icon iconfont icon-fanhuishouye1 mr5"></i>返回</el-button>
        </el-row>
    </div>
</template>
<script>

    export default {
        name: 'CheckProScore',
        components: {},
        props: {
            zhaunjiaGerenMarkData: {
                type: Array
            },
            biaoNum: {
                type: String
            },
            baohao: {
                type: String
            },
            to_submit_prompt_baohao: {
                type: String
            },
            companyNameData: {
                type: Array
            },
            pingshenzhaunjiaData: {
                type: Array
            }
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            rebackCheckProScore(){
                this.$store.state.failureEnery.checkProScoreDialogVisible = false;
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .checkProScore {

    }
</style>


