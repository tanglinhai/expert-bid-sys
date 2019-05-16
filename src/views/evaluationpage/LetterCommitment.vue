<template>
    <div class="LetterComon_wrap" v-loading="pageloadding">
        <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
        <div class="Allinformation lineAll cf">
            <div class="evaluationcommon letterComent cf">
                <h5 class="h5">评标专家承诺书</h5>
                <p class="p">为保证招标及商务谈判工作的公平、公正、科学择优，我在参与评标及商务谈判工作中承诺：</p>
                <p class="p">一、自觉遵守《中华人民共和国招标投标法》等法律法规的有关规定，客观、公正地履行职责，遵守职业道德，按照招标文件规定的评标方法和评标标准评标，对所提出的评审意见承担个人责任。</p>
                <p class="p">二、在评标过程中，绝不私自与投标方人员接触。</p>
                <p class="p">三、不接受其他招投标当事人的礼品、礼金、宴请或参与任何可能影响公正评标的活动。</p>
                <p class="p">四、严格保守招标秘密，不泄露对投标文件的评审、中标候选人的推荐情况以及与评标有关的其他情况。</p>
                <p class="p">五、严格遵守公务回避的有关规定。</p>
                <p class="p">六、发现评标过程中存在违规违纪情况，立即向监督部门反映。</p>
                <p class="p">七、在评标工作结束后，立即销毁、删除自留的与评标工作有关的一切文件。</p>
                <p class="p">八、如曾经因在招标、评标以及其他与招标投标有关活动中违法违规而受过行政或刑事处罚且在处罚有效期内，将主动申请回避。</p>
                <p class="p">九、有下列情形之一的，应主动申请回避：</p>
                <p class="p">(1)投标人或者投标人主要负责人的近亲属；</p>
                <p class="p">(2)项目主管部门或者行政监督部门的人员；</p>
                <p class="p">(3)与投标人有经济利益关系，可能影响对投标公正评审的；</p>
                <p class="p">(4)曾因在招标、评标以及其他与招标投标有关活动中从事违法行为而受过行政处罚或刑事处罚的。</p>
                <h6 class="h6">承诺人签字：</h6>
                <span class="span">&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;&nbsp;月&nbsp;&nbsp;&nbsp;&nbsp;日</span>
                <el-row :gutter="20" class="mt20" style="overflow:hidden; width:100%;">
                    <el-col :span="12" :offset="6">
                        <div class="grid-content bg-purple mar mt20">
                            <el-button type="primary" @click="AgreeXieYi" :loading="BtnLoading">同意</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    
    // import NavCommon from '../../components/publicVue/NavCommon.vue';
    import { setTimeout } from 'timers';
    export default {
        name: 'index',
        props: {},
        components: {
            // NavCommon
        },
        data(){
            return {
            //   navcommonsList:[],  //导航数据
            //number:'',   //导航当前第几步
              pageloadding:false,  //进入页面loading展示
              BtnLoading:false,  //同意按钮loadding
              
              val:'',  //四种方式传值
            }
        },
        created() {
            //console.log(this.$route.query.types);
            //console.log(this.$store.state.failureEnery.methodNum,this.$route.query.methodType,'1');
            this.val=this.$route.query.methodType;
            console.log(this.val);
            if (this.$route.query.types == undefined) {
                this.$store.state.navCommon.types=1;
            } else {
                this.$store.state.navCommon.types=this.$route.query.types;
            }
        },
        mounted(){
            //this.navcommonsListFun(); //导航接口
            $(".NavCommon").show();
            $(".CommonProject").show();
        },
        methods:{
            goto(url){//开始评标
               this.$router.push({
                    path: url
                 });
            },

            navcommonsListFun(){
                this.pageloadding=true;
                this.$axios.post('/api/navcommons',{
                    //invitioninpval:this.invitioninpval,   //传值关键词
                    //redshow:this.redshow,    //四个按钮选中的是id
                }).then(res=>{
                    if(res.status == 200){
                       console.log(res.data)
                        this.navcommonsList=res.data.navsAll;
                        this.$nextTick(function(){
                            //$("#1").addClass("backblue");
                        })
                        this.pageloadding=false;
                    }
                })
            },

            AgreeXieYi(){  //同意按钮
                this.BtnLoading=true,
                this.$axios.post('/api/agreeBtn','post',{

                }).then(res=>{
                    if(res.status == 200){
                        this.BtnLoading=false,
                        this.$router.push({
                            path: '/index/AllInformation?is_submit_type=0&currentpage=2&methodType='+this.val,
                        })
                    }
                })
            },
        }
    }
</script>
<style lang="scss">
.LetterComon_wrap{
    overflow:hidden; 
    padding-top:15px; 
    background:#ededed;
    min-height: 800px;
    .Allinformation {
        background-color: #ededed;
        padding:0px 0% 15px 0%;
        width:98%;
        float:left;
        margin-left:1%;
        margin-right:1%;
        .ApplyAvoid {
            .demo-ruleForm{
                .el-textarea__inner{
                    min-height: 120px!important;
                }
            }
        }
        .evaluationcommon{
            background:white;
            border-radius:5px;
            padding:15px;
        }
        .letterComent{
            .h5{
                font-size:24px;
                text-align: center;
                line-height:40px;
            }
            .h6{
                padding-left:40px;
                margin:20px 0px;
            }
            .p{
               line-height:40px;
               padding-left:50px;
               padding-right:50px;
               font-size:14px;
            }
            .span{
                text-align: right;
                display:block;
                padding-right:50px;
            }
        }
    }
}
</style>
