<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <span style="font-size: 13px">日期：</span>
                <el-date-picker
                    v-model="query.date"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                    class="handle-input mr10"
                ></el-date-picker>
                <span style="font-size: 13px">涨幅：</span>
                <el-input
                    v-model="query.percent"
                    type="number"
                    :max="10"
                    :min="0"
                    placeholder="当日涨幅"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" class="mr10" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="symbol" label="股票代码" align="center"></el-table-column>
                <el-table-column prop="name" label="股票名称" width="240" align="center"></el-table-column>
                <el-table-column prop="current" label="最新价" align="center"></el-table-column>
                <el-table-column prop="percent" label="最新涨幅" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.percent > 0" style="color: red">{{ scope.row.percent }}</span>
                        <span v-else style="color: green">{{ scope.row.percent }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="currentYearPercent" label="年初至今" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.currentYearPercent > 0" style="color: red">{{ scope.row.currentYearPercent }}</span>
                        <span v-else style="color: green">{{ scope.row.currentYearPercent }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="turnoverRate" label="换手率" sortable align="center"></el-table-column>
                <el-table-column prop="marketCapital" label="市值" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.marketCapital > 0" style="color: blue"
                            >{{ parseFloat(scope.row.marketCapital).toFixed(2) }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="count" label="次数" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.count > 0" style="color: purple">
                            {{ scope.row.count }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-chat-line-square" class="green" @click="handleDetail(scope.row)"
                            >详情</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    layout="sizes, prev,pager, next,total,jumper"
                    :current-page="query.current"
                    :page-sizes="[50, 100, 300, 900]"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChage"
                ></el-pagination>
            </div>
        </div>

        <!-- 股票详情弹框 -->
        <el-dialog title="个股详情" :visible.sync="detailOpen" width="70%" append-to-body>
            <div v-loading="loading" style="height: 600px">
                <iframe :src="src" frameborder="no" style="width: 100%; height: 100%" scrolling="auto" />
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'xueqiuHistory',
    data() {
        return {
            query: {
                percent: '3',
                date: this.getTodayDate(),
                current: 1,
                type: '1',
                size: 50
            },

            detailOpen: false,
            src: '',
            loading: true,
            tableData: []
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        this.loading = false;
    },
    methods: {
        // 获取数据
        getData() {
            this.$get('/comm/getXqHistory', this.query, true).then((res) => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.pageTotal = res.data.total || 0;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //个股详情 http://quote.eastmoney.com/sz002617.html?code=002617
        handleDetail(row) {
            this.detailOpen = true;
            this.src = 'http://quote.eastmoney.com/' + row.symbol + '.html';
        },

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'current', 1);
            this.getData();
        },

        // 改变当前页数(current)大小
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
            this.getData();
        },
        //改变每页条数(size)大小
        handleSizeChage(val) {
            this.$set(this.query, 'size', val);
            this.$set(this.query, 'current', 1);
            this.getData();
        },
        //获取当天日期
        getTodayDate() {
            var date = new Date();
            var seperator1 = '-';
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = '0' + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = '0' + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }
    }
};
</script>

