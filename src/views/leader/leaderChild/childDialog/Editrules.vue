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
                            <i slot="suffix" class="el-input__icon iconfont icon-bianji"></i>
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
                        <el-select v-model="item.select" slot="append" placeholder="请选择">
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
                        <i class="iconfont icon-xiugai"></i>
                        <i class="iconfont icon-guanlian"></i>
                        <i class="iconfont icon-guanbi"></i>
                      </div>
                      <div class="iconBox" v-if="item.select == '多选'">
                        <i class="iconfont icon-xiugai"></i>
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
                <li v-for="item in  scope.row.project">
                  <!-- {{item.rate}} -->
                  <div v-for="val in item.rate">{{val.name}}</div>
                  <el-col :span="15">
                    <el-button size="small" type="primary" plain @click="addPfys(scope.row,scope.$index)">新增评分因素</el-button>
                  </el-col>
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
  </div>
</template>

<script>
export default {
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
        rate: [{name:'111'}], //评分因素
        ischecked: false,
        select:'',
        option:[
                {name:'单选'},
                {name:'多选'},
                {name:'步长'},
                {name:'两步法'},
                {name:'人工'},
               ],
      });
      item.rate.push({
        name:'111111',
        btn:'新增评分因素'
      })
    },
    remove(val,index){

    },
    addPfys(row,index){
      console.log(row);
    }
  }
};
</script>

<style lang="scss">
.editrules {
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
    height: 50px;
    line-height: 50px;
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
