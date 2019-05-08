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
            <el-table
                :data="tableData"
                border
            >
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="factor"
                    label="评审因素">
                </el-table-column>
                 <el-table-column
                    label="投标人">
                    <el-table-column
                        v-for="(item,index) in tableData" :key="index">
                        <template slot="header" slot-scope="scope">
                            <a v-if="item.allPdf.length <= 1" href="#" class="common_a_style overflowText">
                                <i class="el-icon-search"></i>&nbsp;
                                <span>{{item.pName}}</span>&nbsp;
                                <i class="icon iconfont icon-pdf"></i>
                            </a>
                            <el-dropdown v-else>
                                <span class="el-dropdown-link">
                                    <a href="#" class="common_a_style overflowText">
                                        <i class="el-icon-search"></i>&nbsp;
                                        <span>{{item.pName}}</span>&nbsp;
                                        <i class="icon iconfont icon-pdf"></i>
                                    </a>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  v-for="(stemp,index) in item.allPdf" :key="index">{{stemp}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <template slot-scope="scope">
                            <div>
                                <el-radio v-model="radio" label="1">合格</el-radio>
                                <el-radio v-model="radio" label="2">不合格</el-radio>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
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
                    console.log(this.tableData)
                }
            })
        }, 
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
        line-height: 62px;
    }
    .bodyBox{
        padding: 0 !important; 
    }
}
</style>
