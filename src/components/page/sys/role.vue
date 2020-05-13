<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.roleName" placeholder="角色名称" class="handle-input mr10"></el-input>
                <el-date-picker
                    v-model="query.sedate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="角色编号" align="center"></el-table-column>
                <el-table-column prop="roleCode" label="权限字符" align="center"></el-table-column>
                <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
                <el-table-column prop="isDel" label="状态" align="center">
                    <template scope="scope">
                        <el-switch
                            v-model="scope.row.isDel"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="0"
                            :inactive-value="1"
                            @change="changeSwitch(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" width="280" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="green"
                            @click="handlePermission(scope.row)"
                        >数据权限</el-button>
                    </template>
                </el-table-column>
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
    name: 'roleList',
    data() {
        return {
            query: {
                roleName: '',
                sedate: '',
                startDate: null,
                endDate: null,
                current: 1,
                size: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.handDate();
            this.$get('/role/list', this.query, { isShow: true }).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.pageTotal = res.data.total || 50;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        //处理日期
        handDate() {
            if (this.query.sedate) {
                this.query.startDate = this.query.sedate[0];
                this.query.endDate = this.query.sedate[1];
            } else {
                this.query.startDate = '';
                this.query.endDate = '';
            }
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
            this.getData();
        },
        changeSwitch(val) {
            let state = val.isDel;
            let message = '';
            if (state == 0) {
                message = '此操作将启用角色，是否继续';
            } else {
                message = '此操作将禁用角色，是否继续';
            }
            this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$post('/role/state', { id: val.id, type: state }, { isShow: true }).then(res => {
                        if (res.code == 200) {
                            this.getData();
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        } else {
                            this.$message.error(res.msg);
                            this.getData();
                        }
                    });
                })
                .catch(() => {
                    this.getData();
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
        },
        handlePermission(val){
            console.log(val);
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
