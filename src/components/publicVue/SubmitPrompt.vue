<template>
    <div class="submitPrompt ">
        <el-row class="textAlignC fs14" style="line-height: 30px">您的{{name}}工作已进行 [&nbsp;<span
                class="red">{{pro_num}}%</span>&nbsp;], 请确认您已经完成本包 [&nbsp;<span class="red">{{baohao}}</span>&nbsp;]的{{name}}工作!
        </el-row>
        <el-row>
            <el-row class="textAlignC fs16" style="line-height: 30px">确认后您将不能再更改{{name}}结果！</el-row>
        </el-row>
        <el-row class="textAlignC pt20">
            <el-button size="small" type="primary" @click="comfrim">确认</el-button>
            <el-button size="small" type="primary" @click="reback">取消</el-button>
        </el-row>

        <!--<el-dialog-->
        <!--width="30%"-->
        <!--title="提示"-->
        <!--:visible.sync="$store.state.failureEnery.tijiaoNot100"-->
        <!--append-to-body>-->
        <!--<el-row class="textAlignC fs14" style="line-height: 30px">-->
        <!--{{name}}评审还未完成，不能提交 {{name}}评审数据！-->
        <!--</el-row>-->
        <!--<el-row class="textAlignC pt20">-->
        <!--<el-button size="small" type="primary" @click="tijiaoNot100Comfrim">确认</el-button>-->
        <!--</el-row>-->
        <!--</el-dialog>-->

        <!--<el-dialog-->
        <!--width="700px"-->
        <!--title="提示"-->
        <!--:visible.sync="$store.state.failureEnery.tijiao100"-->
        <!--append-to-body>-->
        <!--<el-row style="margin:10px auto;">-->
        <!--<el-row style="  border:1px solid #ccc;">-->
        <!--<el-row class="textAlignC fs14" style="line-height: 30px">-->
        <!--<div class="xiaolian" style="width:100%; background:#ebeff3; height:76px;">-->
        <!--<img src="../../assets/img/xiaolian.png" alt=""-->
        <!--style="display: block;  height:80px;  margin:0px auto; vertical-align: middle;">-->
        <!--</div>-->
        <!--</el-row>-->
        <!--<el-row>-->
        <!--<p class="tishi_wenzi" style="text-align: center;color:#000000;line-height:40px;">-->
        <!--{{name}}评审成功！</p>-->
        <!--</el-row>-->
        <!--</el-row>-->
        <!--<el-row>-->
        <!--<div class="djsTime" style="text-align: center; color:#000000; line-height:40px;">[<span id="sec">{{count}}</span>]秒后自动关闭-->
        <!--</div>-->
        <!--</el-row>-->
        <!--<el-row class="textAlignC pt20">-->
        <!--<el-button size="small" type="primary" @click="tijiao100Comfrim">确认</el-button>-->
        <!--</el-row>-->
        <!--</el-row>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    export default {
        name: "submit-prompt",
        props: {
            name: {
                type: String
            },
            pro_num: {
                type: Number
            },
            baohao: {
                type: String
            },
            type1: {
                type: String
            },
            dingdang_tableData: {
                type: Array
            },
            companyname_toubiao: {
                type: Array
            },
            // urlPage: {
            //     type: Array
            // },
            methodType: {
                type: Number
            },
            type_btn: {
                type: Number
            },
            allSubmitBtnLoading:{
                type:Boolean
            }
        },
        data() {
            return {
                //   count: '5',   //倒计时5秒
            }
        },
        mounted() {
            // console.log(this.type1);
        },
        methods: {
            reback() {
                this.$store.state.failureEnery.submitPrompt = false;
                this.$message({
                    type: 'info',
                    message: '取消全部选中'
                });
            },
            //     comfrim() {//确定提交
            //         this.$axios.post('/api/all_submit_confirm').then(res => { //审查项接口
            //             if (res.status == '200') {
            //                 if (this.pro_num != 100.0) {
            //                     this.$store.state.failureEnery.tijiaoNot100 = true;
            //                 } else {
            //                     this.$store.state.failureEnery.tijiao100 = true;
            //                     this.goGrdoupRecor();//倒计时开始
            //
            //                 }
            //             }
            //         })
            //
            // },
            comfrim() {//确定提交
                this.$axios.post('/api/all_submit_confirm').then(res => { //审查项接口
                    if (res.status == '200') {
                        if (this.pro_num != 100.0) {
                            // this.$store.state.failureEnery.tijiaoNot100 = true;
                            this.$message({
                                message: this.name + '评审还未完成，不能提交 ' + this.name + '评审数据！',
                                type: 'warning'
                            });
                            this.$store.state.failureEnery.submitPrompt = false;
                            // this.allSubmitBtnLoading=true;
                        } else {
                            // this.$store.state.failureEnery.tijiao100 = true;
                            // this.goGrdoupRecor();//倒计时开始
                            let url;
                            // if (this.type_btn == 3) {
                            //     url = '/api/alltijiao_fhx';
                            // } else if (this.type_btn == 1) {
                            //     url = '/api/alltijiao';
                            // }
                            // else if (this.type_btn == 5) {
                            //     url = '/api/alltijiao_xxjs';
                            // }
                            if (this.type_btn == 6) {
                                url = '/api/alltijiao_fhx';
                            } else if (this.type_btn == 4) {
                                url = '/api/alltijiao';
                            }
                            else if (this.type_btn == 8) {
                                url = '/api/alltijiao_xxjs';
                            }
                            let _this = this;
                            setTimeout(function () {
                                _this.$axios.post(url, {currentPage: parseInt(_this.type_btn) + 1,}).then(res => {
                                    // console.log(parseInt(_this.type_btn) + 1, '0000');
                                    if (res.status == 200) {
                                        window.location.href = "/elect/StartEvaluation?methodType=" + _this.methodType + "&currentpage=" + _this.type_btn + '&is_submit_type=1';
                                        _this.$message({
                                            message: _this.name + '评审成功！',
                                            type: 'success'
                                        });
                                        _this.$store.state.failureEnery.submitPrompt = false;
                                        _this.$store.state.failureEnery.flag = false;//false：已经提交，true:未提交
                                        $("#hide_btn").hide();
                                        // _this.allSubmitBtnLoading = true;
                                    } else {
                                        // _this.allSubmitBtnLoading = true;
                                    }
                                  })
                                }, 2000)
                            }
                    }
                })
                // this.$store.state.failureEnery.tijiaoNot100 = true;
                // this.$store.state.failureEnery.submitPrompt=false;
                // this.$store.state.failureEnery.flag = false;//false：已经提交，true:未提交
                // $("#hide_btn").hide()


                // tijiaoNot100Comfrim() {//未完成100%确定
                //     this.$store.state.failureEnery.tijiaoNot100 = false;
                // },
                // tijiao100Comfrim() {//完成100%确定
                //     this.$store.state.failureEnery.tijiao100 = false;
                //     this.$store.state.failureEnery.submitPrompt = false;
                //     this.$store.state.failureEnery.flag = false;
                //     $("#hide_btn").hide();
                // },
                // goGrdoupRecor() {//倒计时
                //     const TIME_COUNT = 5;
                //     if (!this.timer) {
                //         this.count = TIME_COUNT;
                //         this.show = false;
                //         this.timer = setInterval(() => {
                //             if (this.count > 0 && this.count <= TIME_COUNT) {
                //                 this.count--;
                //             } else {
                //                 this.show = true;
                //                 clearInterval(this.timer);
                //                 this.timer = null;
                //                 this.$store.state.failureEnery.tijiao100 = false;
                //             }
                //         }, 1000)
                //     }
                // },
            }
        }
    }
</script>

<style lang="scss">
    .submitPrompt {

        .djsTime {
            text-align: center;
            color: #000000;
            line-height: 40px;
            span {
                color: red;
                display: inline-block;
                padding: 0px 3px;
            }
        }
    }
</style>