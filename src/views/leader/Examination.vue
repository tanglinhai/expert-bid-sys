<template>
    <div :class="{'exam':true,'beSty':getParams == '1'}">
        <el-row class="onlyBtnBox">
           <el-col :span="7">
                <div class="grid-content bg-purple-dark overflowText">
                    标名称：2019年水利运输服务招标项目
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark overflowText">
                    标号：0635—1909qwerN1197
                </div>
            </el-col>
            <el-col :span="7">
                <div class="grid-content bg-purple-dark overflowText">
                    包号：0635—1909qwerN1197/1
                </div>
            </el-col>
            <el-col :span="3" class="fs14 textAlignR select">
                <div class="grid-content bg-purple">
                    <el-dropdown>
                        <el-button type="primary" size="small">
                            <i class="icon iconfont icon-caozuo  mr3"></i>操作<i
                                class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>标中质询</el-dropdown-item>
                            <el-dropdown-item>查看开标一览表</el-dropdown-item>
                            <el-dropdown-item>资质审查签字</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
        </el-row>
        <el-row class="bodyBox">
            <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleTabsEdit">
                <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in editableTabs"
                    :label="item.title"
                    :name="item.name"
                >
                    <!-- <Exam v-if="item.name === '1' || item.name === '3' || item.name === '5'"></Exam> -->
                    <Qsummary :overOrUn="unOver" v-if="item.name === '2' || item.name === '4' || item.name === '6'"></Qsummary>
                    <Review v-if="item.name === '11'"></Review>
                </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>


<script>
import Exam from '../leader/leaderChild/Exam';
import Qsummary from '../leader/leaderChild/Qsummary';
import Review from '../leader/leaderChild/Reviewsummary'
export default {
components:{
    Exam,
    Qsummary,
    Review
},
data() {
    return {
        getParams:window.localStorage.getItem('sub'),
        editableTabs:[],
        editableTabsValue:'2',
        unOver:0,      
    }
},
mounted() {
    this.init();
},
methods: {
    init(){
        this.$axios.post('./api/tabMsg').then(res => {
            if(res.status == 200 && this.getParams == '1'){
                // this.$store.state.navIsShow = true;
                $('.NavCommon').show();
                this.editableTabs=res.data.tabTitle;
            }else if(res.status == 200 && this.getParams == '0'){
                // this.$store.state.navIsShow = false;
                $('.NavCommon').hide();
                $('.exam').css('padding','0 20px');
                $('.exam').removeClass('beSty');
                $('.exam').removeClass('Router');
                this.editableTabs = res.data.tabTitle;
                this.editableTabs.length = 2;
            };
        })
    },
    handleTabsEdit(targetName){
        switch(this.getParams){
            case '0':
                return this.unOver = 0;
            case '1':
                return this.unOver = Math.floor(Math.random()*2);
        }
    },
},
}
</script>


<style lang="scss">
@import '../../assets/css/common/font.scss'; 
.beSty{
    padding: 0px 20px 15px 0px;
    padding-left: 220px !important;
}
.exam{
    .onlyBtnBox{
        line-height: 62px;
    }
    .bodyBox{
        padding:15px;
        border-radius: 5px;
        background: #fff;
        .el-tabs__header{
            margin: 0 !important;
        }
    }
}
</style>
