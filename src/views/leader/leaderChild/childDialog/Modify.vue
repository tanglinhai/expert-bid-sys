<template>
    <div class="modify">
         <el-dialog
            :title="diaTitle"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
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
            diaTitle:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.modify{
    .titBox{
        border-bottom: 1px solid #ebeef5;
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
