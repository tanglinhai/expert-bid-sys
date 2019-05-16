<template>
    <div class="qSummary">
        <div>
            <el-row class="proBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        评标委员会组长：张三
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark" style="text-align:right;">
                        <el-button size="small" v-show="isShow" @click="submit">提交</el-button>
                        <el-button size="small" v-show="isShow" @click="dialogVisible = true">查看个人资格审查项表</el-button>
                        <el-button size="small" @click="viewUrDialog = true">查看资格审查项解锁记录</el-button>
                        <el-button size="small" @click="uaDialog = true">资格审查项解锁</el-button>
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
                                    {{item.reason}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row class="comnBox">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <p>注：1、对于实质性响应项，凡资格审查项中有任何一条未通过评审要求，即界定为无效投标人。</p>
                        <p style="text-indent:26px;">2、对于非实质响应项，当启用废标设置并且未通过评审要求的项数大于最大偏离项，即界定为无效投标人。</p>
                        <p style="text-indent:26px;">3、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打“√”，不符合要求打“×”。结论为“合格”或“不合格”。</p>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" class="comnBox setBorder">
                    <p>其他说明：</p>
                    <p>(1000字以内)</p>
                </el-col>
                <el-col :span="16" style="margin-top:15px;" v-show="isShow">
                    <el-input type="textarea" v-model="textarea" maxlength="1000"></el-input>
                </el-col>
            </el-row>
            <el-dialog
                title="个人初审类活动表"
                :visible.sync="dialogVisible"
                width="1500px"
                :before-close="handleClose">
                <SeeOwn></SeeOwn>
                <span slot="footer">
                    <el-button type="primary" size="small" @click="dialogVisible = false">返回</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="解锁申请记录"
                :visible.sync="viewUrDialog"
                width="700px"
                :before-close="handleClose">
                <ViewUr></ViewUr>
                <span slot="footer">
                    <el-button type="primary" size="small" @click="viewUrDialog = false">返回</el-button>
                </span>
            </el-dialog>
            <el-dialog
                title="资格审查项汇总解锁申请"
                :visible.sync="uaDialog"
                width="700px"
                :before-close="handleClose">
                <Unlock></Unlock>
                <span slot="footer">
                    <el-button type="primary" size="small" @click="uaDialog = false">保存</el-button>
                    <el-button type="primary" size="small" @click="uaDialog = false">重置</el-button>
                    <el-button type="primary" size="small" @click="uaDialog = false">返回</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="proTaBox" v-show="false">
            <el-table
                :data="proTabData"
                style="width: 100%"
                border>
                <el-table-column
                    prop="name"
                    label="评审专家">
                </el-table-column>
                <el-table-column
                    label="资格审查项进度">
                    <template slot-scope="scope">
                        <div>
                            <el-col :span="12">
                                <el-progress :percentage="scope.row.pro" ></el-progress>
                            </el-col>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="statu"
                    label="是否提交资格审查结果">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>


<script>
import SeeOwn from './childDialog/SeeOwnTable';
import ViewUr from './childDialog/ViewUnlockRecords';
import Unlock from './childDialog/UnlockApplication';
export default {
    components:{
        SeeOwn,
        ViewUr,
        Unlock,
    },
    data() {
        return {
            tableData:[],
            textarea:'',
            isShow:true,
            dialogVisible:false,
            viewUrDialog:false,
            uaDialog:false,
            //------------
            proTabData:[],

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
            this.$axios.post('./api/proData').then(res => {
                if(res.status == 200){
                    this.proTabData = res.data.data;
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
@import '../../../assets/css/common/mixin.scss';
.qSummary{
    .proBox{
        line-height: 62px;
    }
    .comnBox{
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        font-size: 13px;
        p{
            margin: 15px 0 15px 15px;
        }
    }
    .setBorder{
        border:none;
    }
    .el-dialog__footer{
        text-align: center;
    }
    .proTaBox{
        padding-top: 15px;
        .el-progress-bar__outer{
            height: 14px !important;
        }
    }
    @include common-el-table;
}
</style>
