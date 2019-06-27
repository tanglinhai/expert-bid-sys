<template>
    <div class="change">
        <el-dialog
            title="类别修改"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row class="childTitBox">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>类别名称：
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-dark">
                        <el-input size="small" v-model="value"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="childTitBox">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>类别：
                    </div>
                </el-col>
                <el-col :span="18">
                    <div class="grid-content bg-purple-dark">
                        <el-select size="small" v-model="region" placeholder="请选择活动区域">
                            <el-option label="商务" value="shanghai"></el-option>
                            <el-option label="服务" value="beijing"></el-option>
                            <el-option label="技术" value="jishu"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            value:'商务',
            region:'商务'
        }
    },
    mounted() {
        
    },
    methods: {
        save(){
            this.dialogVisible = false;
        }
    },
}
</script>

<style lang="scss">
.change{
    .childTitBox{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
