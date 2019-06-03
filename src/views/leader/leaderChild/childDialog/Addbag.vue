<template>
    <div class="addbag">
        <el-dialog
            title="添加分包信息"
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row style="padding:15px 0;">
                <el-form :model="bagForm" ref="ruleForm" size="small" label-width="150px">
                    <el-form-item label="分包编号：" prop="proNum">
                        <el-col :span="14">
                            <el-input v-model="bagForm.proNum"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="包名称：" prop="name">
                        <el-col :span="14">
                            <el-input v-model="bagForm.name"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="包描述：" prop="desc">
                        <el-col :span="14">
                            <el-input
                                type="textarea"
                                :rows="4"
                                v-model="bagForm.desc">
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label=" 序号：" prop="sum">
                        <el-col :span="14">
                            <el-input v-model="bagForm.sum"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="投标报价类型：" prop="radio">
                        <el-col :span="14">
                            <el-radio v-model="bagForm.radio" label="1">工程</el-radio>
                            <el-radio v-model="bagForm.radio" label="2">货物</el-radio>
                            <el-radio v-model="bagForm.radio" label="3">服务</el-radio>
                        </el-col>
                    </el-form-item>
                </el-form>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="save">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { constants } from 'crypto';
export default {
    data() {
        return {
            dialogVisible:false,
            bagForm:{
                proNum:'',
                name:'',
                desc:'',
                sum:'',
                radio:'',
            }
        }
    },
    mounted() {
        
    },
    methods: {
        save(){
            // console.log(this.bagForm);
            this.$emit('addMsg',this.bagForm);
            this.dialogVisible = false;
            this.bagForm = null;
        }
    },
}
</script>

<style lang="scss">
.addbag{

}
</style>
