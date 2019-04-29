<template>
    <div class="ViewUnlockRecord">
        <el-row class="lin-height35">
             <div v-for="item in  msg" class="mb20">
                <p>{{item.title_mg}}</p>
                <el-row class="lin-height35">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">申请人：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">
                            <div> {{item.applicantPeole}}</div>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">申请时间：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{item.applicantTime}}</div>
                    </el-col>
                </el-row>
                <el-row class="lin-height35">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">解锁对象：</div>
                    </el-col>
                    <el-col :span="20" class="text-center">
                        <div class="grid-content bg-purple">{{item.unlockObject}}</div>
                    </el-col>
                </el-row>
                <el-row class="lin-height35">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">申请原因：</div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content bg-purple">{{item.applicantReason}}</div>
                    </el-col>
                </el-row>
                <el-row class="lin-height35">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">审批人：</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple-light">{{item.assessingOfficer}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content bg-purple">审批结果:</div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple" v-if="item.assessingResult===0">不同意
                        </div>
                        <div class="grid-content bg-purple" v-else>同意
                        </div>
                    </el-col>
                </el-row>
                <el-row class="lin-height35">
                    <el-col :span="4">
                        <div class="grid-content bg-purple">解锁理由：
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="grid-content bg-purple">{{item.unlockReason}}</div>
                    </el-col>
                </el-row>

            </div>
        </el-row>
        <el-row class="textAlignC mt20">
            <el-button size="small" type="primary" @click="reback">返回</el-button>
        </el-row>

    </div>
</template>

<script>
    export default {
        name: 'ViewUnlockRecord',
        components: {},
        props: {
            msg: {
                type: Array
            },
        },
        data() {
            return {}
        },
        created() {
        },
        mounted() {

        },
        methods: {
            reback() {
                this.$store.state.failureEnery.unlock_record = false;
            }
        }
    }
</script>

<style lang="scss">
    .ViewUnlockRecord {

    }
</style>
