<template>
    <div class="upload">
        <el-dialog
            title="导入评分办法"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <el-row class="titBox">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <span>上传excel文件</span>
                    </div>
                </el-col>
            </el-row>
            <el-row class="upBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        <span><i style="color:#f00">*&nbsp;</i>文件路径：</span>
                    </div>
                </el-col>
                <el-col :span="20">
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
                            <el-button size="small" type="primary">选择文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
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
        }
    },
}
</script>


<style lang="scss">
.upload{
    .titBox{
        border-bottom: 1px solid #409eff;
        line-height: 40px;
    }
    .upBox{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
