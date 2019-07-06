<template>
    <div class="category">
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <span>初审类别设置</span>
                </div>
            </el-col>
            <el-col :span="20" style="text-align:right;" v-if="beFlag">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" size="small" @click="$refs.addcate.dialogVisible=true">添加</el-button>
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
                <el-table-column
                   type="index">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="审查类别名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="审查类别">
                </el-table-column>
                <el-table-column
                    prop="vsbag"
                    label="关联的分包">
                </el-table-column>
                <el-table-column
                    label="操作" 
                    v-if="beFlag">
                    <template slot-scope="scope">
                        <div>   
                            <el-button size="small" @click="$refs.addcate.dialogVisible=true">修改</el-button>
                            <el-button size="small" @click="delet">删除</el-button>
                       </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-col :span="24" style="color:red;padding-top:15px;font-size:12px;">
                * 其他审查指的是除资格审查外的初审类别，如：符合性审查项、形式评审、响应性评审等。
            </el-col>
        </el-row>
        <Addcate ref="addcate"></Addcate>
        <Sort ref="sort"></Sort>
    </div>
</template>

<script>
import Addcate from './childDialog/Addcate';
import Sort from './childDialog/Sort';
import { constants } from 'crypto';
export default {
    components:{
        Addcate,
        Sort,
    },
    data() {
        return {
            tableData:[],
            loading:true,
            beFlag:eval(window.localStorage.getItem('beFlag')),
        }
    },
    mounted() {
        this.init();
        // console.log(typeof this.beFlag,';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
    },
    methods: {
        init(){
            this.$axios.post('./api/category').then(res => {
                if(res.status == 200){
                    this.loading=false,
                    this.tableData=res.data.data;
                } 
            })
        },
        delet(){
            this.$confirm('初步审查项有与此类别的关联数据，请先删除初步审查项的相关数据！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return -1;
            }).catch(() => {
                return -1;
            });
        }
    },
}
</script>

<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
.category{
    .titBox{
        border-bottom: 1px solid #409eff;
        line-height: 40px;
    }
    @include common-el-table;
}
</style>
