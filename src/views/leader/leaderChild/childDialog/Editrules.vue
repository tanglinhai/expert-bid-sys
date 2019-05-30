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
                :span-method="objectSpanMethod"
                border>
                <el-table-column label="类别">
                    <template slot-scope="scope">
                        <div>   
                            <el-input size="small" placeholder="请输入内容">
                                <i slot="suffix" class="el-input__icon iconfont icon-bianji2"></i>
                            </el-input>
                        </div>
                        <div>
                            {{scope.row.name}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="项目">
                    <template slot-scope="scope">
                        <div  class="elselect">   
                            <el-input size="small" placeholder="请输入内容" v-model="input5" class="input-with-select">
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
                           {{spanArr + ' '}}
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
                            <el-button type="primary" plain size="small" @click="add(scope.row,scope.$index)">新增打分项</el-button>
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
            tableData:[],
            input5:'',
            select:'',
            spanArr:[],
            pos:0,
        }
    },
    mounted() {
        this.init();        
    },
    methods: {
        init(){
            this.$axios.post('./api/pfxz').then(res => {
                if(res.status == 200){
                    this.tableData = res.data.data;
                    this.getSpanArr(this.tableData);
                }
            })
        },
        getSpanArr(data) {　
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0;
                }else {
                    // 判断当前元素与上一个元素是否相同
                    if(data[i].id === data[i - 1].id) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }){ 
            if (columnIndex === 0 || columnIndex === 4) {
                let _row = this.spanArr[4];
                console.log(_row,8888888)
                let _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
        add(val,index){
            this.tableData.splice(index,0,val);
        },
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
    .elselect{
        .el-select{
            width: 130px;
        }
    }
    .iconfont{
        font-size:14px;
    }
}
</style>
