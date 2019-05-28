<template>
    <div class="modify">
         <el-dialog
            :title="diaTitle"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose"
            @open="openDia">
            <div class="blockShow">
                 <span>办法基本信息</span>
            </div>
            <el-row class="titBox">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <span><i style="color:#f00">*&nbsp;</i>办法名称：</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" placeholder="评分标准"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <span><i style="color:#f00">*&nbsp;</i>去掉最低最高分：</span>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <el-select v-model="region" size="small"> 
                            <el-option label="不去" value="bq"></el-option>
                            <el-option label="去掉(按打分项)" value="shanghai"></el-option>
                            <el-option label="去掉(按总分)" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="1.5" v-if="region !== 'bq'">
                    <div class="grid-content bg-purple-dark rightText">
                        去掉
                    </div>
                </el-col>
                <el-col :span="4" v-if="region !== 'bq'">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
                <el-col :span="4" v-if="region !== 'bq'">
                    <div class="grid-content bg-purple-dark">
                        个最低最高分
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <span>备注：</span>
                        <div>500个汉字，1000个字符(注:每个汉字占两个字符)</div>
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-dark">
                        <el-input type="textarea" v-model="desc" :rows="5"></el-input>
                    </div>
                </el-col>
            </el-row>
            <div class="blockShow">
                 <span>评分权重设置</span>
            </div>
            <el-row class="titBox">
                <el-col :span="6"> 
                    <div class="grid-content bg-purple-dark rightText">
                        <el-checkbox v-model="checked" @change="cancelCheck">启用评分权重：</el-checkbox>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox" v-if="checkedPf">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <span>商务部分：</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                       <span><i style="color:#f00">*&nbsp;</i>经济部分：</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                       <span><i style="color:#f00">*&nbsp;</i>技术部分：</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                       <span><i style="color:#f00">*&nbsp;</i>服务部分：</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                       <span><i style="color:#f00">*&nbsp;</i>其他部分：</span>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <div class="blockShow">
                <span>本标准所覆盖的包</span>
            </div>
            <el-row>
                <el-col :span="20" :offset="3">
                    <div class="grid-content bg-purple-dark">
                        <el-transfer :titles="['待选的包', '本标准已覆盖的包']" v-model="value1" :data="data"></el-transfer>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">返 回</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:{
        addOrMod:Number,
    },
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 1; i <= 10; i++) {
            data.push({
                key: i,
                label: `备选项 ${ i }`,
            });
            }
            return data;
        };
        return {
            dialogVisible:false,
            diaTitle:'',
            region:'bq',
            desc:'',
            checked:false,
            data: generateData(),
            value1: [1],
            checkedPf:false,
        }
    },
    mounted() {
    },
    methods: {
        cancelCheck(){
            if(this.checked){
                this.checkedPf = true;
            }else{
                this.$confirm('取消后保存评分标准，系统将同时去掉评分细项的权重设置，您确认执行该操作吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.checked = false;
                    this.checkedPf = false;
                }).catch(() => {
                    this.checked = true;     
                });
            }
        },
        openDia(){
            this.addOrMod == 1 && (this.diaTitle = '修改评分标准');
            this.addOrMod == 0 && (this.diaTitle = '增加评分标准'); 
        }
    },
}
</script>

<style lang="scss">
.modify{
    .blockShow{
        border-bottom: 1px solid #67c23a;
        span{
            display: inline-block;
            line-height: 30px;
            background: #67c23a;
            width: 150px;
            text-align: center;
            color:#fff;
        }
    }
}
</style>
