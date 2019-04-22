<template>
    <div>
        <el-row class="textAlignC fs14" style="line-height: 30px">
            您确定要执行此操作！
        </el-row>
        <el-row class="textAlignC pt20">
            <el-button size="small" type="primary" @click="comfrimAllChecked">确认</el-button>
            <el-button size="small" type="primary" @click="rebackAllChecked">取消</el-button>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "submit-determine",
        data() {
            return {}
        },
        methods:{
            comfrimAllChecked(){
                this.$emit("childByValue",1);
            },
            rebackAllChecked(){
                this.$store.state.failureEnery.determineOperating = false;
            }
        }
    }
</script>

<style scoped>

</style>