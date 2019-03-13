<template>
    <div class="projects">
        <!-- 项目列表页面-->
        <el-row class="mb15">
            <el-col>
                <el-button type="primary" size="medium">专家评审/ 我的评审项目</el-button>
            </el-col>
        </el-row>
        <div class="main">
            <el-row class="pro_msg_warp ">
                <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                    <h5 class="commonTitle col348fe2">项目信息</h5>
                </div>
                <div class="fl search_warp textAlignR" >
                    <el-input
                            placeholder="项目名称关键字进行检索"
                            v-model="seach_input"
                            clearable size="small" class="wi260 ">
                    </el-input>
                    <el-button type="primary"
                               size="small"
                               class=" search_btn"
                               :loading="btn_search_loading"
                               @click="search()"
                               icon="el-icon-search">查询</el-button>
                </div>
            </el-row>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'projects',
        props: {},
        components: {},
        data() {
            return {
                seach_input:""
            }
        },
        mounted() {

        },
        methods: {},
    }
</script>
<style lang="scss">
    .projects {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .main {
            background: white;
            border-radius: 5px;
            .pro_msg_warp {
                padding: 20px 15px 20px 15px;
                .pro_msg_div,.search_warp{
                    width: 50%;
                }
                .search_warp{
                    .el-button--small{
                        border-radius: 0 3px 3px 0;
                    }
                    .el-input__inner{
                        border-radius:4px 0 0 4px;
                    }
                }
            }
        }
    }
</style>
