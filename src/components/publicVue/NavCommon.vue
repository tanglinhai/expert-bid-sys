<template>
    <div class="navcommon_wrap">
        <el-scrollbar style="width:100%;overflow-x:hidden;height:100%;" ref="myScrollbar">
            <ul ref="wrap" class="NavsUls">
                <li v-for="(item,index) in navcommonsList" :key="index" :id="item.types" >
                    <template v-if="number>=item.types">
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            :ref='item'
                            >
                            <el-button @click="ToChangePage(item.types,number)" slot="reference"><i class="kuai"></i>{{item.label}}</el-button>  <!--0可点-->
                        </el-popover>
                        <span class="navcommon_line"></span>
                    </template>
                    <template v-else>
                        <el-popover
                            placement="right"
                            title=""
                            width="100"
                            :content='item.label'
                            trigger="hover"
                            class="DoNotPoint"
                            >
                            <el-button slot="reference"><i class="kuai"></i>{{item.label}}</el-button>
                            
                        </el-popover>
                        
                        <span class="navcommon_line">
                        </span>
                    </template>
                </li> 
            </ul>
        </el-scrollbar>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
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
        updated(){
            let _this=this;
            let div = _this.$refs["myScrollbar"].$refs["wrap"];
            _this.$nextTick(()=>{
                let sortsSelectHeight = ($(".backblue").parent().parent().index()+1)*60;
                
               // console.log($(".backblue").parent().parent().index(),buttonHeight,lineHeight,666666)
                let zongHeightHalf=($("body").height()-290)/2;
                // console.log(zongHeightHalf)
                //div.scrollTop=div.scrollHeight;
                if(sortsSelectHeight>=zongHeightHalf){
                    div.scrollTop=sortsSelectHeight-zongHeightHalf;
                }else{
                }
            })
        }
        
    }
</script>

<style  lang="scss">
    .navcommon_wrap{
        border-radius:5px;
        padding:15px 0px;
        min-width:115px; 
        float:left;
        .el-scrollbar__wrap{
            overflow-x:hidden;
            .el-scrollbar__view{
                ul{
                    margin-bottom:10px;
                }
            }
        }
        .el-scrollbar__bar .el-scrollbar__thumb {
            background: #348fed;
        }
        
        ul{
            width:133px;
            li{
                padding-left:12px;
                background: white;
                width: 100px;
                &:first-child{
                    padding-top:15px;
                }
                button{
                    display:block;
                    width:90px;
                    height:38px;
                    border-radius:3px;
                    border:2px solid #84bb3c;
                    color:#84bb3c;
                    font-size:12px;
                    &:hover {
                        border:2px solid #84bb3c;
                        color:#84bb3c;
                        background:white;
                    }
                    span{
                        display: block;
                        width: 80px;
                        margin-left: -10px;
                        text-align: left;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        .kuai{
                            width:10px;
                            height:10px;
                            background:#84bb3c;
                            float:left;
                            margin-right:2px;
                        }
                        
                    }
                }
                .navcommon_line{
                    display:block;
                    height:15px;
                    border-left:1px solid #f3f3f3;
                    margin-left:42px;
                }
                
                 &:last-child{
                    padding-bottom:10px;
                   .navcommon_line{
                       display:none;
                   }
                }
            }
        }
    }
</style>