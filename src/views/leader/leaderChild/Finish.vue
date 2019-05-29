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
                            <a href="javascript:void(0)" @click="viewUnFinish(scope.row)">{{scope.row.detail}}</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
export default {
    props:{
        actv:String,
    },
    data() {
        return {
            tableData:[],
            loading:true,
        }
    },
    mounted() {
        // console.log(this.actv);
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/finish').then(res => {
                if(res.status == 200){
                    this.loading = false;
                    this.tableData = res.data.data;
                }
            })
        },
        viewUnFinish(val){
            // console.log(val);
            switch(val.id){
                case '1':
                    return this.$emit('backtoun',this.actv='cbscx');
                case '2':
                    return this.$emit('backtoun',this.actv='cslb');
                case '3':
                    return this.$emit('backtoun',this.actv='pbpz');
                case '4':
                    return this.$emit('backtoun',this.actv='pphd');
                case '5':
                    return this.$emit('backtoun',this.actv='pbff');
            }
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
