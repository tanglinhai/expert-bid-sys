<template>
    <div class="review">
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" style="line-height:62px;text-align:right;">
                    <el-button size="small">
                        <i class="icon iconfont  icon-jiesuo1"></i>&nbsp;评分解锁
                    </el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                border>
                <el-table-column
                    prop="name"
                    label="评审专家"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="商务评审进度"
                    width="200">
                    <template slot-scope="scope">
                        <div>
                            <el-progress :stroke-width="8" :percentage="scope.row.sgress"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yons"
                    label="是否提交商务评审结果"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="技术评审进度"
                    width="200">
                    <template slot-scope="scope">
                        <div>
                            <el-progress :stroke-width="8" :percentage="scope.row.jgress"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yonj"
                    label="是否提交技术评审结果"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="服务评审进度"
                    width="200">
                    <template slot-scope="scope">
                        <div>
                            <el-progress :stroke-width="8" :percentage="scope.row.fgress"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yonf"
                    label="是否提交服务评审结果"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="其他评审进度"
                    width="200">
                    <template slot-scope="scope">
                        <div>
                            <el-progress :stroke-width="8" :percentage="scope.row.qgress"></el-progress>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="yonq"
                    label="是否提交其他评审结果"
                    width="200">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData:[],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/pshz').then(res => {
                if(res.status == 200){
                    this.tableData=res.data.data;
                }
            })
        }
    },
}
</script>


<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
.review{
    .el-progress-bar__inner{
        background: #67c23a;
    }
    @include common-el-table;
}
</style>
