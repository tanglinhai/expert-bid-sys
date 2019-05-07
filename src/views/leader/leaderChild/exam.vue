<template>
    <div class="examClild">
        <el-row class="proBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <el-col :span="7" style="color:red;font-size:15px;">我的进度：</el-col>
                    <el-col :span="17">
                        <el-progress :percentage="0"></el-progress>
                    </el-col>  
                </div>
            </el-col>
            <el-col :span="20">
                <div class="grid-content bg-purple-dark" style="text-align:right;">
                   <el-button type="primary" size="small"><i class="icon iconfont icon-zigeshenchazhuti"></i>&nbsp;个人资格审查项表</el-button>
                   <el-button type="primary" size="small" plain><i class="icon iconfont icon-ic_qualified"></i>&nbsp;全部合格</el-button>
                   <el-button type="primary" size="small"><i class="icon iconfont icon-tijiao"></i>&nbsp;全部提交</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row class="bodyBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark commonTitle" style="font-size:15px;padding:20px 0;">
                    <span class="ml3 col409">资格审查评审项：</span>
                    <span class="ml3  col409">内存大小大于8G</span>
                    <span class="ml15 mr10"> /</span>
                    <span class="ml3">审查标准：</span>
                    <span>大于等于8G</span> 
                </div>
            </el-col>
            <el-table
                :data="tableData"
                :show-header="false"
                border
            >
                <el-table-column>
                    <template slot-scope="scope">
                        <div>
                            <el-col :span="20">
                                <span>投标人：</span>
                                <span>
                                    <i class="el-icon-search"></i>
                                    {{scope.row.pName}}
                                </span>
                            </el-col>
                            <el-col :span="4" style="text-align:right;"><i class="btn_locate iconfont icon-dingwei"></i></el-col>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <div style="text-align:center;">
                            <el-radio v-model="radio" label="1">合格</el-radio>
                            <el-radio v-model="radio" label="2">不合格</el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column></el-table-column>
            </el-table>
        </el-row>
    </div>
</template>


<script>
export default {
    data() {
        return {
            radio: '',
            tableData:[],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/tableMsg').then(res => {
                if(res.status == 200){
                    this.tableData=res.data.pdf;
                }
            })
        }
    },
}
</script>


<style lang="scss">
@import '../../../assets/css/common/common.scss';
.examClild{
    .el-progress{
        line-height:inherit;
    }
    .el-progress-bar__outer{
        height: 14px !important;
    }
    .proBox{
        line-height: 47px;
        padding: 0 15xp;
    }
}
</style>
