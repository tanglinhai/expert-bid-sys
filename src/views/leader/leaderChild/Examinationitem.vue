<template>
    <div class="eitem">
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <span>审查项列表</span>
                </div>
            </el-col>
            <el-col :span="20" style="text-align:right;" v-if="beFlag">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" size="small" @click="$refs.setExam.dialogVisible=true">增加</el-button>
                    <el-button type="primary" size="small" @click="delet">全部删除</el-button>
                    <el-button type="primary" size="small" @click="vsAllBag">关联所有分包</el-button>
                    <el-button type="primary" size="small" @click="previewSun">审查项预览</el-button>
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
                    prop="scys"
                    label="审查因素">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="审查类别">
                </el-table-column>
                <el-table-column
                    prop="sexy"
                    label="审查项性质">
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
                            <el-button size="small" @click="$refs.setExam.dialogVisible=true">修改</el-button>
                            <el-button size="small" @click="delet">删除</el-button>
                       </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <Setexam ref="setExam"></Setexam>
        <Preview ref="preview"></Preview>
    </div>
</template>

<script>
import Setexam from './childDialog/Setexamitem';
import Preview from './childDialog/Preview';
export default {
    components:{
        Setexam,
        Preview
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
            this.$confirm('您确定要删除当前信息吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return -1;
            }).catch(() => {
                return -1;
            });
        },
        vsAllBag(){
            this.$confirm('您确定将项目中所有审查项关联所有分包吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return -1;
            }).catch(() => {
                return -1;
            });
        },
        previewSun(){
            this.$refs.preview.dialogVisible=true;
        }
    },
}
</script>

<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
.eitem{
    .titBox{
        border-bottom: 1px solid #409eff;
        line-height: 40px;
    }
    @include common-el-table;
}
</style>

