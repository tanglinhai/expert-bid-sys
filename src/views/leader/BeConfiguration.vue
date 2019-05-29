<template>
    <div class="bec">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="初审类别设置" name="cslb">
                <Setcate v-if="activeName2 === 'cslb'"></Setcate>
            </el-tab-pane>
            <el-tab-pane label="初步审查项设置" name="cbscx">
                <Eitem v-if="activeName2 === 'cbscx'"></Eitem>
            </el-tab-pane>
            <el-tab-pane label="评标方法设置" name="pbff">
                <Setbeff v-if="activeName2 === 'pbff'"></Setbeff>
            </el-tab-pane>
            <el-tab-pane label="评标活动设置" name="pphd">
                <Setactiv v-if="activeName2 === 'pphd'"></Setactiv>
            </el-tab-pane>
            <el-tab-pane label="评标配置" name="pbpz">
                <Configion v-if="activeName2 === 'pbpz'"></Configion>
            </el-tab-pane>
            <el-tab-pane label="完成配置" name="wcpz">
                <Finish :actv="actv3" v-if="activeName2 === 'wcpz'" @backtoun="updateTab"></Finish>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Setcate from './leaderChild/SetCategory';
import Eitem from './leaderChild/Examinationitem';
import Setbeff from './leaderChild/Setbemethods';
import Setactiv from './leaderChild/Setactivity';
import Configion from './leaderChild/Configuration';
import Finish from './leaderChild/Finish';
export default {
    components:{
        Setcate,
        Eitem,
        Setactiv,
        Configion,
        Finish,
        Setbeff
    },
    data() {
        return {
            activeName2:'cslb',
            actv3:this.activeName2,
        }
    },
    mounted() {
        $(".NavCommon").hide();
    },
    methods: {
        handleClick(){

        },
        updateTab(val){
            this.activeName2 = val;
        }
    },
}
</script>

<style lang="scss">
.home .WrapBig .Router{
    padding: 20px;
}
.bec{
    background: #fff;
}
</style>
