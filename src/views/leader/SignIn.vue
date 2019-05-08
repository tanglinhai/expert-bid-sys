<template>
    <div class="signIn">
        <el-row class="onlyBtnBox">
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                   <el-button size="small" @click="$refs.abDialog.dialogVisible = true">评标异常情况</el-button>
                    <el-button size="small" @click="$refs.unDialog.dialogVisible = true">评标解锁</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="contentBody">
            <el-row>
                <el-col :span="2" v-for="(item, index) in cardMsg" :key="index" class="rowStyle">
                    <el-card :body-style="{ padding: '0px'}" :class="{statusMod:item.diff == '组长' && item.status == 0 ? setMod=true : setMod=false}">
                        <div class="headPortraitBox">
                            <img src="../../assets/img/headportrait.jpg" alt=""> 
                        </div>
                        <div class="textBox">
                            <h4>{{item.name}}</h4>
                            <h4>{{item.telNum}}</h4>
                        </div>
                        <div style="text-align:center;padding-top:15px;">
                            <el-tag size="small" v-if="item.status == 0">已签到</el-tag>
                            <el-tag size="small" type="info" v-else>未签到</el-tag>
                            <el-tag size="small" type="warning" v-if="item.votes > 0">{{item.votes}}票</el-tag>
                            <el-tag size="small" type="info" v-else>{{item.votes}}票</el-tag>
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
            cardMsg:[],
            setRowMar:true,
            setMod:false,
            boderSty:{
                border:'1px solid #ff6600',
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/cardMsg').then(res => {
                if(res.status == 200){
                    console.log(res);
                    this.cardMsg=res.data.allCard;
                }
            })
        }
    },
}
</script>



<style lang="scss">
.signIn{
    padding: 15px 20px 15px 0px;
    padding-left: 131px !important;
    .onlyBtnBox{
        text-align: right;
        padding-bottom: 15px;
    }
    .contentBody{
        background: #fff;
        padding: 15px;
        border-radius: 5px;
        .rowStyle{
            margin: 24px;
            width: 166px;
            .el-card{
                position: relative;
                border-radius:10px;
                border: 1px solid #d9e0e7;
                .headPortraitBox{
                    width: 80px;
                    height: 80px;
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
                }
                .diff{
                    text-align: center;
                    background: #ff6600;
                    color: #fff;
                    position: absolute;
                    top: 11px;
                    left: 56px;
                    width: 100%;
                    -webkit-transform: rotateZ(45deg);
                    -ms-transform: rotate(45deg);
                    transform: rotateZ(45deg);
                    font-size: 13px;
                    padding: 4px;
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
