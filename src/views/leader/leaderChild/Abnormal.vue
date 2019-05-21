<template>
    <div class="abnormal">
        <el-dialog
            title="tishi"
            :visible.sync="dialogVisible"
            width="800px"
            :before-close="handleClose"
            center>
            <div slot="title" class="header-title">
                <el-row class="titleBox">
                    <el-col :span="6">
                        <div class="commonTitle" style="padding-top:6px;color:#348fe2;font-weight:bold;">异常情况记录表</div>
                    </el-col>
                    <el-col :span="18" style="text-align:right;padding-right:20px;">
                        <el-button type="primary" size="mini">添加</el-button>
                        <el-button size="mini">打印</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-row class="bodyBox">
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="ycqk"
                        label="异常情况">
                    </el-table-column>
                    <el-table-column
                        prop="cljg"
                        label="处理结果" >
                    </el-table-column>
                    <el-table-column
                        prop="clcs"
                        label="处理措施">
                    </el-table-column>
                    <el-table-column
                        prop="jlr"
                        label="记录人">
                    </el-table-column>
                    <el-table-column
                        prop="jd"
                        label="监督">
                    </el-table-column>
                    <el-table-column
                        prop="yy"
                        label="原因">
                    </el-table-column>
                    <el-table-column
                        prop="bz"
                        label="备注">
                    </el-table-column>
                </el-table>
            </el-row>
            <span slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
export default {
    data() {
        return {
            tableData:[],
            dialogVisible:false,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.$axios.post('./api/ppycjl').then(res => {
                if(res.status == 200){
                    this.tableData = res.data.data;
                }
            })
        }
    },
}
</script>


<style lang="scss">
@import '../../../assets/css/common/common.scss';
.abnormal{
    .el-dialog__headerbtn{
        top:10px;
        right:10px;
    }
    .bodyBox{
        line-height:40px;
        .textRight{
            text-align: right;
        }
    }
    @include common-el-table;
}
</style>
