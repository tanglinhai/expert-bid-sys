<template>
    <div class="addexpert">
        <el-dialog
            title="添加投标人信息"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        评审人员姓名：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" v-model="expertForm.name"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        联系电话：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" v-model="expertForm.phoneNum"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        证件号：
                    </div>
                </el-col>
                <el-col :span="10">
                    <el-input size="small"  v-model="expertForm.id"></el-input>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        工作单位：
                    </div>
                </el-col>
                <el-col :span="10">
                    <el-input size="small"  v-model="expertForm.address"></el-input>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        人员类别：
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="expertForm.radio" label="1">评审专家</el-radio>
                        <el-radio v-model="expertForm.radio" label="2">采购人代表</el-radio>
                        <el-radio v-model="expertForm.radio" label="3">监标人</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        人员类别：
                    </div>
                </el-col>
                <el-col :span="16">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="expertForm.radio1" label="1">商务</el-radio>
                        <el-radio v-model="expertForm.radio1" label="2">技术</el-radio>
                        <el-radio v-model="expertForm.radio1" label="3">法律</el-radio>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            fileList:[],
            expertForm:{
                name:"",
                phoneNum:"",
                id:"",
                address:"",
                radio:"",
                radio1:"",
            }
        }
    },
    mounted() {
        
    },
    methods: {
        save(){
            this.$emit('addExpert',this.expertForm);
            this.dialogVisible = false;
        }
    },
}
</script>

<style lang="scss">
.addexpert{

}
</style>
