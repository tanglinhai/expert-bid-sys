<template>
 <div class="Wheelpushing_wrap">
    <!-- <NavCommon class="NavCommon" :navcommonsList="navcommonsList" :number="number"></NavCommon> -->
    <div class="Allinformation cf" v-loading="pageLoading">
        <!--开始评标页面-->
        <div class="evaluationcommon lineAll cf">
            <div class="textAlignC cole02 fs20" v-if="waitTitshi">请等待其他专家推举... ...</div>
            <div class="grid-content bg-purple-dark fl pro_msg_div textAlignL">
                <h5 class="commonTitle col348fe2 oneanonter">推举评委会主人第{{LunNumber}}轮</h5>
            </div>
            <!-- <ul class="tuijuUlList mt20">
                <li v-for="(item,index) in NumberRounddatas" :key="index" :style="item.caozuo==1?'border:1px solid #409eff':item.caozuo==3?'border:1px solid #67c23a':'border:1px solid #909399'">
                    <img src="../../assets/img/txph.png" alt="">
                    <p :style="item.caozuo==1?'color:#409eff':item.caozuo==3?'color:#67c23a':'color:#909399'">{{item.zuanjiaName}}</p>
                    <p :style="item.caozuo==1?'color:#409eff':item.caozuo==3?'color:#67c23a':'color:#909399'">{{item.depiaoshu}}</p>
                    <p :style="item.caozuo==1?'color:#409eff':item.caozuo==3?'color:#67c23a':'color:#909399'">{{item.tel}}</p>
                    <p :style="item.caozuo==1?'color:#409eff':item.caozuo==3?'color:#67c23a':'color:#909399'">{{item.zjhao}}</p>
                    <p :style="item.caozuo==1?'color:#409eff':item.caozuo==3?'color:#67c23a':'color:#909399'">{{item.danwei}}</p>
                    <el-button size="small" type="primary" style="cursor:pointer;" v-if="item.caozuo==1" @click="tuijuAgain">
                        <i class="icon iconfont icon-shou"></i>&nbsp;推举
                    </el-button>
                    <el-button type="info" size="small" v-if="item.caozuo==2">
                        未签到
                    </el-button>
                    <el-button type="success" size="small" v-if="item.caozuo==3">
                        已推举
                    </el-button>
                    <el-button v-if="item.caozuo==4" style="visibility:hidden; height:32px;">
                       
                    </el-button>
                </li>
            </ul> -->
           <template>
                <el-table
                v-loading="PutRoundNumberLoading"
                class="mt20 fl"
                :data="NumberRounddatas"
                :header-cell-style="getRowClass"
                style="width: 100%">
                    <el-table-column
                        prop="zuanjiaName"
                        label="专家姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="depiaoshu"
                        label="得票数"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="tel"
                        label="手机号">
                    </el-table-column>
                    <el-table-column
                        prop="zjhao"
                        label="证件号">
                    </el-table-column>
                    <el-table-column
                        prop="danwei"
                        label="单位">
                    </el-table-column>
                    <el-table-column
                        prop="caozuo"
                        label="操作">
                        <template slot-scope="scope">
                            <div style="cursor:pointer;" v-if="scope.row.caozuo==1" @click="tuijuAgain">
                                <i class="icon iconfont icon-shou"></i>&nbsp;推举
                            </div>
                            <div v-if="scope.row.caozuo==2">
                                未签到
                            </div>
                           <div v-if="scope.row.caozuo==3">
                                已推举
                            </div>
                            <div v-if="scope.row.caozuo==4">
                                
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination
                class="fr mt10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ChakanPage1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>
 </div>
</template>

<script>
    // import NavCommon from '../../components/publicVue/NavCommon.vue';
    export default {
        name: 'index',
        props: {},
        components: {
        //    NavCommon  
        },
        data(){
            return {
                //navcommonsList:[],  //导航数据
                number:'',   //导航当前第几步

                pageLoading:true,  //loading
                projectZiliaoList:[],  //项目资料列表
                projectChaxunList:[],  //招标文件查看
                projectLeiFenxiList:[], //雷同性分析
                projectYinjianFenxiList:[], //硬件特征码防串围标分析
                PorjectName:'',   //项目名称
                ProjectBianhao:'', //项目编号
                ChakanPage1:1,  //分页

                id:444,  //假设当前专家的id为222
                caozuoAlls:[],  //获取所有状态是否为已推荐
                
                waitTitshi:false,  //推举组长提示信息
                NumberRounddatas:[],  //推举评委会主人第几轮
                LunNumber:'', //推举评委会主人标题轮数
                PutRoundNumberLoading:false, //推举评委会主人loading

                val:'',  //四种方式传值
                        
                }

                
        },
        created() {
            //console.log(this.$route.query.type,999)
            this.$store.state.navCommon.types=this.$route.query.types;
            console.log(this.$store.state.navCommon.types,7)
           // this.val=this.$route.query.methodType;
            if (this.$route.query.type == undefined) {
                this.val= 1;
            } else {
                this.val=this.$route.query.methodType;
            }
        },
        mounted(){
            
            this.tuijuData(); //推举评委会主人第1轮
            //this.navcommonsListFun(); //导航接口

            $(".NavCommon").show();
            var _this=this;
            var setTime;
            setTime=setInterval(function(){
                _this.tuijuData(); //推举评委会主人第1轮
            },20000)
        },
        methods:{
            goto(url){//开始评标
               this.$router.push({
                    path: url
                 });
            },
            getRowClass({row,column,rowIndex,columnIndex}){  //项目分包表头添加背景颜色
                if(rowIndex==0){
                    return 'background:#efefef';
                }else{
                    return '';
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.PutRoundNumberLoading=true;
                this.tuijuData();
            },
            

            //推举评委会主人第1轮
            tuijuData(){
                
                this.$axios.post('/api/WheelPushing',{
                }).then(res=>{
                    if(res.status == 200){
                        //console.log(res.data)
                        this.caozuoAlls=[];
                        this.NumberRounddatas=res.data.leaderList;
                        this.LunNumber=res.data.LunNumber;
                        this.NumberRounddatas.forEach((m,i) => {
                            if(m.id==this.id&&m.caozuo==3){  //判断当前的自己是否已推荐，已经推举的话就直接提示推举状态
                                m.caozuo=4;
                                this.waitTitshi=true;
                            }else{
                               this.waitTitshi=false; 
                            }
                            if(m.caozuo==3||m.caozuo==4){
                                this.caozuoAlls.push(m.caozuo);
                                //console.log(this.caozuoAlls.length,this.caozuoAlls,m.caozuo,8888)
                            }
                            //const arr = [1,2,3,4,5,6,7]
                        })
                        console.log(this.caozuoAlls.length,this.caozuoAlls,this.NumberRounddatas.length,7777)
                        if(this.caozuoAlls.length==this.NumberRounddatas.length){
                            this.$router.push({
                                path: '/elect/ElectedLeader?is_submit_type=1&currentpage=3&methodType='+this.val,
                            })
                        }
                        
                        this.PutRoundNumberLoading=false;
                        this.pageLoading=false;
                    }
                })
            },

            //推举事件页面刷新
            tuijuAgain(){
                this.waitTitshi=true;
                clearInterval(setTime);
                this.tuijuData();
            },

            // navcommonsListFun(){
            //     this.$axios.post('/api/navcommons',{
            //         //invitioninpval:this.invitioninpval,   //传值关键词
            //         //redshow:this.redshow,    //四个按钮选中的是id
            //     }).then(res=>{
            //         if(res.status == 200){
            //            //console.log(res.data)
            //             this.navcommonsList=res.data.navsAll;
            //             this.$nextTick(function(){
            //                 //$("#3").addClass("backblue");
            //             })
            //         }
            //     })
            // },

        }
    }
</script>
<style lang="scss">
.Wheelpushing_wrap{
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
            .tuijuUlList{
                float:left;
                width:100%;
                li{
                    float:left;
                    margin-right:20px;
                    padding:20px;
                    border:1px solid #909399;
                    border-radius:5px;
                    img{
                        display:block;
                        margin:0 auto;
                    }
                    p{
                        text-align:center;
                        font-size:14px;
                        line-height:20px;
                    }
                    button{
                        display:block;
                        margin:6px auto;
                    }
                }
            }
        }
        
    }
}
</style>
