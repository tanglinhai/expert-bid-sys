<template>
    <div class="personal_password">
        <div class="main">
            <div class="passwordContent">
                <el-row class="mb15">
                    <el-col>
                        <div class="grid-content bg-purple-dark  ">
                            <h5 class="commonTitle col348fe2">密码验证</h5>
                        </div>
                    </el-col>
                </el-row>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm"
                         size="medium">
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="原密码：" prop="old_pass">
                                <el-input v-model="ruleForm.old_pass" size="medium"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="新密码：" prop="new_name">
                                <el-input v-model="ruleForm.new_name" size="medium"
                                          placeholder="密码为8位-16位并且由字母数字组成"
                                          @input="OnPass"
                                          @focus="focus"
                                          @blur="blur"
                                          maxlength="16"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item class="progress_bar_item">
                                <div class="progress_bar">
                                    <!--密码强度-->
                                    <div class="tips cf">
                                        <div class="weak"></div>
                                        <div class="middle"></div>
                                        <div class="strong"></div>
                                    </div>
                                    <div class="tips_text">
                                        <div class="weak_text">弱</div>
                                        <div class="middle_text">中</div>
                                        <div class="strong_text"> 强</div>
                                    </div>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="再次输入新密码：" prop="new_name_again">
                                <el-input v-model="ruleForm.new_name_again" size="medium" class="newpass_input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')" size="medium" class="btnBg">
                                    保存
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'personal_password',
        props: {},
        data() {
            let validateOldPass = (rule, value, callback) => {//原密码
                if (value === '') {
                    callback(new Error('原密码不能为空!'));
                } else if (value !== this.loginPass) {
                    callback(new Error('与原密码不符!'));
                }
                else {
                    // if (this.ruleForm.new_name_again !== '') {
                    //     this.$refs.ruleForm.validateField('new_name_again');
                    // }
                    callback();
                }
            };
            // let validatePass = (rule, value, callback) => {
            //     if (!value) {
            //         callback(new Error('请输入新密码'));
            //     } else {
            //      // let targ = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
            //         let targ = /^(?=.*[a-z])(?=.*[A-Z])[^]{8,16}$/;
            //         if (!targ.test(value)) {
            //             console.log(value);
            //             // 密码为数字和字母的组合，至少包含一位大写字母和一位小写字母
            //             callback(new Error('密码为数字和字母的组合，至少包含一位大写字母和一位小写字母'));
            //         }
            //         callback();
            //     }
            // };
            let validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.new_name) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    old_pass: '',
                    new_name: '',
                    new_name_again: '',
                    loginPass: '',//原登陆密码
                },
                rules: {
                    old_pass: [
                        {validator: validateOldPass, trigger: 'blur', required: true, message: '',},
                    ],
                    // new_name: [
                    //     {validator: validatePass, trigger: 'blur', required: true,},
                    //     {min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur'}
                    // ],
                    new_name_again: [
                        {validator: validatePass2, trigger: 'blur', required: true, message: '',}
                    ],
                }
            }
        },
        created() {
        },
        mounted() {
            this.$axios.post('/api/login').then(res => {
                if (res.status === 200) {
// console.log(res.data.msg.pass);
                    this.loginPass = res.data.msg.pass;
                }
            });
        },
        methods: {
            OnPass(){ //键盘弹起
                console.log(this.ruleForm.new_name,this.ruleForm.new_name.length);
                AuthPasswd(this.ruleForm.new_name);
                function AuthPasswd(string) {//效验
                    if(string.length >=6) {
                        if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string) && /\W+\D+/.test(string)) {
                            noticeAssign(1);
                        }else if(/[a-zA-Z]+/.test(string) || /[0-9]+/.test(string) || /\W+\D+/.test(string)) {
                            if(/[a-zA-Z]+/.test(string) && /[0-9]+/.test(string)) {
                                noticeAssign(-1);
                            }else if(/\[a-zA-Z]+/.test(string) && /\W+\D+/.test(string)) {
                                noticeAssign(-1);
                            }else if(/[0-9]+/.test(string) && /\W+\D+/.test(string)) {
                                noticeAssign(-1);
                            }else{
                                noticeAssign(0);
                            }
                        }
                    }
                    // else if(string.length>0&&string.length<6){
                    //     $(".red_text").text("请输入一个长度最少是8的字符串")
                    // }
                    else{
                        noticeAssign(null);
                    }
                }
                function noticeAssign(num) {//进度条
                    if(num == 1) {
                        $('.weak').css({backgroundColor:'red'});
                        $('.middle').css({backgroundColor:'orange'});
                        $('.strong').css({backgroundColor:'green'});
                        $('.strong').addClass("transition");
                        $(".red_text").text("");
                    }else if(num == -1){
                        $('.weak').css({backgroundColor:'red'});
                        $('.middle').css({backgroundColor:'orange'});
                        $('.middle').addClass("transition");
                        $('.strong').css({backgroundColor:''});
                        $(".red_text").text("密码为数字和字母的组合，至少包含一位大写字母和一位小写字母");
                    }else if(num ==0) {
                        $('.weak').css({backgroundColor:'red'});
                        $('.middle').css({backgroundColor:''});
                        $('.strong').css({backgroundColor:''});
                        $('.weak').addClass("transition");

                    }else{
                        $('.weak').css({backgroundColor:''});
                        $('.middle').css({backgroundColor:''});
                        $('.strong').css({backgroundColor:''});
                    }
                }
            },
            blur(){
                if(this.ruleForm.new_name.length>0&&this.ruleForm.new_name.length<6){
                    console.log(this.ruleForm.new_name.length);
                    $(".red_text").text("请输入一个长度最少是8的字符串");
                    $('.newpass_input').addClass("focus");
                }else if(this.ruleForm.new_name==""){
                    $(".red_text").text("必填字段");
                }
                $('.newpass_input').addClass("outline");
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
    }
</script>
<style lang="scss">
    .personal_password {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .main {
            background: white;
            border-radius: 5px;
            .passwordContent {
                padding: 15px;
                .progress_bar_item {
                    .el-form-item__content {
                        margin-left: 0 !important;
                        .progress_bar {
                            .tips {
                                width: 234px;
                                height: 16px;
                                border: 1px solid #ccc;
                                margin-left: 149px;
                                border-radius: 20px;
                                .strong, .middle, .weak {
                                    float: left;
                                    width: 74px;
                                    height: 10px;
                                    background-color: #ccc;
                                    margin-top: 2.5px;
                                    margin-left: 3px;
                                }
                                .weak {
                                    border-radius: 20px 0 0 20px;
                                }
                                .strong {
                                    border-radius: 0 20px 20px 0;
                                }
                                .transition {
                                    transition: background-color .5s ease-in;
                                    -moz-transition: background-color .5s ease-in;
                                    -webkit-transition: background-color .5s ease-in;
                                    -o-transition: background-color .5s ease-in;
                                }
                            }
                            .tips_text {
                                width: 234px;
                                height: 16px;
                                margin-left: 152px;
                                line-height: 16px;
                                .strong_text, .middle_text, .weak_text {
                                    float: left;
                                    width: 74px;
                                    height: 10px;
                                    color: #707070;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>