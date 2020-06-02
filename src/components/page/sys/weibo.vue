<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.topic" placeholder="关键词" class="handle-input mr10"></el-input>
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
                <el-table-column prop="userId" label="微博id" align="center"></el-table-column>
                <el-table-column prop="screenName" label="微博name" align="center"></el-table-column>
                <el-table-column prop="text" label="微博类容" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="topics" label="话题" align="center"></el-table-column>
                <el-table-column prop="createdAt" label="发表时间" align="center"></el-table-column>
                <el-table-column prop="source" label="发布工具" align="center"></el-table-column>

                <el-table-column prop="imgPath" label="图片">
                    <template slot-scope="scope">
                        <el-popover placement="left" title trigger="hover">
                            <img
                                referrerpolicy="no-referrer"
                                :src="scope.row.pics"
                                alt
                                style="max-width: 220px; max-height: 180px;"
                            />
                            <img
                                slot="reference"
                                referrerpolicy="no-referrer"
                                :src="scope.row.pics"
                                alt
                                style="display: inline-block; height: auto;max-width: 100%; max-height: 100px;"
                            />
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column prop="attitudesCount" label="点赞数" align="center" sortable></el-table-column>
                <el-table-column prop="commentsCount" label="评论数" align="center" sortable></el-table-column>
                <el-table-column prop="repostsCount" label="转发数" align="center" sortable></el-table-column>
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
                topic: '',
                startDate: null,
                endDate: null,
                current: 1,
                size: 50
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        setTimeout(() => {
            this.getData();
        }, 350);
    },
    methods: {
        // 获取数据
        getData() {
            this.handDate();
            this.$get('/weibo/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
                    this.tableData.forEach(a => {
                        if (a.pics != '') {
                            a.pics = a.pics.split(',')[0];
                        }
                    });
                    this.pageTotal = res.data.total || 0;
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