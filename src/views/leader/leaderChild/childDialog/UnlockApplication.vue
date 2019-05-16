<template>
    <div class="ua">
        <el-row class="titBox">
            <el-col :span="3">
                <div class="grid-content bg-purple-dark rightText">
                    <font>*&nbsp;</font>提出专家：
                </div>
            </el-col>
            <el-col :span="21">
                <div class="grid-content bg-purple-dark rightText">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="张三 A"></el-checkbox>
                        <el-checkbox label="李四 B"></el-checkbox>
                        <el-checkbox label="王五 C"></el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3">
                <div class="grid-content bg-purple-dark rightText">
                    <font>*&nbsp;</font>申请原因：
                </div>
            </el-col>
            <el-col :span="21">
                <div class="grid-content bg-purple-dark rightText">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                    </el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkList:[],
            textarea:''
        }
    },
    mounted() {
        
    },
    methods: {
        
    },
}
</script>

<style lang="scss">
.ua{
    .titBox{
        line-height:40px;
    }
    font{
        color:#f00;
    }
}
</style>
