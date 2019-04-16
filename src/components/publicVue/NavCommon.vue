<template>
    <div class="navcommon_wrap">
        <el-scrollbar style="width:100%; height:700px; overflow-x:hidden">
            <ul>
                <li v-for="(item,index) in navcommonsList" :key="index" :id="item.types" >
                    <template v-if="number>=item.types">
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            >
                            <el-button @click="ToChangePage(item.types,number)" :disabled="0" slot="reference">{{item.label}}</el-button>  <!--0可点-->
                        </el-popover>
                        <span class="navcommon_line" style="display:none"></span>
                    </template>
                    <template v-else>
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            >
                            <el-button @click="ToChangePage(item.types,number)" :disabled="1" slot="reference">{{item.label}}</el-button>
                        </el-popover>
                        <span class="navcommon_line" style="border-left:2px solid #ccc"></span>
                    </template>
                </li> 
            </ul>
        </el-scrollbar>
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
            navcommonsList:{
                type:Array,
            },
            number:{
                type:Number,
            }
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
           ToChangePage(types,number){   //导航点击值//types
                console.log(types,number);
                // console.log(types,number, this.$store.state.navCommon.types,333)
                // console.log(this.$store.state.navCommon.types,4444)
                setTimeout(function(){
                    $(".NavCommon ul li button").removeClass("backblue");
                    $(".NavCommon ul #"+types).find("button").addClass("backblue");
                },200)
                if(types==1){
                    this.$router.push("/index/LetterCommitment?types="+number);
                }else if(types==2){
                    this.$router.push("/index/AllInformation?types="+number);
                }else if(types==3){
                    this.$router.push("/index/ElectedLeader?types="+number);
                }else if(types==4){
                    this.$router.push("/elect/StartEvaluation?types="+number);
                }   
           }
        },
        
    }
</script>

<style  lang="scss">
    .navcommon_wrap{
        border-radius:5px;
        padding:15px 0px;
        min-width:75px; 
        float:left; 
        .el-scrollbar__wrap{
            overflow-x:hidden;
        }
        .el-scrollbar__bar .el-scrollbar__thumb {
            background: #348fed;
        }
        ul{
            li{
                margin-left:0;
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
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .navcommon_line{
                    display:block;
                    height:40px;
                    border-left:2px solid #84bb3c;
                    margin-left:30px;
                }
                 &:last-child{
                   .navcommon_line{
                       display:none;
                   }
                }
            }
        }
    }
</style>