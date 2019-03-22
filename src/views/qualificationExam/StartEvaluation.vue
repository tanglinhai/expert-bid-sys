<template>
    <div class="startEvaluation">
        <el-row class="fs14 bid_msg mb15">
            <el-col :span="4">
                <div class="grid-content bg-purple"><span>标名称：</span><span>{{name}}</span></div>
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
            <div class="line"></div>
            <el-row class="textAlignC pt30 pb30 btns_grounp">
                <el-button   :type="item.type ==1 ? 'success' :
                                item.type ==2 ? 'warning': ''"
                             round v-for="item in options"  :value="item.value"
                           >{{item.label }}</el-button>
            </el-row>
            <el-row class="center_part">
                <el-col class="left_examine  " :span="3">
                    <el-row class="div_header">
                        <el-col class="textAlignC mt20 mb15">
                            <el-button type="primary" size="small" @click="personalAuditFormBtn" class="personalAuditFormBtn">{{personalAuditFormBtn}}</el-button>
                        </el-col>
                    </el-row>
                    <!--<PersonalExamine ></PersonalExamine>-->
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
                    <el-row class=" progress_div">
                        <el-col :span="12">
                            <div class="grid-content bg-purple  cf">
                                <div style="width:110px" class="my_progress_word fl">我的进度</div>
                                <el-progress :percentage="completePercent" class="progress fl"></el-progress>
                            </div>
                        </el-col>
                        <el-row :span="10" style="padding:0px; float:right;">
                            <el-button @click="allChecked" plain size="mini" type="primary">全部合格</el-button>
                            <el-button size="mini" type="primary" @click="allSubmit">全部提交</el-button>
                        </el-row>
                    </el-row>
                    <!------------------------table1--------------------------->
                    <div class="first_warp"  v-for="(item,index) in table_data" :key="index" :id="item.name">
                        <el-row class="title_msg">
                            <el-col>
                                <div>
                                 <p class="commonTitle fs14  col65">
                                    <span class="ml3 col409">{{item.fristTableData.question}}</span><span
                                        class="ml3  col409">{{item.fristTableData.answer}}</span><span
                                        class="ml15 mr10"> /</span><span class="ml3">{{item.fristTableData.question1}}</span><span>{{item.fristTableData.answer1}}</span>
                                </p>
                                </div>
                            </el-col>
                        </el-row>
                        <el-table
                                :data="tableData"
                                border
                                style="width: 100%;"
                                class="first_table"
                                :cell-style="rowStyle" >
                            <el-table-column
                                    prop="name"
                                    label="名称">
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px"><i class="el-icon-check mr5 ver_al_m"></i>投标人：<i
                                            class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="pass"
                                    label="是否合格">
                                <template slot-scope="scope">
                                <span style="margin-left: 10px">
                                  <el-radio-group
                                          @change="failuredRadio(scope.row.radio,scope.row.id,scope.$index,'tableData')"
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
                    <!--&lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;table2&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
                    <!--<div class="second_warp">-->
                        <!--<el-row class="title_msg">-->
                            <!--<el-col>-->
                                <!--<div class="mt20">-->
                                    <!--<p class="commonTitle fs14  col65">-->
                                        <!--<span class="ml3 col409">{{secondTitle.question}}</span><span-->
                                            <!--class="ml3  col409">{{secondTitle.answer}}</span><span-->
                                            <!--class="ml15 mr10"> /</span><span class="ml3">{{secondTitle.question1}}</span><span>{{secondTitle.answer1}}</span>-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-table-->
                                <!--:data="tableData11"-->
                                <!--border-->
                                <!--style="width: 100%;"-->
                                <!--class="first_table"-->
                                <!--:cell-style="rowStyle" >-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="名称">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<span style="margin-left: 10px"><i class="el-icon-check mr5 ver_al_m"></i>投标人：<i-->
                                            <!--class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="pass"-->
                                    <!--label="是否合格">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span style="margin-left: 10px">-->
                                  <!--<el-radio-group-->
                                          <!--@change="failuredRadio(scope.row.radio,scope.row.id,scope.$index,'tableData11')"-->
                                          <!--ref="shet" v-model="scope.row.radio">-->
                                    <!--<el-radio :label="scope.row.ra1">合格</el-radio>-->
                                    <!--<el-radio :label="scope.row.ra2">不合格</el-radio>-->
                                  <!--</el-radio-group>-->
                                <!--</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="kong"-->
                                    <!--label="">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span style="margin-left: 10px">-->
                                  <!--{{scope.row.content}}-->
                                <!--</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                    <!--</div>-->
                    <!--&lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;table3-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
                    <!--<div class="third_warp">-->
                        <!--<el-row class="title_msg">-->
                            <!--<el-col>-->
                                <!--<div class="mt20">-->
                                    <!--<p class="commonTitle fs14  col65">-->
                                        <!--<span class="ml3 col409">{{thirdTitle.question}}</span><span-->
                                            <!--class="ml3  col409">{{thirdTitle.answer}}</span><span-->
                                            <!--class="ml15 mr10"> /</span><span class="ml3">{{thirdTitle.question1}}</span><span>{{thirdTitle.answer1}}</span>-->
                                    <!--</p>-->
                                <!--</div>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <!--<el-table-->
                                <!--:data="tableData22"-->
                                <!--border-->
                                <!--style="width: 100%;"-->
                                <!--class="first_table"-->
                                <!--:cell-style="rowStyle">-->
                            <!--<el-table-column-->
                                    <!--prop="name"-->
                                    <!--label="名称">-->
                                <!--<template slot-scope="scope">-->
                                    <!--<span style="margin-left: 10px"><i class="el-icon-check mr5 ver_al_m"></i>投标人：<i-->
                                            <!--class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.row.name}}</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="pass"-->
                                    <!--label="是否合格">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span style="margin-left: 10px">-->
                                  <!--<el-radio-group-->
                                          <!--@change="failuredRadio(scope.row.radio,scope.row.id,scope.$index,'tableData22')"-->
                                          <!--ref="shet" v-model="scope.row.radio">-->
                                    <!--<el-radio :label="scope.row.ra1">合格</el-radio>-->
                                    <!--<el-radio :label="scope.row.ra2">不合格</el-radio>-->
                                  <!--</el-radio-group>-->
                                <!--</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--prop="kong"-->
                                    <!--label="">-->
                                <!--<template slot-scope="scope">-->
                                <!--<span style="margin-left: 10px">-->
                                  <!--{{scope.row.content}}-->
                                <!--</span>-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                    <!--</div>-->
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
    // import PersonalExamine from '../../components/publicVue/PersonalExamine';
    import FailureEntry from '../../components/publicVue/FailureEntry';
    //树形图
    // function dblClickExpand(treeId, treeNode) {
    //     return treeNode.level > 0;
    // }
    // function zTreeOnClick(event, treeId, treeNode) {
    //     console.log(treeNode);//treeNode是这个节点的json数据
    //     if(treeNode.name=="投标人名称"){
    //
    //     }
    // };
    //树形图
    export default {
        name: "start-evaluation",
        props: {},
        components: {
            // PersonalExamine,
            FailureEntry
        },
        data() {
            return {
                page_loading: false,
                tableData:[],//table1数据
                tableData11:[],//table2，table2数据
                tableData22:[],//table2，table2数据
                fristTitle:[],
                secondTitle:[],
                thirdTitle:[],
                treeData:[],//zTree数据
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
                completePercent:0,
                table_data:[],
                   arr:[],
                   arr1:[],
                /*-------------------右侧主体部分数据-------------------*/
            }
        },
        computed: {
            completePercent(){
                let a=this.tableData11.length;
                let c=this.tableData22.length;
                let b=this.tableData.length;
                let s=a+b;
                let fillCount = 0;
                for(var i=0;i<this.tableData.length;i++){
                    if(this.tableData[i].radio){
                        fillCount++;
                    }
                }
                for(var i=0;i<this.tableData11.length;i++){
                    if(this.tableData11[i].radio){
                        fillCount++;
                    }
                }
                for(var i=0;i<this.tableData22.length;i++){
                    if(this.tableData22[i].radio){
                        fillCount++;
                    }
                }
                return Math.floor(fillCount /( this.tableData11.length + this.tableData22.length +this.tableData.length)*100);
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
            // this.$axios.post('/api/treeData').then(res => {
            //     if (res.status === 200) {
            //         this.treeData=res.data.tableData;
            //     }
            // });
            // this.$axios.post('/api/personalAuditTableData').then(res => {//zTree数据
            //         if (res.status === 200) {
            //         this.msgBox=res.data.msg;
            //     }
            // });
            // this.$axios.post('/api/treeData').then(res => {
            //     if (res.status === 200) {
            //         this.zNodes=res.data.tableData;
            //         $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);
            //     }
            // });
            setTimeout(function(){
                $("#treeDemo_1_a").addClass("curSelectedNode");
            },200);
        },
        methods: {
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/table_msg').then(res => {
                    // console.log(res.data);
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.personalAuditFormBtn = res.data.bidMsg.eviewrItemsMsg.viewnBtnName;
                        this.zNodes = res.data.bidMsg.eviewrItemsMsg.zTreeData;
                        $.fn.zTree.init($("#treeDemo"), this.setting, this.zNodes);//渲染树形图
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.table_data = res.data.bidMsg.eviewrItemsMsg.zTreeData.children;
                        // console.log(this.table_data);
                    }
                    this.page_loading = false;
                })
            },
            failuredRadio(radio, id, index, tableKey) {
                // console.log(radio, id, index, tableKey);
                var store_radio = null;
                for (var i = 0; i < this[tableKey].length; i++) {
                    if (this[tableKey][i].id == id) {
                        store_radio = this[tableKey][i];
                        // console.log(store_radio);
                        break;
                    }
                }
                if (radio == '不合格') {
                    this.$store.state.failureEnery.show = true;
                    this.idradionoprss = id;

                } else if (radio == '合格') {
                    // console.log(store_radio.content);
                    store_radio.content = ''
                }
                // this.saveStorage();
            },
            childByValue: function (childValue) {
                // childValue就是子组件传过来的值
                for (var i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id == this.idradionoprss) {
                        this.tableData[i].content = childValue;
                    }
                }
                for (var i = 0; i < this.tableData11.length; i++) {
                    if (this.tableData11[i].id == this.idradionoprss) {
                        this.tableData11[i].content = childValue;
                    }
                }
                for (var i = 0; i < this.tableData22.length; i++) {
                    if (this.tableData22[i].id == this.idradionoprss) {
                        this.tableData22[i].content = childValue;
                    }
                }
                // this.saveStorage();
                this.$store.state.failureEnery.show = false;
            },
            allChecked() {//全选
                for (var i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].radio = '合格';
                }
                for (var i = 0; i < this.tableData11.length; i++) {
                    this.tableData11[i].radio = '合格';
                }
                for (var i = 0; i < this.tableData22.length; i++) {
                    this.tableData22[i].radio = '合格';
                }
                // this.saveStorage();
            },
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    alert('1')

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
            zTreeOnClick(event, treeId, treeNode) {
                console.log(treeNode);//treeNode是这个节点的json数据
                console.log(this.table_data);
                console.log(treeNode.fristTableData);
                this.arr.push(treeNode);
                console.log(this.arr);
                this.table_data=this.arr;

            },
             dblClickExpand(treeId, treeNode) {
                return treeNode.level > 0;
            }
        }
    }
</script>

<style lang="scss">
    .startEvaluation {
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
                    height: 400px;
                    .div_header{
                        border-bottom: 1px solid #bfc8cd;
                    }
                }
                .right_warp {
                    padding-left: 15px;
                    border-radius: 5px;
                    .progress_div {
                        padding-top: 30px;
                        padding-bottom: 39px;
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
                            }
                            .el-progress-bar {
                                padding-right: 0;
                            }
                        }
                    }
                    .title_msg {
                        .commonTitle {
                            font-size: 15px !important;
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