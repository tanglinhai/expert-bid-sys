<template>
    <div class="seeOwnTable">
        <el-row>
            <el-col :span="3">
                <div class="grid-content bg-purple-dark">
                    分包号：第6包
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-dark">
                    评标委员会：0600-1805N161/评委会
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                show-summary
                :summary-method="getSummaries"
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
                        v-for="(item,index) in tableData" :key="index" :label="item.pName">
                        <template slot-scope="scope">
                            <div>
                                <p v-for="(value,subIndex) in item.allOwn ">{{value.name}}：{{value.statu}}</p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </el-row>
            <el-row class="comnBox">
            <p>注：1.凡资格审查项中有任何一条未通过要求的投标人，即界定为无效投标人。</p>
            <p style="text-indent:26px;">2. 评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要去打 “√”，不符合要去打 “×”，结论为“合格”或“不合格”。</p>  
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData:[],
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/pqeatMsg').then(res => {
                if(res.status == 200){
                    this.tableData=res.data.pdf;
                    // console.log(this.tableData)
                }
            })
        },
        getSummaries(param){
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '结论';
                    return;
                }else if(index === 1){
                    sums[index] = '是否通过资格审查项检查';
                }else if(index === 2){
                    sums[index] = '不合格';
                }else if(index === 3){
                    sums[index] = '不合格';
                }else if(index === 4){
                    sums[index] = '合格';
                }
                
            })
            return sums;
        },
        submit(){
            this.isShow = false;
        }
    },
}
</script>

<style lang="scss">
.seeOwnTable{
    .comnBox{
        p{
            margin: 15px 0 15px 15px;
        }
    }
}
</style>
