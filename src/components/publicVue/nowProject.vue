<template>
    <div class="nowProject">
        <el-collapse v-model="activeNames" @change="handleChange" accordion class="collBox">
            <el-collapse-item v-for="(item,index) in projectBag" :key="index" :name="index" class="outMain" style="border:1px solid #d9e0e7;margin-bottom:4px;">
                <template slot="title">
                    <div class="titBg">
                        <el-row>
                            <div class="inviteType overflowText"><span>{{item.status}}</span></div>
                            <div class="projectName overflowText setText"><a href="javascript:void(0)" class="curStyot" @click.stop="dialogAlert()">{{item.projectName}}</a></div>
                            <el-tooltip content="中招国际有限公司" effect="light">
                                <div class="proxyCo textRight overflowText setText">代理机构：{{item.name}}</div>
                            </el-tooltip>
                            <div class="package textRight overflowText setText">项目编号：{{item.num}}</div>
                        </el-row>
                    </div>
                </template>
            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "now-project",
        data(){
            return {
                activeNames: ['1'],
                centerDialogVisible:false,
                list:[],
                proMsg:[],
                allBagMsg:[],
                activeStart:'',
                activeEnd:'',
                activeShow:'1',
                flag:false,
                outPutBag:false,
            }
        },
        // 父组件传过来的值
        props:{
            projectBag:{
                type:Array
            },
            msg:{
                type:Array
            },
            projectMsg:{
                type:Array
            },
            unmsg:{
                type:Array
            }
        },
        components:{

        },
        mounted(){

        },
        methods: {
            handleChange(val) {
                console.log(val);
            }
        }
    }
</script>

<style  lang="scss">

</style>