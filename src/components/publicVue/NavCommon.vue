<template>
    <div class="navcommon_wrap">
        <ul>
           
            <li>
                <el-popover
                    placement="right"
                    title="标题"
                    width="200"
                    trigger="hover"
                    content="承诺书">
                    <el-button @click="goto('/index/AllInformation_beifen')" slot="reference">承诺书</el-button>
                </el-popover>
                <span class="navcommon_line"></span>
            </li>
            <li>
                <el-popover
                    placement="right"
                    title="标题"
                    width="200"
                    trigger="hover"
                    content="评审">
                    <el-button @click="goto('/index/AllInformation_beifen')" slot="reference">参加评标</el-button>
                </el-popover>
            </li>
            
        </ul>
    </div>
</template>

<script>
    export default {
        name: "evaluationcommon",
        data(){
            return {
                
               
            }
        },
        // 父组件传过来的值
        props:{
        
        },
        components:{

        },
        mounted(){
            
        },
        methods: {
            goto(url){ //路由
                this.$router.push({
                    path: url
                });
            },
           
        }
    }
</script>

<style  lang="scss">
    .navcommon_wrap{
        border-radius:5px;
        padding:15px 0px;
        ul{
            li{
                margin-left:30%;
                button{
                    display:block;
                    width:60px;
                    height:60px;
                    border-radius:50%;
                    background:#84bb3c;
                    color:white;
                    font-size:12px;
                    overflow:hidden;
                    span{
                        display: block;
                        width: 60px;
                        margin-left: -20px;
                    }
                }
                .navcommon_line{
                    display:block;
                    height:40px;
                    border-left:2px solid #84bb3c;
                    margin-left:30px;
                }
            }
        }
    }
</style>