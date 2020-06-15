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
                <el-button type="primary" @click="weiboSerach()" style="float:right;">话题爬取</el-button>
                <el-button type="primary" @click="cleanData()" style="float:right;">清空数据</el-button>
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
                <el-table-column prop="id" label="微博ID" align="center"></el-table-column>
                <el-table-column prop="bid" label="详情ID" align="center"></el-table-column>
                <el-table-column prop="userId" label="用户ID" align="center"></el-table-column>
                <el-table-column prop="screenName" label="微博名" align="center"></el-table-column>
                <el-table-column prop="text" label="微博类容" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="topics" label="话题" align="center" show-overflow-tooltip></el-table-column>
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
                <el-table-column prop="createdAt" label="发表时间" align="center" sortable></el-table-column>
                <!-- <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" align="center"></el-table-column>-->
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-chat-line-square"
                            class="green"
                            @click="handleDetail(scope.row)"
                        >微博详情</el-button>
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
        <el-drawer
            title="话题爬取"
            :visible.sync="drawer"
            :with-header="false"
            :show-close="true"
            @close="closeDrawer()"
        >
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item prop="key" label="微博话题" style="margin:0 auto;margin-top:30px">
                    <el-input type="input" placeholder="请输入关键词" v-model="form.key"></el-input>
                </el-form-item>
                <el-form-item style="margin:0 auto;margin-top:30px">
                    <el-button type="warning" plain @click="cancelForm()">取消</el-button>
                    <el-button type="primary" plain @click="onSubmit('form')">确认</el-button>
                    <el-button type="info" plain @click="resetForm('form')">重置</el-button>
                </el-form-item>
            </el-form>

            <div>
                <p class="tip" style="margin-top:80px">若数据过少，可能是cookie过期了,获取cookie步骤</p>
                <p class="tip">1.用Chrome打开https://passport.weibo.cn/signin/login</p>
                <p class="tip">2.输入微博的用户名、密码，登录</p>
                <p class="tip">3.按F12键打开Chrome开发者工具，在地址栏输入并跳转到https://weibo.cn</p>
                <p
                    class="tip"
                >4.依此点击Chrome开发者工具中的Network->Name中的weibo.cn->Headers->Request Headers，"Cookie:"后的值即为我们要找的cookie值，复制即可</p>
            </div>
        </el-drawer>
        <!-- 微博详情弹框 -->
        <el-dialog title="微博详情" :visible.sync="open" width="70%" append-to-body>
            <div v-loading="loading" style="height:600px">
                <iframe
                    :src="src"
                    frameborder="no"
                    style="width: 100%;height: 100%"
                    scrolling="auto"
                />
            </div>
        </el-dialog>
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
                size: 30
            },
            drawer: false,
            open: false,
            src: '',
            loading: true,
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            rules: {
                key: [{ required: true, message: '关键词不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        setTimeout(() => {
            this.getData();
        }, 350);
    },
    mounted: function() {
        setTimeout(() => {
            this.loading = false;
        }, 230);
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
        handleDetail(src) {
            this.open = true;
            // this.src='https://weibo.com/'+src.userId+"/"+src.bid;
            this.src = 'https://m.weibo.cn/detail/' + src.id;
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
        }, //修改密码提交表单
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.$get('/comm/getWbData', this.form, true).then(response => {
                        if (response.code == 200) {
                            this.closeDrawer();
                            this.drawer = false;
                            setTimeout(() => {
                                this.$message.success('正在爬取中');
                                this.getData();
                            }, 1500);
                        } else {
                            this.$message.error(response.msg);
                        }
                    });
                }
            });
        },
        //取消操作
        cancelForm() {
            this.resetForm('form');
            this.drawer = false;
        },
        closeDrawer() {
            this.resetForm('form');
        },
        // 表单重置
        resetForm(refName) {
            if (this.$refs[refName]) {
                this.$refs[refName].resetFields();
            }
        },
        weiboSerach() {
            this.drawer = true;
        },
        cleanData() {
            // 二次确认删除
            this.$confirm('确定要清空吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$get('/weibo/clean', {}, true).then(response => {
                        if (response.code == 200) {
                            this.getData();
                        } else {
                            this.$message.error(response.msg);
                        }
                    });
                })
                .catch(() => {});
        }
    }
};
</script>
<style lang="scss">
.el-tooltip__popper {
    max-width: 40%;
}
.tip {
    margin: 0 auto;
    margin-top: 10px;
    margin-left: 30px;
    color: lightcoral;
}
</style>