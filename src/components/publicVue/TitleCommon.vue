<template>
    <el-row class="fs14 bid_msg mb15">
        <el-col :span="6">
            <div class="grid-content bg-purple"><span>标包名称：</span><span>{{name}}</span></div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple-light"><span>标包号：</span><span>{{biaoNum}}</span></div>
        </el-col>
        <el-col :span="4">
            <div class="grid-content bg-purple"><span>招标文件：</span><span><a href="http://localhost:7000/img/download.svc" download=""><b>{{projectWenjian}}<i class="icon iconfont icon-pdf"></i></b></a></span></div>
        </el-col>
        <el-col :span="10" class="fs14 textAlignR select">
            <div class="grid-content bg-purple">
                <el-dropdown @command="handleCommand">
                    <el-button type="primary" size="small">
                        <i class="icon iconfont icon-caozuo  mr3"></i>操作<i
                            class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="h">围串标分析</el-dropdown-item>
                        <el-dropdown-item command="i">否决供应商</el-dropdown-item>
                        <el-dropdown-item command="a">废标</el-dropdown-item>
                        <el-dropdown-item command="b">标中质询</el-dropdown-item>
                        <el-dropdown-item command="c">查看招标文件</el-dropdown-item>
                        <el-dropdown-item command="d">查看开标一览表</el-dropdown-item>
                        <el-dropdown-item command="e">评审结果签字</el-dropdown-item>
                        <el-dropdown-item command="f">资格审查签字</el-dropdown-item>
                        <el-dropdown-item command="g">调整评标基准价</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
        <!--否决供应商-->
            <el-dialog
                    title="否决供应商"
                    :visible.sync="dialogSupplierRejection"
                    width="1000px"
            >
                <SupplierRejection @sonToFather="dialogSupplierRejection=false"></SupplierRejection>
            </el-dialog>
        <!--否决供应商-->
        <!--围串标分析-->
            <el-dialog
                    title="围串标分析"
                    :visible.sync="dialogClusterAnalysis"
                    width="1000px"
            >
                <ClusterAnalysis @sonToFather="dialogClusterAnalysis=false"></ClusterAnalysis>
            </el-dialog>
        <!--围串标分析-->
         <!--废标弹框-->
            <el-dialog
                    title="废标"
                    :visible.sync="dialogAbandonedTender"
                    width="700px"
            >
                <AbandonedTender @sonToFather="dialogAbandonedTender=false"></AbandonedTender>
            </el-dialog>
        <!--废标弹框-->
        <!--标中质询弹框-->
            <el-dialog
                    title="标中质询信息列表"
                    :visible.sync="dialogStandardChallengeInformation"
                    width="900px"
            >
                <StandardChallengeInformation :cities="cities" :tableData="tableDataTwo"
                                              :bzzxLoading="bzzxLoading"></StandardChallengeInformation>
            </el-dialog>
        <!--标中质询弹框-->
        <!--调整评标价弹框-->
            <el-dialog
                title="投标人最新报价列表"
                :visible.sync="ChangedialogVisible"
            >
                <ChangePrice v-loading="TkOneloading" @sonToFather="sonToFather" :msgBox="ChangePriceTk"></ChangePrice>
            </el-dialog> 
        <!--调整评标价弹框-->
    </el-row>
</template>

<script>
    import ClusterAnalysis from '../../components/dialog/ClusterAnalysis';  //围串标分析
    import SupplierRejection from '../../components/dialog/SupplierRejection';  //否决供应商
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    import ChangePrice from '../../components/publicVue/ChangePrice.vue';  //调整评标基准价
    export default {
        name: "",
        data(){
            return {
               dialogClusterAnalysis:false,  //围串标分析
               dialogSupplierRejection:false,  //否决供应商
               dialogAbandonedTender: false, //废标
               dialogStandardChallengeInformation: false,//标中质询信息表
               tableDataTwo: [],
               cities: [],
               ChangedialogVisible:false,  //调整评标价弹框
               TkOneloading:true,
                ChangePriceTk:[],  //投标人最新报价列表弹框里面表格得数据
                name:'',  //标包名称
                biaoNum:'', //标包号
                projectWenjian:'',//招标文件
            }
        },
        // 父组件传过来的值
        props:{ },
        components:{
            ClusterAnalysis, //围串标分析
            SupplierRejection,//否决供应商
            AbandonedTender,//废标
            StandardChallengeInformation,//标中质询
             ChangePrice,//调整评标基准价
        },
        mounted(){
           this.ProjectInformationData();   //头部包信息
        },
        methods: {
            goto(url){ //路由
                this.$router.push({
                    path: url
                });
            },
           handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    // console.log("1")
                    this.dialogAbandonedTender = true;
                } else if (val === 'b') {//交通费标准
                    // console.log("2")
                    this.dialogStandardChallengeInformation = true;
                    this.bzzxLoading = true;
                    this.$axios.post('/api/StandardChallengeList', {}).then(res => {
                        if (res.status == 200) {
                            this.cities = res.data.cityOptions;
                            this.tableDataTwo = res.data.standList;
                            this.bzzxLoading = false;
                        }
                    })
                } else if (val === 'c') {//报销汇总表
                    this.$axios.get('/api/BiddingDocuments', {}).then(res => {
                        if (res.data.resultCode == 200) {
                            window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                        }
                    })
                } else if (val === 'd') {//报销汇总表-财政
                    this.$axios.get('/api/ListOfbidOpen', {}).then(res => {
                        if (res.data.resultCode == 200) {
                             window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                        }
                    })
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                } else if (val === 'g') {//调整评标基准价
                    //调整评标价点击事件
                    this.ChangedialogVisible = true;
                    this.TkOneloading=true;
                    //console.log(row.id)
                    //调整评标价点击弹框传值到子页面
                    this.$axios.post('/api/NewChangePrice',{
                        //id:row.id,   //点击得id
                    }).then(res=>{
                        if(res.status == 200){
                            //console.log(res.data,99999)
                        this.ChangePriceTk=res.data.msgBox;
                        this.TkOneloading=false;
                        }
                    })
                }else if(val === 'h'){  //围串标分析
                    this.dialogClusterAnalysis=true;
                }else if(val === 'i'){  //围串标分析
                    console.log(val);
                    this.dialogSupplierRejection=true;
                }
            },
            sonToFather(val){  //调整评标基准价子集得返回点击关闭事件传值
                this.ChangedialogVisible = val;
            },
            //包号，标包号，招标文件接口渲染
            ProjectInformationData(){
                this.$axios.post('/api/baoInformations','post',{
                    //id:row.id,   //点击得id
                }).then(res=>{
                    if(res.status == 200){
                        // console.log(res.data,3333333333)
                        this.name=res.data.result.name;
                        this.biaoNum=res.data.result.biaoNum;
                        this.baohao=res.data.result.baohao;
                        this.projectWenjian=res.data.result.projectWenjian;
                        this.TheCurrentStatus=res.data.result.TheCurrentStatus;
                    }
                })
                
            }
        },
        updated(){
            
        }
    }
</script>

<style  lang="scss">
    .bid_msg {
        line-height: 32px;
        .select {
            .el-dropdown {
                vertical-align: top;
            }
            .el-dropdown + .el-dropdown {
                margin-left: 15px;
            }
            .el-icon-arrow-down {
                font-size: 12px;
            }
        }
    }
</style>