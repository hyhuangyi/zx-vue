<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="基金名称" class="handle-input mr10"></el-input>
                <!-- clearable -->
                <el-select
                    v-model="query.type"
                    placeholder="请选择"
                    clearable
                    class="handle-input mr10"
                >
                    <el-option v-for="item in selectData" :key="item" :label="item" :value="item"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="sysFund" style="float:right;">同步基金</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="code" label="基金代码" align="center" sortable></el-table-column>
                <el-table-column prop="shortPy" label="基金短拼" align="center"></el-table-column>
                <el-table-column prop="fullPy" label="基金全拼" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="type" label="基金类型" align="center"></el-table-column>
                <el-table-column prop="name" label="基金名称" align="center" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="buyRate" label="购买费率" align="center"></el-table-column> -->
                <el-table-column prop="createTime" label="录入时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="sizes, prev,pager, next,total,jumper"
                    :current-page="query.current"
                    :page-size="query.size"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChage"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'weibo',
    data() {
        return {
            query: {
                name: '',
                type: '',
                current: 1,
                size: 20
            },
            selectData: [],
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getFundType();
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.$post('/fund/all', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.pageTotal = res.data.total || 0;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //获取基金类型
        getFundType() {
            this.$get('/fund/type', {}, true).then(res => {
                if (res.code == 200) {
                    this.selectData = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //同步基金
        sysFund() {
            this.$get('/fund/update', {}, true).then(res => {
                if (res.code == 200) {
                    this.getData();
                    this.$message.success('同步成功');
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection);
        }
    }
};
</script>
<style lang="scss">
.el-tooltip__popper {
    max-width: 40%;
}
</style>