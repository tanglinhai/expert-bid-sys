<template>
    <div>
        <!--查看未完成项-->
        <el-table
                :data="viewUnfinishedData"
                style="width: 100%"
                tooltip-effect="dark"
                border
                el-table__header-wrapper>
            <el-table-column   prop="gongyingshang" label="供应商名称" > </el-table-column>
            <el-table-column   prop="dafenxiangweizhi"   label="打分项位置"> </el-table-column>
        </el-table>
        <el-row class="mb15 textAlignC mt30">
            <el-button type="primary" size="small" @click="reback"><i class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
            </el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "view-unfinished-items",
        props: {
            viewUnfinishedData: {
                type: Array,
            },
        },
        data() {
            return {}
        },
        created() { },
        mounted() { },
        methods: {
            reback() {
                this.$store.state.failureEnery.ViewUnfinishedItems = false;
            }
        }
    }
</script>

<style lang="scss">

</style>