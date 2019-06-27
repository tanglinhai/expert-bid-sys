<template>
    <div class="nap">
        <div v-if="state === 'newAdd'">
            <el-row class="bottomLine">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>项目信息</h5>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding:15px 0;">
                <el-form :model="form" ref="ruleForm" size="small" label-width="200px">
                    <el-form-item label=" 招标项目编号：" prop="proNum">
                        <el-col :span="5">
                            <el-input size="small" v-model="form.proNum"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label=" 招标项目名称：" prop="name">
                        <el-col :span="5">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label=" 适用法律：" prop="region">
                        <el-col :span="5">
                            <el-select v-model="form.region" placeholder="请选择活动区域" size="small" @change="changeSelect">
                                <el-option label="招标投标法" value="zbtbf"></el-option>
                                <el-option label="政府采购法" value="zfcgf"></el-option>
                                <el-option label="其他（非依法必招）" value="qt"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label=" 采购方式：" prop="type">
                        <el-col :span="5">
                            <el-select v-model="form.region1=form.options[0].value" placeholder="请选择活动区域" size="small">
                                <el-option
                                    v-for="item in form.options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label=" 项目分类：" prop="radio">
                        <el-col :span="5">
                            <el-radio v-model="form.radio" label="1">工程</el-radio>
                            <el-radio v-model="form.radio" label="2">货物</el-radio>
                            <el-radio v-model="form.radio" label="3">服务</el-radio>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-row>         
            <el-row class="bottomLine">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2">
                            <i class="icon iconfont icon-zhuanjiazhuye mr3"></i>分包信息
                        </h5>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark" style="text-align:right;">
                        <el-button size="small">导 入</el-button>
                        <el-button size="small" class="btnBg" @click="$refs.addbag.dialogVisible=true">添加分包信息</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-top:10px;">
                <el-table
                    :data="tableData"
                    v-loading="loading"
                    style="width: 100%"
                    border>
                    <el-table-column type="index"  width="50"></el-table-column>
                    <el-table-column prop="proNum" label="包编号"></el-table-column>
                    <el-table-column prop="name" label="包名称"></el-table-column>
                    <el-table-column prop="desc" label="包描述"></el-table-column>
                    <el-table-column label="投标报价类型">
                        <template slot-scope="scope">
                            <div>
                                {{scope.row.radio}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button size="small" @click="$refs.addbag.dialogVisible=true">编辑</el-button>
                                <el-button size="small" @click="removeCurren(scope.$index,tableData)">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <div v-if="state === 'newAdd' && modi === 'bagMsg'">
            <el-row class="bottomLine">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>招标文件</h5>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            :before-upload="beforeAvatarUpload"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <el-row class="bottomLine">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>其他附件</h5>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <el-row class="bottomLine">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2">
                            <i class="icon iconfont icon-zhuanjiazhuye mr3"></i>供应商信息
                        </h5>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark" style="text-align:right;">
                        <el-button size="small" class="btnBg" @click="$refs.addbidder.dialogVisible = true">添加投标人</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-top:10px;">
                <el-table
                    :data="tableData1"
                    v-loading="loading"
                    style="width: 100%"
                    border>
                    <el-table-column type="index"  width="50"></el-table-column>
                    <el-table-column prop="name" label="投标人名称"></el-table-column>
                    <el-table-column prop="tbbj" label="投标报价"></el-table-column>
                    <el-table-column label="投标文件"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button size="small">编辑</el-button>
                                <el-button size="small">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row class="bottomLine">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <h5 class="commonTitle col348fe2">
                            <i class="icon iconfont icon-zhuanjiazhuye mr3"></i>评委会信息
                        </h5>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-dark" style="text-align:right;">
                        <el-button size="small" class="btnBg" @click="$refs.addexpert.dialogVisible = true">添加专家</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row style="padding-top:10px;">
                <el-table
                    :data="tableData2"
                    v-loading="loading"
                    style="width: 100%"
                    border>
                    <el-table-column type="index"  width="50"></el-table-column>
                    <el-table-column prop="name" label="评审人员姓名"></el-table-column>
                    <el-table-column prop="phoneNum" label="联系电话"></el-table-column>
                    <el-table-column prop="id" label="证件号"></el-table-column>
                    <el-table-column prop="address" label="工作单位"></el-table-column>
                    <el-table-column prop="radio" label="人员类别">
                        <!-- <template slot-scope="scope">
                            <div>
                                <el-radio v-model="tabRadio1" label="1">评审专家</el-radio>
                                <el-radio v-model="tabRadio1" label="2">采购人代表</el-radio>
                                <el-radio v-model="tabRadio1" label="3">监标人</el-radio>
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="radio1" label="专家类别">
                        <!-- <template slot-scope="scope">
                            <div>
                                <el-radio v-model="tabRadio2" label="1">上午</el-radio>
                                <el-radio v-model="tabRadio2" label="2">技术</el-radio>
                                <el-radio v-model="tabRadio2" label="3">法律</el-radio>
                            </div>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div>
                                <el-button size="small">删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </div>
        <el-row class="bottomLine">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark" style="text-align:center;">
                    <el-button size="big" class="btnBg">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <Addbag ref="addbag" v-on:addMsg = "listenChild"></Addbag>
        <Addbidder ref="addbidder" v-on:addBid = 'listenBid'></Addbidder>
        <Addexpert ref="addexpert" v-on:addExpert = 'listenExp'></Addexpert>
    </div>
</template>

<script>
import Addbag from './leaderChild/childDialog/Addbag';
import Addbidder from './leaderChild/childDialog/Addbidder';
import Addexpert from './leaderChild/childDialog/Addexpert';
export default {
    components:{
        Addbag,
        Addbidder,
        Addexpert,
    },
    data() {
        return {
            form:{
                proNum:'',
                name:'',
                region:'zbtbf',
                region1:'',
                type:'',
                radio:'1',
                options:[
                    {label:'公开招标',value:'gkzb'},
                    {label:'邀请招标',value:'yqzb'},
                ]
            },
            tableData:[],
            tabRadio:'',
            fileList:[],
            tableData1:[],
            tabRadio1:'',
            tabRadio2:'',
            tableData2:[],
            state:'',
            modi:''
        }
    },
    mounted() {
        $(".NavCommon").hide();
        this.state = this.$route.query.statu;
        this.modi = this.$route.query.modi;
        console.log(this.form.region);
        if(this.modi)this.tableData.push(this.$store.state.curreentBagMsg);
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        listenChild(data){
            // console.log(data,'54444444444444');
            this.tableData.push(data);
            this.tableData.forEach((val,index) => {
                switch(val.radio){
                    case '1':
                        return val.radio ='单价';
                    case '2':
                        return val.radio ='总价';
                    case '3':
                        return val.radio ='折扣率';
                }
            })
        },
        listenBid(data){
            this.tableData1.push(data);
        },
        listenExp(data){
            this.tableData2.push(data);
        },
        changeSelect(val){
            if(val === 'zbtbf'){
                this.form.options=[
                    {label:'公开招标',value:'gkzb'},
                    {label:'邀请招标',value:'yqzb'},
                ]
            }else if(val === 'zfcgf'){
                this.form.options.push(
                    {label:'竞争性谈判',value:'jzxtp'},
                    {label:'询价',value:'xj'},
                    {label:'单一来源',value:'dyly'},
                    {label:'竞争性磋商',value:'jzxcs'},
                )
            }else if(val === 'qt'){
                this.form.options=[
                    {label:'公开招标',value:'gkzb'},
                    {label:'邀请招标',value:'yqzb'},
                    {label:'直接采购',value:'zjcg'},
                    {label:'谈判采购',value:'tpcg'},
                    {label:'询价',value:'xj'},
                ]
            }
        },
        removeCurren(index,row){
            this.$confirm('确定要删除此条分包吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                row.splice(index,1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        beforeAvatarUpload(file){
            const isPDF = file.type === 'application/pdf';
            if (!isPDF)this.$message.error('上传的文件只能是 PDF 格式!');
            return isPDF;
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/css/common/mixin.scss'; 
.home .WrapBig .Router{
    padding-left: 20px;
}
.nap{
    background: #fff;
    padding-right: 20px;
    padding-bottom: 20px;
    .titBox{
        line-height: 50px;
        .rightText{
            text-align: right;
        }
    }
    .bottomLine{
        border-bottom:1px dashed #d9e0e7;
        padding-bottom: 20px;
        padding-top: 20px;
    }
    @include common-el-table;
}
</style>
