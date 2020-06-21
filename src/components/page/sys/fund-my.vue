<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="基金名" class="handle-input mr10"></el-input>
                <el-select v-model="query.type" placeholder="请选择" class="handle-input mr10">
                    <el-option
                        v-for="item in selectData"
                        :key="item.k"
                        :label="item.v"
                        :value="item.k"
                    ></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.current-1)*query.size,query.current*query.size)"
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
            <div class="pagination">
                <el-pagination
                    layout="sizes, prev,pager, next,total,jumper"
                    :current-page="query.current"
                    :page-size="query.size"
                    :total="tableData.length"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChage"
                ></el-pagination>
            </div>
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
                type: 'zero',
                current: 1,
                size: 30
            },
            selectData: [
                { k: 'zero', v: '无费率' },
                { k: 'fund', v: '自选基金' }
            ],
            tableData: [],
            allList: [],
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
                    this.allList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 改变当前页数(current)大小
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
        },
        //改变每页条数(size)大小
        handleSizeChage(val) {
            this.$set(this.query, 'size', val);
        },
        // 触发搜索按钮
        handleSearch() {
            if (!this.query.name) {
                this.getData();
            } else {
                this.search(this.query.name, this.tableData);
            }
        },
        // 执行搜索(前端模糊查询)
        search(key, arr) {
            // 支持模糊查询
            // this.allList：用于搜索的总数据
            //toLowerCase():用于把字符串转为小写，让模糊查询更加清晰
            let newListData = []; // 用于存放搜索出来数据的新数组
            if (key) {
                this.allList.filter(item => {
                    if (item.name.toLowerCase().indexOf(key) !== -1) {
                        newListData.push(item);
                    }
                });
            }
            this.tableData = newListData;
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
                        this.getData();
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

