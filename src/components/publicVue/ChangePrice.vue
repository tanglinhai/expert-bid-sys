<template>
  <div class="ChangePrice">
    <el-table
      ref="multipleTable"
      :data="msgBox"
      size="small"
      tooltip-effect="dark"
      border
      class="changePriceTable"
      el-table__header-wrapper>
      <el-table-column prop="name" header-align="left" label="投标人名称"></el-table-column>
      <el-table-column prop="firstPrice" header-align="left" label="投标总价"></el-table-column>
      <el-table-column prop="finalQuotation" header-align="left" label="评标价"></el-table-column>
      <el-table-column prop="operate" header-align="left" label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click.stop="changePriceBtn(scope.$index, scope.row)"  >
            <i class="icon iconfont icon-zhifu mr5"></i>调转评标价
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-col class="textAlignC mt20" >
        <el-button @click="reback" size="mini" type="primary" style="padding: 9px 15px">返回</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="titleName" :visible.sync="dialogFormVisible" append-to-body
               width="2300"  ref="dialogFormVisible">
      <!--<PriceAdjustment ></PriceAdjustment>-->
      <div class="priceAdjustment">
        <!--<el-form :model="form" :rules="rules" ref="form">-->
        <el-form :rules="model.rules" :model="model" ref="form" class="form_warp">
          <div class="fixed_div">
            <el-row class="colred ">
              <el-col :span="8" class="lin-height30">
                <div class="grid-content bg-purple">
                  首轮报价：<span class="fristQuote_span">{{model.fristQuote | formatCurrency}}元</span>
                </div>
              </el-col>
              <el-col :span="8" class="lin-height30">
                <div class="grid-content bg-purple-light"> 评标价格：<span>{{model.fristQuote+businessAdjustmentPrice+technicalAdjustmentPrice | formatCurrency}}元</span>
                </div>
              </el-col>
              <el-col :span="8" class="lin-height30">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
            <el-row class="colred ">
              <el-col :span="8" class="lin-height30">
                <div class="grid-content bg-purple">
                  技术性价格调整小计：<span class="technicalAdjustmentPrice">{{technicalAdjustmentPrice | formatCurrency}}元</span>
                </div>
              </el-col>
              <el-col :span="8" class="lin-height30">
                <div class="grid-content bg-purple-light">
                  商务性价格调整小计：<span>{{businessAdjustmentPrice | formatCurrency}}元</span>
                </div>
              </el-col>
              <el-col :span="8" class="lin-height30">
                <!--调整价格总计：技术性价格调整表的调整金饿和商务性调整金饿的和-->
                <div class="grid-content bg-purple">调整价格总计：<span>{{businessAdjustmentPrice+technicalAdjustmentPrice | formatCurrency}}元</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="scroll_warp" style="height: 500px;overflow-x: scroll">
              <div class="attentionMatters">
                <el-row class="colred ">
                  <el-col :span="24" class="textAlignC fs15 fwb lin-height30">
                    <div class="grid-content bg-purple ">注意事项</div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple lin-height22">1.可直接调整金额，计算基数项及比例项可为空；</div>
                  </el-col>
                  <el-col :span="24">
                    <div class="grid-content bg-purple lin-height22">2.采用计算基数与比例计算值，默认填写至调整金额输入框，但调整金额可修改；</div>
                  </el-col>
                </el-row>
              </div>
              <!----------------------技术性价值调整------------------------>
              <div class="technicalAdjustment">
                <el-row class="clearfix paddingB15 paddingT10">
                  <el-col :span="12" class="coc0c pull-left lin-height28">
                    <div class="grid-content bg-purple ">技术性价格调整</div>
                  </el-col>
                  <el-col :span="12" class="pull-left textAlignR">
                    <el-button @click="addBtn()" size="small"><i class="icon iconfont icon-add mr5"></i>添加</el-button>
                  </el-col>
                </el-row>
                <el-table
                  class="mt5 table_form1"
                  :data="model.arr"
                  size="small"
                  
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                  border>
                  <el-table-column label="调整因素说明">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arr.' + scope.$index + '.changeFactor'"
                                    :rules='model.rules.changeFactor'>
                        <el-input size="small" v-model="scope.row.changeFactor" class="changeFactor_ipt"></el-input>
                        <span class="colred fr" style="display: block;margin-top: -38px">*</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="计算基数（单位：元）">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arr.' + scope.$index + '.computationalBase'">
                        <el-input v-model="scope.row.computationalBase" size="small" class="computationalBase"
                                  @blur="computationalBaseBlur(scope.$index, scope.row)"
                        ></el-input>
                        <span class="fr" style="display: block;margin-top: -39px;">元</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="增减" width="110">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arr.' + scope.$index + '.resource'">
                        <el-radio-group v-model="scope.row.resource" class="radio_group" >
                          <el-radio label="1">增</el-radio>
                          <el-radio label="-1" style=" margin-left: 13px!important;">减</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="比例（100.00）%">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arr.' + scope.$index + '.ratio'">
                        <el-input v-model="scope.row.ratio" size="small" class="ratio_input"
                                  @blur="ratioBlur(scope.$index, scope.row)"></el-input>
                        <span class="fr" style="display: block;margin-top: -39px;">%</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="调整金额（单位：元）">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arr.' + scope.$index + '.chageCount'">
                           <span class="fl symbol" style="display: block;margin-right: 4px;"
                                 v-show="scope.row.resource==='1'">  {{model.jiahao}}</span>
                           <span class="fl symbol" style="display: block; margin-right: 4px;"
                                 v-show="scope.row.resource==='-1'">  {{model.jianhao}}</span>
                        <span class="tips "
                              style="display: none; position: absolute;left: 18px;top: 30px;color:#f56c6c">调整金额不能为空!</span>
                        <el-input size="small" v-model="scope.row.chageCount" class="chageCount_ipt"
                                  @blur="chageCountSum(scope.$index, scope.row)"></el-input>
                        <span class="colred fl" style="display: block;margin-top: 2px;margin-left: 4px">*</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80" class="del_th">
                    <template slot-scope="scope">
                      <div class="del-btn ">
                        <el-button @click="handleRemoveRow(scope.row,scope.$index)" size="small">删除
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!----------------商务性价格调整----------------------->
              <div class="technicalAdjustment">
                <el-row class="clearfix pb15 pt15">
                  <el-col :span="12" class="coc0c fl lin-height28">
                    <div class="grid-content bg-purple ">商务性价格调整</div>
                  </el-col>
                  <el-col :span="12" class="fl textAlignR">
                    <el-button @click="business_add()" size="small">
                      <i class=" icon iconfont icon-add mr5"></i>
                      添加
                    </el-button>
                  </el-col>
                </el-row>
                <el-table
                  class="mt5 table_form1"
                  :data="model.arrbusiness"
                  size="small"
                  
                  style="width: 100%"
                  :default-sort="{prop: 'date', order: 'descending'}"
                  border>
                  <el-table-column label="调整因素说明">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arrbusiness.' + scope.$index + '.changeFactorbusiness'"
                                    :rules='model.rulesbusiness.changeFactorbusiness'>
                        <el-input size="small" v-model="scope.row.changeFactorbusiness"
                                  class="changeFactor_ipt"></el-input>
                        <span class="colred fr" style="display: block;margin-top: -38px">*</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="计算基数（单位：元）">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arrbusiness.' + scope.$index + '.computationalBasebusiness'">
                        <el-input v-model="scope.row.computationalBasebusiness" size="small" class="computationalBase"
                                  @blur="computationalBaseBlurBusiness(scope.$index, scope.row)"
                        ></el-input>
                        <span class="fr" style="display: block;margin-top: -39px;">元</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="增减" width="110">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arrbusiness.' + scope.$index + '.resourcebusiness'">
                        <el-radio-group v-model="scope.row.resourcebusiness" class="radio_group">
                          <el-radio label="1" >增</el-radio>
                          <el-radio label="-1" style=" margin-left: 13px!important;">减</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="比例（100.00）%">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arrbusiness.' + scope.$index + '.ratiobusiness'">
                        <el-input v-model="scope.row.ratiobusiness" size="small" class="ratio_input"
                                  @blur="ratiobusiness(scope.$index, scope.row)"></el-input>
                        <span class="fr" style="display: block;margin-top: -39px;">%</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="调整金额（单位：元）">
                    <template slot-scope="scope">
                      <el-form-item :prop="'arrbusiness.' + scope.$index + '.chageCountbusiness'" >
                        <!--:rules='model.rulesbusiness.chageCountbusiness'-->
                        <span class="fl symbol" style="display: block; margin-right: 4px;"
                              v-show="scope.row.resourcebusiness==='1'">  {{model.jiahao}}</span>
                        <span class="fl symbol" style="display: block; margin-right: 4px;"
                              v-show="scope.row.resourcebusiness==='-1'">{{model.jianhao}}</span>
                        <el-input size="small" v-model="scope.row.chageCountbusiness" class="chageCount_ipt"
                                  @blur="chageCountSumbusiness(scope.$index, scope.row)"></el-input>
                        <span class="colred fl" style="display: block;margin-top: 2px;margin-left:4px">*</span>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="80" class="del_th">
                    <template slot-scope="scope">
                      <div class="del-btn ">
                        <el-button @click="del_business(scope.row,scope.$index)" size="small">删除
                        </el-button>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
          </div>
          <!-- <el-form-item label="附件：" class="clearfix mt15">
            <el-input v-model="model.name" class="mr10 fl " style="width: 300px" size="small "></el-input>
            <el-button size="small" @click.stop="adjunctBtn" class="fl" style="margin-top: 4px"> 浏览</el-button>
          </el-form-item> -->
          <el-form-item label="上传文件:" :label-width="ruleFormLabelWidth" class="clearfix mt15">
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
          </el-form-item>
          <el-form-item class="textAlignC">
            <el-button type="primary"
                       @click="handeleSave(model,technicalAdjustmentPrice,businessAdjustmentPrice,businessAdjustmentPrice+technicalAdjustmentPrice)"
                       size="small"
                       ref="submit">
              提交
            </el-button>
            <el-button size="small" @click="goback()">
              <i class="iconfont icon-fanhuishouye1"></i>
              返回
            </el-button>
          </el-form-item>
        </el-form>
        <!--成功提示页面-->
        <el-dialog
          title="成功提示页面"
          :visible.sync="successDialogVisible"
          append-to-body
          width="30%"
           class="successDialogVisible">
          <div class="tishiWrap" style=" margin:10px auto;" >
            <div class="tishi" style="border:1px solid #ccc;">
              <div class="xiaolian" style="width:100%;background:#ebeff3; height:76px;text-align: center">
                <img src="../../assets/img/xiaolian.png" alt="" style="  height:80px; margin:0px auto; vertical-align: middle;">
              </div>
              <p class="tishi_wenzi" style=" text-align: center;color:#000000;line-height:40px;">保存谈判文件成功！</p>
            </div>
            <el-button class="sureBtns" @click="sureBtns()" type="primary" size="small" style="display: block; margin:10px auto;">确定</el-button>
            <div class="djsTime" style=" text-align: center;color:#000000;line-height:40px;">[<span id="sec" style=" color:red; display: inline-block;padding:0px 3px;">{{count}}</span>]秒后自动关闭</div>
          </div>
        </el-dialog>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  //import PriceAdjustment from './PriceAdjustment'
  export default {
    name: 'changePrice',
    components: {
      //PriceAdjustment
    },
    data() {
      return {
        show:true,  //默认投标人最新报价列表弹框展示
        titleName:"",
        successDialogVisible:false,// 保存成功的提示弹框
        dialogFormVisible: false,//标价价调整弹框
        dialogVisible: false,//调转评标价弹框
        // msgBox: [{
        //   firstPrice: '100000000人民币',
        //   name: '重庆网控科技发展有限公司',
        //   finalQuotation: 0
        // },
        //   {
        //     firstPrice: '200000000人民币',
        //     name: '普瑞太阳能有限公司',
        //     finalQuotation: 0
        //   },
        //   {
        //     firstPrice: '100000000人民币',
        //     name: '夏丰热工研究院有限公司',
        //     finalQuotation: 0
        //   },
        // ],
        //标价价调整
        model: {
          /*---------------技术性价格调整---------------*/
          jiahao: "+",//加减
          jianhao: "-",//加减
          fristQuote: 1000000,//投标价格
          rules: {
            changeFactor: [
              {type: "string", required: true, message: "调整因素说明不能为空!",},
              {min: 1, max: 200, message: '长度在 1 到 200 个字符!', trigger: 'blur'}
            ],
            // chageCount: {type: "string", required: true, message: "调整金额不能为空!",},
          },
          arr: [],
          resource: '',
          computationalBase: 0,//计算基数
          chageCount: 0,//调整金额
          ratio: 0,//比例
          nameFiles: "",
          moneySum: 0,
          /*-------------------------商务性调整---------------------*/
          arrbusiness: [],
          businessjiahao: "+",//加减
          businessjianhao: "-",//加减
          rulesbusiness: {
            changeFactorbusiness: [
              {type: "string", required: true, message: "调整因素说明不能为空!",},
              // {min: 1, max: 200, message: '长度在 1 到 200 个字符!', trigger: 'blur'}
            ],
            // chageCountbusiness: {type: "string", required: true, message: "调整金额不能为空!",},
          },
          resourcebusiness: '',
          computationalBasebusiness: 0,//计算基数
          chageCountbusiness: '0',//调整金额
          ratiobusiness: 0,//比例
          namebusiness: "",
          moneySumbusiness: 0,
        },
        formLabelWidth: '120px',
        count:'3',   //倒计时3秒
        i:"",//记录下标
      }
    },
    // 父组件传过来的值
    props:{
      msgBox:{   //投标人最新报价列表
          type:Array
      },
    },
    created() {
    },
    computed: {
      technicalAdjustmentPrice() {//技术性价格调整小计
        let amt = 0;
        this.model.arr.forEach(e => {
          amt += e.chageCount * e.resource;
          console.log(e.chageCount,666666)
        });
        return amt;
      },
      businessAdjustmentPrice() {//商务性价格调整小计
        let amtbusiness = 0;
        this.model.arrbusiness.forEach(e => {
          amtbusiness += e.chageCountbusiness * e.resourcebusiness;
        });
        return amtbusiness;
      }
    },
    watch: {
      'model.resource'(val) {
        if (val === '1') {
          $(".jiahao").show();
          $(".jianhao").hide();
        } else if (val === '-1') {
          $(".jianhao").hide();
          $(".jiahao").show();
        }
      }
    },
    filters: {
      formatCurrency(val, digits = 2) {  //货币过滤器val:参数：默认为要过滤的值；digits以多少为过滤
        if (val !== '' && val !== null && val !== undefined) {
          val = val.toString().replace(/\$|\,/g, '');
          if (isNaN(val)) {
            val = '0';
          }
          var decLen = Math.pow(10, digits);
          var sign = (val == (val = Math.abs(val)));
          val = Math.floor(val * decLen + 0.50000000001);
          var cents = val % decLen;
          val = Math.floor(val / decLen).toString();
          if (cents < 10) {
            cents = '0' + cents;
          }
          for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
          }
          return (((sign) ? '' : '-') + val + '.' + cents);
        } else {
          return '';
        }
      }
    },
    mounted() {

    },
    methods: {
      reback(){
        console.log(111)
        this.show=false;  //点击返回关闭父级弹框
        this.$emit('sonToFather',this.show);
      },
      goback(){
        this.dialogFormVisible=false;
      },
      formatCurrency(val, digits = 2) {  //货币过滤器val:参数：默认为要过滤的值；digits以多少为过滤
        if (val !== '' && val !== null && val !== undefined) {
          val = val.toString().replace(/\$|\,/g, '');
          if (isNaN(val)) {
            val = '0';
          }
          var decLen = Math.pow(10, digits);
          var sign = (val == (val = Math.abs(val)));
          val = Math.floor(val * decLen + 0.50000000001);
          var cents = val % decLen;
          val = Math.floor(val / decLen).toString();
          if (cents < 10) {
            cents = '0' + cents;
          }
          for (let i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
            val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
          }
          return (((sign) ? '' : '-') + val + '.' + cents);
        } else {
          return '';
        }
      },
      individualTrial() {
        this.dialogVisible = true;
      },
      changePriceBtn(index, obj) {
        console.log(index, obj,88888888);
        this.dialogFormVisible = true;//标价价调整弹框
        this.a=obj.finalQuotation;
        // obj.finalQuotation = this.$loaclStore.get('hldj_调整评标价isSubmit');
        this.i=index;
        this.titleName=this.msgBox[this.i].name;
        //this.model.fristQuote=this.msgBox[this.i].firstPrice;
        console.log(this.model.fristQuote,9999)
      },
      /*-------------------------------------技术性评标价格调整-------------------------------*/
      addBtn() {  //新增
        this.model.arr.push({changeFactor: "", computationalBase: 0, resource: '1', chageCount: 0, ratio: 0})
      },
      ratioBlur(index, obj) {//比例失焦
        if (obj.chageCount != "") {
          $(".tips").show();
        }
        obj.chageCount = Number(obj.computationalBase) * (Number(obj.ratio) / 100);
      },
      chageCountSum(index, obj) {//调整金额失去焦点时
        if (obj.chageCount == "") {
          $(".tips").show();
        }
        if (obj.computationalBase == '' && obj.ratio == '' && obj.resource == "1") {
          this.model.moneySum = Number(obj.chageCount);
          console.log(obj.chageCount,666666666)
        } else if (obj.computationalBase == '' && obj.ratio == '' && obj.resource == "-1") {
          this.model.moneySum = Number(obj.chageCount);
          console.log(obj.chageCount,777777)
        }
      },
      computationalBaseBlur(index, obj) {//计算基数input失焦
        obj.chageCount = Number(obj.computationalBase) * (Number(obj.ratio) / 100);
      },
      handleRemoveRow(obj, index) { //删除
        this.model.arr.splice(index, 1);
      },
      /*---------------------------------商务性评标价格---------------------*/
      business_add() {
        this.model.arrbusiness.push({
          changeFactorbusiness: "",
          computationalBasebusiness: 0,
          resourcebusiness: '1',
          chageCountbusiness: 0,
          ratiobusiness: 0
        })
      },
      ratiobusiness(index, obj) { //当计算基数和比例有值时，比例失焦
        obj.chageCountbusiness = Number(obj.computationalBasebusiness) * (Number(obj.ratiobusiness) / 100);//当计算基数和比例不为空时，调整金额=计算基数*（比例/100）
      },
      chageCountSumbusiness(index, obj) {//商务调整金额失去焦点时
        if (obj.computationalBasebusiness == '' && obj.ratiobusiness == '' && obj.resourcebusiness == "1") {
          this.model.moneySumbusiness = Number(obj.chageCountbusiness);
        } else if (obj.computationalBasebusiness == '' && obj.ratiobusiness == '' && obj.resourcebusiness == "-1") {
          this.model.moneySumbusiness = Number(obj.chageCountbusiness);
        }
      },
      computationalBaseBlurBusiness(index, obj) {//计算基数input失焦
        obj.chageCountbusiness = Number(obj.computationalBasebusiness) * (Number(obj.ratiobusiness) / 100);
      },
      del_business(obj, index) { //商务删除
        this.model.arrbusiness.splice(index, 1);
      },
      handeleSave(formName, technicalAdjustmentPrice, businessAdjustmentPrice, a) { //必填保存
        this.$refs["form"].validate((valid, model) => {
          this.valid = valid;
          if (valid) {
            console.log(this.$data.model,999997)  //获取值
            this.successDialogVisible = true;// 成功弹框
            this.goGrdoupRecor();//倒计时开始
            let bidEvaluation  = formName.fristQuote + a;//评标价;
            this.msgBox[this.i].finalQuotation=this.formatCurrency(bidEvaluation);
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      sureBtns(){   //提交之后得确定按钮
        this.successDialogVisible=false;
        this.dialogFormVisible=false;
     },
      goGrdoupRecor(){//倒计时
        const TIME_COUNT = 3;
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
              this.successDialogVisible=false;
              this.dialogFormVisible=false;
            }
          },1000)
        }
      },

      submitUpload(upload2,id_num) {   //上传文件
          console.log(upload2,id_num);
          let that=this;
          this.$commonJs.upload({
              context: this,
              key: upload2,
              id: id_num,
              callbacks: function (data, status) {
                  //console.log(data.files, status,555);
                  data.files.forEach((item) => {
                       
                      var str = item.path;
                      var urlReg = str.replace(/\\/g, "/");
                      var laterUrl = urlReg.lastIndexOf("/");
                      urlReg = urlReg.substring(laterUrl + 1, urlReg.length);
                      console.log(urlReg,that.$data,8888)
                      that.model.nameFiles= urlReg;
                      $(".el-upload-list").css({"opacity":0})
                      // $("#image").attr('src', 'http://localhost:7000/upload/' + urlReg);
                      // $("#image").show();
                      // $("#image").cropper(options);
                  })
              }
          });
      },


    }

    
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .ChangePrice {
    .changePriceTable {
    }
  }
  .priceAdjustment {
    .form_warp{
      position: relative;
    .scroll_warp {
        .technicalAdjustment {
          .table_form1 {
            .changeFactor_ipt {
              float: left;
              .el-input__inner {
                width: 95%;
              }
            }
            .computationalBase {
              float: left;
              .el-input__inner {
                width: 90%;
              }
            }
            .ratio_input {
              float: left;
              .el-input__inner {
                width: 92%;
              }
            }
            .radio_group {
              .el-radio + .el-radio {
                margin-left: 13px!important;
              }
            }
            .el-table__row {
              .el-table_5_column_19 {
                margin-top: -20px;
              }
            }
            .chageCount_ipt {
              width: 85%;
              float: left;
              .el-form-item__error {
                margin-left: 16px !important;
              }
            }
            .el-table_5_column_16 {
              .el-radio-group{
                .el-radio + .el-radio {
                  margin-left: 11px!important;
                }
              }
            }
          }
        }
      }
    }
    .successDialogVisible{
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
  }

</style>






