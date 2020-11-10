<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="股票名" class="handle-input mr10"></el-input>
                 <el-select v-model="query.type" placeholder="请选择" @change="getData()" class="handle-input mr10">
                    <el-option
                        v-for="item in selectData"
                        :key="item.k"
                        :label="item.v"
                        :value="item.k"
                    ></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" class="mr10" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-s-data" @click="handleQs">趋势</el-button>
                <el-button type="primary" @click="exportStock" style="float: right">导出</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.current - 1) * query.size, query.current * query.size)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="code" label="股票代码" align="center"></el-table-column>
                <el-table-column prop="name" label="股票名称" width="240" align="center"></el-table-column>
                <el-table-column prop="price" label="最新价" align="center"></el-table-column>
                <el-table-column prop="rate" label="最新涨幅" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.rate > 0" style="color: red">{{scope.row.rate}}</span>
                        <span v-else style="color: green">{{ scope.row.rate }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="industry" label="行业" align="center"></el-table-column>
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

        <!-- 趋势分析 -->
        <el-dialog title="成交额趋势" :visible.sync="qsOpen" width="75%" append-to-body>
            <el-row :gutter="20">
                <el-col>
                    <el-card shadow="hover">
                        <div id="box1" style="width: 100%; height: 420px"></div>
                    </el-card>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'stock',
    data() {
        return {
            query: {
                name: '',
                current: 1,
                type:'1',
                size: 50
            },
              selectData: [
                { k: '1', v: 'macd金叉' },
                { k: '2', v: '连续3日上涨' },
                { k: '3', v: '布林突破上轨' },
                { k: '4', v: '市盈率最小' },
                { k: '0', v: 'macd金叉&&布林突破&&连续3日上涨' }
            ],
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
            this.show = [];
            this.$get('/comm/stock/guoRenCode', this.query, true).then((res) => {
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
            this.src = 'http://quote.eastmoney.com/' + row.code + '.html';
        },
        handleQs() {
            this.qsOpen = true;
            this.$nextTick(() => {
                this.drawLine();
            });
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
                    if (item.name.toLowerCase().indexOf(key) !== -1) {
                        newListData.push(item);
                    }
                });
            }
            this.tableData = newListData;
        },
        exportStock() {
            //会刷新
            // window.open(this.GLOBAL_BaseUrl+'/comm/stock/export');
            location.href = this.GLOBAL_BaseUrl + '/comm/stock/export?type='+this.query.type;
        },
        drawLine() {
            //折线
            this.$get('comm/stock/chartData', { type: 'line' }, true).then((res) => {
                let data = res.data;
                if (res.code == 200) {
                    // 基于准备好的dom，初始化echarts实例，所以只能在mounted中调用
                    this.$nextTick(function () {
                        let myChart = this.$echarts.init(document.getElementById('box1'));
                        // 绘制图表
                        myChart.setOption({
                            title: { text: '折线' },
                            tooltip: {},
                            legend: {
                                data: data.legend
                            },
                            xAxis: {
                                // x坐标
                                data: data.xAxis
                            },
                            yAxis: {}, // y坐标
                            series: data.series
                        });
                    });
                } else {
                    // this.$message.error(res.msg);
                }
            });
        }
    }
};
</script>

