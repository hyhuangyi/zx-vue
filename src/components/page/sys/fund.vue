<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    round
                    icon="el-icon-search"
                    @click="handleSearch"
                    style="float:right;"
                >搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                show-summary
                :summary-method="getSummaries"
            >
                <!-- @row-click="handleCurrentChange" -->
                <el-table-column prop="fundcode" label="基金代码" align="center"></el-table-column>
                <el-table-column prop="name" label="基金名称" width="240" align="center"></el-table-column>
                <el-table-column prop="jzrq" label="净值日期" align="center"></el-table-column>
                <el-table-column prop="dwjz" label="单位净值" sortable align="center"></el-table-column>
                <el-table-column prop="gztime" label="估值时间" align="center"></el-table-column>
                <el-table-column prop="gsz" label="估算值" sortable align="center"></el-table-column>
                <el-table-column prop="gszzl" label="估算率" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.gszzl>0" style="color: red">{{scope.row.gszzl}}</span>
                        <span v-else style="color: green">{{scope.row.gszzl}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="持有(可编辑)" sortable align="center">
                    <template slot-scope="scope">
                        <el-input
                            :ref="'input'+scope.$index"
                            placeholder="请输入内容"
                            v-show="show[scope.$index]"
                            v-model="scope.row.remark"
                            @blur="handleEdit(scope.$index, scope.row)"
                        ></el-input>
                        <span
                            v-show="!show[scope.$index]"
                            @click="toEdit(scope.$index)"
                        >{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="ly" label="估值利润" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.ly>0" style="color: red">{{scope.row.ly}}</span>
                        <span v-else style="color: green">{{scope.row.ly}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'fund',
    data() {
        return {
            query: {
                name: '',
                current: 1,
                size: 10
            },
            tableData: [],
            show: [],
            oldVal: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.show = [];
            this.$get('/fund/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'current', 1);
            this.getData();
        },
        //修改数据
        handleEdit(index, row) {
            if (this.oldVal[index] == row.remark) {
                 this.$set(this.show, index, false);
                return;
            } else {
                this.$post('/fund/edit', { id: row.id, remark: row.remark }, true).then(res => {
                    if (res.code == 200) {
                        //直接赋值视图不刷新
                        this.$set(this.show, index, false);
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        },
        //跳到编辑
        toEdit(index) {
            let input = 'input' + index;
            //ref不是响应式的 必须要定时器
            setTimeout(() => {
                this.$nextTick(() => {
                    //获取焦点
                    this.$refs[input].focus();
                    this.$set(this.oldVal, index, this.$refs[input].value);
                });
            }, 10);

            //直接赋值视图不刷新
            this.$set(this.show, index, true);
        },
        //合计计算
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                //这些字段不合计
                if (index === 2 || index === 3 || index === 4 || index === 5 || index === 6) {
                    sums[index] = '/';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                //合计
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = '￥' + parseFloat(sums[index]).toFixed(2);
                } else {
                    sums[index] = '/';
                }
            });
            return sums;
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
