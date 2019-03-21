<template>
    <div class="personal_user_logo">
        <!--user_logo-->
        <div class="main">
            <div class="user_logo_con">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-row class="mb15">
                        <el-col>
                            <div class="grid-content bg-purple-dark  ">
                                <h5 class="commonTitle col348fe2">我的基本信息 </h5>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="header_upload_div">
                        <el-col :span="10" :offset="7">
                            <el-form-item label="头像：" prop="touxiang" class="fs14 head_div cf">
                                <!-- 头像上传裁剪---------------------- -->
                                <div class="headerBox">
                                     <img :src="imageUrl" alt="头像" class="headerImg" @click="crop_Header_Img">
                                </div>
                                <!-- -------------------------------- -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="姓名：" prop="name">
                                <el-input v-model="ruleForm.name" size="medium"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="性别：" prop="resource">
                                <el-radio-group v-model="ruleForm.resource">
                                    <el-radio label="男"></el-radio>
                                    <el-radio label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item label="绑定邮箱：" prop="email">
                                <!--若邮箱未绑定，则显示1@1.com,否则显示ruleForm.email-->
                                <el-col :span="19">
                                    <div v-if="ruleForm.email != ''" key="1">
                                        {{ruleForm.email}}
                                        (<span class="co5da">已绑定</span>)
                                    </div>
                                    <div v-else key="2">1@12.com( <span class="coreds">未绑定</span>)</div>
                                </el-col>
                                <!--如果ruleForm.email不为空显示修改绑定按钮，反之显示绑定按钮-->
                                <el-col :span="5" >
                                    <el-button
                                            class="mr10 ml10"
                                            v-if="ruleForm.email != ''"
                                            @click='modify_binding'
                                            size="small"
                                            key="1">
                                        <i class="icon iconfont  mr5 "></i>修改绑定
                                    </el-button>
                                    <el-button
                                            size="small"
                                            class="mr10 ml10 "
                                            v-else
                                            @click='binding'
                                            key="2">
                                        <i class="icon iconfont  mr5"></i>绑定
                                    </el-button>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                            <el-row>
                                <el-col :span="10" :offset="7">
                                    <el-form-item label="绑定手机号：" prop="componyTel">
                                        <el-row>
                                            <el-col :span="19">
                                                <div v-if="ruleForm.componyTel != ''" key="1">
                                                    {{ruleForm.componyTel}}
                                                    (<span class="co5da">已绑定</span>)
                                                </div>
                                                <div v-else key="2">15501013754 （<span class="coreds">未绑定</span>）</div>
                                            </el-col>
                                            <el-col :span="5" >
                                                <el-button
                                                        class="mr10 ml10 "
                                                        size="small"
                                                        v-if="ruleForm.componyTel != ''"
                                                        @click="phoneModifyBinding"
                                                        key="1">
                                                    <i class="icon iconfont  mr5"></i>修改绑定
                                                </el-button>
                                                <el-button
                                                        class="mr10 ml10 "
                                                        v-else
                                                        @click='phoneBinding'
                                                        size="small"
                                                        key="2">
                                                    <i class="icon iconfont  mr5"></i>绑定
                                                </el-button>
                                            </el-col>
                                        </el-row>
                                        <!--绑定微信公众号-->
                                    </el-form-item>
                                </el-col>
                            </el-row>
                    <el-row>
                        <el-col :span="10" :offset="7">
                            <el-form-item >
                                <el-button type="primary" @click="submitForm('ruleForm')" size="medium" class="btnBg">
                                    保存
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                 </el-form>
            </div>
        </div>
        <!--邮箱绑定弹框-->
        <el-dialog
                title="邮箱绑定"
                :visible.sync="dialogVisible"
                width="666px">
        <span>
          <el-form
                  :label-position="labelPosition"
                  label-width="100px"
                  :model="AddressruleForm"
                  :rules="rules"
                  ref="AddressruleForm">
               <el-form-item label="邮箱绑定：">
                 <p>{{ruleForm.email!= ''? ruleForm.email:"无"}}</p>
               </el-form-item>
               <el-form-item label="邮箱地址：" prop="adress">
                        <el-input size="medium" v-model="AddressruleForm.adress" clearable></el-input>
               </el-form-item>
               <el-form-item>
                    <el-button  v-if="AddressruleForm.isSend" @click="handleSend" size="small" key="1" >
                        <i class=" icon iconfont  " ></i>
                        发送验证码</el-button>
                   <el-button size="medium" v-else :disabled="true"  key="2">
                         <i class=" icon iconfont  mr5"></i>
                         重新发送({{AddressruleForm.sendTime}})
                   </el-button>
               </el-form-item>
              <el-form-item label="邮箱验证码：" prop="email_code">
                <el-input v-model="AddressruleForm.emailCode" size="medium" placeholder="请填入收到的验证码" clearable></el-input>
              </el-form-item>
              <!--绑定邮箱-->
                 <el-form-item style="text-align: center;margin-left: -62px;">
                      <el-button
                              type="primary"
                              size="small"
                              @click="bingdingEmail('AddressruleForm')"
                              :loading="myemailloading"
                              :disabled="AddressruleForm.isSend||AddressruleForm.emailCode=== ''">
                          <i  class="icon iconfont  mr5"></i>
                          绑定邮箱
                      </el-button>
                 </el-form-item>
          </el-form>
        </span>
        </el-dialog>
        <!--手机号绑定弹框-->
        <el-dialog
                title="手机绑定"
                :visible.sync="phoneBindingDialog"
                width="666px">
            <span class="fs12 co33">
            <el-form
                    :label-position="labelPosition"
                    label-width="110px"
                    :model="dynamicValidateFormTel"
                    :rules="rulesTel"
                    ref="dynamicValidateFormTel">
                  <el-form-item label="绑定手机：">
                      <p>{{ruleForm.componyTel != "" ?ruleForm.componyTel : "无"}}</p>
                  </el-form-item>
                       <el-form-item label="手机号码：" prop="tel">
                       <el-input size="medium" v-model="dynamicValidateFormTel.tel" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="图片验证码：" prop="imgCode">
                       <el-input
                               size="medium"
                               v-model="dynamicValidateFormTel.imgCode"
                               class="picnumIpt"
                               style="width: 200px"
                               clearable>
                       </el-input>
                       <i class="fa fa-shield"></i>
                       <canvas id="canvass" class="poi" width="70" height="30"></canvas>
                  </el-form-item>
                  <el-form-item>
                        <el-button
                                v-if="dynamicValidateFormTel.isSend"
                                @click="handleSendTel"
                                size="small"
                                key="1"
                        >
                            <i class="icon iconfont  mr5"></i>发送验证码
                        </el-button>
                        <el-button
                                v-else
                                :disabled="true"
                                type="primary"
                                size="small"
                                key="2">
                            <i class=" icon iconfont icon-zhongxinfasong mr5"></i>
                            重新发送({{dynamicValidateFormTel.sendTime}})
                        </el-button>
                     </el-form-item>
                      <el-form-item label="手机验证码：">
                          <el-input v-model="dynamicValidateFormTel.telCode" size="medium" placeholder="请输入收到的验证码" clearable></el-input>
                      </el-form-item>
                      <el-form-item style="text-align: center;margin-left: -62px;">
                           <el-button
                                   type="primary"
                                   :disabled="dynamicValidateFormTel.isSend||dynamicValidateFormTel.telCode === ''"
                                   @click="handleBindTel(dynamicValidateFormTel)"
                                   :loading="myphoneloading"
                                   size="small">
                               <i class="icon fs14 icon-bangdingshouji mr5"></i>
                               绑定手机
                           </el-button>
                      </el-form-item>
              </el-form>
            </span>
        </el-dialog>
        <!-- 裁剪dialog------------------------------  -->
        <el-dialog
                :visible.sync="centerDialogVisible"
                width="700px"
                @close="close"
                center>
            <div class="cropBox">
                <div class="img-container" style="width:85%;float:left;">
                    <img id="image" alt="Picture" class="cropper-hidden" style="display: none !important;">
                </div>
                <div id="preview_box" class="docs-preview clearfix" style="float:left;margin-left:15px;">
                    <div class="img-preview" style="width:82px;height:82px;"></div>
                </div>
            </div>
            <div style="clear:both;"></div>
            <div style="padding-top:15px;">
                <el-upload
                        class="upload-demo"
                        ref="cropper_upload"
                        action="/upload"
                        :on-change="onChangeFile"
                        :auto-upload="false"
                        id="upImage"
                        style="float:left;"
                >
                    <el-button slot="trigger" size="small" >选择图片</el-button>
                    <el-button style="margin-left: 10px;" size="small" id="up" @click="submitUpload('cropper_upload','upImage')">上传图片</el-button>
                    <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                </el-upload>
                <el-button type="primary" @click="Confirm" style="float:right;" size="small">确认裁剪使用</el-button>
                <div style="clear:both;"></div>
            </div>
        </el-dialog>
        <!-- ----------------------------------------------------- -->
    </div>
</template>

<script>
    import txph from '../../assets/img/txph.png'
    //头像裁剪坐标变量保存---------
    var dataOptions="";
    export default {
        name: 'personal_user_logo',
        props: {},
        data() {
            return {
                ruleForm: {
                    name: '',
                    componyTel: '13325689861',//初始化号码后台返回
                    resource: '男',
                    email: ''
                },
                imageUrl: txph,//上传图片图片路径
                setTime: undefined,//定时器方法
                acceptEmailCode: "",//接收到的验证码
                acceptPhoneCode: "",//接收到的验证码
                mydataloading: false,  //保存按钮loading
                myemailloading: false,//绑定邮箱按钮loading
                myphoneloading: false,//绑定手机按钮loading
                dialogTelCodeSuccess: false,//手机验证码发送成功时显示
                dialogVisible: false,    //确认邮箱弹框默认是否显示设置
                phoneBindingDialog: false,    //拒绝手机号码弹框默认是否显示设置
                labelPosition: 'right',    //弹框内容右侧显示
                AddressruleForm: {    //绑定邮箱的表单
                    adress: "",//邮箱地址
                    emailCode: '',//邮箱验证码
                    isSend: true,//是否点击发送验证码
                    sendTime: 60,//验证码计时
                },
                dynamicValidateFormTel: {//绑定手机数据
                    tel: '',//新输入的手机号码
                    imgCode: '',//图片验证码
                    isSend: true,//是否点击手机发送验证码
                    sendTime: 60,//验证码计时
                    telCode: '',//手机验证码
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
                    ],
                    adress: [
                        {required: true, message: '请输入邮箱地址', trigger: 'blur'},
                        {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                },
                rulesTel: {
                    tel: [
                        {required: true, message: '请输入手机号码', trigger: 'blur'},
                        {pattern: /^1[3|4|5|7|8]\d{9}$/, message: '手机号码输入不正确', trigger: 'blur'}
                    ],
                    imgCode: [
                        {required: true, message: '请输入图片验证码', trigger: 'blur'},
                        {pattern: /^\d{4}$/, message: '手机图片验证码不正确', trigger: 'blur'}
                    ]
                },
                // 头像裁剪数据绑定 -----------------
                centerDialogVisible:false,
                // beforeCropImgUrl:'',
                afterCropImgUrl:'',
                // ---------------------------------
            };
        },
        mounted() {
            this.$axios.post('/api/isbindingEmailPhone').then(res => {
                if (res.status == 200) {
                    // console.log(res.data.data);
                    localStorage.setItem("loginData", JSON.stringify(res.data.data));
                    this.name = res.data.data.name;
                    this.pass = res.data.data.pass;
                    if (this.ruleForm.email == res.data.massageList.emaile) {
                        // this.$message('当前邮箱已绑定');
                    } else if (this.ruleForm.email != res.data.massageList.emaile) {
                        // this.$message('当前邮箱未绑定');
                    }
                    else if (this.ruleForm.componyTel == res.data.massageList.phoneNum) {
                        // this.$message('当前手机号码已绑定');
                    } else if (this.ruleForm.componyTel != res.data.massageList.phoneNum) {
                        // this.$message('当前手机号未绑定');
                    }
                    else if (res.data.type.value == 1) {
                        this.isshow_headpic = true;
                    } else if (res.data.type.value == 2) {
                        this.isshow_headpic = false;
                    }
                }
            });
        },
        methods: {
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             alert('submit!');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // },
            // 提交的时候存到localstorage
            submitForm(formName) {
                console.log(formName);
                console.log(this.ruleForm.pass);
                console.log(this.$data.ruleForm.pass);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log( this.$data.ruleForm);
                        this.mydataloading = true;
                        this.$axios.post('/api/save', 'post', {
                            data: JSON.stringify(this.$data.ruleForm)
                        }).then(res => {
                            if (res.data.code == 200) {
                                // console.log(res.data);
                                this.mydataloading = false;
                                this.$message({
                                    type: 'success',
                                    message: '保存成功',
                                    center: true
                                });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //点击发送按钮（邮箱弹窗）
            handleSend() {
                let that = this;
                this.$refs['AddressruleForm'].validate((valid) => {
                    if (valid) {
                        this.AddressruleForm.isSend = false;
                        this.$axios.post('/api/sendEmailCode').then(res => {
                            if (res.status == 200) {
                                console.log(res.data);
                                this.acceptEmailCode = res.data.data;
                            }
                            this.$message({
                                message: '邮箱验证码已经发送，请查收',
                                type: 'success'
                            });
                        });
                        this.AddressruleForm.sendTime = 60;
                        this.setTime = setInterval(() => {
                            that.AddressruleForm.sendTime--;
                            if (that.AddressruleForm.sendTime === 0) {
                                that.AddressruleForm.isSend = true;
                                clearInterval(this.setTime);
                            }
                        }, 1000)
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            //绑定邮箱按钮
            bingdingEmail() {
                if (this.AddressruleForm.emailCode == this.acceptEmailCode) {
                    this.myemailloading = true;
                    this.$axios.post('/api/Emailpd').then(res => {
                        if (res.status == 200) {
                            console.log(res.data);
                            this.myemailloading = false;
                            this.$message({
                                type: 'success',
                                message: '绑定成功',
                                center: true
                            });
                            this.AddressruleForm.sendTime = 60;
                            clearInterval(this.setTime);
                            this.ruleForm.email = this.AddressruleForm.adress;
                            this.AddressruleForm.emailCode = '';
                            this.dynamicValidateFormTel.isSend = false;
                            this.dialogVisible = false;
                        } else {
                            this.$message.error('请输入正确的邮箱验证码');
                        }
                    });
                }
            },
            //绑定手机按钮
            handleBindTel() {
                if (this.dynamicValidateFormTel.telCode == this.acceptPhoneCode) {
                    this.myphoneloading = true;
                    this.$axios.post('/api/phoneBinding').then(res => {
                        if (res.status == 200) {
                            console.log(res.data);
                            this.myphoneloading = false;
                            this.$message({
                                type: 'success',
                                message: '绑定成功',
                                center: true
                            });
                            this.dynamicValidateFormTel.sendTime = 60;
                            clearInterval(this.setTime);
                            this.ruleForm.componyTel = this.dynamicValidateFormTel.tel;
                            this.dynamicValidateFormTel.tel = '';
                            this.dynamicValidateFormTel.isSend = false;
                            this.phoneBindingDialog = false;
                        } else {
                            this.$message.error('请输入正确的邮箱验证码');
                        }
                    });
                }
            },
            //发送手机验证码
            handleSendTel() {
                let that = this;
                this.$refs['dynamicValidateFormTel'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/sendPhoneCode').then(res => {
                            if (res.status == 200) {
                                console.log(res.data);
                                this.acceptPhoneCode = res.data.data;
                                console.log(this.acceptPhoneCode);
                            }
                            this.$message({
                                message: '手机验证码已经发送，请查收',
                                type: 'success'
                            });
                        });
                        this.dynamicValidateFormTel.sendTime = 60;
                        this.dynamicValidateFormTel.isSend = false;
                        let time = setInterval(() => {
                            that.dynamicValidateFormTel.sendTime--;
                            if (that.dynamicValidateFormTel.sendTime === 55) {
                                this.fillVerificationCode(7892);
                                this.dialogTelCodeSuccess = true;
                            }
                            if (that.dynamicValidateFormTel.sendTime === 0) {
                                that.dynamicValidateFormTel.isSend = true;
                                clearInterval(time);
                            }
                        }, 1000)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //填充验证码
            fillVerificationCode(verificationCode) {
                let canvas = document.getElementById('canvass');
                let ctx = canvas.getContext('2d');
                let img = new Image();
                img.src = verificationCode;
                img.onload = function () {
                    ctx.drawImage(img, 0, 0);
                };
            },
            //邮箱修改绑定
            modify_binding() {
                this.dialogVisible = true;
                this.AddressruleForm.adress = '';
                this.AddressruleForm.isSend = true;
            },
            //邮箱绑定
            binding() {
                this.dialogVisible = true;
            },
            //手机修改绑定
            phoneModifyBinding() {
                this.phoneBindingDialog = true;
                this.dynamicValidateFormTel.tel = '';
                this.dynamicValidateFormTel.imgCode = '';
                this.dynamicValidateFormTel.telCode = '';
                this.dynamicValidateFormTel.isSend = true;
            },
            phoneBinding() {
                this.phoneBindingDialog = true;
            },
            // 头像裁剪上传操作-----------------------------
            crop_Header_Img(){
                this.centerDialogVisible=true;
            },
            submitUpload(uploadImg,id_num) {
                $("#image").cropper('destroy');
                $("#image").hide();
                var options = {
                    aspectRatio: 1 / 1,
                    preview: '.img-preview',
                    crop(e) {
                        console.log(e);
                        dataOptions = e.detail;
                    }
                };
                this.$commonJs.upload({
                    context: this,
                    key: uploadImg,
                    id: id_num,
                    callbacks: function (data, status) {
                        // console.log(data,status);
                        data.files.forEach((item) => {
                            // console.log(item)
                            var str = item.path;
                            var urlReg = str.replace(/\\/g, "/");
                            var laterUrl = urlReg.lastIndexOf("/");
                            urlReg = urlReg.substring(laterUrl + 1, urlReg.length);
                            $("#image").attr('src', 'http://localhost:7000/upload/' + urlReg);
                            $("#image").show();
                            $("#image").cropper(options);
                        })
                    },
                })
            },
                    Confirm(){

                       console.log('0')
                        // console.log(dataOptions)
                        this.$axios.post('/api/sendPhoneCode').then(res => {
                            if (res.status == 200) {
                        //     console.log(res.data);
                        //     if(res.status == '200'){
                                this.centerDialogVisible = !true;
                                $("#image").cropper('destroy');
                                $("#image").hide();
                                alert('裁剪成功');
                            }
                        })
                    },
                    close(){
                        $("#image").cropper('destroy');
                        $("#image").hide();
                    }

        }
    }
</script>
<style lang="scss">
    .personal_user_logo {
        background-color: #ededed;
        padding: 15px 20px 15px 20px;
        .main {
            background: white;
            border-radius: 5px;
            .user_logo_con {
                padding: 15px;
                .demo-ruleForm{
                    .header_upload_div{
                        .head_div{
                            .headerBox{
                                width: 82px;
                                height: 82px;
                                border: 1px dashed #d9d9d9;
                                -webkit-border-radius: 6px;
                                -moz-border-radius: 6px;
                                -ms-border-radius: 6px;
                                -o-border-radius: 6px;
                                border-radius: 6px;
                                text-align: center;
                                cursor: pointer;
                                .headerImg{
                                    width: 80px;
                                    height: 80px;
                                    vertical-align: middle;
                                }

                            }
                        }
                    }
                }
            }
        }
            .cropBox{


            .img-container,
            .img-preview {
                background-color: #f7f7f7;
                text-align: center;
                width: 100%;
            }

            .img-container {
                margin-bottom: 1rem;
                max-height: 500px;
                min-height: 325px;
            }

            .img-container > img {
                max-width: 100%;
            }

            .docs-preview {
                margin-right: -1rem;
            }

            .img-preview {
                float: left;
                margin-bottom: .5rem;
                margin-right: .5rem;
                overflow: hidden;
                width: 200px;
                height:200px;
            }

            .img-preview > img {
                max-width: 100%;
            }

        }
        .el-upload-list {
            display: none!important;
        }
    }
</style>
