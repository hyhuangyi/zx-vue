<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="表名" class="handle-input mr10"></el-input>
                <!-- clearable -->
                <el-select v-model="query.schema" placeholder="请选择" class="handle-input mr10">
                    <el-option
                        v-for="item in schemaOptions"
                        :key="item"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-model="query.sedate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    class="handle-date-picker"
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="handGenerator" style="float:right;">代码生成</el-button>
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
                <el-table-column prop="tableName" label="表名" align="center"></el-table-column>
                <el-table-column prop="tableComment" label="表注释" align="center"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="createTime" label="更新时间" align="center"></el-table-column>
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
    name: 'generator',
    data() {
        return {
            query: {
                name: '',
                schema: '',
                startDate: null,
                endDate: null,
                current: 1,
                size: 10
            },
            schemaOptions: [],
            tableData: [],
            multipleSelection: [],
            genList: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getSchmeas();
        setTimeout(() => {
            this.getData();
        }, 350);
    },
    methods: {
        // 获取数据
        getData() {
            this.handDate();
            this.$get('/generate/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.pageTotal = res.data.total || 0;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        getSchmeas() {
            this.$get('/schema', {}, true).then(res => {
                if (res.code == 200) {
                    this.schemaOptions = res.data;
                    this.query.schema = this.schemaOptions[0];
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
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //代码生成
        handGenerator() {
            const length = this.multipleSelection.length;
            let str = '';
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].tableName + ',';
            }
            if (str == '') {
                this.$message.error('至少选择一个');
                return;
            }
            //会刷新
            // window.open(this.GLOBAL_BaseUrl+'/comm/generate/code?arr='+ str);
            location.href = this.GLOBAL_BaseUrl + '/comm/generate/code?arr=' + str + '&schema=' + this.query.schema;
        }
    }
};
</script>
