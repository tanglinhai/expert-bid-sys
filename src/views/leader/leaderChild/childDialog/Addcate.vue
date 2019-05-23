<template>
    <div class="addcate">
        <el-dialog
            title="增加审查类别"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查类别名称：
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple-dark">
                        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查类别：
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="radio" label="1">资格审查</el-radio>
                        <el-radio v-model="radio" label="2">其他审查</el-radio>
                        <span style="color:red;text-indent:15px;display:inline-block;">审查类别只能存在唯一的资格审查类</span>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark">
                        <font style="color:red;">*&nbsp;其他审查指的是除资格审查外的初审类别，如：符合性审查项、形式评审、响应性评审等。</font>
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
            input:'',
            radio: '1',
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
.addcate{
    .inHeight{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
