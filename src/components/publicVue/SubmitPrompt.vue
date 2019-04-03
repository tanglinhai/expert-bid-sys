<template>
    <div>
        <el-row class="submitPrompt ">
            <el-row class="textAlignC fs16">确认后您将不能再更改{{name}}结果！</el-row>
        </el-row>
        <el-row class="textAlignC pt40">
            <el-button size="small" type="primary" @click="comfrim">确认</el-button>
            <el-button size="small" type="primary" @click="reback">返回</el-button>
        </el-row>
    </div>

</template>

<script>
    export default {
        name: "submit-prompt",
        props:{
            name:{
                 type:String
                }
        },
        data(){
            return{

            }
        },
         methods:{
            reback(){
                this.$store.state.failureEnery.submitPrompt=false;
            },
            comfrim(){//确定提交
                this.$axios.post('/api/all_submit_confirm').then(res => {
                    if(res.status == '200'){
                        this.$store.state.failureEnery.flag = false;
                        this.$store.state.failureEnery.submitPrompt = false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
.submitPrompt{

}
</style>