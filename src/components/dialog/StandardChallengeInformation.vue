<template>
    <div class="StandardChallengeInformation">
      <el-row class="mb15">
        <el-col :span="12" > <p  style="padding-top: 5px;" class=" fs16 ">标中质询信息列表</p></el-col>
        <el-col :span="12" class="textAlignR">
          <el-button size="small" @click="add" type="primary">新增</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="singleTable"
        :data="tableData"
        size="small"
        @current-change="handleCurrentChange"
        @row-click = "showRow"
        tooltip-effect="dark"
        border
        el-table__header-wrapper
        v-loading="bzzxLoading"
        style="width: 100%">
        <!---->
        <el-table-column label="选择" width="70" center>
            <template scope="scope">
                <el-radio class="radio" v-model="radio"  :label="scope.$index"  @change.native="getCurrentRow(scope.$index)" >&nbsp;</el-radio>
            </template>
        </el-table-column>
        <!---->
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          property="inquiryConten"
          label="质询内容"
          width="120">
        </el-table-column>
        <el-table-column
          property="questionTime"
          label="提问时间"
          width="120">
        </el-table-column>
        <el-table-column
          property="requestReplyTime"
          label=" 要求回复时间">
        </el-table-column>
        <el-table-column
          property="bidder"
          label="投标人">
        </el-table-column>
        <el-table-column
          property="operation"
          label="操作">
        </el-table-column>
      </el-table>
      <div class="form_div"  style="display: none">
        <el-row class="mb15 mt15">
          <el-col :span="12" > <p style="padding-top: 5px;" class=" fs16 ">新增质询</p></el-col>
          <el-col :span="12" class="textAlignR">
            <el-button type="primary" @click="submitForm('ruleForm')" size="small">提交</el-button>
            <el-button @click="cancel('ruleForm')" size="small">取消</el-button>
          </el-col>
        </el-row>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="选择投标人：" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <!-- <el-checkbox label="重庆网控科技发展有限公司" name="type"></el-checkbox>
              <el-checkbox label="普瑞太阳能有限公司" name="type"></el-checkbox>
              <el-checkbox label="夏丰热工研究院有限公司" name="type"></el-checkbox> -->
              <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="质询内容：" prop="desc">
            <el-input type="textarea"  autosize  v-model="ruleForm.desc" ></el-input>
          </el-form-item>
          <!-- <el-form-item label="上传文件:" :label-width="ruleFormLabelWidth" class="clearfix mt15">
            <el-input v-model="model.nameFiles" class="mr10 fl " style="width: 300px" size="small "></el-input>
            <el-upload
              class="upload-demo"
              ref="upload2"
              action="/upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :auto-upload="false"
            >
            <el-button slot="trigger" size="small" >浏览文件</el-button>
            <el-button style="margin-left: 10px;" size="small"
                        @click="submitUpload('upload2')">上传到服务器
            </el-button>
            </el-upload>
          </el-form-item> -->
          <el-form-item label="要求回复时间：" >
            <el-col :span="11">
              <el-form-item>
                <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;" size="small"></el-date-picker>
              </el-form-item>
            </el-col>

          </el-form-item>
        </el-form>
      </div>

      <div class="tishiWrap">
        <div class="tishi">
          <div class="xiaolian">
            <img src="../../assets/img/xiaolian.png" alt="">
          </div>
          <p class="tishi_wenzi">保存谈判文件成功！</p>
        </div>
        <el-button class="sureBtns" @click="sureBtns()" type="primary" size="small">确定</el-button>
        <div class="djsTime">[<span id="sec">{{count}}</span>]秒后自动关闭</div>
      </div>
    </div>
</template>

<script>
    // const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "standard-challenge-information",
        props:{
          sta:{
            type:Array,
          },
          cities:{
            type:Array,
          }, //选择投标人
          tableData:{
            type:Array,  //标中质询信息列表
          },
          bzzxLoading:{
            type:Boolean,
          }, //标中质询loading
        },
      data() {
        return {
          count:'5',   //倒计时5秒
          radio:'1',  //弹框推进去得单选框
          // tableData: [
          //   //{"bidder":111}
          // ],
          ruleForm: {
            date1: '',
            type: [],
            desc: ''
          },
          rules: {
            type: [
              {type: 'array', required: true, message: '请选择投标人！', trigger: 'change'}
            ],
            desc: [
              {required: true, message: '质询内容不允许为空！', trigger: 'blur'}
            ]
          },
          
          
        }
      },
      mounted(){
        
      },
      methods: {

        /**表格添加单选框以及获取值 */
        //row-click    当某一行被点击时会触发该事件 row, event, column
        showRow(row){
        //赋值给radio
            this.radio = this.tableData.indexOf(row);
        },
        /* urrent-change    当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性    currentRow, oldCurrentRow */
        handleCurrentChange(val,index) {
          this.currentRow = val;
          this.$emit('data',val.pkg);
        },
        getCurrentRow(val){
            console.log(val)
        },
        /**表格添加单选框以及获取值 */

        
        sureBtns(){   //提交之后得确定按钮
          $(".tishiWrap").hide();//倒计时内容隐藏
        },
        //倒计时
        goGrdoupRecor(){
            const TIME_COUNT = 5;
            if(!this.timer){
              this.count = TIME_COUNT;
              this.show = false;
              this.timer = setInterval(()=>{
                if(this.count > 0 && this.count <= TIME_COUNT){
                  this.count--;
                }else{
                  this.show = true;
                  clearInterval(this.timer);
                  this.timer = null;
                  //跳转的页面写在此处
                  $(".tishiWrap").hide();//倒计时内容开始到0隐藏
                }
              },1000)
            }
          },
        //倒计时
          add(){  //新增按钮
            $('.form_div').show();
          },
          submitForm(formName) {  //提交校验
            this.$refs[formName].validate((valid) => {
              if (valid) {
                //alert('submit!');
                console.log(this.ruleForm,9999);
                for(let i = 0;i<this.ruleForm.type.length;i++){
                  //console.log(this.ruleForm.type[i])
                  this.tableData.push({
                    'bidder':this.ruleForm.type[i],
                    'inquiryConten':this.ruleForm.desc,
                    'requestReplyTime':this.ruleForm.date1,
                  });
                 console.log(this.tableData,8888);
                 
                }
                //this.$refs[formName].resetFields();   //初始化表单的值
                this.ruleForm.date1="";   //初始化时间得值
                $('.form_div').hide();//新增表单隐藏
                $(".tishiWrap").show();//倒计时内容开始展示
                this.goGrdoupRecor();//倒计时开始
              } else {
                console.log('error submit!!');
                return false;
              }
            });
          },
          cancel(formName){   //取消按钮
             $('.form_div').hide();//新增表单隐藏
            this.$refs[formName].resetFields();

          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
      }
    }
</script>

<style lang="scss">
.StandardChallengeInformation{
  .tishiWrap{
    width:740px;
    margin:10px auto;
    display: none;
    .tishi{
      width:740px;
      border:1px solid #ccc;
      .xiaolian{
        width:100%;
        background:#ebeff3;
        height:76px;
        img{
          display: block;
          height:80px;
          margin:0px auto;
          vertical-align: middle;
        }
      }
      .tishi_wenzi{
        text-align: center;
        color:#000000;
        line-height:40px;
      }
    }
    .sureBtns{
      display: block;
      margin:10px auto;
    }
    .djsTime{
      text-align: center;
      color:#000000;
      line-height:40px;
      span{
        color:red;
        display: inline-block;
        padding:0px 3px;
      }
    }
  }
}
</style>
