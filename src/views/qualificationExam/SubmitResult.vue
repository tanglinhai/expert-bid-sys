<template>
    <div class="SubmitResult">
        <el-row class="fs14 bid_msg mb15">
            <el-col :span="4">
                <div class="grid-content bg-purple"><span>111111标名称：</span><span>{{name}}</span></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light"><span>标号：</span><span>{{biaoNum}}</span></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple"><span>包号：</span><span>{{baohao}}</span></div>
            </el-col>
            <el-col :span="12" class="fs14 textAlignR select">
                <div class="grid-content bg-purple">
                    <el-dropdown @command="handleCommand">
                        <el-button type="primary" size="small"  >
                            操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">废标</el-dropdown-item>
                            <el-dropdown-item command="b">标中质询</el-dropdown-item>
                            <el-dropdown-item command="c">查看投标文件</el-dropdown-item>
                            <el-dropdown-item command="d">查看开标一览表</el-dropdown-item>
                            <el-dropdown-item command="e">评审结果签字</el-dropdown-item>
                            <el-dropdown-item command="f">资质审查签字</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <div class="mainContentWarp" v-loading="page_loading">
             <NavBar :msg="options"></NavBar>
            <el-row class="center_part">
                <el-col class="left_examine  " :span="3">
                    <el-row class="div_header">
                        <el-col class="textAlignC mt20 mb15">
                            <el-button type="primary" size="small"  class="personalAuditFormBtn">{{personalAuditFormBtn}}</el-button>
                        </el-col>
                    </el-row>
                    <el-row >
                        <h6 class="pl15  col747 pt15 pb10">审查项</h6>
                        <div class="content_wrap">
                            <div class="zTreeDemoBackground left">
                                <ul id="treeDemo" class="ztree">{{msg}}</ul>
                            </div>
                        </div>
                    </el-row>
                </el-col>
                <!--点击ztree树显示-->
                <el-col class="right_warp" :span="21">
                    <el-row class="progress_div">
                        <el-col :span="12">
                            <div class="grid-content bg-purple  cf">
                                <div style="width:122px" class="my_progress_word fl">我的进度</div>
                                <el-progress :percentage="completePercent" class="progress fl"></el-progress>
                            </div>
                        </el-col>
                        <el-row :span="10" style="padding:0px; float:right;">
                            <el-button @click="allChecked()" plain size="mini" type="primary">全部合格</el-button>
                            <el-button size="mini" type="primary" @click="allSubmit">全部提交</el-button>
                        </el-row>
                    </el-row>
                    <!------------------------table1--------------------------->
                    <div class="first_warp"  v-for="(item,index) in table_data" :key="index" :id="item.name">
                        <el-row class="title_msg">
                            <el-col>
                                <p class="commonTitle fs14  col65">
                                    <span class="ml3 col409">{{item.fristTableData.question}}</span><span
                                        class="ml3  col409">{{item.fristTableData.answer}}</span><span
                                        class="ml15 mr10"> /</span><span class="ml3">{{item.fristTableData.question1}}</span><span>{{item.fristTableData.answer1}}</span>
                                </p>
                            </el-col>
                        </el-row>
                        <el-table
                                :data="item.fristTableData.tableData"
                                border
                                style="width: 100%;"
                                class="first_table"
                                :cell-style="rowStyle" >
                            <el-table-column
                                    prop="name"
                                    label="名称">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">投标人：
                                        <a @click="check_pdf(scope.$index, scope.row)" class="common_a_style" href="/page/checkPDF/check_pdf.html" target="_blank"><i
                                                class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}</a></span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="pass"
                                    label="是否合格">
                                <template slot-scope="scope">
                                <span style="margin-left: 10px">
                                  <el-radio-group
                                          @change="failuredRadio(scope.row.radio,scope.row.id,scope.$index,item.fristTableData.tableData)"
                                          ref="shet" v-model="scope.row.radio">
                                    <el-radio :label="scope.row.ra1">合格</el-radio>
                                    <el-radio :label="scope.row.ra2">不合格</el-radio>
                                  </el-radio-group>
                                </span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="kong"
                            >
                                <template slot-scope="scope">
                                <span style="margin-left: 10px">
                                  {{scope.row.content}}
                                </span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-col>
                <!--点击个人形式审计表按钮显示-->
                <el-col class="personalAuditFormTable" :span="21">
                    <div class="FormTableTitle">
                        <span>分包号：0635-1909N987/1[第一包]</span>
                        <span>评标委员会：0635-1909N987/1评委会</span>
                    </div>
                    <!--表格-->
                    <template>
                        <el-table
                                :data="msgBox"
                                style="width: 100%">
                            <el-table-column
                                    prop="number"
                                    align="center"
                                    label="序号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="date"
                                    align="center"
                                    label="评审因素">
                            </el-table-column>
                            <el-table-column
                                    label="投标人"
                                    align="center"
                            >
                                <el-table-column
                                        prop="province"
                                        align="center"
                                        label="重庆网控科技发展有限公司">
                                </el-table-column>
                                <el-table-column
                                        prop="city"
                                        align="center"
                                        label="普瑞太阳能有限公司">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        align="center"
                                        label="夏丰热工研究院有限公司">
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                        <el-row class="fs14 table_tips" >
                            <el-col >注：1、凡资格审查项中任何一条未通过评审要求的投标人，即界定为无效投标人。
                            </el-col>
                            <el-col>2、评标委员会各成员在表格相应位置中记录各投标人是否符合要求，符合要求打"√",不符合要求打"×",结论为"合格",或"不合格"'。</el-col>
                        </el-row>
                    </template>
                </el-col>
            </el-row>
        </div>
        <el-dialog
                title="不合格录入"
                :visible.sync="$store.state.failureEnery.show"
                width="700px"
        >
            <FailureEntry @childByValue="childByValue"></FailureEntry>
        </el-dialog>
    </div>
</template>

<script>
    import FailureEntry from '../../components/publicVue/FailureEntry';
    import NavBar from '../../components/publicVue/NavBar';
    export default {
        name: "start-evaluation",
        props: {},
        components: {
            FailureEntry,
            NavBar
        },
        data() {
            return {
                page_loading: false,
                tableData:[],//table1数据
                msgBox:[] ,//个人形式审计表table数据
                idradionoprss:'',//table不合格的id
                operationType:[],
                /* -------头部包信息-----*/
                name:"",//标包名称
                biaoNum: '',
                baohao: '',
                options:[],//头部按钮
                /* -------头部包信息end-----*/
                /*-------------------左侧背景部分数据------------------*/
                personalAuditFormBtn:"",
                /* -------树形图-----*/
                setting : {   //zTree配置
                    view: {
                        dblClickExpand:this.dblClickExpand,
                    },
                    data: {
                        simpleData: {//使用的数据格式
                            enable: true
                        }
                    },
                    callback: {//点击回调函数
                        onClick: this.zTreeOnClick
                    }
                },
                zNodes:[],
                /* -------树形图end-----*/
                /*-------------------左侧背景部分end--------------------*/
                /*-------------------右侧主体部分数据-------------------*/
                // completePercent:0,
                table_data:[],
                arr:[],
                /*-------------------右侧主体部分数据-------------------*/
                obj:{},//接受每次点击的数据
                tableArr:[],//table数据
                radioArr:[],//所有table的radio
            }
        },

        mounted() {
            $("#treeDemo").on('click','#treeDemo_1_a',function(){
                $(".right_warp").show();
                $(".personalAuditFormTable").hide();
            });
            $(".personalAuditFormBtn").click(function(){
                $(".personalAuditFormTable").show();
                $(".right_warp").hide();
            });
            this.init();
            setTimeout(function(){
                $("#treeDemo_1_a").addClass("curSelectedNode");
            },200);
        },
        computed: {
            completePercent(){
                let fillCount = 0;
                for(var i=0;i<this.radioArr.length;i++){
                    if(this.radioArr[i].radio){
                        fillCount++;
                    }
                }
                return (Math.floor((fillCount /this.radioArr.length).toFixed(2)*100));
                // return ((fillCount /this.radioArr.length)*100).toFixed(1);
            }
        },
        methods: {
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/table_msg').then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.personalAuditFormBtn = res.data.bidMsg.eviewrItemsMsg.viewnBtnName;
                        this.zNodes = res.data.bidMsg.eviewrItemsMsg.zTreeData;
                        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);//渲染树形图
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.table_data = res.data.bidMsg.eviewrItemsMsg.zTreeData.children;
                        this.table_data.forEach((m,i) => {
                            this.tableArr.push(m.fristTableData.tableData);
                            m.fristTableData.tableData.forEach((x,s)=> {
                                this.radioArr.push(x)
                            })
                        })
                    }
                    this.page_loading = false;
                })
            },
            failuredRadio(radio, id, index, tableKey) {//不合格
                var store_radio = null;
                for (var i = 0; i < tableKey.length; i++) {
                    if (tableKey[i].id == id) {
                        store_radio = tableKey[i];
                        this.obj=store_radio;
                        break;
                    }
                }
                if (radio == '不合格') {
                    this.$store.state.failureEnery.show = true;
                    this.idradionoprss = id;

                } else if (radio == '合格') {
                    store_radio.content = ''
                }
            },
            childByValue: function (childValue) {       // childValue就是子组件传过来的值
                if(this.obj.id==this.idradionoprss){
                    this.obj.content=childValue;
                }
                this.$store.state.failureEnery.show = false;
            },
            allChecked() {//全选
                for (var i = 0; i < this.radioArr.length; i++) {
                    this.radioArr[i].radio = '合格';
                }
            },
            isAllFilled(){
                var isAllF = true;
                for(var i=0;i<this.radioArr.length;i++){
                    if(!this.radioArr[i].radio){
                        isAllF = false;
                        break;
                    }
                }
                return isAllF;
            },
            allSubmit(){
                if(!this.isAllFilled()){
                    this.$message({
                        message: '请选择合格/不合格',
                        center: true
                    });
                }else{
                    alert('2')
                    // this.$router.push({
                    //     path: '/operation/zjps/hldj/myQualificationsResult'
                    // })
                }
            },
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    alert('1');

                } else if (val === 'b') {//交通费标准
                    alert('0')

                } else if (val === 'c') {//报销汇总表
                    alert('2')
                } else if (val === 'd') {//报销汇总表-财政
                    alert('3')
                } else if (val === 'e') {//报销情况查询-财政
                    alert('4')
                } else if (val === 'f') {//点击修改密码
                    alert('5')
                }
            },

            /*----------------- zTree ----------------------*/
            zTreeOnClick(event, treeId, treeNode) { //treeNode是这个节点的json数据
                this.arr.push(treeNode);
                this.table_data=this.arr;
                this.arr=[];
                if(treeNode.children){
                    this.table_data=treeNode.children;
                }
                $(".right_warp").show();
                $(".personalAuditFormTable").hide();
            },
            dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            },
            /*----------------- zTree end ----------------------*/
            check_pdf(i,obj){
                // console.log(i, obj);
                this.$axios.post('/api/check_pdf','post',{
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        localStorage.setItem("checkCredential", JSON.stringify(res.data.basicMessage.url));
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    .SubmitResult {
        padding: 15px;
        background-color: #ededed;
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
        .mainContentWarp {
            background: white;
            border-radius: 5px;
            .btns_grounp {
                .el-button + .el-button {
                    margin-left: 15px;
                }
                .el-button--warning {
                    background-color: #ff6600;
                    border-color: #ff6600;
                    border: 1px solid #ff6600;
                }
                .el-button--warning:hover {
                    background: #ff8600 !important;
                }
                .el-button--warning[data-v-4774750c]:hover {
                    background: #e47932 !important;
                    border-color: #e47932 !important;
                    color: #fff !important;
                }
            }
            .line {
                border: 1px solid #e5e9ec;
                position: relative;
                top: 50px;
            }
            .center_part {
                padding: 15px;
                .left_examine {
                    background: #e4e9ec;
                    border-radius: 10px;
                    height:820px;
                    .div_header{
                        border-bottom: 1px solid #bfc8cd;
                    }
                }
                .right_warp {
                    padding-left: 15px;
                    border-radius: 5px;
                    .progress_div {
                        padding-top: 30px;
                        padding-bottom: 10px;
                        padding-left: 15px;
                        font-size: 15px;
                        .my_progress_word {
                            width: 106px;
                            color: red;
                            line-height: 14px;
                            margin-top: 2px;
                        }
                        .progress {
                            width: 280px;
                            .el-progress-bar__outer {
                                background-color: #ededed;
                                height: 15px !important;
                            }
                            .el-progress__text {
                                position: relative;
                                left: -276px;
                                color: red;
                                font-size: 15px !important;
                                /*<!--top:-17px;-->*/
                            }
                            .el-progress-bar {
                                padding-right: 0;
                            }
                        }
                    }
                    .title_msg {
                        .commonTitle {
                            font-size: 15px !important;
                            margin-top: 20px;
                        }
                        .commonTitle:before {
                            margin-top: -1px;
                            margin-bottom: 20px;
                        }
                    }
                    .first_table {
                        .el-table__header-wrapper {
                            display: none;
                        }
                    }
                }
                .personalAuditFormTable{
                    display: none;
                    padding-left: 15px;
                    border-radius: 5px;
                    .FormTableTitle{
                        margin-bottom:10px;
                        span{
                            font-size:14px;
                            margin-right:20px;
                        }
                    }
                    .table_tips{
                        line-height: 23px;
                        color: #606266;
                        border-left: 1px solid #ebeef5;
                        border-right: 1px solid #ebeef5;
                        border-bottom: 1px solid #ebeef5;
                        padding-top: 5px;
                        padding-bottom: 5px;
                    }
                }
            }
        }
    }
</style>