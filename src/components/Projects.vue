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
            <!-- 子组件 -->
            <div class="allContent" v-loading="pageLoading">
                <nowProject :msg="msgBox" :projectMsg="list" :projectBag="projectBagMsg" :unmsg="unmsgBox" ref="ccc"></nowProject>
            </div>
        </div>
    </div>
</template>
<script>
    import nowProject from './publicVue/nowProject'
    export default {
        name: 'projects',
        props: {

        },
        components: {
            nowProject
        },
        data() {
            return {
                seach_input:"",
                projectBagMsg:[],
                msgBox:[],
                unmsgBox:[],
                list:[],
                pageLoading:false,
            }
        },
        mounted() {
this.childMsg();
        },
        methods: {
            // 初始子组件数据获取
            childMsg(){
                this.pageLoading=true;
                this.$axios.post('/api/bagMsg').then(res => {
                    if(res.status == 200){
                        this.pageLoading=false;
                        this.projectBagMsg=res.data.projectBagMsg;
                        this.list=res.data.bagAll;
                        this.msgBox=res.data.allBagMsg;
                        this.unmsgBox=res.data.unwidthMsg;

                        // // 开标前两小时处理
                        // res.data.allBagMsg.forEach(item => {
                        //   // console.log(item.starTime);
                        //   var oDate=new Date();
                        //   oDate.setFullYear(oDate.getFullYear(),oDate.getMonth(),oDate.getDate());
                        //   oDate.setHours(oDate.getHours(),oDate.getMinutes(),oDate.getSeconds(),oDate.getMilliseconds());
                        //   var ms=new Date('2018/10/11 15:56').getTime()-oDate.getTime();
                        //   setInterval(() => {
                        //       ms--;
                        //       if(ms < 2*(60*60*1000)){
                        //         console.log(ms)
                        //       }
                        //   },1000)
                        // })
                    }else {
                        this.pageLoading=false;
                    }
                })
            },
        },
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
                border-bottom:1px solid #d9e0e7;
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
