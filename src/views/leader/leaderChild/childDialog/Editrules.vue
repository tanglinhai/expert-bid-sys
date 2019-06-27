<template>
  <div class="editrules">
    <el-row class="titBox">
      <el-col :span="4">
        <div class="grid-content bg-purple-dark">
          <span>编辑评分细则</span>
        </div>
      </el-col>
      <el-col :span="20" style="text-align:right;">
        <div class="grid-content bg-purple-dark">
          <el-button type="primary" size="small">保存</el-button>
          <el-button class="AnowBtn" size="small">新增类别</el-button>
          <el-button size="small">评分预览</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column label="类别" width="200px;">
            <template slot-scope="scope">
              <div style="padding-right:10px;">
                <el-row>
                    <el-col :span="24">
                        <el-input size="small" v-model="scope.row.kind.value">
                            <i slot="suffix" class="el-input__icon iconfont icon-bianji" @click="$refs.changepro.dialogVisible = true;"></i>
                        </el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span style="color:#f00;">{{ scope.row.kind.name }}</span>
                    </el-col>
                    <el-col :span="12" style="text-align:right;">
                        <span>共16.00分</span>
                    </el-col>
                </el-row>
              </div>
            </template>
        </el-table-column>
        <el-table-column label="项目">
          <template slot-scope="scope">
            <div class="liBox">
              <ul>
                <li v-for="item in  scope.row.project">
                  <el-col :span="15">
                    <el-input placeholder="请输入内容" size="small" v-model="item.value" class="input-with-select">
                        <el-select  v-model="item.select" slot="append" placeholder="请选择">
                            <el-option v-for="(options,index) in item.option" :label="options.name" :value="options.name"></el-option>
                        </el-select>
                    </el-input>
                  </el-col>
                  <el-col :span="2" style="padding-left:5px;">
                    <el-input size="small" v-model="item.value"></el-input>
                  </el-col>
                  <div>
                    <el-col v-if="item.select == '人工'" :span="2" style="text-align:center;"><span>≤分≤</span></el-col>
                    <el-col v-if="item.select == '人工'" :span="2">
                      <el-input size="small" v-model="item.value"></el-input>
                    </el-col>
                    <el-col v-else :span="2" style="padding-left:5px;"><span>分</span></el-col>
                  </div>
                  <el-col :span="3" style="text-align:right;">
                      <div class="iconBox" v-if="item.select == '单选' || item.select == '步长' || item.select == '两步法' || item.select == '人工'">
                        <i class="iconfont icon-xiugai" @click="$refs.represent.dialogVisible = true;"></i>
                        <i class="iconfont icon-guanlian" @click="$refs.relation.dialogVisible = true;"></i>
                        <i class="iconfont icon-guanbi"></i>
                      </div>
                      <div class="iconBox" v-if="item.select == '多选'">
                        <i class="iconfont icon-xiugai" @click="$refs.represent.dialogVisible = true;"></i>
                        <i class="iconfont icon-guanbi"></i>
                      </div>
                  </el-col>
                  <div v-if="item.select == '步长'">
                    <el-col :span="15" style="text-align:right;"><span>步长</span></el-col>
                    <el-col :span="2" style="padding-left:5px;">
                      <el-input size="small" v-model="item.value"></el-input>
                    </el-col>
                    <el-col :span="2" style="padding-left:5px;"><span>分</span></el-col>
                  </div>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="评分因素">
          <template slot-scope="scope">
            <div class="liBox">
              <ul>
                <li v-for="(item,index) in scope.row.project" style="position:relative;">
                    <div v-if="item.select == '步长'">
                      <el-col :span="8">
                        <el-select style="width:100%;" size="small" v-model="item.value" placeholder="请选择">
                          <el-option></el-option>
                        </el-select>
                      </el-col>
                    </div>

                    <div v-if="item.select == '人工'">
                      <el-col :span="8">
                        <el-input v-model="item.value" size="small" placeholder="人工录入"></el-input>
                      </el-col>
                    </div>

                    <div v-for="val in item.rate" v-if="item.select == '单选'|| item.select == '多选'">
                      <el-row style="line-height:50px;">
                        <el-col :span="1" v-if="item.select == '单选'"><el-radio v-model="val.name" label=""></el-radio></el-col>
                        <el-col :span="1" v-if="item.select == '多选'"><el-checkbox v-model="val.name" label=""></el-checkbox></el-col>
                        <el-col :span="8"><el-input v-model="val.name" size="small"></el-input></el-col>
                        <el-col :span="3" style="padding-left:5px;"><el-input v-model="val.name" size="small"></el-input></el-col>
                        <el-col :span="1" style="padding-left:5px;">分</el-col>

                        <el-col :span="7" style="text-align:center;">
                          <div class="iconBox"  v-if="item.select == '单选'">
                              <i class="iconfont icon-guanbi"></i>
                          </div>
                          <div class="iconBox"  v-if="item.select == '多选'">
                              <i class="iconfont icon-guanbi"></i>
                              <i class="iconfont icon-guanlian" @click="$refs.relation.dialogVisible = true;"></i>
                          </div>
                        </el-col>
                      </el-row>
                    </div>

                    <div v-if="item.select == '两步法'">
                        <el-row>
                          <p>第一步：定义划档标准</p>
                          <el-row v-for="(val,subIndex) in item.firstMeth" style="line-height:50px;">
                              <el-col :span="1"><el-radio v-model="val.value" label=""></el-radio></el-col>
                              <el-col :span="6"><el-input v-model="val.value" size="small"></el-input></el-col>
                              <el-col :span="2" style="padding-left:5px;"><el-input v-model="val.value" size="small"></el-input></el-col>
                              <el-col :span="1" style="padding-left:5px;">分</el-col>
                              <el-col :span="2"><el-input v-model="val.value" size="small"></el-input></el-col>
                              <el-col :span="3">≥平均评定分≥</el-col>
                              <el-col :span="2" style="padding-left:5px;"><el-input v-model="val.value" size="small"></el-input></el-col>

                              <el-col :span="2" style="text-align:center;" v-show="subIndex!=0">
                                <div class="iconBox">
                                  <i class="iconfont icon-guanbi"></i>  
                                </div>
                              </el-col>
                          </el-row>
                        </el-row>
                        <el-row>
                          <p>第二步：定义划档区间</p>
                          <el-row v-for="val in item.secondMeth" style="line-height:50px;">
                            <el-col :span="1"><el-radio v-model="val.value" label=""></el-radio></el-col>
                            <el-col :span="6"><el-input v-model="val.value" size="small"></el-input></el-col>
                            <el-col :span="2" style="padding-left:5px;"><el-input v-model="val.value" size="small"></el-input></el-col>
                            <el-col :span="1" style="padding-left:5px;">分</el-col>
                            <el-col :span="2"><el-input v-model="val.value" size="small"></el-input></el-col>
                          </el-row>
                        </el-row>
                    </div>

                    <div style="position:absolute;right:10px;top:10px" v-if="item.select == '单选' || item.select == '多选' || item.select == '两步法'">
                      <el-col :span="4">
                        <el-button size="small" type="primary" plain @click="addPfys(item.select,item.rate,item.firstMeth,item.secondMeth,index)">新增评分因素</el-button>
                      </el-col>
                    </div>

                    <div v-if="!item.select">
                      sss
                    </div>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="一致性打分项" width="50px;">
          <template slot-scope="scope">
            <div class="liBox">
              <ul>
                <li v-for="item in  scope.row.project">
                  <el-checkbox v-model="item.ischecked"></el-checkbox>
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px;">
          <template slot-scope="scope">
            <div style="padding-left:10px;">
              <el-button type="primary" plain size="small" @click="add(scope.row,scope.$index)">新增打分项</el-button>
              <el-button size="small" @click="remove(scope.row,scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <Changepro ref="changepro"></Changepro>
    <Represent ref="represent"></Represent>
    <Relation ref="relation"></Relation>
  </div>
</template>

<script>
import Changepro from './lastChildDia/Change';
import Represent from './lastChildDia/Represent';
import Relation from './lastChildDia/Relation';
export default {
  components:{
    Changepro,
    Represent,
    Relation
  },
  data() {
    return {
      tableData: [],
      input5: "",
      select: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$axios.post("./api/pfxz").then(res => {
        if (res.status == 200) {
          this.tableData = res.data.data;
        }
      });
    },
    add(item, index) {
      item.project.push({
        value: "aa", //项目
        name: item.kind.name,
        ischecked: false,
        rate:[{name:'111'}], //评分因素
        select:'',
        option:[
                {name:'单选'},
                {name:'多选'},
                {name:'步长'},
                {name:'两步法'},
                {name:'人工'},
               ],
      });
    },
    remove(val,index){

    },
    addPfys(item,rate,firstMeth,secondMeth,index){
      console.log(item);
      // item.push({name:'4444444'});
      if(item == '两步法'){
        firstMeth.push({value:''});
        secondMeth.push({value:''});
      }else{
        rate.push({name:'4444444'});
      }
    }
  }
};
</script>

<style lang="scss">
.editrules {
  i{
    cursor: pointer;
  }
  .icon-guanbi{
    &:hover{
      color:#f00;
    }
  }
  .icon-guanlian,
  .icon-bianji,
  .icon-xiugai{
    &:hover{
      color:#409eff;
    }
  }
  .titBox {
    border-bottom: 1px solid #409eff;
    line-height: 40px;
    .AnowBtn {
      margin-left: 10px;
    }
  }
  .el-table td{
      padding:0;
      vertical-align:middle !important;
  }
  .el-table th{
      .cell{
          padding:0 10px;
      }
  }
  .iconfont {
    font-size: 14px;
  }
  .cell {
    padding: 0;
  }
  li {
    padding:0 10px;
    min-height: 50px;
    height: 50px;
    height:auto!important;
    border-bottom: 1px solid #ebeef5;
  }
  .liBox {
    li {
      &:last-child {
        border-bottom: 1px solid transparent;
      }
      .el-select{
          width: 115px;
      }
      .iconBox{
        .iconfont{
          font-size: 16px;
        }
        i{
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
