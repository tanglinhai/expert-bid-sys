<template>
    <div class="dingdang_warp">
        <div class="business_other">
            <!--头部-->
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
                                <el-dropdown-item command="g">调整评标基准价</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
            <!--主体-->
            <div class="mainContentWarp lineAll" v-loading="page_loading">
                <!--<NavBar :msg="options" :type="type" :methodType="methodType"></NavBar>-->

                <div class="content">
                    <div class="div_pdf">
                        <div class="div_pdf_wrap cf">
                            <!-- <div class="filters">
                                <div class="filters_wrap">
                                    <div class="filters_hd">
                                        <span class="tit">投标文件目录</span>
                                        <span class="icon iconfont icon-shouqi"
                                              @click="pdf_category_open_close($event)"></span>
                                    </div>
                                    <div class="filters_bd">
                                        <div class="filters_kvs">
                                            <div class="filters_kv cf">
                                                <div class="filters_k">审查类别：</div>
                                                <div class="filters_v">{{to_submit_prompt_name}}</div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">投标人：</div>
                                                <div class="filters_v">
                                                    <el-select v-model="filter_bidder" placeholder="请选择" size="mini" @change="filter_func_bidder">
                                                        <el-option

                                                            v-for="item in companyname_toubiao"
                                                            :key="item"
                                                            :label="item.title"
                                                            :value="item.title">

                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">评审因素：</div>
                                                <div class="filters_v">
                                                    <el-select v-model="filter_factor" placeholder="请选择" size="mini" @change="filter_func_factor">
                                                        <el-option

                                                            v-for="item in dingdang_tableData"
                                                            :key="item.projectName"
                                                            :label="item.projectName"
                                                            :value="item.projectName">

                                                        </el-option>
                                                    </el-select>
                                                </div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">审查标准：</div>
                                                <div class="filters_v">{{filter_standard}}</div>
                                            </div>
                                            <div class="filters_kv cf">
                                                <div class="filters_k">评审关联点：</div>
                                                <div class="filters_v">
                                                    <div class="point"
                                                            v-for="item in filter_points"
                                                            @click="locate_pdf(item, companyname_toubiao.filter(item => item.title == filter_bidder)[0].pdf)"
                                                            :key="item">
                                                        <span class="txt">
                                                            <span class="icon iconfont icon-dingwei"></span>
                                                            {{item.name+'--P'+item.page+'--'+item.txt}}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="filters_tip">投标文件目录</div>
                                </div>
                            </div> -->
                            <pdf :pdfUrl="item.currPdfUrl" :ref="item.ref" :onload="item.onload"
                                 :queryStr="item.queryStr"
                                 :searchInCurrPage="item.searchInCurrPage"
                                 :page="item.page"
                                 v-for="item in pdfItems"
                                 :key="item"
                                 v-show="item.show"></pdf>
                            <!-- <div class="closePDF iconfont icon-guanbi1" @click="closePDF"></div> -->
                        </div>
                    </div>
                    <!-- <el-button class="exitFullMode"
                        icon="iconfont icon-fullscreen-exit"
                        size="mini"
                        @click="exitFullMode"
                    >退出全屏模式</el-button> -->
                    <el-row class="center_part_wrap">
                        <div class="slideBar" id="slideBar"
                             @mousedown="slideBarMousedown($event)"
                        ><span class="iconfont icon-vertical-align-middl"></span></div>
                        <el-row class="center_part">
                            <el-row class="center_con_wrap">
                                <div class="unlock_table-warp fs14 center_con cf">
                                    <el-row class="progress_btns">
                                        <el-col :span="10">
                                            <el-row class="red">
                                                <el-col style="width: 70px;font-size: 14px;">
                                                    <div>我的进度：</div>
                                                </el-col>
                                                <el-col style="width: 278px">
                                                    <el-progress :percentage="completePercent"
                                                                 v-if="type==10"></el-progress>
                                                    <span style="position: absolute; left: 300px; top: 0px;"
                                                          v-if="type==10">{{num_business}}/{{allNumBusiness}}</span>
                                                    <el-progress :percentage="completePercent"
                                                                 v-if="type==11"></el-progress>
                                                    <span style="position: absolute; left: 300px; top: 0px;"
                                                          v-if="type==11">{{num_jishu}}/{{allNumJishu}}</span>
                                                    <el-progress :percentage="completePercent"
                                                                 v-if="type==12"></el-progress>
                                                    <span style="position: absolute; left: 300px; top: 0px;"
                                                          v-if="type==12">{{num_serve}}/{{allNumServe}}</span>
                                                    <el-progress :percentage="completePercent"
                                                                 v-if="type==13"></el-progress>
                                                    <span style="position: absolute; left: 300px; top: 0px;"
                                                          v-if="type==13">{{num_other}}/{{allNumOther}}</span>
                                                </el-col>
                                            </el-row>
                                        </el-col>

                                        <el-col :span="14" class="textAlignR cf">
                                            <div class="grid-content bg-purple btnBox" style="text-align:right;">
                                                <el-select v-model="value1" multiple placeholder="请选择投标人" size="small"  @remove-tag='removeTag' @visible-change="changeValueChoose($event,AREACODE)" >
                                                    <el-option
                                                            v-for="item in options_select_choose"
                                                            :key="item.value"
                                                            :label="item.label"
                                                            :value="item.value"
                                                    >
                                                    </el-option>
                                                </el-select>
                                                <span class="fs14 col606266 ml10 ">每页
                                                    <el-select v-model="value" clearable placeholder="请选择投标人个数" size="small" class="bidder_select"  @change="changeValue" @clear="clearSelect" >
                                                        <el-option
                                                                v-for="item in options_select"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value"
                                                        >
                                                        </el-option>
                                                    </el-select>
                                                    家投标人
                                                </span>
                                                <!--:class="$store.state.failureEnery.business_tijiao==true ?'hide_div':'nohide_div '"-->
                                                <span class=' ml10 hide_btn'
                                                      >
                                                    <el-button size="small"
                                                               @click="checkUnfinishedItems" type="primary" plain class="unfinished_items">
                                                           <i class=" icon iconfont icon-weiwancheng "></i> 查看未完成项
                                                    </el-button>
                                                       <el-button size="small" @click="submitBusiness" type="primary"
                                                                  class="submit_business" v-if="type==10">
                                                         <i class=" icon iconfont icon-shangwu "></i>
                                                        提交商务
                                                    </el-button>
                                                    <el-button size="small" @click="submitJishu" type="primary"
                                                               class="submit_business" v-if="type==11">
                                                        <i class=" icon iconfont icon-tijiao1 mr3"></i>
                                                        提交技术
                                                    </el-button>
                                                    <el-button size="small" @click="submitServe" type="primary"
                                                               class="submit_business" v-if="type==12">
                                                          <i class="icon iconfont icon-baocun "></i>
                                                        提交服务
                                                    </el-button>
                                                     <el-button size="small" @click="submitOther" type="primary"
                                                                class="submit_business" v-if="type==13">
                                                         <i class="icon iconfont icon-baocun "></i>
                                                        提交其他
                                                    </el-button>
                                                </span>
                                            </div>

                                        </el-col>
                                        <!--table-->
                                    </el-row>
                                    <el-row class="table_warp mt15">
                                        <template>
                                            <!------------------------------------商务技术服务其他table-------------------------------->
                                            <el-table
                                                    :data="dingdang_tableData"
                                                    style="width: 100% "
                                                    class="dingdang_table"
                                                    :cell-class-name="setCellBg"
                                            >
                                                <!--@cell-mouse-leave="cellLeave"-->
                                                <!--:cell-class-name="setCellBg"-->
                                                <el-table-column
                                                        label="项目"
                                                        min-width="180" fixed prop="projectName" column-key='0'>
                                                </el-table-column>
                                                <!--column-key是用来给每一列做标识的-->
                                                <el-table-column label="投标人">
                                                    <!--商务-->
                                                    <el-table-column :label="item.title"
                                                                     v-for="(item,index ) in companyname_toubiao"
                                                                     min-width="400" :key="index" v-if="type==10"
                                                                     :column-key="index + 1">
                                                        <template slot="header" slot-scope="scope">
                                                            <a v-if="companyname_toubiao[scope.$index].pdf.length<2"
                                                               @click="show_pdf(companyname_toubiao[scope.$index].pdf[0])"
                                                               class="common_a_style" title="投标文件">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                            </a>
                                                            <el-dropdown v-else trigger="click">
                                                              <span class="el-dropdown-link" title="投标文件列表">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                                {{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="show_pdf(pdfItem)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao[scope.$index].pdf"
                                                                    >{{pdfItem.pdf_name}}<i
                                                                            class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <!--单选法-->
                                                            <!--<div v-if="scope.row.type === 'radio'">-->
                                                            <!--<span v-if="is_submit==0">-->
                                                            <!--<el-radio-group-->
                                                            <!--v-model="scope.row['value' + (index + 1)]"-->
                                                            <!--v-if="$store.state.failureEnery.business_tijiao"-->
                                                            <!--@change="changeRadios(index + 1,scope.row['value' + (index + 1)])"-->
                                                            <!--class="radio_div">-->
                                                            <!--<el-radio :label="val.num"-->
                                                            <!--v-for="val in scope.row.radioList">-->
                                                            <!--{{val.typeTitle}}-->
                                                            <!--</el-radio>-->
                                                            <!--</el-radio-group>-->
                                                            <!--<span v-else> {{ scope.row['value' + (index + 1)]}}</span>-->
                                                            <!--</span>-->
                                                            <!--<span v-else>10</span>-->
                                                            <!--</div>-->
                                                            <div v-if="scope.row.type === 'radio'">
                                                                <span v-if="is_submit==0">
                                                                    <el-radio-group
                                                                            v-model="scope.row['value' + (index + 1)]"
                                                                            v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] "
                                                                            @change="changeRadios(index + 1,scope.row['value' + (index + 1)],scope.$index,scope.row)"
                                                                            class="radio_div">
                                                                        <el-radio :label="val.num"
                                                                                  v-for="val in scope.row.radioList">
                                                                            {{val.typeTitle}}
                                                                        </el-radio>
                                                                    </el-radio-group>
                                                                    <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>10</span>
                                                            </div>
                                                            <!--<div v-if="scope.row.type === 'radio'">-->
                                                            <!--<span v-if="is_submit==0">-->
                                                            <!--<el-radio-group-->
                                                            <!--v-model="scope.row['value' + (index + 1)]"-->
                                                            <!--@change="changeRadios(index + 1,scope.row['value' + (index + 1)],scope.$index,scope.row)" class="radio_div" >-->
                                                            <!--<el-radio :label="val.num"-->
                                                            <!--v-for="val in scope.row.radioList">-->
                                                            <!--{{val.typeTitle}}-->
                                                            <!--</el-radio>-->
                                                            <!--</el-radio-group>-->
                                                            <!--&lt;!&ndash;<span  > {{scope.row['value' + (index + 1)]}}</span>&ndash;&gt;-->
                                                            <!--</span>-->
                                                            <!--<span v-else>10</span>-->
                                                            <!--</div>-->
                                                            <!--两步法-->

                                                            <div v-if="scope.row.type === 'input'">
                                                                 <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <div>{{scope.row.tit}}
                                                                            ({{scope.row.min}}.00-{{scope.row.max}}.00)
                                                                        </div>
                                                                        <div class="cf">
                                                                           <el-input
                                                                                   v-model.trim="scope.row['value' + (index + 1)]"
                                                                                   size="small" placeholder="请输入内容"
                                                                                   @keydown.enter.native="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   style="width: 150px"
                                                                                   class="fl"
                                                                                   clearable></el-input>
                                                                           <div class="fl"
                                                                                style=" line-height: 30px;margin-left: 5px">分
                                                                           </div>
                                                                        </div>
                                                                     </span>
                                                                     <span v-else>
                                                                         {{scope.row['value' + (index + 1)]}}</span>
                                                                 </span>
                                                                <span v-else>20</span>
                                                            </div>

                                                            <!--复选法-->

                                                            <div v-if="scope.row.type === 'checkbox'">
                                                                <span v-if="is_submit==0">
                                                                    <el-checkbox-group
                                                                            v-model="scope.row['value' + (index + 1)]"
                                                                            v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)]"
                                                                            @change="changeCheck( index + 1 ,scope.row['value' + (index + 1)],scope.$index,scope.row)">
                                                                        <el-checkbox :label="val.num"
                                                                                     v-for="val in scope.row.radioList">
                                                                            {{val.typeTitle}}
                                                                        </el-checkbox>
                                                                    </el-checkbox-group>
                                                                    <span v-else>{{getCheckNum(scope.row['value' + (index + 1)])}}</span>
                                                                </span>
                                                                <span v-else>12</span>
                                                            </div>
                                                            <!--布局法-->

                                                            <!--布局法-->
                                                            <div v-if="scope.row.type ==='inputSelect'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <el-select
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                placeholder="" clearable
                                                                                style="width: 150px"
                                                                                size="small"
                                                                                @change="changeInputSelect(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)">
                                                                            <el-option :label="val.num"
                                                                                       :value="val.num"
                                                                                       :key="val.num"
                                                                                       v-for="val in scope.row.radioList">
                                                                            </el-option>
                                                                        </el-select>
                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!-- 人工录入法-->
                                                            <div v-if="scope.row.type === 'inputLabour'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if="$store.state.failureEnery.business_tijiao|| scope.row['bool' + (index + 1)]">
                                                                        <el-input
                                                                                v-model.trim="scope.row['value' + (index + 1)]"
                                                                                size="small" placeholder="请输入内容"
                                                                                @blur="changesInputLabour(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                style="width: 150px"
                                                                                class="fl"
                                                                                clearable>
                                                                        </el-input>

                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else>{{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--商务-->
                                                            <div v-if="scope.row.type === 'numberShangwu'">
                                                                <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao">
                                                                        {{scope.row['value' + (index + 1)]}}
                                                                    </span>
                                                                    <span v-else>{{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--总计是商务技术其他服务的和-->
                                                            <div v-if="scope.row.type === 'numberTotle'">
                                                                 <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao">
                                                                        {{scope.row['value' + (index + 1)]}}
                                                                    </span>
                                                                    <span v-else>{{ scope.row['value' + (index + 1)]}}</span>
                                                                 </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!-- pdf operation start -->
                                                            <a class="btn_locate common_a_style" v-if="
                                                                    scope.row.type != 'numberShangwu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length==1"
                                                               @click="locate_pdf(companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints[0],
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf
                                                                        )" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                            </a>
                                                            <el-dropdown class="btn_locate" v-else-if="
                                                                    scope.row.type != 'numberShangwu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length>1" trigger="click">
                                                              <span class="el-dropdown-link" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="locate_pdf(pdfItem,
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints"
                                                                    >
                                                                        <i class="icon iconfont icon-dingwei"></i>
                                                                        {{pdfItem.name+'--P'+pdfItem.page+'--'+pdfItem.txt}}
                                                                        <i class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                            <!-- pdf operation end -->
                                                        </template>
                                                    </el-table-column>
                                                    <!--技术-->
                                                    <el-table-column :label="item.title"
                                                                     v-for="(item,index ) in companyname_toubiao"
                                                                     min-width="500" :key="index" v-if="type==11"
                                                                     :column-key="index + 1">
                                                        <template slot="header" slot-scope="scope"
                                                                  :column-key="index + 1">
                                                            <a v-if="companyname_toubiao[scope.$index].pdf.length<2"
                                                               @click="show_pdf(companyname_toubiao[scope.$index].pdf[0])"
                                                               class="common_a_style" title="投标文件">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                            </a>
                                                            <el-dropdown v-else trigger="click">
                                                              <span class="el-dropdown-link" title="投标文件列表">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                                {{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="show_pdf(pdfItem)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao[scope.$index].pdf"
                                                                    >{{pdfItem.pdf_name}}<i
                                                                            class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <!--单选法-->
                                                            <div v-if="scope.row.type === 'radio'">
                                                                <span v-if="is_submit==0">
                                                                    <el-radio-group
                                                                            v-model="scope.row['value' + (index + 1)]"
                                                                            v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] "
                                                                            @change="changeRadios(index + 1,scope.row['value' + (index + 1)],scope.$index,scope.row)"
                                                                            class="radio_div">
                                                                        <el-radio :label="val.num"
                                                                                  v-for="val in scope.row.radioList">
                                                                            {{val.typeTitle}}
                                                                        </el-radio>
                                                                    </el-radio-group>
                                                                    <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>10</span>
                                                            </div>
                                                            <!--两步法-->
                                                            <div v-if="scope.row.type === 'input'">
                                                                 <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <div>{{scope.row.tit}}
                                                                            ({{scope.row.min}}.00-{{scope.row.max}}.00)
                                                                        </div>
                                                                        <div class="cf">
                                                                           <el-input
                                                                                   v-model.trim="scope.row['value' + (index + 1)]"
                                                                                   size="small" placeholder="请输入内容"
                                                                                   @keydown.enter.native="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   style="width: 150px"
                                                                                   class="fl"
                                                                                   clearable></el-input>
                                                                           <div class="fl"
                                                                                style=" line-height: 30px;margin-left: 5px">分
                                                                           </div>
                                                                        </div>
                                                                     </span>
                                                                     <span v-else>
                                                                         {{scope.row['value' + (index + 1)]}}</span>
                                                                 </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--复选法-->


                                                            <div v-if="scope.row.type === 'checkbox'">
                                                                <span v-if="is_submit==0">
                                                                        <el-checkbox-group
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)]"
                                                                                @change="changeCheck( index + 1 ,scope.row['value' + (index + 1)],scope.$index,scope.row)">
                                                                            <el-checkbox :label="val.num"
                                                                                         v-for="val in scope.row.radioList">
                                                                                {{val.typeTitle}}
                                                                            </el-checkbox>
                                                                        </el-checkbox-group>
                                                                    <span v-else>
                                                                        {{getCheckNum(scope.row['value' + (index + 1)])}}</span>
                                                                </span>
                                                                <span v-else>12</span>
                                                            </div>

                                                            <!--<div v-if="scope.row.type === 'checkbox'">-->
                                                            <!--<span v-if="is_submit==0">-->
                                                            <!--<el-checkbox-group-->
                                                            <!--v-model="scope.row['value' + (index + 1)]"-->
                                                            <!--v-show=" $store.state.failureEnery.business_tijiao && scope.row['bool' + (index + 1)]"-->
                                                            <!--@change="changeCheck( index + 1 ,scope.row['value' + (index + 1)])">-->
                                                            <!--<el-checkbox :label="val.num"-->
                                                            <!--v-for="val in scope.row.radioList">-->
                                                            <!--{{val.typeTitle}}-->
                                                            <!--</el-checkbox>-->
                                                            <!--</el-checkbox-group>-->
                                                            <!--<span @click="scope.row['bool' + (index + 1)]=true"  v-show="!scope.row['bool' + (index + 1)]">-->
                                                            <!--{{getCheckNum(scope.row['value' + (index + 1)])}}</span>-->
                                                            <!--</span>-->
                                                            <!--<span v-else>12</span>-->
                                                            <!--</div>-->
                                                            <!--布局法-->

                                                            <!--布局法-->
                                                            <div v-if="scope.row.type ==='inputSelect'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <el-select
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                placeholder="" clearable
                                                                                style="width: 150px"
                                                                                size="small"
                                                                                @change="changeInputSelect(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)">
                                                                            <el-option :label="val.num"
                                                                                       :value="val.num"
                                                                                       :key="val.num"
                                                                                       v-for="val in scope.row.radioList">
                                                                            </el-option>
                                                                        </el-select>
                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!-- 人工录入法-->
                                                            <div v-if="scope.row.type === 'inputLabour'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if="$store.state.failureEnery.business_tijiao|| scope.row['bool' + (index + 1)]">
                                                                        <el-input
                                                                                v-model.trim="scope.row['value' + (index + 1)]"
                                                                                size="small" placeholder="请输入内容"
                                                                                @blur="changesInputLabour(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                style="width: 150px"
                                                                                class="fl"
                                                                                clearable>
                                                                        </el-input>

                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else>{{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <div v-if="scope.row.type === 'numberJishu'">
                                                                {{scope.row['value' + (index + 1)]}}
                                                            </div>
                                                            <!--总计是商务技术其他服务的和-->
                                                            <div v-if="scope.row.type === 'numberTotle'">
                                                                <span>
                                                                    {{scope.row['value' + (index + 1)]}}
                                                                </span>
                                                            </div>

                                                            <!-- pdf operation start -->
                                                            <a class="btn_locate common_a_style" v-if="
                                                                    scope.row.type != 'numberJishu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length==1"
                                                               @click="locate_pdf(companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints[0],
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf
                                                                        )" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                            </a>
                                                            <el-dropdown class="btn_locate" v-else-if="
                                                                    scope.row.type != 'numberJishu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length>1" trigger="click">
                                                              <span class="el-dropdown-link" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="locate_pdf(pdfItem,
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints"
                                                                    >
                                                                        <i class="icon iconfont icon-dingwei"></i>
                                                                        {{pdfItem.name+'--P'+pdfItem.page+'--'+pdfItem.txt}}
                                                                        <i class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                            <!-- pdf operation end -->
                                                        </template>
                                                    </el-table-column>
                                                    <!--服务-->

                                                    <el-table-column :label="item.title"
                                                                     v-for="(item,index ) in companyname_toubiao"
                                                                     min-width="400" :key="index" v-if="type==12"
                                                                     :column-key="index + 1">
                                                        <template slot="header" slot-scope="scope">
                                                            <a v-if="companyname_toubiao[scope.$index].pdf.length<2"
                                                               @click="show_pdf(companyname_toubiao[scope.$index].pdf[0])"
                                                               class="common_a_style" title="投标文件">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                            </a>
                                                            <el-dropdown v-else trigger="click">
                                                              <span class="el-dropdown-link" title="投标文件列表">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                                {{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="show_pdf(pdfItem)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao[scope.$index].pdf"
                                                                    >{{pdfItem.pdf_name}}<i
                                                                            class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <!--单选法-->
                                                            <div v-if="scope.row.type === 'radio'">
                                                                <span v-if="is_submit==0">
                                                                    <el-radio-group
                                                                            v-model="scope.row['value' + (index + 1)]"
                                                                            v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] "
                                                                            @change="changeRadios(index + 1,scope.row['value' + (index + 1)],scope.$index,scope.row)"
                                                                            class="radio_div">
                                                                        <el-radio :label="val.num"
                                                                                  v-for="val in scope.row.radioList">
                                                                            {{val.typeTitle}}
                                                                        </el-radio>
                                                                    </el-radio-group>
                                                                    <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>10</span>
                                                            </div>
                                                            <!--两步法-->
                                                            <div v-if="scope.row.type === 'input'">
                                                                 <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <div>{{scope.row.tit}}
                                                                            ({{scope.row.min}}.00-{{scope.row.max}}.00)
                                                                        </div>
                                                                        <div class="cf">
                                                                           <el-input
                                                                                   v-model.trim="scope.row['value' + (index + 1)]"
                                                                                   size="small" placeholder="请输入内容"
                                                                                   @keydown.enter.native="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   style="width: 150px"
                                                                                   class="fl"
                                                                                   clearable></el-input>
                                                                           <div class="fl"
                                                                                style=" line-height: 30px;margin-left: 5px">分
                                                                           </div>
                                                                        </div>
                                                                     </span>
                                                                     <span v-else>
                                                                         {{scope.row['value' + (index + 1)]}}</span>
                                                                 </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--复选法-->

                                                            <div v-if="scope.row.type === 'checkbox'">
                                                                <span v-if="is_submit==0">
                                                                        <el-checkbox-group
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)]"
                                                                                @change="changeCheck( index + 1 ,scope.row['value' + (index + 1)],scope.$index,scope.row)">
                                                                            <el-checkbox :label="val.num"
                                                                                         v-for="val in scope.row.radioList">
                                                                                {{val.typeTitle}}
                                                                            </el-checkbox>
                                                                        </el-checkbox-group>
                                                                    <span v-else>
                                                                        {{getCheckNum(scope.row['value' + (index + 1)])}}</span>
                                                                </span>
                                                                <span v-else>12</span>
                                                            </div>
                                                            <!--布局法-->
                                                            <div v-if="scope.row.type ==='inputSelect'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <el-select
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                placeholder="" clearable
                                                                                style="width: 150px"
                                                                                size="small"
                                                                                @change="changeInputSelect(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)">
                                                                            <el-option :label="val.num"
                                                                                       :value="val.num"
                                                                                       :key="val.num"
                                                                                       v-for="val in scope.row.radioList">
                                                                            </el-option>
                                                                        </el-select>
                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--<div v-if="scope.row.type ==='inputSelect'">-->
                                                            <!--<span v-if="is_submit==0">-->
                                                            <!--<span v-show=" $store.state.failureEnery.business_tijiao && scope.row['bool' + (index + 1)] ">-->
                                                            <!--<el-select-->
                                                            <!--v-model="scope.row['value' + (index + 1)]"-->
                                                            <!--placeholder="" clearable-->
                                                            <!--style="width: 150px"-->
                                                            <!--size="small"-->
                                                            <!--@change="changeInputSelect(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)">-->
                                                            <!--<el-option :label="val.num"-->
                                                            <!--:value="val.num"-->
                                                            <!--:key="val.num"-->
                                                            <!--v-for="val in scope.row.radioList">-->
                                                            <!--</el-option>-->
                                                            <!--</el-select>-->
                                                            <!--<i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"-->
                                                            <!--@click="scoreShowsBtn(scope.$index,index + 1)"></i>-->
                                                            <!--</span>-->
                                                            <!--<span @click="scope.row['bool' + (index + 1)] = true"  v-show="!scope.row['bool' + (index + 1)]"> {{scope.row['value' + (index + 1)]}}</span>-->
                                                            <!--</span>-->
                                                            <!--<span v-else>20</span>-->
                                                            <!--</div>-->
                                                            <!-- 人工录入法-->
                                                            <div v-if="scope.row.type === 'inputLabour'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if="$store.state.failureEnery.business_tijiao|| scope.row['bool' + (index + 1)]">
                                                                        <el-input
                                                                                v-model.trim="scope.row['value' + (index + 1)]"
                                                                                size="small" placeholder="请输入内容"
                                                                                @blur="changesInputLabour(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                style="width: 150px"
                                                                                class="fl"
                                                                                clearable>
                                                                        </el-input>

                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else>{{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <div v-if="scope.row.type === 'numberFuwu'">
                                                                    <span>
                                                                        {{scope.row['value' + (index + 1)]}}
                                                                    </span>
                                                            </div>
                                                            <!--总计是商务技术其他服务的和-->
                                                            <div v-if="scope.row.type === 'numberTotle'">
                                                                    <span>
                                                                        {{scope.row['value' + (index + 1)]}}
                                                                    </span>
                                                            </div>
                                                            <!-- pdf operation start -->
                                                            <a class="btn_locate common_a_style" v-if="
                                                                    scope.row.type != 'numberFuwu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length==1"
                                                               @click="locate_pdf(companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints[0],
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf
                                                                        )" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                            </a>
                                                            <el-dropdown class="btn_locate" v-else-if="
                                                                    scope.row.type != 'numberFuwu' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length>1" trigger="click">
                                                              <span class="el-dropdown-link" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="locate_pdf(pdfItem,
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints"
                                                                    >
                                                                        <i class="icon iconfont icon-dingwei"></i>
                                                                        {{pdfItem.name+'--P'+pdfItem.page+'--'+pdfItem.txt}}
                                                                        <i class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                            <!-- pdf operation end -->
                                                        </template>
                                                    </el-table-column>
                                                    <!--其他-->
                                                    <el-table-column :label="item.title"
                                                                     v-for="(item,index ) in companyname_toubiao"
                                                                     min-width="400" :key="index" v-if=" type==13"
                                                                     :column-key="index + 1">
                                                        <template slot="header" slot-scope="scope">
                                                            <a v-if="companyname_toubiao[scope.$index].pdf.length<2"
                                                               @click="show_pdf(companyname_toubiao[scope.$index].pdf[0])"
                                                               class="common_a_style" title="投标文件">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>{{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                            </a>
                                                            <el-dropdown v-else trigger="click">
                                                              <span class="el-dropdown-link" title="投标文件列表">
                                                                <i class="el-icon-search fs14 mr3 ver_al_m"></i>
                                                                {{scope.column.label}}
                                                                <i class="icon iconfont icon-pdf"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="show_pdf(pdfItem)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao[scope.$index].pdf"
                                                                    >{{pdfItem.pdf_name}}<i
                                                                            class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <!-- 单选法-->
                                                            <div v-if="scope.row.type === 'radio'">
                                                                <span v-if="is_submit==0">
                                                                    <el-radio-group
                                                                            v-model="scope.row['value' + (index + 1)]"
                                                                            v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] "
                                                                            @change="changeRadios(index + 1,scope.row['value' + (index + 1)],scope.$index,scope.row)"
                                                                            class="radio_div">
                                                                        <el-radio :label="val.num"
                                                                                  v-for="val in scope.row.radioList">
                                                                            {{val.typeTitle}}
                                                                        </el-radio>
                                                                    </el-radio-group>
                                                                    <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>10</span>
                                                            </div>
                                                            <!--两步法-->
                                                            <div v-if="scope.row.type === 'input'">
                                                                 <span v-if="is_submit==0">
                                                                    <span v-if="$store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <div>{{scope.row.tit}}
                                                                            ({{scope.row.min}}.00-{{scope.row.max}}.00)
                                                                        </div>
                                                                        <div class="cf">
                                                                           <el-input
                                                                                   v-model.trim="scope.row['value' + (index + 1)]"
                                                                                   size="small" placeholder="请输入内容"
                                                                                   @keydown.enter.native="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                   style="width: 150px"
                                                                                   class="fl"
                                                                                   clearable></el-input>
                                                                           <div class="fl"
                                                                                style=" line-height: 30px;margin-left: 5px">分
                                                                           </div>
                                                                        </div>
                                                                     </span>
                                                                     <span v-else>
                                                                         {{scope.row['value' + (index + 1)]}}</span>
                                                                 </span>
                                                                <span v-else>20</span>
                                                            </div>

                                                            <!--复选法-->

                                                            <div v-if="scope.row.type === 'checkbox'">
                                                                <span v-if="is_submit==0">
                                                                        <el-checkbox-group
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)]"
                                                                                @change="changeCheck( index + 1 ,scope.row['value' + (index + 1)],scope.$index,scope.row)">
                                                                            <el-checkbox :label="val.num"
                                                                                         v-for="val in scope.row.radioList">
                                                                                {{val.typeTitle}}
                                                                            </el-checkbox>
                                                                        </el-checkbox-group>
                                                                    <span v-else>
                                                                        {{getCheckNum(scope.row['value' + (index + 1)])}}</span>
                                                                </span>
                                                                <span v-else>12</span>
                                                            </div>
                                                            <!--布局法-->
                                                            <div v-if="scope.row.type ==='inputSelect'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if=" $store.state.failureEnery.business_tijiao || scope.row['bool' + (index + 1)] ">
                                                                        <el-select
                                                                                v-model="scope.row['value' + (index + 1)]"
                                                                                placeholder="" clearable
                                                                                style="width: 150px"
                                                                                size="small"
                                                                                @change="changeInputSelect(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)">
                                                                            <el-option :label="val.num"
                                                                                       :value="val.num"
                                                                                       :key="val.num"
                                                                                       v-for="val in scope.row.radioList">
                                                                            </el-option>
                                                                        </el-select>
                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else> {{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>

                                                            <!-- 人工录入法-->
                                                            <div v-if="scope.row.type === 'inputLabour'">
                                                                <span v-if="is_submit==0">
                                                                     <span v-if="$store.state.failureEnery.business_tijiao|| scope.row['bool' + (index + 1)]">
                                                                        <el-input
                                                                                v-model.trim="scope.row['value' + (index + 1)]"
                                                                                size="small" placeholder="请输入内容"
                                                                                @blur="changesInputLabour(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                                                style="width: 150px"
                                                                                class="fl"
                                                                                clearable>
                                                                        </el-input>

                                                                        <i class="icon iconfont icon-bianjiedit26  ml10 bianjiIcon"
                                                                           @click="scoreShowsBtn(scope.$index,index + 1)"></i>
                                                                     </span>
                                                                     <span v-else>{{scope.row['value' + (index + 1)]}}</span>
                                                                </span>
                                                                <span v-else>20</span>
                                                            </div>
                                                            <!--其他end-->
                                                            <div v-if="scope.row.type === 'numberOther'">
                                                                <span>
                                                                    {{scope.row['value' + (index + 1)]}}
                                                                </span>

                                                            </div>
                                                            <!--总计是商务技术其他服务的和-->
                                                            <div v-if="scope.row.type === 'numberTotle'">
                                                                <span>
                                                                    {{scope.row['value' + (index + 1)]}}
                                                                </span>
                                                            </div>
                                                            <!-- pdf operation start -->
                                                            <a class="btn_locate common_a_style" v-if="
                                                                    scope.row.type != 'numberOther' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length==1"
                                                               @click="locate_pdf(companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints[0],
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf
                                                                        )" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                            </a>
                                                            <el-dropdown class="btn_locate" v-else-if="
                                                                    scope.row.type != 'numberOther' &&
                                                                    scope.row.type != 'numberTotle' &&
                                                                    companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints.length>1" trigger="click">
                                                              <span class="el-dropdown-link" title="定位到关联投标文件说明处">
                                                                <i class="icon iconfont icon-dingwei"></i>
                                                                <i class="el-icon-arrow-down el-icon--right"></i>
                                                              </span>
                                                                <el-dropdown-menu slot="dropdown"
                                                                                  class="table_pdf_drop_menu">
                                                                    <el-dropdown-item
                                                                            @click.native="locate_pdf(pdfItem,
                                                                        companyname_toubiao.filter(item => item.title == scope.column.label)[0].pdf)"
                                                                            v-for="(pdfItem ,index) in companyname_toubiao
                                                                        .filter(item => item.title == scope.column.label)[0]
                                                                        .factors_standards.filter(item => item.factor == scope.row.projectName)[0]
                                                                        .relativePoints"
                                                                    >
                                                                        <i class="icon iconfont icon-dingwei"></i>
                                                                        {{pdfItem.name+'--P'+pdfItem.page+'--'+pdfItem.txt}}
                                                                        <i class="icon iconfont icon-pdf"></i>
                                                                    </el-dropdown-item>
                                                                </el-dropdown-menu>
                                                            </el-dropdown>
                                                            <!-- pdf operation end -->
                                                        </template>
                                                    </el-table-column>
                                                </el-table-column>
                                            </el-table>
                                        </template>
                                    </el-row>
                                    <!--分页-->
                                    <div class="pageBox">
                                        <el-pagination
                                                @size-change="handleSizeChange"
                                                @current-change="handleCurrentChange"
                                                :current-page="currentPage"
                                                :page-sizes="[10, 20, 30, 40]"
                                                :page-size="100"
                                                layout="total, sizes, prev, pager, next, jumper"
                                                :total="400"
                                        >
                                        </el-pagination>
                                    </div>
                                </div>
                            </el-row>
                        </el-row>
                    </el-row>
                </div>
            </div>
            <el-dialog
                    title="未完成打分项 "
                    :visible.sync="$store.state.failureEnery.ViewUnfinishedItems"
                    width="700px"
            >
                <ViewUnfinishedItems :viewUnfinishedData="viewUnfinishedData"></ViewUnfinishedItems>
            </el-dialog>
            <el-dialog
                    title="评分说明编辑 "
                    :visible.sync="scoreShowsDialog "
                    width="700px"
                    class="scoreShows"
            >
                <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label=" 评分说明： " prop="desc">
                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item class="mb15 textAlignC mt30 el-row" style="margin-left: -50px">
                        <el-button type="primary" @click="saveFormScoreShows('ruleForm')" size="small"><i
                                class=" icon iconfont icon-baocun mr3"></i>保存
                        </el-button>
                        <el-button @click="rebackFormScoreShows('ruleForm')" size="small" type="primary">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
                    title="提示"
                    :visible.sync="$store.state.failureEnery.submitPrompt"
                    width="700px"
            >
                <!--<SubmitPrompt :name="to_submit_prompt_name" :pro_num="completePercent"-->
                <!--:baohao="to_submit_prompt_baohao" :type1="type"-->
                <!--:dingdang_tableData="dingdang_tableData" :companyname_toubiao="companyname_toubiao"></SubmitPrompt>-->


                <div class="submitPrompt ">
                    <el-row class="textAlignC fs14" style="line-height: 30px">您的{{to_submit_prompt_name}}工作已进行
                        [&nbsp;<span
                                class="red">{{completePercent}}%</span>&nbsp;], 请确认您已经完成本包 [&nbsp;<span class="red">{{to_submit_prompt_baohao}}</span>&nbsp;]的{{to_submit_prompt_name}}工作!
                    </el-row>
                    <el-row>
                        <!--type=8:商务的时候可以通过[结果]进行查阅-->
                        <el-row class="textAlignC fs16" style="line-height: 30px">
                            确认后您将不能再更改{{to_submit_prompt_name}}结果！但可以通过点击[结果]进行查阅!
                        </el-row>

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
                    <!--{{to_submit_prompt_name}}评审还未完成，不能提交 {{to_submit_prompt_name}}评审数据！-->
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
                    <!--<div class="djsTime" style="text-align: center; color:#000000; line-height:40px;">[<span-->
                    <!--id="sec">{{count}}</span>]秒后自动关闭-->
                    <!--</div>-->
                    <!--</el-row>-->
                    <!--<el-row class="textAlignC pt20">-->
                    <!--<el-button size="small" type="primary" @click="tijiao100Comfrim">确认</el-button>-->
                    <!--</el-row>-->
                    <!--</el-row>-->
                    <!--</el-dialog>-->
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
            <!--全部选中提示弹框-->
            <el-dialog
                    title="全部选中提示"
                    :visible.sync="$store.state.failureEnery.determineOperating"
                    width="30%"
            >
                <el-row class="textAlignC fs14" style="line-height: 30px">
                    您确定要执行此操作！
                </el-row>
                <el-row class="textAlignC pt20">
                    <el-button size="small" type="primary" @click="comfrimAllChecked">确认</el-button>
                    <el-button size="small" type="primary" @click="rebackAllChecked">取消</el-button>
                </el-row>
            </el-dialog>
            <!--调整评标价弹框-->
            <el-dialog
                    title="投标人最新报价列表"
                    :visible.sync="ChangedialogVisible"
            >
                <ChangePrice v-loading="TkOneloading" @sonToFather="sonToFather" :msgBox="ChangePriceTk"></ChangePrice>
            </el-dialog>
            <!--调整评标价弹框-->
        </div>
    </div>
</template>

<script>
    // import NavBar from '../../components/publicVue/NavBar';
    // import ViewSchedule from '../../components/publicVue/ViewSchedule';
    import ViewUnfinishedItems from '../../components/publicVue/ViewUnfinishedItems';
    import AbandonedTender from '../../components/dialog/AbandonedTender';  //废标
    import StandardChallengeInformation from '../../components/dialog/StandardChallengeInformation';//标中质询
    import ChangePrice from '../../components/publicVue/ChangePrice.vue';  //调整评标基准价

    export default {
        name: "business-other",
        components: {
            // NavBar,
            // ViewSchedule,
            ViewUnfinishedItems,
            AbandonedTender,//废标
            ChangePrice,//调整评标基准价
            StandardChallengeInformation,
            pdf: () => import('../../components/publicVue/Pdf')
        },
        data() {
            return {
                page_loading: false,
                type: '',//路由传递的参数：区分是那个导航
                options: [],//头部导航按钮数组
                companyname_toubiao: [],//定档评议table的投标人数组
                dingdang_tableData: [],//定档评议table
                evaluationExpert: "",// 专家
                leibie: '',//定档table类别
                viewUnfinishedData: [],//查看未完成项弹框数据
                checkedArr: [],//选中的复选框数量
                allRaioNum: '',// 定档table中所有的复选框数量
                arrA: [],//存放radio,input的数组
                to_submit_prompt_name: [],
                idradionoprss: '',//table不合格的id
                rowData: {},
                submitPrice: 0,
                rowIndex: 0,//记录点击的是那行
                colIndex: 0,//记录点击的是那列
                ruleForm: {//评分说明数据
                    desc: ''
                },
                scoreShowsDialog: false,//编辑评分说明
                methodType: "",//区分那种方法
                /* ----------------------------pdf start------------------------------- */
                /*filter_bidder:'',
                filter_factor:'',*/
                currPdfUrl: '',//当前点击pdf的url
                pdfItems: [],//动态插入pdf
                /* ----------------------------pdf end------------------------------- */
                is_submit: '',
                num_business: 0,
                num_jishu: 0,
                num_serve: 0,
                num_other: 0,
                allNumBusiness: 0,
                allNumJishu: 0,
                allNumServe: 0,
                allNumOther: 0,
                ChangedialogVisible: false,  //调整评标价弹框
                TkOneloading: true,
                ChangePriceTk: [],  //投标人最新报价列表弹框里面表格得数据
                classA: 'class-a',  //当classA改变时将更新class
                row: -1,
                col: -1,
                rowIdex: '',
                val: '',
                options_select: [{//通过下拉菜单的投标人个数展示投标人
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '6',
                    label: '6'
                }, {
                    value: '7',
                    label: '7'
                }, {
                    value: '8',
                    label: '8'
                }, {
                    value: '9',
                    label: '9'
                }, {
                    value: '10',
                    label: '10'
                }, {
                    value: '11',
                    label: '11'
                }, {
                    value: '12',
                    label: '12'
                }, {
                    value: '13',
                    label: '13'
                }, {
                    value: '14',
                    label: '14'
                }, {
                    value: '15',
                    label: '15'
                }],
                value: '',//下拉菜单的投标人个数
                options_select_choose: [{//通过下拉菜单的多选展示投标人
                    value: '1',
                    label: '重庆网控科技发展有限公司'
                }, {
                    value: '2',
                    label: '普瑞太阳能有限公司 '
                }, {
                    value: '3',
                    label: '夏丰热工研究院有限公司'
                },{
                    value: '4',
                    label: '上海科技信息股份有限公司'
                },{
                    value: '5',
                    label: '益达天热产物有限公司'
                },{
                    value: '6',
                    label: '白云电力试验研究所'
                },{
                    value: '7',
                    label: '上海科技信息股份有限公司'
                },{
                    value: '8',
                    label: '大连跃胜贸易有限公司'
                },{
                    value: '9',
                    label: '跃胜贸易有限公司'
                },{

                    value: '10',
                    label: '招管通测试一'
                },
                    {
                        value: '11',
                        label: '招管通测试二'
                    },{
                        value: '12',
                        label: '北京麦德森医疗器械有限公司'
                    }, {
                        value: '13',
                        label: '闪电果业发展股份有限公司'
                    }, {
                        value: '14',
                        label: '中招国际招标有限公司'
                    }, {
                        value: '15',
                        label: '上海盛泰广告有限责任公司'
                    },
                ],
                value1: [],//通过下拉菜单的多选展示投标人多选数组
                arrayFind: [],//多选数组
            }
        },
        created() {
            console.log(this.$route.query);
            if (this.$route.query.methodType == undefined) {
                this.methodType = 1;
            } else {
                this.methodType = this.$route.query.methodType;
            }
            if (this.$route.query.currentpage == undefined) {
                this.type = 10;
            } else {
                this.type = this.$route.query.currentpage;
            }
        },
        computed: {
            /*filter_standard(){
                for(var i=0;i<this.companyname_toubiao.length;i++){
                    if(this.companyname_toubiao[i].title == this.filter_bidder){
                        var fses = this.companyname_toubiao[i].factors_standards;
                        for(var j=0;j<fses.length;j++){
                            if(fses[j].factor == this.filter_factor){
                                return fses[j].standard;
                            }
                        }
                        break;
                    }
                }
                return '';
            },
            filter_points() {
                for(var i=0;i<this.companyname_toubiao.length;i++){
                    if(this.companyname_toubiao[i].title == this.filter_bidder){
                        var fses = this.companyname_toubiao[i].factors_standards;
                        for(var j=0;j<fses.length;j++){
                            if(fses[j].factor == this.filter_factor){
                                return fses[j].relativePoints;
                            }
                        }
                        break;
                    }
                }
                return '';
            },*/
            currentPdfShow() {
                for (var i = 0; i < this.pdfItems.length; i++) {
                    if (this.pdfItems[i].show) {
                        var _tm = this.$refs[this.pdfItems[i].ref];
                        if (typeof _tm != null && _tm.length == 1) {
                            return $(_tm[0].$el);
                        } else {
                            return $(_tm.$el);
                        }
                    }
                }
            },
            completePercent() {
                if (this.type == 10) {
                    let num = 0;
                    let allNum = (this.dingdang_tableData.length - 2) * this.companyname_toubiao.length;
                    let arr = this.dingdang_tableData.slice(0, -2);//去除最后两项
                    console.log(arr);
                    arr.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            if (e[`value${i + 1}`] !== '' && e[`value${i + 1}`].length != 0) {
                                num++;
                            }
                        });
                    });
                    this.num_business = num;
                    this.allNumBusiness = allNum;
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                } else if (this.type == 11) {
                    let num = 0;
                    let allNum = (this.dingdang_tableData.length - 2) * this.companyname_toubiao.length;
                    let arr = this.dingdang_tableData.slice(0, -2);//去除最后两项
                    arr.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            // if (e[`value${i + 1}`] != 0 ) {
                            if (e[`value${i + 1}`] !== '' && e[`value${i + 1}`].length != 0) {
                                num++;
                            }
                        })
                    });
                    this.num_jishu = num;
                    this.allNumJishu = allNum;
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                } else if (this.type == 12) {
                    let num = 0;
                    let allNum = (this.dingdang_tableData.length - 2) * this.companyname_toubiao.length;
                    let arr = this.dingdang_tableData.slice(0, -2);//去除最后两项
                    arr.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            if (e[`value${i + 1}`] !== '' && e[`value${i + 1}`].length != 0) {
                                num++;
                            }
                        })
                    });
                    this.num_serve = num;
                    this.allNumServe = allNum;
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                } else if (this.type == 13) {
                    let num = 0;
                    let allNum = (this.dingdang_tableData.length - 2) * this.companyname_toubiao.length;
                    let arr = this.dingdang_tableData.slice(0, -2);//去除最后两项
                    arr.forEach(e => { //循环表数据
                        this.companyname_toubiao.forEach((k, i) => {
                            if (e[`value${i + 1}`] !== '' && e[`value${i + 1}`].length != 0) {
                                num++;
                            }
                        })
                    });
                    this.num_other = num;
                    this.allNumOther = allNum;
                    return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
                }
            },
        },
        mounted() {
            this.init();
            // if (this.type == 10) {
            //     $(".submit_business").hide();
            // }
            // else if (this.type == 11) {
            //     $(".submitFilingCommentsBtn").hide();
            // }

            this.$commonJs.pdfOperations.pdf_init.call(this);
            if(this.$route.query.is_submit_type==1){
                $(".hide_div").hide();
            }
        },
        methods: {

            /*----------------- pdf start ----------------------*/

            pdf_category_open_close($event) {

                this.$commonJs.pdfOperations.pdf_category_open_close.call(this, $event);
            },
            getIframeDocument(refStr) {
                return this.$commonJs.pdfOperations.getIframeDocument.call(this, refStr);
            },
            getIframeWindow(refStr) {
                return this.$commonJs.pdfOperations.getIframeWindow.call(this, refStr);
            },
            //定位到关联投标文件说明处
            locate_pdf(relativePoint, pdfs) {
                this.$commonJs.pdfOperations.locate_pdf.call(this, relativePoint, pdfs);
            },
            show_pdf(obj, queryStr, page) {//查看pdf
                this.$commonJs.pdfOperations.show_pdf.call(this, obj, queryStr, page);
            },
            slideBarMousedown(e) {
                this.$commonJs.pdfOperations.slideBarMousedown.call(this, e);
            },
            slideBarMouseup() {
                this.$commonJs.pdfOperations.slideBarMouseup.call(this);
            },
            slideBarMousemove(e) {
                this.$commonJs.pdfOperations.slideBarMousemove.call(this, e);
            },
            exitFullMode() {
                this.$commonJs.pdfOperations.exitFullMode.call(this);
            },
            initFullMode(modeType, isFirstInPresentation) {
                return this.$commonJs.pdfOperations.initFullMode.call(this, modeType, isFirstInPresentation);
            },
            fullModeColumn() {
                this.$commonJs.pdfOperations.fullModeColumn.call(this);
                $('.unfinished_items').css("marginTop","10px");
            },
            fullModeRow() {
                this.$commonJs.pdfOperations.fullModeRow.call(this);
            },
            closePDF() {
                this.$commonJs.pdfOperations.closePDF.call(this);
            },
            showPDF() {
                this.$commonJs.pdfOperations.showPDF.call(this);
            },
            /*----------------- pdf end ----------------------*/
            init() {
                this.page_loading = true;
                this.$axios.post('/api/BusinessOther', {
                    currentPage: this.type,
                    is_submit_type: this.$route.query.is_submit_type
                }, {//通过包id
                    // id:id
                    // type:2
                }).then(res => {
                    if (res.status == 200) {
                        // console.log(res.data);
                        this.name = res.data.bidMsg.name;
                        this.baohao = res.data.bidMsg.baohao;
                        this.biaoNum = res.data.bidMsg.biaoNum;
                        this.to_submit_prompt_baohao = this.baohao.split('/')[1];//以/为分割线，将字符串截成数组
                        this.options = res.data.bidMsg.eviewrItemsMsg.viewType;
                        this.to_submit_prompt_name = res.data.bidMsg.eviewrItemsMsg.gongzuo_name;
                        this.viewUnfinishedData = res.data.bidMsg.eviewrItemsMsg.viewUnfinishedData;//查看未完成项弹框数据
                        this.evaluationExpert = res.data.bidMsg.eviewrItemsMsg.evaluationExpert;
                        this.companyname_toubiao = res.data.bidMsg.eviewrItemsMsg.companyNameList;
                        this.dingdang_tableData = res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
                        this.allRaioNum = this.dingdang_tableData.length * this.companyname_toubiao.length;
                        this.is_submit = res.data.bidMsg.type;
                        // console.log(res.data.bidMsg.type);
                        if (res.data.bidMsg.type == 0) {
                            this.$store.state.failureEnery.business_tijiao = true;//未提交
                        } else if(res.data.bidMsg.type==1) {
                            this.$store.state.failureEnery.business_tijiao = false;//已提交
                            $(".hide_btn").hide();
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
                } else if (val === 'g') {//调整评标基准价
                    //调整评标价点击事件
                    this.ChangedialogVisible = true;
                    this.TkOneloading = true;
                    //console.log(row.id)
                    //调整评标价点击弹框传值到子页面
                    this.$axios.post('/api/NewChangePrice', {
                        //id:row.id,   //点击得id
                    }).then(res => {
                        if (res.status == 200) {
                            //console.log(res.data,99999)
                            this.ChangePriceTk = res.data.msgBox;
                            this.TkOneloading = false;
                        }
                    })
                }
            },
            sonToFather(val) {  //调整评标基准价子集得返回点击关闭事件传值
                this.ChangedialogVisible = val;
            },
            checkUnfinishedItems() {//查看未完成项
                this.$store.state.failureEnery.ViewUnfinishedItems = true;
            },
            submitBusiness() {//商务提交
                this.$store.state.failureEnery.submitPrompt = true;

            },
            submitJishu() {// 提交技术
                this.$store.state.failureEnery.submitPrompt = true;

            },
            submitServe() {// 提交服务
                this.$store.state.failureEnery.submitPrompt = true;
            },
            submitOther() {
                this.$store.state.failureEnery.submitPrompt = true;
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageLoading = true;
                this.init();
            },

            cellLeave(row, col, cell) {//离开单元格
                let rowIndex = Number(row.rowIndex);
                let colIndex = Number(col.columnKey);
                if (colIndex != 0) {
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 1000)
                    }
                }
            },
            setCellBg({rowIndex, columnIndex}) {//设置样式
                if (rowIndex < this.dingdang_tableData.length - 2) {
                    if (columnIndex == 0) {
                        return '';
                    } else {
                        if (!this.dingdang_tableData[Number(rowIndex)]['bool' + columnIndex]) {
                            return 'cell-Bg';
                        } else {
                            return '';
                        }
                    }
                } else {
                    return '';
                }
            },
            changeRadios(index, val, row, rowlist) { // 单选法index+1:colIndex,scope.$index:rowIndex(index:col)
                let rowIndex = Number(row);
                let colIndex = Number(index);
                if (colIndex != 0) {
                    this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = true;
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 500)
                    }
                }
                let arr = [];//存放除了小计和总计的数据
                let amt = 0;//商务小计
                this.$axios.post('/api/isFailure', 'post', {
                    // type: val
                }).then(res => {
                    if (res.status == 200) {
                        arr = this.dingdang_tableData.slice(0, -2);
                        // console.log(arr);
                        arr.forEach((k, i) => {
                            if (Array.isArray(k['value' + index])) {//是数组
                                if (k['value' + index].length != 0) {
                                    let num = 0;
                                    k['value' + index].forEach(e => {
                                        num += Number(e);
                                    });
                                    amt += num;
                                }
                            } else {
                                amt += Number(k['value' + index]) != '' ? Number(k['value' + index]) : 0;//点击那个列radio,input不为空，则小计为每一行vulue1的和，反之为0
                            }
                        });
                        this.dingdang_tableData[this.dingdang_tableData.length - 2]['value' + index] = amt;
                    }
                })
            },
            changeCheck(index, obj, row, rowlist) {//复选法
                // console.log(index, obj,row, rowlist);
                let rowIndex = Number(row);
                let colIndex = Number(index);
                if (colIndex != 0) {
                    this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = true;
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 500)
                    }
                }
                let amt = 0;
                let arr = [];
                arr = this.dingdang_tableData.slice(0, -2);
                arr.forEach((k, i) => {
                    if (Array.isArray(k['value' + index])) {//是数组
                        if (k['value' + index].length != 0) {
                            let num = 0;
                            k['value' + index].forEach(e => {
                                num += Number(e);
                            });
                            amt += num;
                        }
                    } else {
                        amt += Number(k['value' + index]) != '' ? Number(k['value' + index]) : 0;
                    }
                });
                this.dingdang_tableData[this.dingdang_tableData.length - 2]['value' + index] = amt;
            },
            changeInputSelect(value, rowIndex, colIndex, rowList) {//步长
                if (colIndex != 0) {
                    this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = true;
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 500)
                    }
                }
                let arr = [];
                let amt = 0;
                arr = this.dingdang_tableData.slice(0, -2);
                arr.forEach((k, i) => {
                    if (Array.isArray(k['value' + colIndex])) {//是数组
                        if (k['value' + colIndex].length != 0) {
                            let num = 0;
                            k['value' + colIndex].forEach(e => {
                                num += Number(e);
                            });
                            amt += num;
                        }
                    } else {
                        amt += Number(k['value' + colIndex]) != '' ? Number(k['value' + colIndex]) : 0;
                    }
                });
                this.dingdang_tableData[this.dingdang_tableData.length - 2]['value' + colIndex] = amt;
            },
            changes(value, rowIndex, colIndex, rowList) { //两步方失去焦点取值
                if (colIndex != 0) {
                    this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = true;
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 500)
                    }
                }
                // console.log(value, rowIndex, colIndex, rowList);
                if (/[^\d]/.test(value)) {/*替换非数字字符  */
                    this.$message({
                        type: 'warning',
                        message: '请输入数字！'
                    });
                    this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                    this.dingdang_tableData[rowIndex]['bool' + colIndex] = true;
                } else {
                    this.dingdang_tableData[rowIndex]['bool' + colIndex] = false;
                    // console.log(this.dingdang_tableData);
                    if (Number(value) >= rowList.min && Number(value) <= rowList.max) {
                        let arr = [];
                        let amt = 0;
                        arr = this.dingdang_tableData.slice(0, -2);
                        arr.forEach((k, i) => {
                            if (Array.isArray(k['value' + colIndex])) {//是数组
                                if (k['value' + colIndex].length != 0) {
                                    let num = 0;
                                    k['value' + colIndex].forEach(e => {
                                        num += Number(e);
                                    });
                                    amt += num;
                                }
                            } else {
                                amt += Number(k['value' + colIndex]) != '' ? Number(k['value' + colIndex]) : 0;
                            }
                        });
                        this.dingdang_tableData[this.dingdang_tableData.length - 2]['value' + colIndex] = amt;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `输入值在${rowList.min}-${rowList.max}之间`
                        });
                        this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                        this.dingdang_tableData[rowIndex]['bool' + colIndex] = true;
                    }
                }
            },
            changesInputLabour(value, rowIndex, colIndex, rowList) {//人工
                if (colIndex != 0) {
                    this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = true;
                    if (this.dingdang_tableData[rowIndex]['value' + colIndex] != '' || this.dingdang_tableData[rowIndex]['value' + colIndex].length > 0) {
                        setTimeout(() => {
                            this.dingdang_tableData[Number(rowIndex)]['bool' + colIndex] = false;
                        }, 500)
                    }
                }
                if (/[^\d]/.test(value)) {/*替换非数字字符  */
                    this.$message({
                        type: 'warning',
                        message: '请输入数字！'
                    });
                    this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                    this.dingdang_tableData[rowIndex]['bool' + colIndex] = true;
                } else {
                    this.dingdang_tableData[rowIndex]['bool' + colIndex] = false;
                    if (Number(value) >= rowList.min && Number(value) <= rowList.max) {
                        let arr = [];
                        let amt = 0;
                        arr = this.dingdang_tableData.slice(0, -2);
                        arr.forEach((k, i) => {
                            if (Array.isArray(k['value' + colIndex])) {//是数组
                                if (k['value' + colIndex].length != 0) {
                                    let num = 0;
                                    k['value' + colIndex].forEach(e => {
                                        num += Number(e);
                                    });
                                    amt += num;
                                }
                            } else {
                                amt += Number(k['value' + colIndex]) != '' ? Number(k['value' + colIndex]) : 0;
                            }
                        });
                        this.dingdang_tableData[this.dingdang_tableData.length - 2]['value' + colIndex] = amt;
                    } else {
                        this.$message({
                            type: 'warning',
                            message: `输入值在${rowList.min}-${rowList.max}之间`
                        });
                        this.dingdang_tableData[rowIndex]['value' + colIndex] = '';
                        this.dingdang_tableData[rowIndex]['bool' + colIndex] = true;
                    }
                }
            },
            /*-----------------编辑评分说明--------------------*/
            scoreShowsBtn(rowIndex, colIndex) {//评分说明编辑按钮
                this.scoreShowsDialog = true;
                this.rowIndex = rowIndex;
                this.colIndex = colIndex;
            },
            saveFormScoreShows(formName) {//保存评分说明
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/saveEditor', 'post', {
                            data: this.$data.ruleForm.desc,
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.dingdang_tableData[this.rowIndex]['gradeExplain' + this.colIndex] = this.$data.ruleForm.desc;
                                this.$data.ruleForm.desc = '';
                                this.scoreShowsDialog = false;
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功',
                                    center: true
                                });
                            }
                        })
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            rebackFormScoreShows() {//编辑评分返回按钮
                this.scoreShowsDialog = false;
            },
            /*-----------------编辑评分说明end--------------------*/

            reback() {
                this.$store.state.failureEnery.submitPrompt = false;
            },
            comfrim() {//确定提交
                if (this.type == 10) {
                    if (this.completePercent != 100.0) {
                        this.$message({
                            message: this.to_submit_prompt_name + '评审还未完成，不能提交 ' + this.to_submit_prompt_name + '评审数据！',
                            type: 'warning'
                        });
                    } else {
                        this.$axios.post('/api/business_tijiao', {type: parseInt(this.type) + 1}).then(res => { //商务接口(提交的时候把table的数据反给后台，接受后台的返回的table数据)
                            if (res.status == '200') {
                                // console.log(this.type);
                                window.location.href = "/elect/BusinessOther?methodType=" + this.methodType + "&currentpage=" + this.type + '&is_submit_type=1';
                                this.$set(this.dingdang_tableData, this.dingdang_tableData.length - 1, res.data.data);
                                this.$message({
                                    message: this.name + '评审成功！',
                                    type: 'success'
                                });
                                this.$store.state.failureEnery.business_tijiao = false;
                                // console.log($(".hide_btn"));
                                $(".hide_btn").hide();
                                this.$store.state.failureEnery.submitPrompt = false;
                            }
                        })
                    }

                } else if (this.type == 11) {
                    if (this.completePercent != 100.0) {
                        this.$message({
                            message: this.to_submit_prompt_name + '评审还未完成，不能提交 ' + this.to_submit_prompt_name + '评审数据！',
                            type: 'warning'
                        });
                    } else {
                        this.$axios.post('/api/jishu_tijiao', {type: parseInt(this.type) + 1}).then(res => { //商务接口(提交的时候把table的数据反给后台，接受后台的返回的table数据)
                            if (res.status == 200) {
                                this.$set(this.dingdang_tableData, this.dingdang_tableData.length - 1, res.data.data);
                                window.location.href = "/elect/BusinessOther?methodType=" + this.methodType + "&currentpage=" + this.type + '&is_submit_type=1';
                                this.$store.state.failureEnery.business_tijiao = false;
                                $(".hide_btn").hide();
                                this.$message({
                                    message: this.name + '评审成功！',
                                    type: 'success'
                                });
                                this.$store.state.failureEnery.submitPrompt = false;
                            }
                        })
                    }
                } else if (this.type == 12) {
                    if (this.completePercent != 100.0) {
                        this.$message({
                            message: this.to_submit_prompt_name + '评审还未完成，不能提交 ' + this.to_submit_prompt_name + '评审数据！',
                            type: 'warning'
                        });
                    } else {
                        this.$axios.post('/api/fuwu_tijiao', {type: parseInt(this.type) + 1}).then(res => { //商务接口(提交的时候把table的数据反给后台，接受后台的返回的table数据)
                            if (res.status == '200') {
                                window.location.href = "/elect/BusinessOther?methodType=" + this.methodType + "&currentpage=" + this.type + '&is_submit_type=1';
                                this.$set(this.dingdang_tableData, this.dingdang_tableData.length - 1, res.data.data);
                                this.$message({
                                    message: this.name + '评审成功！',
                                    type: 'success'
                                });
                                this.$store.state.failureEnery.business_tijiao = false;
                                $(".hide_btn").hide();
                                this.$store.state.failureEnery.submitPrompt = false;
                            }
                        })
                    }
                } else if (this.type == 13) {
                    if (this.completePercent != 100.0) {
                        this.$message({
                            message: this.to_submit_prompt_name + '评审还未完成，不能提交 ' + this.to_submit_prompt_name + '评审数据！',
                            type: 'warning'
                        });
                    } else {
                        this.$axios.post('/api/qita_tijiao', {type: parseInt(this.type) + 1}).then(res => { //商务接口(提交的时候把table的数据反给后台，接受后台的返回的table数据)
                            if (res.status == '200') {
                                window.location.href = "/elect/BusinessOther?methodType=" + this.methodType + "&currentpage=" + this.type + '&is_submit_type=1';
                                this.$set(this.dingdang_tableData, this.dingdang_tableData.length - 1, res.data.data);
                                this.$message({
                                    message: this.name + '评审成功！',
                                    type: 'success'
                                });
                                this.$store.state.failureEnery.business_tijiao = false;
                                $(".hide_btn").hide();
                                this.$store.state.failureEnery.submitPrompt = false;
                            }
                        })
                    }

                }
            },
            getCheckNum(arr) {
                if (arr.length > 0) {
                    return arr.reduce((a, b) => {
                        return Number(a) + Number(b)
                    })
                } else {
                    return ''
                }
            },
            tijiaoNot100Comfrim() {//未完成100%确定
                this.$store.state.failureEnery.tijiaoNot100 = false;
            },
            tijiao100Comfrim() {//完成100%确定
                this.$store.state.failureEnery.tijiao100 = false;
                this.$store.state.failureEnery.submitPrompt = false;
                this.$store.state.failureEnery.flag = false;
                $(".hide_btn").hide();
            },
            comfrimAllChecked() {
                this.allCheckedBtnLoading = true;
                this.$store.state.failureEnery.determineOperating = false;
                this.$axios.post('/api/allChecked_fhx', {
                    // id:id
                }).then(res => {
                    if (res.status === 200) {
                        for (let i = 0; i < this.radioArr.length; i++) {
                            this.radioArr[i].radio = '合格';
                        }
                        this.allCheckedBtnLoading = false;
                    }
                });
            },
            rebackAllChecked() {
                this.$store.state.failureEnery.determineOperating = false;
            },
            changeValue() {//切换页面选择投标人数量
                // console.log(this.value);
                if(this.value!=''||this.value!=undefined||this.value!=null){
                    this.page_loading = true;
                    this.$axios.post('/api/BusinessOther', { currentPage: this.type,
                        is_submit_type: this.$route.query.is_submit_type}).then(res => {
                        if (res.status === 200) {
                            // console.log(res.data);
                            this.companyname_toubiao = res.data.bidMsg.eviewrItemsMsg.companyNameList.slice(0, Number(this.value));
                            this.dingdang_tableData = res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
                        }
                        this.page_loading = false;
                    })
                }else{
                    this.init();
                }
            },
            clearSelect(){//当下拉框的投标人为空时，显示全部数据（多选的时候也是一样）
                this.init();
            },
            changeValueChoose(callback, vc) {//只有回调参数为false时才触发 ctx.getAreaListDataSearch(vc,1)这个函数;
                // console.log(this.value1);
                if (!callback) {
                    if(this.value1.length!=0){
                        this.arrayFind = this.value1;
                        this.page_loading = true;
                        this.$axios.post('/api/BusinessOther', {currentPage: this.type,
                        is_submit_type: this.$route.query.is_submit_type}).then(res => {
                            if (res.status === 200) {
                                let arr = [];
                                this.dingdang_tableData =  res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
                                this.value1.forEach((k, j) => {
                                    let amt = Number(k);
                                    arr.push(res.data.bidMsg.eviewrItemsMsg.companyNameList[amt - 1])
                                });
                                this.companyname_toubiao = arr;
                            }
                            this.page_loading = false;
                        })
                    }else{
                        this.init();
                    }
                }
            },
            removeTag() {//多选下拉的删除操作
                // console.log(this.value1);
                if(this.value1.length==0){
                    this.init();
                }else{
                    this.page_loading = true;
                    this.$axios.post('/api/BusinessOther', {currentPage: this.type,
                    is_submit_type: this.$route.query.is_submit_type}).then(res => {
                        if (res.status === 200) {
                            let arr = [];
                            this.dingdang_tableData = res.data.bidMsg.eviewrItemsMsg.dingdang_tableData;
                            this.value1.forEach((k, j) => {
                                let amt = Number(k);
                                arr.push(res.data.bidMsg.eviewrItemsMsg.companyNameList[amt - 1]);
                            });
                            this.companyname_toubiao = arr;
                        }
                        this.page_loading = false;
                    })
                }
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.pageLoading = true;
                this.init();
            },
        }
    }
</script>

<style lang="scss">
    @import '@/assets/css/common/mixin.scss';

    /*.hide_div {*/
        /*display: none;*/
    /*}*/

    /*.nohide_div {*/
        /*display: block;*/
    /*}*/

    .table_pdf_drop_menu {
        .icon-pdf {
            margin-left: 7px;
        }
    }

    .el-table tbody tr:hover {
        .cell-Bg {
            -moz-animation: bg .5s ease-in-out;
            -webkit-animation: bg .5s ease-in-out;
            background: #92dd8354 !important;

            /*border: 1px solid #77c364!important;*/
            /*z-index: 9999999999!important;*/
            /*animation: glow 800ms ease-out 4 alternate;*/
        }
        @-moz-keyframes bg {
            0% {
                background: rgba(103, 194, 58, 0.18);
            }
            25% {
                background: rgba(103, 194, 58, 0.5);
            }
            50% {
                background: rgba(103, 194, 58, 0.1);
            }
            75% {
                background: rgba(230, 162, 60, 0.5);
            }
            100% {
                background: rgba(230, 162, 60, 0.18);
            }
        }
        @-webkit-keyframes bg {
            0% {
                background: rgba(103, 194, 58, 0.18);
            }
            25% {
                background: rgba(103, 194, 58, 0.5);
            }
            50% {
                background: rgba(103, 194, 58, 0.1);
            }
            75% {
                background: rgba(230, 162, 60, 0.3);
            }
            100% {
                background: rgba(230, 162, 60, 0.18);
            }
        }
    }

    .cell-Bg {

        background: #92dd8354 !important;
        /*border: 1px solid #77c364!important;*/
        /*z-index: 9999999999!important;*/
        /*animation: glow 800ms ease-out 4 alternate;*/
        -moz-animation: bg .5s ease-in-out;
        -webkit-animation: bg .5s ease-in-out;

    }

    .el-progress__text {
        font-size: 14px;
        color: #606266;
        vertical-align: middle;
        margin-left: 5px;
        line-height: 1;
        display: none;
    }

    .el-checkbox + .el-checkbox {
        margin-left: 10px;
    }

    .dingdang_warp {
        overflow: hidden;
        padding-top: 15px;
        background: #ededed;
        min-height: 800px;
        .business_other {
            background-color: #ededed;
            padding: 0px 0% 15px 0%;
            width: 98%;
            float: left;
            margin-left: 1%;
            margin-right: 1%;
            .el-checkbox-group .el-checkbox {
                margin-right: 10px !important;
            }
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
                .center_part {
                    .pro_table {
                        .icon-queren {
                            color: #35D437;
                        }
                        .el-progress-bar__inner {
                            background: #35D437;
                        }
                        .el-progress-bar {
                            width: 35%;
                        }
                    }
                    .unlock_table-warp {
                        color: #606266;
                        .progress_btns {
                            .el-progress-bar__outer {
                                background-color: #ededed;
                                height: 14px !important;
                            }
                            .el-input__inner{
                                width: 200px!important;
                            }
                        }

                    }
                    .table_warp {
                        .dingdang_table {
                            .bianjiIcon {
                                margin-top: 4px;
                                display: inline-block;
                            }
                        }
                    }
                    .pageBox {
                        text-align: right;
                        padding: 15px;
                    }
                }
            }

            @include pdf_operation;

            .mainContentWarp .content .div_pdf .div_pdf_wrap .my-pdf {
                padding-left: 0;
            }
        }
        .scoreShows {
            .el-textarea__inner {
                min-height: 150px !important;
            }
        }
    }

</style>