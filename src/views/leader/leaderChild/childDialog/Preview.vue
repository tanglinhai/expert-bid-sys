<template>
    <div class="preview">
        <el-dialog
            title="审查项预览"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <el-row class="inHeight">
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        审查项预览
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple-dark rightText">
                        审查类别：
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple-dark">
                        <el-select size="small" v-model="region" placeholder="响应性评审">
                            <el-option label="响应性评审" value="xyxps"></el-option>
                            <el-option label="资格审查" value="zgsc"></el-option>
                            <el-option label="形式评审" value="xsps"></el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    v-loading="tabLoad">
                    <el-table-column
                        type="index">
                    </el-table-column>
                    <el-table-column
                        prop="scys"
                        label="评议内容">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-dialog
                width="500px"
                title="审查项排序"
                :visible.sync="innerVisible"
                append-to-body
                id="inDialog">
                <div class="sortList" v-for="(item,index) in data" :key="index" :class="{selected:item.isSelected}" @click="setBg(item)">{{item.value}}</div>
                <el-button size="mini" @click="handSort(1)">上</el-button>
                <el-button size="mini" @click="handSort(0)">下</el-button>
                <span slot="footer">
                    <el-button @click="innerVisible = false" size="small">取 消</el-button>
                    <el-button type="primary" size="small" @click="innerVisible = false">确 认</el-button>
                </span>
            </el-dialog>
            <span slot="footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="innerVisible = true">排序</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible:false,
            innerVisible: false,
            tableData:[],
            tabLoad:true,
            data:[
                    {
                        value: 1,
                        isSelected: false
                    },
                    {
                        value: 2,
                        isSelected: false
                    },
                    {
                        value: 3,
                        isSelected: false
                    },
                    {
                        value: 4,
                        isSelected: false
                    }
            ]
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init(){
            this.$axios.post('./api/category').then(res => {
                if(res.status == 200){
                    this.tabLoad=false;
                    this.tableData=res.data.data;
                }
            })
        },
        setBg(item){
            this.data.map(v => (v.isSelected = false));
            item.isSelected = true;
        },
        handSort(isTop){
            let orderItemIndex = 0;
            let orderItem =this.data.find((val,index) => {
                // console.log(val,index);
                orderItemIndex = index;
                return val.isSelected;
            });
            let topIndex = 0;
            if (orderItemIndex == 0 && isTop||orderItemIndex == this.data.length - 1&&!isTop) {
                topIndex = orderItemIndex;
            } else{
                topIndex = isTop?orderItemIndex-1:orderItemIndex+1;
            }
            this.data.splice(orderItemIndex, 1);
            this.data.splice(topIndex, 0, orderItem);
        }
    },
}
</script>

<style lang="scss">
.preview{
    .inHeight{
        line-height: 40px;
        .rightText{
            text-align: right;
        }
    }
}
#inDialog{
    .selected{
        background: #409eff;
        color:#fff;
    }
}
</style>
