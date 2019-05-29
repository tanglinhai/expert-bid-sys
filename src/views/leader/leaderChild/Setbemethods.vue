<template>
    <div class="sbm" v-if="isShow">
        <el-row class="titBox">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    第一步：选择评标方法：
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    <el-select size="small" v-model="region" placeholder="综合评分法">
                        <el-option label="综合评分法" value="zhpff"></el-option>
                        <el-option label="合理低价法" value="hldjf"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="6">
                <div class="grid-content bg-purple-dark rightText">
                    第二步：定义评审办法：	
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    &nbsp;
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-dark rightText">
                    <el-button type="primary" size="small" @click="downExcel">下载excel导入模板</el-button>
                    <el-button type="primary" size="small" @click="add">增加</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-table
                :data="tableData"
                v-loading="loading"
                style="width: 100%"
                border>
                <el-table-column  width="50">
                    <template slot-scope="scope">
                        <div>   
                            <el-radio v-model="radio"></el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column type="index"  width="50"></el-table-column>
                <el-table-column
                    prop="type"
                    label="评分办法"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="coverBag"
                    label="覆盖分包"> 
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <div>
                            <el-button size="small" @click="$refs.uploadDia.dialogVisible = true">Excel导入</el-button>
                            <el-button size="small" @click="modify">修改</el-button>
                            <el-button size="small" @click="doremove">删除</el-button>
                            <el-button size="small" @click="isShow = false">编辑评分细则</el-button>
                        </div>
                    </template> 
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="footerBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <p>温馨提醒：</p>
                    <p>1.每个招标项目可以选择一种评标方法，每个分包可以设置不同的评审办法。</p>
                    <p>2.若分包的评标方法不同，请拆分成多个招标项目。</p>	
                </div>
            </el-col>
        </el-row>
        <el-row class="pageBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark rightText">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <Upload ref="uploadDia"></Upload>
        <Modify ref="modify" :addOrMod="aom"></Modify>
    </div>
    <div class="sbmEdit" v-else>
        <Editrul></Editrul>
    </div>
</template>

<script>
import Upload from './childDialog/Uploaddialog';
import Modify from './childDialog/Modify';
import Editrul from './childDialog/Editrules';
export default {
    components:{
        Upload,
        Modify,
        Editrul
    },
    data() {
        return {
            region:'',
            tableData:[],
            loading:true,
            radio:'',
            currentPage4: 4,
            aom:'',
            isShow:true,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init(){
            this.$axios.post('./api/methods').then(res => {
                if(res.status == 200){
                    this.loading = false;
                    this.tableData =res.data.data;
                }
            })
        },
        handleSizeChange(val){
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
        },
        downExcel(){
            window.open('https://test2.365trade.com.cn/jypt/download.svc?file=/data/zzxy/webfilejypt/xt_pzwj_pzwj/c83e0b45a945453c9d29506692a96aa4.xls&filename=6K_E5YiG5qCH5YeG5qih54mILnhscw==&encode=true');
        },
        doremove(){
            this.$confirm('确定要删除此信息？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                return -1;
            }).catch(() => {
                return -1;
            });
        },
        modify(){
            this.aom = 1;
            this.$refs.modify.dialogVisible = true;
        },
        add(){
            this.aom = 0;
            this.$refs.modify.dialogVisible = true;
        }
    },
}
</script>

<style lang="scss">
@import '../../../assets/css/common/mixin.scss';
@import '../../../assets/css/common/orangebtn.scss';
.sbm{
    .titBox{
        line-height: 40px;
        border-bottom: 1px solid #ebeef5;
        .rightText{
            text-align: right;
        }
    }
    .pageBox{
        padding-top: 15px;
        text-align: right;
    }
    .footerBox{
        line-height: 15px;
        color: #f00;
        font-size: 12px;
        padding-top: 15px;
    }
    @include common-el-table;
}
.sbmEdit{
    @include common-el-table;
}
</style>
