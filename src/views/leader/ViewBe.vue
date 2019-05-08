<template>
    <div class="vbe">  
        <el-row class="onlyBtnBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button size="small" @click="$refs.abDialog.dialogVisible = true">评标异常情况</el-button>
                    <el-button size="small" @click="$refs.unDialog.dialogVisible = true">评标解锁</el-button>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%"
            class="tableBox"
            v-loading="tableLoad"
        >
            <el-table-column
                prop="name"
                label="评审专家"
                >
            </el-table-column>
            <el-table-column
                label="资格审查进度"
            >
                <template slot-scope="scope">
                    <div class="progressBox">
                        <el-progress :percentage="0"></el-progress>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                label="是否提交资格审查结果">
                <template slot-scope="scope">
                    <div>
                        <span v-if="scope.row.status == 0">未完成</span>
                        <span v-else>已完成</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <Abno ref='abDialog'></Abno>
        <Unlock ref='unDialog'></Unlock>
    </div>
</template>


<script>
import Abno from './leaderChild/Abnormal';
import Unlock from './leaderChild/Unlock'
export default {
    components:{
        Abno,
        Unlock,
    },
    data() {
        return {
            tableData:[],
            tableLoad:false,
        }
    },
    mounted() {
        $(".NavCommon").show();
        this.init();
    },
    methods: {
        init(){
            this.tableLoad=true;
            this.$axios.post('./api/viewBeMsg').then(res => {
                if(res.status == 200){
                   console.log(res);
                   this.tableLoad=false;
                   this.tableData=res.data.leaderMsg;
                }
            })
        },
    },
}
</script>


<style lang="scss">
@import '../../assets/css/common/mixin.scss';
.vbe{
    padding: 15px 20px 15px 0px;
    padding-left: 131px !important;
    .onlyBtnBox{
        text-align: right;
        padding-bottom: 15px;
    }
    .tableBox{
        border-radius: 5px;
    }
    .progressBox{
        width: 50%;
        .el-progress-bar__outer{
            height: 14px !important;
        }
    }
    // @include common-el-table;
}
</style>
