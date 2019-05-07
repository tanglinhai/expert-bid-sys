<template>
    <div class="abnormal">
        <el-dialog
            title="tishi"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose"
            center>
            <div slot="title" class="header-title">
                <el-row class="titleBox">
                    <el-col :span="6">
                        <div class="commonTitle" style="padding-top:6px;color:#348fe2;font-weight:bold;">异常情况记录表</div>
                    </el-col>
                    <el-col :span="18" style="text-align:right;padding-right:20px;">
                        <el-button type="primary" size="mini">添加</el-button>
                        <el-button size="mini">打印</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-row class="bodyBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        异常情况：
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-dark overflowText">
                        错误代码003
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        处理结果：
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-dark overflowText">
                        异常已解决
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        处理措施：
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-dark overflowText">
                        23232323
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        记录人：
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-dark overflowText">
                       1212121
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        监督：
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark overflowText">
                        sss
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        原因：
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark overflowText">
                        异常已解决
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark overflowText textRight">
                        备注：
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="grid-content bg-purple-dark overflowText">
                        真实场景请勿。。。
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
export default {
    data() {
        return {
            dialogVisible:false,
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>


<style lang="scss">
.abnormal{
    .el-dialog__headerbtn{
        top:10px;
        right:10px;
    }
    .bodyBox{
        line-height:40px;
        .textRight{
            text-align: right;
        }
    }
}
</style>
