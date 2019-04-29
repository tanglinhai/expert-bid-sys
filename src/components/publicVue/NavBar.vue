<template>
    <div class="nav_bar">
        <el-row class="textAlignC btns_grounp" >
            <div v-for="item in msg" 
                :class="item.value == type ? 'nav_item hov': 'nav_item'" 
                @click="changeView(item,methodType)">
                <div :class="item.type == 4 ? 'item jinyong': 'item'">
                     <span :class="item.type ==1 ? 'iconfont icon-wancheng green':
                                    item.type ==3 ? 'iconfont icon-tbd-project-task-number'  :
                                    item.type ==2 ? 'iconfont icon-jinhangzhong blue': 'iconfont icon-jinyong'"></span>
                     {{item.label}}
                 </div>
                <div class="item1 ">
                     <span :class="item.type ==1 ? 'iconfont icon-wancheng green':
                                    item.type ==3 ? 'iconfont icon-tbd-project-task-number'  :
                                    item.type ==2 ? 'iconfont icon-jinhangzhong blue': 'iconfont icon-jinyong'"></span>
                    {{item.label}}
                </div>
            </div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "nav-bar",
        props:{
            type: {
                type: String
            },
            msg: {
                type: Array
            },
            methodType:{
                type: String
            }
        },
        data(){
            return{

            }
        },
        methods:{
            changeView(item,methodType) {      //路由跳转传参函数
                console.log(item,methodType);
                if(item.type == 4){
                    return;
                }
                var i = item.value;
                // console.log(i);
                if (i === '1') {
                    this.$router.push("/elect/StartEvaluation?type=1&methodType="+methodType);
                } else if (i === '2') {
                   this.$router.push("/elect/UnFinishQualificationsResult?type=2&methodType="+methodType);
                } else if (i === "3") {
                    this.$router.push("/elect/StartEvaluation?type=3&methodType="+methodType);
                }else if (i === "4"){
                    this.$router.push("/elect/UnFinishQualificationsResult?type=4&methodType="+methodType);
                }else if (i === "5"){
                    this.$router.push("/elect/StartEvaluation?type=5&methodType="+methodType);
                }else if (i === "6"){
                     this.$router.push("/elect/UnFinishQualificationsResult?type=6&methodType="+methodType);
                }
                // else if (i === "7"){
                //     this.$router.push("/elect/BusinessOther?type=7&methodType="+methodType);
                // }
                else if (i === "8"){
                    this.$router.push("/elect/BusinessOther?type=8&methodType="+methodType);
                }
                else if (i === "9"){
                    this.$router.push("/elect/BusinessOther?type=9&methodType="+methodType);
                }
                else if (i ==="10"){
                    this.$router.push("/elect/BusinessOther?type=10&methodType="+methodType);
                }
                else if (i === "11"){
                    this.$router.push("/elect/BusinessOther?type=11&methodType="+methodType);
                }
                else if (i === "70"){
                    this.$router.push("/elect/ReviewSummary?type=70&methodType="+methodType);
                }
            },
        }
    }
</script>

<style lang="scss">
.nav_bar{
    overflow: hidden;
    margin: auto;
    padding: 30px 0;
    .btns_grounp {
        height: 50px;
        border-bottom: 1px solid #c3c3c3;
    }
    .nav_item{
        position: relative;
        /*width: 200px;*/
        height: 50px;
        display: inline-block;
        margin-right: 10px;
        padding-left: 20px;
        padding-right: 20px;
        .item{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            border: 1px solid #c3c3c3;
            border-radius: 4px 4px 0 0;
            color: #606266;
            font-family: Verdana;
            font-size: 14px;
            height: 35px;
            line-height: 35px;
            transition: height,line-height .5s,.5s;
            cursor: pointer;
            .iconfont {
                font-size: 14px;
            }
            .green{
                color: #35D437;
            }
            .blue{
                color: #409EFF;
            }

            &:hover{
                height: 42px;
                line-height: 42px;
                border: 1px solid #559ece;
                border-bottom: 1px solid #c3c3c3;
                background-color: #bdf9ff;
            }
        }
        .item1{
            font-size: 14px;
            height: 35px;
            line-height: 35px;
            visibility: hidden;
            .iconfont {
                font-size: 14px;
            }
        }
        .jinyong{
            color: #909090;
            cursor: default;
            &:hover{
                height: 35px;
                line-height: 35px;
                border: 1px solid #606266;
                border-bottom: 1px solid #c3c3c3;
                background-color: #fff;
            }
        }
    }
    .hov{
        .item{
            height: 42px;
            line-height: 42px;
            border: 1px solid #559ece;
            border-bottom: 1px solid #c3c3c3;
            background-color: #bdf9ff;
        }
        
    }
}
</style>