<template>
    <div class="signIn">
        <el-row class="onlyBtnBox">
            <el-col :span="8">
                <div class="grid-content bg-purple-dark">
                    标包名称：2019年水利运输服务招标项目
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-dark">
                    标包号：0635—1909qwerN1197
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-dark">
                    项目资料：pdf文件
                </div>
            </el-col>
            <el-col :span="6" style="text-align:right;">
                <div class="grid-content bg-purple-dark">
                    <el-button size="small" @click="overBe = '导出结果'" v-text="overBe"></el-button>
                   <el-button size="small" @click="$refs.abDialog.dialogVisible = true">评标异常情况</el-button>
                    <el-button size="small" @click="$refs.unDialog.dialogVisible = true">评标解锁</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="contentBody">
            <el-row>
                <el-col :span="24">
                    <div class="grid-content bg-purple-dark" style="text-align:right;line-height:30px;padding-right:15px;">
                        <span style="color:#409EFF;padding-right:15px;">已签到：{{signin}}人</span>
                        <span>未签到：{{cardMsg.length - signin}}人</span>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" v-for="(item, index) in cardMsg" :key="index" class="rowStyle">
                    <el-card :body-style="{ padding: '0px'}" :class="{statusMod:item.diff == '组长' && item.status == 0 ? setMod=true : setMod=false}">
                        <div class="headPortraitBox">
                            <img src="../../assets/img/headportrait.jpg" alt=""> 
                        </div>
                        <div class="textBox">
                            <h4>{{item.name}}</h4>
                            <h6>{{item.telNum}}</h6>
                        </div>
                        <div style="text-align:center;padding-top:15px;">
                            <el-tag size="mini" v-if="item.status == 0">已签到</el-tag>
                            <el-tag size="mini" type="info" v-else>未签到</el-tag>
                            <el-tag size="mini" type="warning" v-if="item.votes > 0">{{item.votes}}票</el-tag>
                            <el-tag size="mini" type="info" v-else>0票</el-tag>
                        </div>
                        <div v-if="item.diff == '组长'" class="diff">
                            <span>{{item.diff}}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <Abno ref='abDialog'></Abno>
        <Unlock ref='unDialog'></Unlock>
    </div>
</template>


<script>
import Abno from './leaderChild/Abnormal';
import Unlock from './leaderChild/Unlock'
export default {
    components:{
        Abno,
        Unlock,
    },
    data() {
        return {
            overBe:'结束评标',
            cardMsg:[],
            setRowMar:true,
            setMod:false,
            boderSty:{
                border:'1px solid #ff6600',
            }
        };
    },
    mounted() {
        $(".NavCommon").show();
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/cardMsg').then(res => {
                if(res.status == 200){
                    this.cardMsg=res.data.allCard;
                    this.cardMsg.sort((a,b) => {
                        let aSt = a.status;
                        let bSt = b.status;
                        return aSt - bSt;
                    })
                }
            })
        }
    },
    computed: {
        signin(){
            var isSignin=this.cardMsg.filter(item => {
                return item.status == 0;
            })
            return isSignin.length;
        }
    },
}
</script>



<style lang="scss">
.signIn{
    padding: 0px 20px 15px 0px;
    padding-left:220px !important;
    .onlyBtnBox{
        line-height: 62px;
    }
    .contentBody{
        background: #fff;
        padding: 15px;
        border-radius: 5px;
        .rowStyle{
            margin: 8px;
            width: 120px;
            .el-card{
                position: relative;
                border-radius:10px;
                border: 1px solid #d9e0e7;
                .headPortraitBox{
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    margin: 0 auto;
                    margin-top: 15px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        vertical-align: middle;
                    }
                }
                .textBox{
                    text-align: center;
                    h4{
                        margin: 15px 0;
                    }
                    h6{
                        font-size: 12px;
                    }
                }
                .diff{
                    text-align: center;
                    background: #ff6600;
                    color: #fff;
                    position: absolute;
                    top: 9px;
                    left: 44px;
                    width: 100%;
                    -webkit-transform: rotateZ(45deg);
                    -ms-transform: rotate(45deg);
                    transform: rotateZ(45deg);
                    font-size: 12px;
                    padding: 2px;
                }
            }
        }
        .statusMod{
            border: 1px solid #ff6600 !important;
            color:#ff6600 !important;
            border-radius: 10px !important;
        }
    }
}
</style>
