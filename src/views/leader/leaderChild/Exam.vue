<template>
    <div class="examClild" v-loading="loadExam">
        <el-row class="proBox">
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">
                    <el-col :span="3.5" style="color:red;font-size:15px;">我的进度：</el-col>
                    <el-col :span="10">
                        <el-progress :stroke-width="12" :text-inside="true" :percentage="setPro" ref="elProgress"></el-progress>
                    </el-col>  
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-dark" style="text-align:right;">
                   <el-button type="primary" size="small" @click="$refs.pqeat.dialogVisible=true"><i class="icon iconfont icon-zigeshenchazhuti"></i>&nbsp;个人资格审查项表</el-button>
                   <el-button type="primary" size="small" plain @click="checkedAll"><i class="icon iconfont icon-ic_qualified"></i>&nbsp;全部合格</el-button>
                   <el-button type="primary" size="small" @click="allSubmit"><i class="icon iconfont icon-tijiao"></i>&nbsp;全部提交</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row class="bodyBox"> 
            <el-table
                :data="tableData"
                border
                ref="tableRef"
                @row-click="rowClick"
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
                    <el-table-column v-for="(item,index) in tableData" :key="index">
                        <template slot="header" slot-scope="scope">
                            <a v-if="item.allPdf.length <= 1" href="#" class="common_a_style overflowText">
                                <i class="el-icon-search"></i>&nbsp;
                                <span>{{item.pName}}</span>&nbsp;
                                <i class="icon iconfont icon-pdf"></i>
                            </a>
                            <el-dropdown v-else>
                                <span class="el-dropdown-link">
                                    <a href="#" class="common_a_style overflowText">
                                        <i class="el-icon-search"></i>&nbsp;
                                        <span>{{item.pName}}</span>&nbsp;
                                        <i class="icon iconfont icon-pdf"></i>&nbsp;
                                        <i class="el-icon-arrow-down el-icon--right"></i>
                                    </a>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  v-for="(stemp,index) in item.allPdf" :key="index">{{stemp}}</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <template slot-scope="scope">
                            <div v-if="scopeTemp"> 
                                <el-col :span="20">
                                    <el-radio-group v-model="radioStatu[index +'-'+ scope.$index]">
                                        <el-radio v-for="(val,subIndex) in scope.row.qualified" :label="val.statu" :key="subIndex" @change="getCurren(val.statu,scope.row,item.pName)">{{val.unStatu}}</el-radio>
                                    </el-radio-group>
                                </el-col>
                                <el-col :span="4" style="text-align:right;">
                                    <i class="iconfont icon-dingwei"></i>
                                </el-col>
                            </div>
                            <div v-else>
                                <span class="setColor" v-for="(value,key) in radioStatu[index +'-'+ scope.$index]">{{value}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <el-col :span="24" v-show="isShow">
                <div class="grid-content bg-purple-dark footTitBox">
                    审查标准：{{standard}}
                </div>
            </el-col>
        </el-row>
        <Pqeat ref="pqeat"></Pqeat>
        <el-dialog
            title="审查提示"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose"
            @open="handleOpen">
            <div class="diaLogBody">
                <p>您的资格审查-电脑硬件配置工作工作已进行 <font >[ {{gress}} ]</font>, 请确认您已经完成本包 <font>[ 1 ]</font>的资格审查-电脑硬件配置工作工作!</p>
                <p>确认后您将不能再更改资格审查-电脑硬件配置工作结果！</p>
            </div>
            <span slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="confSubmit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="不合格录入"
            :visible.sync="unQualified"
            width="700px"
            :before-close="handleClose"
            @open="handleOpen">
            <div class="diaLogBody textSty">
                <p>不合格对象：  <font >{{uncomp}}</font> 的 <font>{{unReason}}</font></p>
                <p><font>*&nbsp;</font>不合格理由：（50汉字或者100汉字之内）：</p>
                <el-input
                    type="textarea"
                    :rows="12"
                    placeholder="请填写申请原因"
                    v-model="textarea3">
                </el-input>
            </div>
            <span slot="footer">
                <el-button size="small" @click="unQualified = false">取 消</el-button>
                <el-button size="small" type="primary" @click="unQualified = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import Pqeat from './childDialog/Pqeat'
export default {
    components:{
        Pqeat,
    },
    data() {
        return {
            loadExam:true,
            radioStatu:{},
            tableData:[],
            dialogVisible:false,
            gress:'',
            unQualified:false,
            uncomp:'',
            unReason:'',
            textarea3:'',
            standard:'',
            isShow:false,
            scopeTemp:true,
            list:[],
        }
    },
    mounted() {
        this.init();
        // console.log(this.loName);
    },    
    methods: {
        init(){
            this.$axios.post('./api/tableMsg').then(res => {
                if(res.status == 200){
                    this.loadExam=false;
                    this.tableData=res.data.pdf;
                    var length=this.tableData.length;
                    for(let i = 0; i < length;i++){
                        for(let j = 0; j < length; j++){
                            this.$set(this.radioStatu,i +'-'+ j);
                        }
                    }
                }
            })
        }, 
        getCurren(val,row,pn){
            // console.log(val,row,pn)
            if(val == '不合格'){
                this.unQualified = true;
                this.uncomp = pn;
                this.unReason = row.factor;
            }
        },
        checkedAll(){
            this.$confirm('您确定要执行此操作！', '全部选中提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                center: true
            }).then(() => {
                for(let key in this.radioStatu){
                   this.radioStatu[key] = '合格';  
                }
            }).catch(() => {
                // console.log(222222222)
            });
        },
        allSubmit(){
            var issave=false;
            for(let key in this.radioStatu){
                if(this.radioStatu[key] == undefined){
                    this.$message({
                        message: '资格审查-电脑硬件配置工作评审还未完成，不能提交 资格审查-电脑硬件配置工作评审数据！',
                        type: 'error'
                    });
                    return issave=true;
                }else{
                    this.dialogVisible=true;
                    return issave=false;
                        
                }
            } 
        },
        handleOpen(){
            // console.log(this.$refs.elProgress);
            this.gress=this.$refs.elProgress.percentage + '%'; 
        },
        confSubmit(){
            console.log(this.$refs.tableRef);
            this.scopeTemp =  this.dialogVisible = false;
        },
        rowClick(rowMs){
            console.log(rowMs);
            this.isShow=true;
            this.standard=rowMs.factor;
        }
    },
    computed: {
        setPro(){
            let checkLength = 0;
            let length = 0;
            for(var i in this.radioStatu){
                if(this.radioStatu[i] == '合格' || this.radioStatu[i] == '不合格'){
                    checkLength++;
                }
                length++;
            }
            return ((checkLength / length) *100).toFixed(2);
        }
    },
}
</script>


<style lang="scss">
@import '../../../assets/css/common/common.scss';
@import '../../../assets/css/common/mixin.scss';
.el-message-box--center .el-message-box__title{
    -webkit-box-pack: left !important;
        -ms-flex-pack: left !important;
            justify-content: left !important;
}
.examClild{
    .el-progress{
        line-height:inherit;
    }
    .el-progress-bar__outer{
        height: 14px !important;
    }
    .proBox{
        line-height: 62px; 
        .el-progress-bar__innerText{
            padding-bottom: 1px;
        }
    }
    .bodyBox{
        padding: 0 !important;
        .setColor{
            color: #f00;
        } 
    }
    .diaLogBody,.el-dialog__footer{
        text-align: center;
    }
    .diaLogBody{
        p{
            line-height: 25px;
            font{
                color:#f00;
            }
        }
    }
    .textSty{
        text-align: left;
        p{
            border-top: 1px dotted  #ccc;
            line-height: 38px; 
        }
    }
    .footTitBox{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #fff6ec;
        border: 1px solid #ffdcb3;
    }
    @include common-el-table;
}
</style>