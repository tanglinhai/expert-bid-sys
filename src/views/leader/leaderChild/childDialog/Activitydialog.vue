<template>
    <div class="actDia">
        <el-dialog
            title="增加详细评审类活动"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <el-row class="inHeight">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        评标活动设置
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>详细评审项：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="radio1" label="3">商务</el-radio>
                        <el-radio v-model="radio1" label="2">技术</el-radio>
                        <el-radio v-model="radio1" label="1">服务</el-radio>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="dialogVisible = false">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            radio1:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.actDia{
    .inHeight{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
