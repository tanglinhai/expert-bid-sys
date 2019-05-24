<template>
    <div class="sort">
        <el-dialog
            title="增加审查类别"
            :visible.sync="dialogVisible"
            width="700px"
            center
            :before-close="handleClose">
            <div class="sortList" v-for="(item,index) in data" :key="index" :class="{selected:item.isSelected}" @click="setBg(item)">{{item.value}}</div>
            <el-button size="mini" @click="handSort(1)">上</el-button>
            <el-button size="mini" @click="handSort(0)">下</el-button>
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
        
    },
    methods: {
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
.sort{
    .selected{
        background: #409eff;
        color:#fff;
    }
}
</style>
