<template>
    <div class="finish">
        <el-row class="titBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <span>校验结果</span>
                </div>
            </el-col>
        </el-row>
        <el-row style="padding:15px 0;">
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%"
                border>
                <el-table-column
                   type="index"
                   width="180">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    width="200">
                </el-table-column>
                <el-table-column
                    label="详细信息">
                    <template slot-scope="scope">
                        <div>
                            <a href="#">{{scope.row.detail}}</a>
                        </div>
                    </template>
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
            this.$axios.post('./api/finish').then(res => {
                if(res.status == 200){
                    this.tableData = res.data.data;
                }
            })
        }
    },
}
</script>

<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
.finish{
    .titBox{
        border-bottom: 1px solid #409eff;
        line-height: 40px;
    }
    @include common-el-table;
}
</style>
