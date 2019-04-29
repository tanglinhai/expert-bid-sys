<template>
    <div class="checkProScore">
        <!----------------------查看专家个人打分表和投标人分项得分表--------------------->
            <div class="biaoba_fisrt">
                <el-row class="mb15">
                    <el-col :span="4" ><div class="grid-content bg-purple-dark">分包号：第1包</div></el-col>
                    <el-col :span="20"><div class="grid-content bg-purple-dark">专家组：0635-1909N987/1评委会 </div></el-col>
                </el-row>
                <el-table
                        :data="msgBox"
                        size="small"
                        tooltip-effect="dark"
                        border
                        class="changePriceTable"
                        el-table__header-wrapper
                        width="100%"
                       >
                    <!--show-summary-->
                    <!--:summary-method="getSummaries"-->
                    <el-table-column type="index"  label="序号" header-align="left"
                                     align="left"></el-table-column>
                    <el-table-column prop="project" header-align="left" label="项目" width="180" ></el-table-column>
                    <el-table-column prop="bidder" header-align="left" label="评审人">
                        <el-table-column
                                prop="panduan1"
                                label="张三"
                        >
                            <el-table-column   prop="panduan_1"    label="重庆网控科技发展有限公司">
                            </el-table-column>
                            <el-table-column label="普瑞太阳能有限公司" prop="panduan_2" >
                            </el-table-column>
                            <el-table-column label="夏丰热工研究院有限公司" prop="panduan_3" >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="李四" prop="panduan2" >
                            <el-table-column
                                    prop="panduan__1"
                                    label="重庆网控科技发展有限公司"
                            >
                            </el-table-column>
                            <el-table-column label="普瑞太阳能有限公司" prop="panduan__2" >
                            </el-table-column>
                            <el-table-column label="夏丰热工研究院有限公司" prop="panduan__3" >
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label="王五" prop="panduan3" >
                            <el-table-column
                                    prop="panduan___1"
                                    label="重庆网控科技发展有限公司"
                            >
                            </el-table-column>
                            <el-table-column label="普瑞太阳能有限公司" prop="panduan___2" >
                            </el-table-column>
                            <el-table-column label="夏丰热工研究院有限公司" prop="panduan___3" >
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <el-row class="mab15 textAlignC mt30">
                <el-button   type="primary" size="small"><i class="icon iconfont icon-fanhuishouye1 mr5"  ></i>返回</el-button>
            </el-row>
    </div>
</template>
<script>

    export default {
        name: 'CheckProScore',
        components: {},
        data() {
            return {
                msgBox: [{
                    project: '一、2(50.00分)',
                    finalQuotation: '1,000,000,00',
                    panduan1:"1",
                    panduan2:"1",
                    panduan3:"1",
                    panduan_1:'1',
                    panduan_2:'1',
                    panduan_3:'1',
                    panduan__1:'1',
                    panduan__2:'1',
                    panduan__3:'1',
                    panduan___1:'1',
                    panduan___2:'1',
                    panduan___3:'1',
                },
                {
                    project: '1、2(50.00分)(100.00%)',
                    finalQuotation: '1,000,000,00',
                    panduan1:"1.00",
                    panduan2:"2.00",
                    panduan3:"3.00",
                    panduan_1:'50',
                    panduan_2:'50',
                    panduan_3:'50',
                    panduan__1:'50',
                    panduan__2:'50',
                    panduan__3:'50',
                    panduan___1:'50',
                    panduan___2:'50',
                    panduan___3:'50',
                }],
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            checkProScore() {
                this.dialogVisible = true;
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '3';
                        return;
                    }else if(index === 1){
                        sums[index] = '专家个人打分';
                        return;
                    }else if(index === 2){
                        sums[index] = '1.0';
                        return;
                    }else if(index === 3){
                        sums[index] = '2.0';
                        return;
                    }else if(index === 4){
                        sums[index] = '3.0';
                        return;
                    }
                    else if(index === 5){
                        sums[index] = '1.10';
                        return;
                    }
                    else if(index === 6){
                        sums[index] = '2.20';
                        return;
                    }
                    else if(index === 7){
                        sums[index] = '3.30';
                        return;
                    }
                    else if(index === 8){
                        sums[index] = '11.00';
                        return;
                    }
                    else if(index === 9){
                        sums[index] = '22.00';
                        return;
                    }
                    else if(index === 10){
                        sums[index] = '33.00';
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

    .checkProScore {

    }
</style>


