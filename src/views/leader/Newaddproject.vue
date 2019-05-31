<template>
    <div class="nap">
        <el-row class="bottomLine">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>项目信息</h5>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    招标项目编号：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-input size="small"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    招标项目名称：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-input size="small"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    项目性质：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-input size="small"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    适用法律：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-select v-model="region" placeholder="请选择活动区域" size="small">
                        <el-option label="招标投标法" value="zbtbf"></el-option>
                        <el-option label="政府采购法" value="zfcgf"></el-option>
                        <el-option label="其他（非依法必招）" value="qt"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    采购方式：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-input size="small"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row class="titBox">
            <el-col :span="4">
                <div class="grid-content bg-purple-dark rightText">
                    项目分类：
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark">
                    <el-radio v-model="radio" label="1">工程</el-radio>
                    <el-radio v-model="radio" label="2">货物</el-radio>
                    <el-radio v-model="radio" label="3">服务</el-radio>
                </div>
            </el-col>
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
                <el-table-column label="包编号"></el-table-column>
                <el-table-column label="包名称"></el-table-column>
                <el-table-column label="包描述"></el-table-column>
                <el-table-column label="序号"></el-table-column>
                <el-table-column label="投标报价类型">
                    <template slot-scope="scope">
                        <div>
                            <el-radio v-model="tabRadio" label="1">单价</el-radio>
                            <el-radio v-model="tabRadio" label="2">总价</el-radio>
                            <el-radio v-model="tabRadio" label="3">折扣率</el-radio>
                        </div>
                    </template>
                </el-table-column>
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
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <h5 class="commonTitle col348fe2"><i class="icon iconfont icon-zhuanjiazhuye mr3"></i>附件</h5>
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
                        <i class="icon iconfont icon-zhuanjiazhuye mr3"></i>投标人/供应商信息
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
                <el-table-column label="投标人名称"></el-table-column>
                <el-table-column label="投标报价"></el-table-column>
                <el-table-column label="投标文件附件"></el-table-column>
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
                        <i class="icon iconfont icon-zhuanjiazhuye mr3"></i>评委会/开标一览表信息/专家组信息
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
                :data="tableData1"
                v-loading="loading"
                style="width: 100%"
                border>
                <el-table-column type="index"  width="50"></el-table-column>
                <el-table-column label="评审人员姓名"></el-table-column>
                <el-table-column label="联系电话"></el-table-column>
                <el-table-column label="证件号"></el-table-column>
                <el-table-column label="工作单位"></el-table-column>
                <el-table-column label="人员类别">
                    <template slot-scope="scope">
                        <div>
                            <el-radio v-model="tabRadio1" label="1">评审专家</el-radio>
                            <el-radio v-model="tabRadio1" label="2">采购人代表</el-radio>
                            <el-radio v-model="tabRadio1" label="3">监标人</el-radio>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="专家类别">
                    <template slot-scope="scope">
                        <div>
                            <el-radio v-model="tabRadio2" label="1">上午</el-radio>
                            <el-radio v-model="tabRadio2" label="2">技术</el-radio>
                            <el-radio v-model="tabRadio2" label="3">法律</el-radio>
                        </div>
                    </template>
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
        <el-row class="bottomLine">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <el-button size="small" class="btnBg">保存</el-button>
                </div>
            </el-col>
        </el-row>
        <Addbag ref="addbag"></Addbag>
        <Addbidder ref="addbidder"></Addbidder>
        <Addexpert ref="addexpert"></Addexpert>
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
            region:'zbtbf',
            radio:'',
            tableData:[],
            tabRadio:'',
            fileList:[],
            tableData1:[],
            tabRadio1:'',
            tabRadio2:''
        }
    },
    mounted() {
        $(".NavCommon").hide();
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
