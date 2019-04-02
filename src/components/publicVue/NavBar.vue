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
                // console.log(i);
                if (i === '1') {
                    this.$router.push("/elect/StartEvaluation?type=1");
                } else if (i === '2') {
                   this.$router.push("/elect/UnFinishQualificationsResult?type=2");
                } else if (i === "3") {
                    this.$router.push("/elect/StartEvaluation?type=3");
                }else if (i === "4"){
                    this.$router.push("/elect/UnFinishQualificationsResult?type=4");
                }else if (i === "5"){
                    this.$router.push("/elect/StartEvaluation?type=5");
                }else if (i === "6"){
                     this.$router.push("/elect/UnFinishQualificationsResult?type=6");
                }
                else if (i === "7"){
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