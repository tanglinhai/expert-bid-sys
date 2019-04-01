<template>
    <div class="nav_bar">
        <div class="line"></div>
        <el-row class="textAlignC pt30 pb30 btns_grounp">
            <el-button
                    :type="item.type ==1 ? 'success':item.type ==3 ? 'info'  :
                    item.type ==2 ? 'warning': ''"
                    :disabled="item.type ==4"
                    round v-for="item in msg" :value="item.value" @click="changeView(item.value)"
            >{{item.label }}
            </el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "nav-bar",
        props:{
            msg: {
                type:Array
            }
        },
        data(){
            return{

            }
        },
        methods:{
            changeView(i) {      //路由跳转传参函数
                console.log(this.msg);
                console.log(i);
                if (i === '1') {
                    // console.log("1")
                    this.$router.push("/elect/StartEvaluation");

                } else if (i === '2') {
                    // console.log("2")
                    this.$router.push("/elect/UnFinishQualificationsResult");//还要传id
                } else if (i === "4") {
                    // console.log("4")
                    this.$router.push("/elect/StartEvaluation_fhx");//还要传id

                }else if (i === "5"){
                    // console.log("5")
                    this.$router.push("/elect/UnFinishQualificationsResult_fhx");//还要传id
                }else if (i === "6"){
                    // console.log("6")
                    this.$router.push("/elect/StartEvaluation_xxjs");//还要传id
                }else if (i === "7"){
                    // // console.log("7")
                    // console.log(JSON.parse('aa:{a：1}'));
                    this.$router.push("/elect/UnFinishQualificationsResult_xxjs");//还要传id
                }
                else if (i === "8"){
                    // console.log("8")
                    this.$router.push("/elect/ReviewSummary");//还要传id
                }
            },
        }
    }
</script>

<style lang="scss">
.nav_bar{
    .btns_grounp {
        .el-button + .el-button {
            margin-left: 15px;
        }
        .el-button--warning {
            background-color: #ff6600;
            border-color: #ff6600;
            border: 1px solid #ff6600;
        }
        .el-button--warning:hover {
            background: #ff8600 !important;
        }
        .el-button--warning[data-v-4774750c]:hover {
            background: #e47932 !important;
            border-color: #e47932 !important;
            color: #fff !important;
        }
    }
    .line {
        border: 1px solid #e5e9ec;
        position: relative;
        top: 50px;
    }
}
</style>