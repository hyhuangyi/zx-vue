<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary"  round icon="el-icon-search" @click="handleSearch" style="float:right;">搜索</el-button>
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
                <el-table-column prop="fundcode" label="基金代码" width="155" align="center"></el-table-column>
                <el-table-column prop="name" label="基金名称" align="center"></el-table-column>
                <el-table-column prop="jzrq" label="净值日期" align="center"></el-table-column>
                <el-table-column prop="dwjz" label="单位净值"  sortable align="center"></el-table-column>
                  <el-table-column prop="gztime" label="估值时间" align="center"></el-table-column>
                <el-table-column prop="gsz" label="估算值" sortable align="center"></el-table-column>
                <el-table-column prop="gszzl" label="估算率" sortable align="center">
                   <template scope="scope">
                    <span v-if="scope.row.gszzl>0" style="color: red">{{scope.row.gszzl}}</span>
                    <span v-else style="color: green">{{scope.row.gszzl}}</span>
                   </template>
                </el-table-column>
            </el-table>
           
        </div>
    </div>
</template>

<script>
export default {
    name: 'cityTable',
    data() {
        return {
            query: {
                name: '',
                current: 1,
                size: 10
            },
            tableData: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.$get('/comm/fund/list', this.query,true).then(res => {
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
