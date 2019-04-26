<template>
    <div class="IndividualTrial">
        <!----------------------查看个人资格审查项表--------------------->
        <!--<div class="biaoba_fisrt" v-for='(item,index) in msgBox'>-->
            <!--{{item.data}}-->
            <!--<el-row class="mb15">-->
                <!--<el-col :span="3">-->
                    <!--<div class="grid-content bg-purple-dark">分包号：{{item.bagName}}</div>-->
                <!--</el-col>-->
                <!--<el-col :span="20">-->
                    <!--<div class="grid-content bg-purple-dark">评标委员会：{{item.groupName}}</div>-->
                <!--</el-col>-->
                <!--<el-col :span="1" class="textAlignR">-->
                    <!--<div class="grid-content bg-purple-dark">{{index+1}}</div>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<el-table-->
                    <!--:data="msgBox"-->
                    <!--size="small"-->
                    <!--tooltip-effect="dark"-->
                    <!--border-->
                    <!--class="changePriceTable"-->
                    <!--el-table__header-wrapper-->
                    <!--:summary-method="getSummaries"-->
                    <!--show-summary>-->
                <!--<el-table-column type="index" label="序号" header-align="left"-->
                                 <!--align="left"></el-table-column>-->
                <!--<el-table-column prop="evaluationFactors" header-align="left" label="评审因素"></el-table-column>-->
                <!--<el-table-column header-align="left" label="投标人" >-->
                    <!--<el-table-column   prop="panduan1"  :label="item" v-for="(item,index ) in msg" >-->
                    <!--</el-table-column>-->
                <!--</el-table-column>-->
            <!--</el-table>-->
            <!--<div class="tips cf mt10 mb10">-->
                <!--<p class="fl" style="margin-top: 4px">注：</p>-->
                <!--<p class="fl " style="line-height: 22px">1.凡资格审查项中有任何一条未通过要求的投标人，即界定为无效投标人。<br>-->
                    <!--2. 评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要去打 “√”，不符合要去打 “×”，结论为“合格”或“不合格”。</p>-->
            <!--</div>-->
        <!--</div>-->
        <div class="biaoba_fisrt" >
             <el-row class="mb15">
                <el-col :span="3">
                    <div class="grid-content bg-purple-dark">分包号：{{title_data.bagName}}</div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark">评标委员会：{{title_data.groupName}}</div>
                </el-col>
            </el-row>
            <el-table
                    :data="msgBoxData"
                    size="small"
                    tooltip-effect="dark"
                    border
                    class="changePriceTable"
                    el-table__header-wrapper
                    >
                <el-table-column prop="xuhao" label="序号" header-align="left"
                                 align="left" fixed width="50"></el-table-column>
                <el-table-column prop="evaluationFactors" header-align="left" label="评审因素" fixed width="165"></el-table-column>
                <el-table-column header-align="left" label="投标人" >
                    <el-table-column :label="item.companyName" v-for="(item,index ) in msg"  width="160">
                        <tempalte slot-scope="scope">
                            <span  v-for="(amt,idx ) in  item.zhaunjiadata_gs">
                              <span >{{amt.zhaunjiamingcheng}}</span>： <span  >{{amt.zhaunjia1[scope.$index] }}</span>；<br>
                            </span>
                        </tempalte>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="tips cf mt10 mb10">
                <p class="fl" style="margin-top: 4px">注：</p>
                <p class="fl " style="line-height: 22px">1.凡资格审查项中有任何一条未通过要求的投标人，即界定为无效投标人。<br>
                    2. 评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要去打 “√”，不符合要去打 “×”，结论为“合格”或“不合格”。</p>
            </div>
        </div>
        <el-row class="mb15 textAlignC mt30">
            <el-button type="primary" size="small" @click="reback"><i class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
            </el-button>
        </el-row>
    </div>
</template>
<script>

    export default {
        name: 'individualTrial',
        components: {},
        props: {
            msgBoxData: {
                type: Array,
            },
            msg:{
                type: Array,
            },
            title_data:{
                type: Array,
            }
        },
        data() {
            return {

            }
        },
        created() {
        },
        mounted() {
            $(" tr:last-child .cell").css(' padding-right',0)
            // $(" tr .cell:last-child").css(' padding-left',0);
            // $(" tr .cell:last-child").css(' padding-left',0);

        },
        methods: {
            changePrice1() {
                this.dialogVisible = true;
            },
            // getSummaries(param) {
            //     const {columns, data} = param;
            //     const sums = [];
            //     columns.forEach((column, index) => {
            //         if (index === 0) {
            //             sums[index] = '结论';
            //             return;
            //         } else if (index === 1) {
            //             sums[index] = '是否通过资格审查项检查';
            //             return;
            //         } else if (index === 2) {
            //             sums[index] = '合格';
            //             return;
            //         } else if (index === 3) {
            //             sums[index] = '合格';
            //             return;
            //         } else if (index === 4) {
            //             sums[index] = '合格';
            //             return;
            //         }
            //     });
            //     return sums;
            // },
            reback() {
                this.$store.state.failureEnery.individualTrial = false;
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .IndividualTrial {
        .biaoba_fisrt{
            /*.style1{*/

                    /*padding-right: 0!important;*/
                    /*padding-left: 0!important;*/
                    /*z-index: 999;*/


            /*}*/
            /*.style2{*/

                    /*padding-right: 10px !important;*/
                    /*padding-left: 10px!important;*/
                    /*z-index: 999;*/

            /*}*/


        }

    }
</style>


