<template>
    <div class="editrules">
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <span>编辑评分细则</span>
                </div>
            </el-col>
            <el-col :span="20" style="text-align:right;">
                <div class="grid-content bg-purple-dark">
                    <el-button type="primary" size="small">保存</el-button>
                    <el-button class="AnowBtn" size="small">新增类别</el-button>
                    <el-button size="small">评分预览</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                border>
                <el-table-column label="类别">
                    <template slot-scope="scope">
                        <div>   
                            <el-input size="small" placeholder="请输入内容">
                                <i slot="suffix" class="iconfont icon-bianji2"></i>
                            </el-input>
                        </div>
                        <div>
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="项目">
                    <template slot-scope="scope">
                        <div>   
                            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                                <el-select v-model="select" slot="append" placeholder="请选择">
                                    <el-option label="餐厅名" value="1"></el-option>
                                    <el-option label="订单号" value="2"></el-option>
                                    <el-option label="用户电话" value="3"></el-option>
                                </el-select>
                            </el-input>
                        </div>
                        <div>
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="评分因素">
                    <template slot-scope="scope">
                        <div>   
                           
                        </div>
                        <div>
                           
                        </div>
                    </template>
                </el-table-column>
                <el-table-column 
                    label="一致性打分项" 
                    type="selection">
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button size="small">删除</el-button>
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
            tableData:[
                {name:'商务'}
            ],
            input5:'',
            select:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.editrules{
    .titBox{
        border-bottom: 1px solid #409eff;
        line-height: 40px;
        .AnowBtn{
            margin-left: 10px;
        }
    }
}
</style>
