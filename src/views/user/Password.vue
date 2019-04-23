<template>
    <!--账簿登记-->
    <div>
        <el-button size = "small" @click = "bol = true"></el-button>
        <el-progress :percentage="completePercent"></el-progress>

        <el-table
                :data="tableData.data"
                style="width: 100%" class="dingdang_table">
            <el-table-column
                    label="项目"
                    min-width="150" fixed prop="projectName">
            </el-table-column>
            <el-table-column label="投标人">
                <el-table-column :label="item.title"
                                 v-for="(item,index ) in tableData.clumnList"
                                 min-width="250" :key="index">
                    <template slot-scope="scope">
                        <div>
                            <div v-if="!bol">
                                <div v-if="scope.row.type === 'radio'">
                                    <el-radio-group v-model="scope.row['value' + (index + 1)]">
                                        <el-radio :label="val.num" v-for="val in scope.row.radioList">{{val.typeTitle}}</el-radio>
                                    </el-radio-group>
                                </div>
                                <div v-if="scope.row.type === 'input'">
                                    <div>{{scope.row.tit}} ({{scope.row.min}}.00-{{scope.row.max}}.00)</div>
                                    <div class="cf">
                                        <el-input v-model.trim="scope.row['value' + (index + 1)]"
                                                  size="small" placeholder="请输入内容"
                                                  @blur="changes(scope.row['value' + (index + 1)],scope.$index,index + 1,scope.row)"
                                                  style="width: 150px" class="fl"></el-input>
                                        <div class="fl"
                                             style=" line-height: 30px;margin-left: 5px">分
                                        </div>
                                    </div>
                                </div>
                                <div v-if="scope.row.type === 'number'">
                                    {{scope.row['value' + (index + 1)]}}
                                </div>
                            </div>
                            <div v-else>
                                {{scope.row['value' + (index + 1)]}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>


    export default {
        data() {
            return {
                bol: false,//是否提交
                tableData: {
                    clumnList: [
                        {title: '夏丰热工研究院有限公司（测试）（1） '},
                        {title: '阿里巴巴（2）'},
                        {title: '普瑞太阳能有限公司（测试）（3）'}
                    ],
                    data: [
                        {
                            projectName: '第一章，商务10分',
                            type: 'radio',
                            radioList: [{typeTitle: 'A 10分', num: 10}, {
                                typeTitle: 'B 20分',
                                num: 20
                            }, {typeTitle: 'C 30分', num: 30}],
                            min: null,
                            max: null,
                            tit: '',
                            value1: '',
                            value2: '',
                            value3: ''
                        },
                        {
                            projectName: '第二章，商务20分',
                            type: 'input',
                            radioList: [],
                            min: 10,
                            max: 50,
                            tit: '是否是官方配置？',
                            value1: '',
                            value2: '',
                            value3: ''
                        },
                        {
                            projectName: '商务小计',
                            type: 'number',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: '10',
                            value2: '20',
                            value3: '30'
                        },
                        {
                            projectName: '总计',
                            type: 'number',
                            radioList: [],
                            min: null,
                            max: null,
                            tit: '',
                            value1: '10',
                            value2: '20',
                            value3: '30'
                        },
                    ]
                },
            }
        },
        completePercent() {
            console.log(this.tableData.data);
            let num = 0;
                let allNum = (this.tableData.data.length-2) * this.tableData.clumnList.length;
                let arr = this.tableData.data.slice(0,-2);//去除最后两项
                arr.forEach(e => { //循环表数据
                    this.tableData.clumnList.forEach((k, i) => {
                        if (e[`value${i}`] !== '') {
                            console.log(e[`value${i}`]);
                            num++;
                        }
                    })
                });
                return num === 0 ? 0 : ((num / allNum).toFixed(3) * 100).toFixed(1);
        },
        methods: {
            changes(value,rowIndex,colIndex,rowList) {
                if (/[^\d]/.test(value)) {/*替换非数字字符  */
                    this.$message({
                        type: 'warning',
                        message: '请输入数字！'
                    });
                    this.tableData.data[rowIndex]['value'+colIndex] = '';
                }else {
                    if(Number(value) >= rowList.min && Number(value) <= rowList.max){

                    }else {
                        this.$message({
                            type: 'warning',
                            message: `输入值在${rowList.min}-${rowList.max}之间`
                        });
                        this.tableData.data[rowIndex]['value'+colIndex] = '';
                    }
                }
            },
        },
        mounted(){

        }
    };
</script>
