<template>

    <div class="beginEvaluation">
        <!--开始评标页面-->
        <!--公共部分组件-->
        <evaluationcommonVue></evaluationcommonVue>
        <!--公共部分组件-->
        <div class="evaluationcommon">
            <el-collapse accordion v-model="activeNames2">
                <el-collapse-item  name="1">
                    <template slot="title">
                        <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                            <h5 class="commonTitle col348fe2 oneanonter">项目分包</h5>
                        </div>
                        <div class="bidevaluationexperts">
                            <div class="bidexpert">
                                评标专家：
                                <span>1</span>
                            </div>
                            <el-button size="small" type="primary"><i class="icon iconfont icon-zhuanjiazhuye"></i>&nbsp;&nbsp;查看推举情况</el-button>           
                        </div>
                    </template>
                    <!--表格-->
                    <div>
                        <template>
                            <el-table
                            :data="tableData"
                            :header-cell-style="getRowClass"
                            style="width: 100%">
                            <el-table-column
                                type="index"
                                label="序号"
                                width="100">
                            </el-table-column>
                            <el-table-column
                                prop="baohao"
                                label="包号"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="baoName"
                                label="包名称"
                                width="400"
                                >
                            </el-table-column>
                             <el-table-column
                                prop="baostatuss"
                                label="状态">
                            </el-table-column>
                             <el-table-column
                                label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" size="small">评标</el-button>
                                    <el-button size="small">调整评标价</el-button>
                                </template>
                            </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <!--表格-->
                </el-collapse-item>
            </el-collapse>
             <!--分页-->
            <div class="pageBox">
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
            <!--分页-->
        </div>

    </div>
</template>

<script>
    import evaluationcommonVue from '../components/publicVue/evaluationcommon.vue';
    export default {
        name: 'index',
        props: {},
        components: {
            evaluationcommonVue
        },
        data(){
            return {
                activeNames2: ['1'], //项目分包默认展开
                tableData: [{   //项目分包表格数据
                    baohao: '0635-1909N974/1',
                    baoName: '第一包',
                    baostatuss:'进行中'
                }],
                currentPage4: 1   //分页
            }
        },
        methods(){
            // getRowClass({row,column,rowIndex,columnIndex}){

            // }
        }
    }
</script>
<style lang="scss">
    .beginEvaluation {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .el-collapse,.el-collapse-item__wrap{
            border:none;
        }
        .pageBox {
            text-align: right;
            padding: 0 15px 15px 15px;
        }
        .evaluationcommon{
            margin-bottom:20px;
            .oneanonter{
                &:before{
                    margin-top:15px;
                }
            }
            .bidevaluationexperts{
                position:absolute;
                right:70px;
                .bidexpert{
                    float:left;
                    margin-right:20px;
                    span{
                        color: #da2138;
                        border:1px solid #da2138;
                        padding:2px 5px;
                    }
                }
            }
        }
    }
</style>
