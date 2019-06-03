<template>
    <div class="addbidder">
        <el-dialog
            title="添加投标人信息"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        投标人名称：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" v-model="bidForm.name"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        投标报价：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" v-model="bidForm.tbbj"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        投标文件附件：
                    </div>
                </el-col>
                <el-col :span="10">
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
            bidForm:{
                name:'',
                tbbj:'',
            }
        }
    },
    mounted() {
        
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
        save(){
            // console.log(this.bidForm);
            this.$emit('addBid',this.bidForm);
            this.dialogVisible = false;
        }
    },
}
</script>

<style lang="scss">
.addbidder{

}
</style>
