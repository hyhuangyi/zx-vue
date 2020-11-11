<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="基金名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="exportZero" style="float:right;">导出</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.current-1)*query.size,query.current*query.size)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <!-- @row-click="handleCurrentChange" -->
                <el-table-column prop="fundcode" label="基金代码" align="center"></el-table-column>
                <el-table-column prop="name" label="基金名称" width="240" align="center"></el-table-column>
                <el-table-column prop="jzrq" label="净值日期" align="center"></el-table-column>
                <el-table-column prop="dwjz" label="单位净值" sortable align="center"></el-table-column>
                <el-table-column prop="gztime" label="估值时间" align="center"></el-table-column>
                <el-table-column prop="gsz" label="估算值" align="center"></el-table-column>
                <el-table-column prop="gszzl" label="估算率" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.gszzl>0" style="color: red">{{scope.row.gszzl}}</span>
                        <span v-else style="color: green">{{scope.row.gszzl}}</span>
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
                num: 30,
                name: '',
                current: 1,
                size: 30
            },
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
            this.$set(this.query, 'current', 1);
            this.$get('/fund/zero/rank', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.allList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //导出
        exportZero() {
            //会刷新
            // window.open(this.GLOBAL_BaseUrl+'/comm/fund/zero/export');
            location.href = this.GLOBAL_BaseUrl + '/comm/fund/zero/export';
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
                this.$set(this.query, "current", 1);
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

