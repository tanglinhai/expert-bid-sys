<template>
  <div class="unlock">
    <el-dialog
      title="tishi"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      center
    >
      <div slot="title" class="header-title">
        <el-row class="titleBox">
          <el-col :span="24">
            <div class="commonTitle" style="padding-top:6px;color:#348fe2;font-weight:bold;">评标解锁</div>
          </el-col>
        </el-row>
      </div>
      <el-row class="bodyBox">
        <el-col :span="4">
          <div class="grid-content bg-purple-dark overflowText textRight">申请人：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark overflowText">张三李四五</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark overflowText textRight">审查阶段：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark overflowText">三十三点三三三</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark overflowText textRight">申请日期：</div>
        </el-col>
         <el-col :span="8">
          <div class="grid-content bg-purple-dark overflowText textLeft">19860506</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark overflowText textRight">状态：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark overflowText">正常</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-dark overflowText textRight">申请原因：</div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark overflowText">未知</div>
        </el-col>
      </el-row>
      <span slot="footer">
        <el-button size="small" @click="dialogVisible = false">查 看</el-button> 
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
        dialogVisible:false,
    };
  },
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
.unlock{
    .bodyBox{
        line-height:40px;
        .textRight{
            text-align: right;
        }
    }
}
</style>
