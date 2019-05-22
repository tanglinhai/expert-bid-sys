<template>
    <div class="bec beSty">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="初审类别设置" name="cslb">初审类别设置</el-tab-pane>
            <el-tab-pane label="初步审查项设置" name="cbscx">初步审查项设置</el-tab-pane>
            <el-tab-pane label="评标方法设置" name="pbff">评标方法设置</el-tab-pane>
            <el-tab-pane label="评标活动设置" name="pphd">评标活动设置</el-tab-pane>
            <el-tab-pane label="评标配置" name="pbpz">v评标配置</el-tab-pane>
            <el-tab-pane label="完成配置" name="wcpz">完成配置</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        
    },
    methods: {
        handleClick(){

        },
    },
}
</script>

<style lang="scss">
.beSty{
    padding: 0px 20px 15px 0px;
    padding-left: 220px !important;
}
.bec{
    
}
</style>
