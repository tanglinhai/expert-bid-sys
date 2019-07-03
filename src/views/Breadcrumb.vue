<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {
            breadData:[
                {
                    bread: '首页',
                    path : '/',
                }
            ]
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.breadcrumb{

}
</style>
