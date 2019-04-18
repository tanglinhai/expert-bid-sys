<template>
        <div class="viewSchedule">
        <!----------------------查看定档评议表--------------------->
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
                    :data="msgBox"
                    size="small"
                    tooltip-effect="dark"
                    border
                    class="changePriceTable"
                    el-table__header-wrapper
            >
                <el-table-column prop="xuhao" label="序号" header-align="left"
                                 align="left" fixed width="50"></el-table-column>
                <el-table-column prop="dafenxiang" header-align="left" label="打分项" fixed width="165"></el-table-column>
                <el-table-column header-align="left" label="投标人" >
                    <el-table-column :label="item.companyName" v-for="(item,index ) in msg"  width="160">
                        <tempalte slot-scope="scope">
                            <span  v-for="(amt,idx ) in  item.zhaunjiadata_gs">
                              <span >{{amt.zhaunjiamingcheng}}</span>： <span  >{{amt.zhaunjia1[scope.$index] }}</span>；<br>
                            </span>
                        </tempalte>
                    </el-table-column>
                </el-table-column>
                <el-table-column prop="dingDang" header-align="left" label="定档" fixed="right" width="165"></el-table-column>
            </el-table>
        </div>
        <el-row class="mb15 textAlignC mt30">
            <el-button type="primary" size="small" @click="reback"><i class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
            </el-button>
        </el-row>
    </div>
</template>
<script>

    export default {
        name: 'view-schedule',
        props: {
            msgBox: {
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

        },
        methods: {
            reback() {
                this.$store.state.failureEnery.viewSchedule = false;
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .viewSchedule {
        .biaoba_fisrt{

        }
    }
</style>



