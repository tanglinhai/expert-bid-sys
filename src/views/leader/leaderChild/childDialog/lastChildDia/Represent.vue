<template>
    <div class="represent">
        <el-dialog
            title="填写描述："
            :visible.sync="dialogVisible"
            width="700px"
            :before-close="handleClose">
            <el-row>
                <el-col :span="24">
                    <el-input :rows="6" type="textarea" v-model="desc"></el-input>
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
            desc:''
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
.represent{
    
}
</style>
