<template>
    <div class="addbag">
        <el-dialog
            title="添加分包信息"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        分包编号：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        包名称：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        包描述：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="请输入内容"
                            v-model="textarea">
                        </el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        序号：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="titBox">
                <el-col :span="4">
                    <div class="grid-content bg-purple-dark rightText">
                        投标报价类型：
                    </div>
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="radio" label="1">单价</el-radio>
                        <el-radio v-model="radio" label="2">总价</el-radio>
                        <el-radio v-model="radio" label="3">折扣率</el-radio>
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
            textarea:'',
            radio:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.addbag{

}
</style>
