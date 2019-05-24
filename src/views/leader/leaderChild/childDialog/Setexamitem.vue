<template>
    <div class="setExam">
        <el-dialog
            title="初审项设置"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查因素：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-input v-model="input" placeholder="请输入内容" size="small"></el-input>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查类别：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-select size="small" v-model="region" placeholder="响应性评审">
                            <el-option label="响应性评审" value="xyxps"></el-option>
                            <el-option label="资格审查" value="zgsc"></el-option>
                            <el-option label="形式评审" value="xsps"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查项性质：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="radio" label="1">可偏离项</el-radio>
                        <el-radio v-model="radio" label="2">不可偏离项</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>分类：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-radio v-model="radio1" label="3">可偏离项</el-radio>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>关联的分包：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-checkbox label="所有分包"></el-checkbox>
                        <el-checkbox label="0635-1909N12C6/1"></el-checkbox>
                    </div>
                </el-col>
            </el-row>
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark rightText">
                        <font style="color:red;">*&nbsp;</font>审查标准：
                    </div>
                </el-col>
                <el-col :span="15">
                    <div class="grid-content bg-purple-dark">
                        <el-input type="textarea" :rows="6" v-model="desc"></el-input>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            region:'',
            radio:'',
            radio1:'',
            desc:'',
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>


<style lang="scss">
.setExam{
    .inHeight{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
</style>
