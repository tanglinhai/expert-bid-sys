<template>

    <div class="Allinformation cf" v-loading="pageLoading">
        <!--开始评标页面-->
        <!--公共部分组件-->
        <evaluationcommonVue :NoClick="NoClick" :PorjectName="PorjectName" :ProjectBianhao="ProjectBianhao" :projectZiliao="projectZiliaoList" :projectChaxun="projectChaxunList" :projectLeiFenxi="projectLeiFenxiList" :projectYinjianFenxi="projectYinjianFenxiList"></evaluationcommonVue>
        <!--公共部分组件-->
        <div class="evaluationcommon mt20 cf">
            <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                <h5 class="commonTitle col348fe2 oneanonter">推举评委会主人第1轮</h5>
            </div>
           <template>
                <el-table
                class="mt20 cf"
                :data="NumberRounddatas"
                style="width: 100%">
                    <el-table-column
                        prop="zuanjiaName"
                        label="专家姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="depiaoshu"
                        label="得票数"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="zjhao"
                        label="证件号">
                    </el-table-column>
                    <el-table-column
                        prop="danwei"
                        label="单位">
                    </el-table-column>
                    <el-table-column
                        prop="caozuo"
                        label="操作">
                        <template slot-scope="scope">
                            <div v-if="scope.row.caozuo==1">
                                <el-button size="small"><i class="icon iconfont icon-Viconzq-"></i>&nbsp;推举</el-button>
                            </div>
                            <div v-if="scope.row.caozuo==2">
                                未签到
                            </div>
                           
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination
                class="fr mt10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ChakanPage1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
            
        </div>

       

    </div>
</template>

<script>
    import evaluationcommonVue from '../../components/publicVue/evaluationcommon.vue';

    export default {
        name: 'index',
        props: {},
        components: {
            evaluationcommonVue
        },
        data(){
            return {
                NoClick:0, //0不可点，1可点
                pageLoading:true,  //loading
                projectZiliaoList:[],  //项目资料列表
                projectChaxunList:[],  //招标文件查看
                projectLeiFenxiList:[], //雷同性分析
                projectYinjianFenxiList:[], //硬件特征码防串围标分析
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                ChakanPage1:1,  //分页
                
                NumberRounddatas:[],  //推举评委会主人第几轮
                        
                }
        },
        mounted(){
            this.ProjectZiliao(); //项目，资料，分析，硬件分析查看
            this.tuijuData(); //推举评委会主人第1轮
        },
        methods:{
            goto(url){//开始评标
               this.$router.push({
                    path: url
                 });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //项目，资料，分析，硬件分析查看
            ProjectZiliao(){   
                this.$axios.post('/api/ProjectZiliao',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data)
                        this.pageLoading=false;
                        this.projectZiliaoList=res.data.projectZiliao;
                        this.projectChaxunList=res.data.projectChaxun;
                        this.projectLeiFenxiList=res.data.projectLeiFenxi;
                        this.projectYinjianFenxiList=res.data.projectYinjianFenxi;
                        this.PorjectName=res.data.PorjectName;
                        this.ProjectBianhao=res.data.ProjectBianhao;
                        $(".el-collapse-item__wrap").hide()
                        setTimeout(function(){
                            $(".el-collapse-item__wrap").show()
                        },50)
                    }
                })
            },

            //推举评委会主人第1轮
            tuijuData(){
                this.$axios.post('/api/WheelPushing',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data)
                        this.NumberRounddatas=res.data.leaderList
                    }
                })
            }

        }
    }
</script>
<style lang="scss">
    .Allinformation {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .ApplyAvoid {
            .demo-ruleForm{
                .el-textarea__inner{
                    min-height: 120px!important;
                }
            }
        }
    }
</style>
