<template>
    <div class="signIn">
        <div class="contentBody">
            <el-row>
                <el-col :span="3" v-for="(o, index) in 6" :key="o" :offset="index > 0 ? 1 : 0">
                    <el-card :body-style="{ padding: '0px' }">
                        <div class="headPortraitBox">
                            <img src="../../assets/img/headportrait.jpg" alt=""> 
                        </div>
                        <div class="textBox">
                            <h4>ceshi 003</h4>
                            <h4>11111111</h4>
                        </div>
                        <div style="padding: 14px;">
                            <span>好吃的汉堡</span>
                            <div class="bottom clearfix">
                                <time class="time">{{ currentDate }}</time>
                                <el-button type="text" class="button">操作按钮</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            currentDate: new Date()
        };
    }
}
</script>



<style lang="scss">
.signIn{
    padding: 15px 20px 15px 0px;
    padding-left: 95px !important;
    .contentBody{
        background: #fff;
        padding: 15px;
        border-radius: 5px;
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
    }
}
</style>
