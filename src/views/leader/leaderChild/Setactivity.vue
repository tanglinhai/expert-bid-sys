<template>
    <div class="activity">
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <span>详细评审活动</span>
                </div>
            </el-col>
            <el-col :span="20" style="text-align:right;">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" size="small" @click="$refs.activ.dialogVisible=true">增加</el-button>
                    <el-button type="primary" size="small" @click="$refs.sort.dialogVisible=true">排序</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="padding:15px 0;">
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%"
                border>
                <el-table-column>
                    <template slot-scope="scope">
                        <div>   
                            <el-radio v-model="radio1" label="3">可偏离项</el-radio>
                       </div>
                    </template>
                </el-table-column>
                <el-table-column
                   type="index">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="活动名称">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="包含详细评审类别">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <div>   
                            <el-button size="small" @click="$refs.setExam.dialogVisible=true">修改</el-button>
                            <el-button size="small" @click="delet">删除</el-button>
                       </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <Activ ref="activ"></Activ>
        <Sort ref="sort"></Sort>
    </div> 
</template>

<script>
import Activ from './childDialog/Activitydialog';
import Sort from './childDialog/Sort'
export default {
    components:{
        Activ,
        Sort,
    },
    data() {
        return {
            tableData:[],
            radio1:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>


<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
.activity{
    .titBox{
            border-bottom: 1px solid #409eff;
            line-height: 40px;
    }
    @include common-el-table;
}
</style>
