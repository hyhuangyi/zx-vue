<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="股票名" class="handle-input mr10"></el-input>

                <span style="font-size: 13px">当日涨幅：</span>
                <el-input
                    v-model="query.percent"
                    type="number"
                    :max="10"
                    :min="0"
                    placeholder="当日涨幅"
                    class="handle-input mr10"
                ></el-input>
                <span style="font-size: 13px">年初至今：</span>
                <el-input
                    v-model="query.yearPercent"
                    type="number"
                    :max="20"
                    :min="0"
                    placeholder="年初至今"
                    class="handle-input mr10"
                ></el-input>
                <el-button type="primary" icon="el-icon-search" class="mr10" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="exportXueqiu" style="float: right">导出</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.current - 1) * query.size, query.current * query.size)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="symbol" label="股票代码" align="center"></el-table-column>
                <el-table-column prop="name" label="股票名称" width="240" align="center"></el-table-column>
                <el-table-column prop="current" label="最新价" align="center"></el-table-column>
                <el-table-column prop="percent" label="最新涨幅" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.percent > 0" style="color: red">{{ scope.row.percent }}</span>
                        <span v-else style="color: green">{{ scope.row.percent }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="current_year_percent" label="年初至今" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.current_year_percent > 0" style="color: red">{{ scope.row.current_year_percent }}</span>
                        <span v-else style="color: green">{{ scope.row.current_year_percent }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="turnover_rate" label="换手率" sortable align="center"></el-table-column>
                <el-table-column prop="market_capital" label="市值" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.market_capital > 0" style="color: blue"
                            >{{ parseFloat(scope.row.market_capital / 100000000).toFixed(2) }}
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
                    :page-sizes="[50, 100, 200, 300]"
                    :page-size="query.size"
                    :total="tableData.length"
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
    name: 'xueqiu',
    data() {
        return {
            query: {
                percent: '5',
                yearPercent: '0',
                name: '',
                current: 1,
                type: '1',
                size: 50
            },

            detailOpen: false,
            qsOpen: false,
            src: '',
            loading: true,
            tableData: [],
            allList: []
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
            this.$set(this.query, 'current', 1);
            this.$get('/comm/getXueqiuList', this.query, true).then((res) => {
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.allList = res.data;
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
        exportXueqiu() {
            //会刷新
            // window.open(this.GLOBAL_BaseUrl+'/comm/exportXueqiu');
            location.href =
                this.GLOBAL_BaseUrl + '/comm/exportXueqiu?percent=' + this.query.percent + '&yearPercent=' + this.query.yearPercent;
        },

        // 改变当前页数(current)大小
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
        },
        //改变每页条数(size)大小
        handleSizeChage(val) {
            this.$set(this.query, 'size', val);
            this.$set(this.query, 'current', 1);
        },
        // 触发搜索按钮
        handleSearch() {
            if (!this.query.name) {
                this.getData();
            } else {
                this.search(this.query.name, this.tableData);
                this.$set(this.query, 'current', 1);
            }
        },
        // 执行搜索(前端模糊查询)
        search(key, arr) {
            // 支持模糊查询
            // this.allList：用于搜索的总数据
            //toLowerCase():用于把字符串转为小写，让模糊查询更加清晰
            let newListData = []; // 用于存放搜索出来数据的新数组
            if (key) {
                this.allList.filter((item) => {
                    if (item.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                        newListData.push(item);
                    }
                });
            }
            this.tableData = newListData;
        }
    }
};
</script>

