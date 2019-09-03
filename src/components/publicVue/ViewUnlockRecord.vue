<template>
    <div class="ViewUnlockRecord">
        <el-row class="lin-height35">
             <div  class="mb20">
                <p>{{title_mg}}</p>
                 <template>
                     <el-table
                             :data="msg"
                             border
                             stripe="true"
                             style="width: 100%">
                         <el-table-column
                                 type="index"
                                 width="50">
                         </el-table-column>
                         <el-table-column
                                 prop="applicantPeole"
                                 label="申请人"
                                 width="130">
                         </el-table-column>
                         <el-table-column
                                 prop="applicantReason"
                                 label="申请原因"
                                 width="180">
                         </el-table-column>
                         <el-table-column
                                 prop="applicantTime"
                                 label="申请时间"
                                 width="180">
                         </el-table-column>
                         <el-table-column
                                 prop="unlockObject"
                                 label="解锁对象"
                                 width="130">
                         </el-table-column>
                         <el-table-column
                                 prop="unlockReason"
                                 label="解锁理由">
                         </el-table-column>
                         <el-table-column
                                 prop="assessingOfficer"
                                 label="审批人">
                         </el-table-column>
                         <el-table-column
                                 prop="assessingResult"
                                 label="审批结果">
                         </el-table-column>
                     </el-table>
                 </template>
            </div>
        </el-row>
        <el-row class="textAlignC mt20">
            <el-button size="small" type="primary" @click="reback">返回</el-button>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: 'ViewUnlockRecord',
        components: {},
        props: {
            msg: {
                type: Array
            },
            title_mg:{
                type: Array
            },
        },
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        created() {  },
        mounted() {  },
        methods: {
            reback() {
                this.$store.state.failureEnery.unlock_record = false;
            }
        }
    }
</script>

<style lang="scss">
</style>
