<template>
    <div class="pingshenhuizong_warp">
        <div class="unFinishQualificationsResult">
            <el-row class="fs14 bid_msg mb15">
                <el-col :span="12">
                    <div class="grid-content bg-purple"><span>包号：</span><span>{{baohao}}</span></div>
                </el-col>
                <el-col :span="12" class="fs14 textAlignR select">
                    <div class="grid-content bg-purple">
                        <el-dropdown @command="handleCommand">
                            <el-button type="primary" size="small">
                                操作<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="a">废标</el-dropdown-item>
                                <el-dropdown-item command="b">标中质询</el-dropdown-item>
                                <el-dropdown-item command="c">查看投标文件</el-dropdown-item>
                                <el-dropdown-item command="d">查看开标一览表</el-dropdown-item>
                                <el-dropdown-item command="e">评审结果签字</el-dropdown-item>
                                <el-dropdown-item command="f">资质审查签字</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
            <div class="mainContentWarp lineAll" v-loading="page_loading">
                <NavBar :msg="options" :methodType="methodType"></NavBar>
                <!--1:合理低价；2：综合评标；3：最低价-->
                <el-row class="center_part" v-if="methodType==1">
                    <!--合理低价没有进度条的页面-->
                    <el-col :span="24">
                        <template>
                            <div class="unlock_table-warp fs14">
                                <el-row>
                                    <el-col :span="12">
                                        <div class="grid-content bg-purple-dark  pro_msg_div textAlignL mb20">
                                            <h5 class="commonTitle col348fe2" style="margin-top: 7px">评审汇总</h5>
                                        </div>
                                    </el-col>
                                    <el-col :span="12" class="textAlignR btns"
                                            v-if="!this.$store.state.failureEnery.is_pingshen_show">
                                        <el-button type="primary" size="small" @click="bidEvaluation_btn"> 报价评审
                                        </el-button>
                                        <el-button type="primary" size="small" @click="submit_btn('ruleForm')"
                                                   :loading="myloading"> 提交
                                        </el-button>
                                        <el-button type="primary" size="small" class="sort_btn" @click="sort_btn">排序
                                        </el-button>
                                    </el-col>
                                    <el-col :span="12" class="textAlignR mian_btns" v-else>
                                        <el-button @click="submited_goback" type="primary" size="small"
                                                   :loading="myloading_back">返回
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-table
                                            :data="tableData"
                                            border
                                            style="width:100%">
                                        <el-table-column
                                                width="120px"
                                                prop="num"
                                                label="投标序号">
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="投标人">
                                        </el-table-column>
                                        <el-table-column
                                                prop="tender_offer"
                                                label="投标报价(人民币)">
                                        </el-table-column>
                                        <el-table-column
                                                prop="total"
                                                label="评标价(人名币)">
                                        </el-table-column>
                                        <el-table-column
                                                prop="ranking"
                                                label="排名">
                                        </el-table-column>
                                    </el-table>
                                </el-row>
                                <el-row class="mt15">
                                    <el-col :span="18">
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px"
                                                 class="demo-ruleForm">
                                            <el-form-item label="评标意见 (2000字之内)：" prop="desc">
                                                <el-input type="textarea" v-model="ruleForm.desc" ref="textarea_input"
                                                          :disabled="is_disabled"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </el-col>
                                </el-row>
                            </div>
                        </template>
                    </el-col>
                </el-row>
                <!--综合评标-->
                <el-row class="center_part" v-if="methodType==2">
                    <div v-if="isShowProgressPage==0">
                        <el-col :span="24" >
                            <!--<p>综合评标进度条</p>-->
                            <el-row :span="24" class="mb15">
                                <div class="fr">
                                    <el-button size="small" plain  @click="reviewLockRequest" class="ml10">
                                    <i  class="icon iconfont  icon-jiesuo1 mr3" ></i>评分解锁</el-button>
                                </div>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <el-table
                                            :data="msgBoxProgressZHPB"
                                            border
                                            style="width: 100%"
                                            class="pro_table">
                                        <el-table-column
                                                v-for='(col) in tableHead'
                                                :label="col.dataName"
                                                :key="col.dataItem"
                                                width="200px">
                                            <template slot-scope="scope">
                                        <span v-if="col.type === '1' ">{{
                                            scope.row[col.dataItem]
                                            }}</span>
                                                <el-progress v-else :percentage="scope.row[col.dataItem]"></el-progress>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-col>
                            </el-row>
                        </el-col>
                    </div>
                    <div v-if="isShowProgressPage!=0">
                        <el-col :span="24" class="mb15">
                            <div class="fr">
                               <span class="hide_span"  v-if="this.$store.state.failureEnery.is_pingshen_show">
                                  <el-button size="small" type='primary' @click="reviewLockRequest" class="ml10">评分解锁</el-button>
                                    <el-button size="small" @click="checkUnlockRecord" type='primary' class="ml10">查看评分解锁记录
                                    </el-button>
                                    <el-button size="small" @click="checkProScoreBtn" type='primary'>查看专家个人打分表</el-button>
                                    <el-button size="small" @click="bindScoreBtn" type='primary'>投标人分项得分表</el-button>
                                </span>
                                <span v-else>
                                    <el-button size="small" type='primary' @click="scoreQuotation" class="ml10">
                                       <i class=" icon iconfont icon-cz-dftj mr3"></i>报价计算得分
                                    </el-button>
                                    <el-button size="small" @click="biddingAdvice" type='primary' class="ml10">
                                        <i class=" icon iconfont  icon-yijian mr3"></i>评标意见
                                    </el-button>
                                    <el-button size="small" type='primary' @click="reviewSummarySubmitZHPB" class="ml10" :loading="submitFormLoadingZHPB">
                                       <i class=" icon iconfont  icon-tijiao2  mr3"></i>提交
                                    </el-button>
                                    <el-button size="small" type='primary' @click="reviewLockRequest" class="ml10">
                                        <i class=" icon iconfont   icon-jiesuo1  mr3"></i>评分解锁</el-button>
                                    <el-button size="small" @click="checkUnlockRecord" type='primary' class="ml10">
                                        <i class=" icon iconfont    icon-chakanjilu mr3" ></i>查看评分解锁记录
                                    </el-button>
                                    <el-button size="small" @click="checkProScoreBtn" type='primary'>
                                        <i class=" icon iconfont  icon-dafen  mr3"></i>查看专家个人打分表
                                     </el-button>
                                    <el-button size="small" @click="bindScoreBtn" type='primary'>
                                         <i class=" icon iconfont  icon-cz-dftj  mr3"></i>投标人分项得分表</el-button>
                                </span>

                            </div>
                        </el-col>
                        <el-col :span="24">
                            <template>
                                <el-table
                                        :data="msgBox"
                                        size="small"
                                        tooltip-effect="dark"
                                        border
                                        class="changePriceTable"
                                        el-table__header-wrapper
                                >
                                    <el-table-column prop="bidder" label="投标人" fixed>
                                    </el-table-column>
                                    <el-table-column prop="bidderNumber"
                                                     label="投标序号"
                                                     fixed></el-table-column>
                                    <el-table-column label="评标委员会">
                                        <el-table-column :label="item.name"
                                                         v-for="(item,index ) in pingshenweiyuanData"
                                                         width="165">
                                            <tempalte slot-scope="scope">
                                             <span v-for="(amt,idx ) in  item.zhaunjiadata_gs">
                                                <span>{{amt.zhaunjia1[scope.$index]}}</span>
                                            </span>
                                            </tempalte>
                                        </el-table-column>
                                    </el-table-column>
                                    <el-table-column prop="pricePoints"
                                                     label="报价分"
                                                     fixed="right"></el-table-column>
                                    <el-table-column prop="finalScore"
                                                     label="最终得分"
                                                     fixed="right"></el-table-column>
                                    <el-table-column prop="ranking"
                                                     label="名次"
                                                     fixed="right"></el-table-column>
                                </el-table>
                            </template>
                        </el-col>
                    </div>
                </el-row>
                <!--最低价-->
                <!--<el-row class="center_part" v-if="methodType==3"></el-row>-->
            </div>
            <!----------------------投标人排序调整--------------------->
            <el-dialog
                    title="投标人排序调整"
                    :visible.sync="$store.state.failureEnery.sort"
                    width="700px"
                    class="sortDialog"
            >
                <div class="sort">
                    <div class="warp cf">
                        <div class="sortDiv fl">
                            <ul v-for="(item,index) in msg_box" class="sort_ul">
                                <li @click="getData(item,index,msg_box)" :key="item.key"
                                    :class="{'bc_66b': index === i}">
                                    {{item.company_name}}
                                </li>
                            </ul>
                        </div>
                        <ul class="right_icon fl">
                            <li><i class="el-icon-arrow-up" @click="sort_up"></i></li>
                            <li><i class="el-icon-arrow-down" @click="sort_down"></i></li>
                        </ul>
                    </div>
                    <div class="textAlignC pt20">
                        <el-button size="small" @click="save" type="primary" :loading="myloading_sort"><i
                                class="icon iconfont icon-baocun1 mr5"></i>保存
                        </el-button>
                        <el-button size="small" @click="reback" type="primary"><i
                                class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!----------------------报价计算--------------------->
            <el-dialog
                    title="报价计算"
                    :visible.sync="$store.state.failureEnery.bidEvaluation"
                    width="1000px"
            >
                <div class="BidEvaluation">
                    <div class="warp cf">
                        <template>
                            <el-table
                                    :data="msg_data"
                                    style="width: 100%"
                                    border
                            >
                                <el-table-column
                                        prop="bid_name"
                                        label="投标人名称"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="tender_offer"
                                        label="投标报价（元）"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="bid_price"
                                        label="评标价（元）">
                                </el-table-column>
                                <el-table-column
                                        prop="base_rice"
                                        label="基准价（元）">
                                </el-table-column>
                                <el-table-column
                                        prop="bias_ratio"
                                        label="偏离率β（%）"
                                        width="180">
                                </el-table-column>
                                <el-table-column
                                        prop="radio"
                                        label="报价是否有效" width="200">
                                    <template slot-scope="scope">
                                        <el-radio-group
                                                @change="radio_is_valid(scope.row.radio,scope.row.id,scope.row,scope.$index,msg_data)"
                                                ref="shet" v-model="scope.row.radio">
                                            <el-radio :label="1">有效</el-radio>
                                            <el-radio :label="2">无效</el-radio>
                                        </el-radio-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </div>
                    <div class="textAlignC pt20">
                        <el-button size="small" @click="bidEvaluation_submit" type="primary"
                                   :loading="bidEvaluation_submit_loading"><i
                                class="icon iconfont icon-baocun1 mr5"></i>提交
                        </el-button>
                        <el-button size="small" @click="bidEvaluation_reback" type="primary"><i
                                class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                        </el-button>
                    </div>
                </div>
            </el-dialog>
            <!----------------------报价计算end--------------------->
            <el-dialog title="成功提示"
                       :visible.sync="$store.state.failureEnery.success_warning"
                       width="700px">
                <div class="textAlignC">
                    <p>请先点击页面【报价审核页面】按钮，设置投标人是否有效!</p>
                </div>
                <div class="textAlignC pt20">
                    <el-button size="small" @click="confirm_btn" type="primary"><i
                            class="icon iconfont icon-fanhuishouye1 mr5"></i>确定
                    </el-button>
                </div>
            </el-dialog>
            <!--废标弹框-->
            <el-dialog
                    title="废标"
                    :visible.sync="dialogAbandonedTender"
                    width="700px"
            >
                <AbandonedTender @sonToFather="dialogAbandonedTender=false"></AbandonedTender>
            </el-dialog>
            <!--废标弹框-->

            <!--标中质询弹框-->
            <el-dialog
                    title="标中质询信息列表"
                    :visible.sync="dialogStandardChallengeInformation"
                    width="900px"
            >
                <StandardChallengeInformation :cities="cities" :tableData="tableDataTwo"
                                              :bzzxLoading="bzzxLoading"></StandardChallengeInformation>
            </el-dialog>
            <!--标中质询弹框-->
            <el-dialog
                    title="审查提示"
                    :visible.sync="$store.state.failureEnery.submitPrompt"
                    width="700px">

                <SubmitPrompt></SubmitPrompt>
            </el-dialog>
            <el-dialog
                    title="评分解锁申请"
                    :visible.sync="dialogFormVisible"
                    width="700px"
            >
                <div class="reviewLockRequest">
                    <el-form :model="ruleFormLockRequest" :rules="ruleFormLockRequestRule" ref="ruleFormLockRequest"
                             label-width="120px" class="demo-ruleForm">
                        <el-form-item label="提出专家：" prop="type">
                            <el-checkbox-group v-model="ruleFormLockRequest.type">
                                <el-checkbox v-for="item in unlockDataCheckbox" :label="item" :key="item">{{item}}
                                </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="解锁申请类别：" prop="resource">
                            <el-radio-group v-model="ruleFormLockRequest.resource">
                                <el-radio :label="item.value" v-for="item in unlockDataRadio"> {{item.label}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="申请原因：" prop="desc">
                            <el-input type="textarea" autosize v-model="ruleFormLockRequest.desc"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitFormLockRequest('ruleFormLockRequest')" size="small"
                                       :loading="submitFormLockRequestLoading"><i
                                    class="icon iconfont icon-baocun1 mr5"></i>保存
                            </el-button>
                            <el-button @click="resetFormLockRequest('ruleFormLockRequest')" size="small" type="primary">
                                <i class="icon iconfont icon-eraser mr5"></i>重置
                            </el-button>
                            <el-button @click="rebackLockRequest" size="small" type="primary"><i
                                    class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>

            <el-dialog
                    width="700px"
                    title="提示"
                    :visible.sync="tipsDialog"
                    append-to-body>
                <el-row style="margin:10px auto;">
                    <el-row style="  border:1px solid #ccc;">
                        <el-row class="textAlignC fs14" style="line-height: 30px">
                            <div class="xiaolian" style="width:100%; background:#ebeff3; height:76px;">
                                <img src="../../assets/img/xiaolian.png" alt=""
                                     style="display: block;  height:80px;  margin:0px auto; vertical-align: middle;">
                            </div>
                        </el-row>
                        <el-row>
                            <p class="tishi_wenzi" style="text-align: center;color:#000000;line-height:40px;">
                                {{tippsDialogName}}成功！</p>
                        </el-row>
                    </el-row>
                    <el-row>
                        <div class="djsTime" style="text-align: center; color:#000000; line-height:40px;">[<span
                                id="sec">{{count}}</span>]秒后自动关闭
                        </div>
                    </el-row>
                    <el-row class="textAlignC pt20">
                        <el-button size="small" type="primary" @click="tipsDialogComfrim">确认</el-button>
                    </el-row>
                </el-row>
            </el-dialog>
            <el-dialog
                    title="查看专家个人打分表"
                    :visible.sync=" $store.state.failureEnery.checkProScoreDialogVisible"
                    width="1800px"
            >
                <CheckProScore :zhaunjiaGerenMarkData="zhaunjiaGerenMarkData" :biaoNum="biaoNum" :baohao="baohao"
                               :to_submit_prompt_baohao="to_submit_prompt_baohao" :companyNameData="companyNameData"
                               :pingshenzhaunjiaData="pingshenzhaunjiaData"></CheckProScore>
            </el-dialog>
            <!----------------------投标人分项得分表start--------------------->
            <el-dialog
                    title="投标人分项得分表"
                    :visible.sync="dialogBindScore"
                    width="1800px"
            >
                <div class="checkProScore">
                    <div class="biaoba_fisrt">
                        <el-row class="mb15">
                            <span>分包号：{{baohao}}[第{{to_submit_prompt_baohao}}包]</span>
                            <span class="ml20">专家组：{{biaoNum}}评委会 </span>
                        </el-row>
                        <el-table
                                :data="biddersScoreTable"
                                size="small"
                                tooltip-effect="dark"
                                border
                                el-table__header-wrapper
                        >
                            <el-table-column
                                    type="index"
                                    width="50" header-align="left" fixed>
                            </el-table-column>
                            <el-table-column prop="evaluationFactors" header-align="left"
                                             label="项目"
                                             fixed width="165"></el-table-column>
                            <el-table-column header-align="left" label="投标人">
                                <el-table-column header-align="left" :label=item.companyName   v-for="(item,index) in  biddersScoreTitleData" :key="index">
                                    <el-table-column :label="a.name"
                                                     v-for="(a,i) in item.NameList"
                                                     width="175" :key="i">
                                        <tempalte slot-scope="scope">
                                            <span >  {{scope.row['value' +( (i+ 1) + item.NameList.length * index)]}}  </span>
                                        </tempalte>
                                    </el-table-column>
                                </el-table-column>
                            </el-table-column>
                        </el-table>
                    </div>
                    <el-row class="mab15 textAlignC mt30">
                        <el-button type="primary" size="small" @click="rebackBiddersScoreBtn"><i class="icon iconfont icon-fanhuishouye1 mr5"></i>返回</el-button>
                    </el-row>
                </div>
            </el-dialog>
            <!----------------------投标人分项得分表end--------------------->
            <!--计算报价得分-->
            <el-dialog
                    title="计算报价得分"
                    :visible.sync="dialogScoring"
                    width="900px"
            >
                <div class="Scoring">
                    <el-row>
                        <el-table
                                ref="multipleTable"
                                :data="scoreQuotationData"
                                size="small"
                                tooltip-effect="dark"
                                border
                                class="changePriceTable"
                                el-table__header-wrapper>
                            <el-table-column prop="name" header-align="left" label="投标人名称"
                                             width="250px"></el-table-column>
                            <el-table-column prop="toubiaoPrice" header-align="left" label="投标报价（元）"></el-table-column>
                            <el-table-column prop="evaluationBid" header-align="left" label="评标价（元）"></el-table-column>
                            <el-table-column prop="standardPrice" header-align="left" label="基准价（M）"></el-table-column>
                            <el-table-column prop="beitaValue" header-align="left" label="β（%）"></el-table-column>
                            <el-table-column prop="scoringSystem" header-align="left" label="系统计算得分"></el-table-column>
                            <el-table-column prop="expertConfirmScore" header-align="left" label="专家确认得分" width="220px">
                                <template slot-scope="scope">
                                    <el-row class="cf">
                                        <el-input size="small" :value="scope.row.score" class="fl"
                                                  style="width:169px"></el-input>
                                        <div class="red fl textAlignC mt5" style="width:25px;">&nbsp;*</div>
                                    </el-row>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row class="red lin-height35">
                            提示：报价得分、计算基准价由系统根据招标文件中设定的计算方法自动生成。
                        </el-row>
                        <el-row class="textAlignC mt30">
                            <el-button @click="acceptanceSystemScor" size="small" type="primary"><i
                                    class="icon iconfont icon-fanhuishouye1 mr5"></i>接受系统计算得分
                            </el-button>
                            <el-button @click="sumbitScoring" size="small" type="primary"><i
                                    class="icon iconfont icon-tijiao mr5"></i>提交
                            </el-button>
                            <el-button @click="rebackScoring" size="small" type="primary"><i
                                    class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                            </el-button>
                        </el-row>
                    </el-row>
                </div>
            </el-dialog>

            <!--评标意见-->
            <el-dialog
                    title="评标意见"
                    :visible.sync="dialogBiddingAdvice"
                    width="700px"
                    class="biddingAdvice"
            >
                <div class="biddingAdvice">
                    <el-form ref="formBiddingAdvice" :model="formBiddingAdvice" class="demo-ruleForm">
                        <el-form-item>
                            <el-input type="textarea" v-model="formBiddingAdvice.desc"  ref="input_desc"></el-input>
                        </el-form-item>
                        <el-form-item class="textAlignC">
                            <el-button type="primary" @click="saveBiddingAdvice(formBiddingAdvice)" size="small"
                                       :loading="saveBiddingAdviceLoading"><i
                                    class="icon iconfont icon-baocun1 mr5"></i>保存
                            </el-button>
                            <el-button @click="rebackBiddingAdvice" size="small"><i
                                    class="icon iconfont icon-fanhuishouye1 mr5"></i>返回
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-dialog>
            <!--评标意见-->
            <!--解锁申请记录-->
            <el-dialog
                    title="解锁申请记录"
                    :visible.sync="$store.state.failureEnery.unlock_record"
                    width="700px"
            >
                <ViewUnlockRecord :msg="unlock_dialog_check"></ViewUnlockRecord>
            </el-dialog>
            <!--解锁申请记录-->

            <el-dialog
                    title="全部选中提示"
                    :visible.sync="$store.state.failureEnery.tijiaoDialogZHPB"
                    width="30%"
            >
                <el-row class="textAlignC fs14" style="line-height: 30px">
                    您确定进行评分汇总操作吗？
                </el-row>
                <el-row class="textAlignC pt20">
                    <el-button size="small" type="primary" @click="comfrimSubmitZHPB">确认</el-button>
                    <el-button size="small" type="primary" @click="rebackSubmitZHPB">取消</el-button>
                </el-row>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import ViewUnlockRecord from '../../components/publicVue/ViewUnlockRecord';
    import CheckProScore from '../../components/publicVue/CheckProScore';
    import NavBar from '../../components/publicVue/NavBar';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询

    export default {
        name: "unFinishQualificationsResult",
        props: {},
        components: {
            NavBar,
            AbandonedTender,
            StandardChallengeInformation,
            ViewUnlockRecord,
            CheckProScore
        },
        data() {
            return {
                page_loading: false,
                tableData: [],//table1数据
                /* -------头部包信息-----*/
                name: "",//标包名称
                biaoNum: '',
                baohao: '',
                options: [],//头部按钮
                /* -------头部包信息end-----*/
                ruleForm: {
                    desc: ''
                },
                rules: {
                    desc: [
                        {required: true, message: '评标意见不能为空!', trigger: 'blur'},
                        {min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur'}
                    ]
                },
                msg_data: [],//评审报价(子组件)
                /*-----------------排序----------*/
                msg_box: [],//排序数据(子组件)
                i: '',//排序记录下标
                obj: {},//排序当前的对象
                sort_msg: [],//排序的数据
                /*---------------排序end---------*/
                /*--------------报价计算-----------------*/
                table_data: [],//报价计算table数据
                /*--------------报价计算end-----------------*/
                a: [],//radio存在有效(1)的数组
                dialogAbandonedTender: false, //废标
                dialogStandardChallengeInformation: false,//标中质询信息表
                cities: [],
                tableDataTwo: [],
                bzzxLoading: true, //标中质询loading
                is_disabled: false,
                myloading: false,//评审汇总提交loading
                myloading_back: false,//返回评审汇总loading
                myloading_sort: false,// 排序提交返回loading
                bidEvaluation_submit_loading: false,//报价计算提交loading
                methodType: '',//区分那种评标方法
                dialogFormVisible: false,//评分解锁弹框
                dialogScoring: false,//标价计算得分弹框
                scoreQuotationData: [],//标价计算得分数据
                unlockDataCheckbox: [],//解锁复选框数据
                unlockDataRadio: [],//评分解锁单选框数据
                tippsDialogName: "",//评分解锁成功提示框的name
                count: '5',   //评分解锁成功提示框倒计时5秒
                submitFormLockRequestLoading: false,// 评分解锁成功提示框提交按钮loading
                ruleFormLockRequestRule: {
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个提出专家', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: '请填写申请原因', trigger: 'blur'}
                    ]
                },
                ruleFormLockRequest: {
                    type: [],
                    desc: '',
                    resource: '1',
                },
                tipsDialog: false,//解锁保存提示弹框状态
                dialogBiddingAdvice: false,//评标意见弹框状态
                formBiddingAdvice: {//评标意见
                    desc: ""
                },
                saveBiddingAdviceLoading: false,//评标意见弹框保存lodding
                unlock_dialog_check: [],//评分解锁记录
                zhaunjiaGerenMarkData: [],//专家个人打分表
                to_submit_prompt_baohao: "",//专家个人打分表分包号第几包
                companyNameData: [],
                pingshenzhaunjiaData: [],
                msgBox: [],//评审汇总table数据
                pingshenweiyuanData: [],
                msgBoxProgressZHPB: [],//综合评标页面进度条数据
                tableHead: [],//综合评标页面进度条表格数据
                isShowProgressPage: '',//0:进度条的页面，1表格的页面
                submitFormLoadingZHPB:false,//综合评标提交按钮loding
                dialogBindScore:false,// 专家个人打分表
                biddersScoreTable:[],//投标人分项得分表
                biddersScoreTitleData:[],//投标人分项得分表头数据

            }
        },
        created() {
            this.methodType = this.$route.query.methodType;
            console.log(this.$route.query.type);
        },
        mounted() {
            this.init();
        },
        computed: {},
        methods: {
            init() {   //初始化 table的数据
                this.page_loading = true;
                this.$axios.post('/api/pingshen_huizong', {
                    type: this.$route.query.type,
                    methodType: this.$route.query.methodType
                }).then(res => {
                    if (res.status === 200) {
                        this.name = res.data.bidMsg.name;
                        // console.log(res.data);
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.to_submit_prompt_baohao = this.baohao.split('/')[1];
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.scoreQuotationData = res.data.bidMsg.eviewrItemsMsg.bidEvaluation;
                        this.msg_data = res.data.bidMsg.eviewrItemsMsg.bidEvaluation;//报价计算
                        this.unlockDataCheckbox = res.data.bidMsg.eviewrItemsMsg.jiesuoData.checkedList;
                        this.isShowProgressPage = res.data.bidMsg.eviewrItemsMsg.isShow;
                        this.unlockDataRadio = res.data.bidMsg.eviewrItemsMsg.jiesuoData.radioList;
                        this.unlock_dialog_check = res.data.bidMsg.eviewrItemsMsg.unlock_dialog_check;
                        this.tippsDialogName = res.data.bidMsg.eviewrItemsMsg.jiesuoData.tippsDialogName;
                        this.zhaunjiaGerenMarkData = res.data.bidMsg.eviewrItemsMsg.zhaunjiaGerenMarkData;
                        this.biddersScoreTable=res.data.bidMsg.eviewrItemsMsg.biddersScoreTable;
                        this.biddersScoreTitleData=res.data.bidMsg.eviewrItemsMsg.biddersScoreTitleData;
                        this.companyNameData = res.data.bidMsg.eviewrItemsMsg.companyNameData;
                        this.pingshenzhaunjiaData = res.data.bidMsg.eviewrItemsMsg.pingshenzhaunjiaData;
                        this.msgBoxProgressZHPB = res.data.bidMsg.eviewrItemsMsg.tables;//进度数据
                        this.tableHead = res.data.bidMsg.eviewrItemsMsg.tableData;
                        this.pingshenweiyuanData = res.data.bidMsg.eviewrItemsMsg.pingshenweiyuanData;
                        this.msgBox = res.data.bidMsg.eviewrItemsMsg.pingshenhuizongTableData;
                        this.msg_box = res.data.bidMsg.eviewrItemsMsg.sort_data;//排序
                        this.tableData = res.data.bidMsg.eviewrItemsMsg.review_summary;
                        this.$store.state.failureEnery.isshow = false;
                        if(this.$route.query.methodType==1){
                            // console.log(res.data.bidMsg.eviewrItemsMsg.isShow);
                            if (res.data.bidMsg.eviewrItemsMsg.isShow === 0) {//0：提交前那个页面显示，1:提交前的页面
                                this.$store.state.failureEnery.is_pingshen_show = false;
                            } else {
                                this.$store.state.failureEnery.is_pingshen_show = true;
                                this.is_disabled = true;
                                this.ruleForm.desc='2';
                            }
                        }else if(this.$route.query.methodType==2){
                            // console.log(res.data.bidMsg.eviewrItemsMsg.isShow);//0：提交前那个页面显示，1:提交前的页面
                            // console.log(res.data.bidMsg.eviewrItemsMsg.tijiao);
                                if(res.data.bidMsg.eviewrItemsMsg.tijiao==1){ //1,提交之前的，0，提交之前的
                                    this.$store.state.failureEnery.is_pingshen_show=true;
                                }else{
                                    this.$store.state.failureEnery.is_pingshen_show=false;
                                }
                        }
                    }
                    this.page_loading = false;
                })
            },
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    this.dialogAbandonedTender = true;
                } else if (val === 'b') {//交通费标准
                    this.dialogStandardChallengeInformation = true;
                    this.bzzxLoading = true;
                    this.$axios.post('/api/StandardChallengeList', {}).then(res => {
                        if (res.status == 200) {
                            this.cities = res.data.cityOptions;
                            this.tableDataTwo = res.data.standList;
                            this.bzzxLoading = false;
                        }
                    })
                } else if (val === 'c') {//报销汇总表
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'd') {//报销汇总表-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                }
            },
            /*------------------------合理低价评审汇总-----------------*/
            submit_btn(formName) {//提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.myloading = true;
                        this.$axios.post('/api/pshz_tijiao', {
                            type: this.$route.query.type,
                            data: this.ruleForm.desc
                        }).then(res => {
                            if (res.status == 200) {
                                this.options = res.data.vue_type;
                                this.msg_data.forEach((m, i) => {
                                    if (m.radio == 1) {
                                        this.a.push(m.radio)
                                    }
                                });
                                if (this.a.length != 0) {
                                    // alert('有效选中');
                                    this.$message({
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                    this.$store.state.failureEnery.is_pingshen_show = true;
                                    this.is_disabled = true;
                                    // this.mydataloading = false;
                                } else {
                                    this.$store.state.failureEnery.success_warning = true;
                                }
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            submited_goback() {//掉接口
                this.myloading_back = true;
                this.$axios.post('/api/pingshenhuizong_fanhui', {}).then(res => {
                    if (res.status == 200) {
                        this.myloading_back = false;
                        this.$store.state.failureEnery.is_pingshen_show = false;
                        this.is_disabled = false;
                    }
                });
            },
            /*-----------排序弹框----------*/
            sort_btn() {//排序
                this.$store.state.failureEnery.sort = true;
            },
            bidEvaluation_btn() {//报价评审
                this.$store.state.failureEnery.bidEvaluation = true;
            },
            reback() {
                this.$store.state.failureEnery.sort = false;
            },
            getData(a, index, msg_box) {//每一个排序的li
                this.i = index;//点击上去的下标
                this.obj = a;
                this.sort_msg = msg_box;//当前的这个数据
            },
            sort_down() {//向下排序
                if (this.i !== this.msg_box.length - 1) {
                    let item = this.msg_box[this.i];
                    this.msg_box.splice(this.i, 1);//把当前点击的这条先删掉，然后把这条的数据插到它下一条数据的后面去
                    this.msg_box.splice(this.i + 1, 0, item);
                    this.i = this.i + 1;
                }
                else if (this.i = this.msg_box.length - 1) {//如果是向下排序，最后一个就不能向下了
                    this.i = this.msg_box.length - 1;
                }
            },
            sort_up() {//向上排序
                if (this.i > 0) {
                    let item = this.msg_box[this.i];
                    this.msg_box.splice(this.i - 1, 0, item);
                    this.msg_box.splice(this.i + 1, 1);
                    this.i = this.i - 1;
                }//如果是向上排序，最后一个就不能向上了
            },
            save() {//排序保存
                this.myloading_sort = true;
                this.$axios.post('/api/sort_tijaio', 'post', {
                    data: this.msg_box
                    // id:id
                }).then(res => {
                    if (res.status == 200) {
                        this.myloading_sort = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    }
                })
            },
            /*------------------------------排序弹框end-----------------------------------------*/


            /*------------------------合理低价评审汇总end-----------------*/
            /*-------------------------------报价计算弹框---------------------------------------*/
            radio_is_valid(radio, id, tableKey, index, msg_box) {//报价审核是否有效
                // radio:radio选中的状态：1：有效、2：无效, id：当选选中id, tableKey当选选中行数据, index：下标, msg_box：当前的table表数据
                this.$axios.post('/api/radio_is_valid', {
                    id: id,
                    type: radio,
                }).then(res => {
                    if (res.status == 200) {
                        var store_radio = null;
                        for (var i = 0; i < this.msg_data.length; i++) {
                            if (this.msg_data[i].id == id) {
                                radio = this.msg_data[i].radio;
                                break;
                            }
                        }
                    }
                });
            },
            bidEvaluation_submit() {// 报价计算弹框提交
                this.bidEvaluation_submit_loading = true;
                this.$axios.post('/api/radio_is_valid_tijiao', {
                    data: this.msg_data
                }).then(res => {
                    if (res.status == 200) {
                        this.bidEvaluation_submit_loading = false;
                        this.$message({
                            message: '最新报价保存完成！',
                            type: 'success'
                        });
                        this.$store.state.failureEnery.bidEvaluation = false;
                    }
                })
            },
            bidEvaluation_reback() {//报价计算弹框返回按钮
                this.$store.state.failureEnery.bidEvaluation = false;
            },
            confirm_btn() {//报价计算确定按钮
                this.$store.state.failureEnery.success_warning = false;
                this.myloading = false;
            },
            /*-------------报价计算end----------------*/
            handleCommand(val) {//弹框群
                if (val === 'a') {//人员信息
                    this.dialogAbandonedTender = true;
                } else if (val === 'b') {//交通费标准
                    this.dialogStandardChallengeInformation = true;
                    this.bzzxLoading = true;
                    this.$axios.post('/api/StandardChallengeList', {}).then(res => {
                        if (res.status == 200) {
                            this.cities = res.data.cityOptions;
                            this.tableDataTwo = res.data.standList;
                            this.bzzxLoading = false;
                        }
                    })
                } else if (val === 'c') {//报销汇总表
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'd') {//报销汇总表-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/img/receipt.pdf', '_blank',);
                } else if (val === 'e') {//报销情况查询-财政
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                } else if (val === 'f') {//点击修改密码
                    window.open(window.location.protocol + '//' + window.location.host + '/SignaturePage', '_blank',);
                }
            },
            reviewLockRequest() {//评分解锁按钮
                this.dialogFormVisible = true;
            },
            /*---------------------------------标价计算得分---------------*/
            scoreQuotation() {//标价计算得分按钮
                this.dialogScoring = true;
            },
            sumbitScoring() {//标价计算得分提交
                let isNotFilled = false;
                for (let i = 0; i < this.scoreQuotationData.length; i++) {
                    if (!$.trim(this.scoreQuotationData[i].score)) {
                        isNotFilled = true;
                        break;
                    }
                }
                if (isNotFilled) {
                    this.$message('请先填写计算得分或者接受系统计算得分！');
                } else {
                    this.$axios.post('/api/score_quotation_tijiao', {data: this.scoreQuotationData}).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                message: '最新报价保存完成！',
                                type: 'success'
                            });
                            this.dialogScoring = false;
                        }
                    })
                }
            },
            rebackScoring() {//接受系统计算得分返回按钮
                this.dialogScoring = false;
            },
            acceptanceSystemScor() {//接受系统计算得分
                for (let i = 0; i < this.scoreQuotationData.length; i++) {
                    this.scoreQuotationData[i].score = this.scoreQuotationData[i].scoringSystem;
                }
            },

            /*-----------------------标价计算得分end---------------*/

            /*--------------------评分解锁弹框-------------------*/
            submitFormLockRequest(formName) {
                this.$refs[formName].validate((valid) => {
                    this.submitFormLockRequestLoading = true;
                    if (valid) {
                        this.$axios.post('/api/ruleFormLockRequestSave', 'post', {
                            data: JSON.stringify(this.$data.ruleForm)
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.tipsDialog = true;
                                this.goGrdoupRecor();//倒计时开始
                                this.submitFormLockRequestLoading = false;
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetFormLockRequest(formName) {
                this.$refs[formName].resetFields();
            },
            rebackLockRequest() {
                this.dialogFormVisible = true;
            },
            tipsDialogComfrim() {//评分解锁成功提示框的确定按钮
                this.tipsDialog = false;
            },
            //倒计时
            goGrdoupRecor() {
                let TIME_COUNT = 5;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            this.tipsDialog = false;
                        }
                    }, 1000)
                }
            },
            /*--------------------评分解锁弹框end-------------------*/

            /*--------------------评标意见弹框-------------------*/
            biddingAdvice() {
                this.dialogBiddingAdvice = true;
            },
            saveBiddingAdvice(formName) {//评标意见弹框保存按钮
                this.saveBiddingAdviceLoading = true;
                this.$axios.post('/api/saveBiddingAdvice', 'post', {
                    data: this.formBiddingAdvice.desc
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '保存完成！',
                            type: 'success'
                        });
                        this.saveBiddingAdviceLoading = false;
                        this.dialogBiddingAdvice = false;
                    }
                });
            },
            rebackBiddingAdvice() {//评标意见弹框返回按钮
                this.dialogBiddingAdvice = false;
            },
            checkUnlockRecord() {
                this.$store.state.failureEnery.unlock_record = true;
            },
            //查看专家个人打分表
            checkProScoreBtn() {
                this.$store.state.failureEnery.checkProScoreDialogVisible = true;
            },
            reviewSummarySubmitZHPB(){//综合评标提交按钮
                this.$store.state.failureEnery.tijiaoDialogZHPB=true;
            },
            comfrimSubmitZHPB(){//综合评标提交确定按钮
                this.submitFormLoadingZHPB=true;
                this.$axios.post('/api/submitBtnZHPB', 'post', {
                    data: ''
                }).then(res => {
                    if (res.data.code == 200) {
                        this.tipsDialog = true;
                        this.goGrdoupRecor();//倒计时开始
                        this.submitFormLoadingZHPB = false;
                        this.$store.state.failureEnery.tijiaoDialogZHPB=false;
                        // $(".hide_span").hide();
                        this.$store.state.failureEnery.is_pingshen_show=false;

                    }
                });
            },
            rebackSubmitZHPB(){//综合评标提交取消按钮
                this.$store.state.failureEnery.tijiaoDialogZHPB=false;
            },
            bindScoreBtn(){//投标人分项得分按钮
                this.dialogBindScore=true;
            },
            rebackBiddersScoreBtn(){//投标人分项得分表返回按钮
                this.dialogBindScore=false;
            }
        }
    }
</script>

<style lang="scss">
    .pingshenhuizong_warp {
        overflow: hidden;
        padding-top: 15px;
        background: #ededed;
        .unFinishQualificationsResult {
            background-color: #ededed;
            padding: 0px 0% 15px 0%;
            width: 98%;
            float: left;
            margin-left: 1%;
            margin-right: 1%;
            .bid_msg {
                line-height: 32px;
                .select {
                    .el-dropdown {
                        vertical-align: top;
                    }
                    .el-dropdown + .el-dropdown {
                        margin-left: 15px;
                    }
                    .el-icon-arrow-down {
                        font-size: 12px;
                    }
                }
            }
            .mainContentWarp {
                background: white;
                border-radius: 5px;
                .el-form-item {
                    margin-bottom: 0;
                }
                .center_part {
                    padding: 15px;
                    .pro_table {
                        .icon-queren {
                            color: #35D437;
                        }
                        .el-progress-bar__inner {
                            background: #35D437;
                        }
                    }
                    .unlock_table-warp {
                        color: #606266;
                        .unlock_table_msginfo {
                            border: 1px solid #ebeef5;
                            border-top: none;
                            padding: 15px;
                            .letter {
                                padding-bottom: 5px;
                            }
                            .pad {
                                padding-left: 28px;
                            }
                        }
                    }
                }
            }
            .sort {
                .warp {
                    .sortDiv {
                        width: 600px;
                        height: 200px;
                        border: 1px solid #ccc;
                        padding-left: 3px;
                        li {
                            line-height: 20px;
                        }
                    }
                    .right_icon {
                        padding-top: 89px;
                        padding-left: 5px;
                        li {
                            i {
                                color: #409EFF;
                            }
                        }
                    }
                }
                .bc_66b {
                    background: #66b1ff;
                }
                .bc_none {
                    background: none;
                }
            }
            .biddingAdvice {
                .el-textarea__inner {
                    min-height: 150px !important;
                }
            }
        }
    }
</style>