<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="基金名" class="handle-input mr10"></el-input>
                <!-- <el-select v-model="query.type" placeholder="请选择" class="handle-input mr10">
                    <el-option
                        v-for="item in selectData"
                        :key="item.k"
                        :label="item.v"
                        :value="item.k"
                    ></el-option>
                </el-select>-->
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-plus" style="float:right;" @click="toAdd">新增</el-button>
            </div>
            <el-table
                :data="tableData.slice((query.current-1)*query.size,query.current*query.size)"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                show-summary
                :summary-method="getSummaries"
            >
                <!-- @row-click="handleCurrentChange" -->
                <el-table-column prop="fundcode" label="基金代码" align="center"></el-table-column>
                <el-table-column prop="name" label="基金名称" width="240" align="center"></el-table-column>
                <el-table-column prop="jzrq" label="净值日期" align="center"></el-table-column>
                <el-table-column prop="dwjz" label="单位净值" sortable align="center"></el-table-column>
                <el-table-column prop="gztime" label="估值时间" align="center"></el-table-column>
                <el-table-column prop="gsz" label="估算值" sortable align="center"></el-table-column>
                <el-table-column prop="gszzl" label="估算率" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.gszzl>0" style="color: red">{{scope.row.gszzl}}</span>
                        <span v-else style="color: green">{{scope.row.gszzl}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="holdMoney" label="持有" sortable align="center">
                    <template slot-scope="scope">
                        <el-input
                            type="number"
                            :min="0"
                            :ref="'input'+scope.$index"
                            placeholder="请输入内容"
                            v-show="show[scope.$index]"
                            v-model="scope.row.holdMoney"
                            @blur="handleEdit(scope.$index, scope.row)"
                        ></el-input>
                        <span
                            v-show="!show[scope.$index]"
                            @click="toEdit(scope.$index)"
                        >{{scope.row.holdMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="ly" label="估值利润" sortable align="center">
                    <template scope="scope">
                        <span v-if="scope.row.ly>0" style="color: red">{{scope.row.ly}}</span>
                        <span v-else style="color: green">{{scope.row.ly}}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="remark" label="备注" sortable align="center">
                    <template slot-scope="scope">
                        <el-input
                            :ref="'input_remark'+scope.$index"
                            placeholder="请输入内容"
                            v-show="showRemark[scope.$index]"
                            v-model="scope.row.remark"
                            @blur="handleRemark(scope.$index, scope.row)"
                        ></el-input>
                        <span
                            v-show="!showRemark[scope.$index]"
                            @click="toEditRemark(scope.$index)"
                        >{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-chat-line-square"
                            class="green"
                            @click="handleDetail(scope.row)"
                        >详情</el-button>
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="delFund(scope.row)"
                        >删除</el-button>
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
        <!-- 新增基金 -->
        <el-dialog title="新增基金" :visible.sync="open" width="33%" append-to-body>
            <el-form ref="form" v-model="form" label-width="80px">
                <el-form-item label="基金">
                    <el-autocomplete
                        v-model="form.fund"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入内容"
                        @select="handleSelect"
                        style="width:350px"
                    >
                        <i class="el-icon-edit el-input__icon" slot="suffix"></i> -->
                        <template slot-scope="{ item }">
                            <div>{{ item }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="持仓金额">
                    <el-input v-model="form.holdMoney" type="number" style="width:350px" :min="0"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        v-model="form.remark"
                        type="textarea"
                        placeholder="请输入内容"
                        style="width:350px"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
            </div>
        </el-dialog>

        <!-- 微博详情弹框 -->
        <el-dialog title="基金详情" :visible.sync="detailOpen" width="70%" append-to-body>
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
    name: 'fund',
    data() {
        return {
            query: {
                name: '',
                type: 'zero',
                current: 1,
                size: 30
            },
            restaurants: [], //下拉数据
            // selectData: [
            //     { k: 'zero', v: '无费率' },
            //     { k: 'fund', v: '自选基金' }
            // ],
            open: false,
            detailOpen: false,
            src: '',
            form: {
                code: '',
                holdMoney: '0',
                remark: '-'
            },
            tableData: [],
            allList: [],
            show: [],
            showRemark: [],
            oldVal: [],
            oldRemark: []
        };
    },
    created() {
        this.getData();
    },
    mounted() {
        //初始化获取全部下拉数据//redis缓存
        this.$post('/fund/select', {}, true).then(res => {
            if (res.code == 200) {
                this.restaurants = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });
    },
    methods: {
        // 获取数据
        getData() {
            this.show = [];
            this.$get('/fund/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.allList = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 改变当前页数(current)大小
        handlePageChange(val) {
            this.$set(this.query, 'current', val);
        },
        //改变每页条数(size)大小
        handleSizeChage(val) {
            this.$set(this.query, 'size', val);
        },
        // 触发搜索按钮
        handleSearch() {
            if (!this.query.name) {
                this.getData();
            } else {
                this.search(this.query.name, this.tableData);
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
                    if (item.name.toLowerCase().indexOf(key) !== -1) {
                        newListData.push(item);
                    }
                });
            }
            this.tableData = newListData;
        },
        //编辑备注
        handleRemark(index, row) {
            if (this.oldRemark[index] == row.remark) {
                this.$set(this.showRemark, index, false);
                return;
            } else {
                this.$post('/fund/editRemark', { id: row.id, remark: row.remark == '' ? '-' : row.remark }, true).then(res => {
                    if (res.code == 200) {
                        //直接赋值视图不刷新
                        this.$set(this.showRemark, index, false);
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        },
        //跳到备注编辑
        toEditRemark(index) {
            let input_remark = 'input_remark' + index;
            //ref不是响应式的 必须要定时器
            setTimeout(() => {
                this.$nextTick(() => {
                    //获取焦点
                    this.$refs[input_remark].focus();
                    this.$set(this.oldRemark, index, this.$refs[input_remark].value);
                });
            }, 10);

            //直接赋值视图不刷新
            this.$set(this.showRemark, index, true);
        },
        //修改数据
        handleEdit(index, row) {
            if (this.oldVal[index] == row.holdMoney && row.holdMoney == '0'&& this.oldVal[index]=='0') {
                this.$set(this.show, index, false);
                return;
            } else {
                this.$post('/fund/edit', { id: row.id, holdMoney: row.holdMoney == '' ? '0' : row.holdMoney }, true).then(res => {
                    if (res.code == 200) {
                        //直接赋值视图不刷新
                        this.$set(this.show, index, false);
                        this.getData();
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            }
        },
        //跳到编辑
        toEdit(index) {
            let input = 'input' + index;
            //ref不是响应式的 必须要定时器
            setTimeout(() => {
                this.$nextTick(() => {
                    //获取焦点
                    this.$refs[input].focus();
                    this.$set(this.oldVal, index, this.$refs[input].value);
                });
            }, 10);

            //直接赋值视图不刷新
            this.$set(this.show, index, true);
        },
        //调整新增基金
        toAdd() {
            this.open = true;
        },
        //下拉模糊搜索
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return restaurant => {
                return restaurant.toLowerCase().indexOf(queryString.toLowerCase()) > -1;
            };
        },
        //选中下拉
        handleSelect(item) {
            this.form.fund = item;
        },
        //新增基金
        submitForm() {
            this.$post('/fund/add', this.form, true).then(response => {
                if (response.code == 200) {
                    this.open = false;
                    this.getData();
                    this.$message.success('新增成功');
                } else {
                    this.$message.error(response.msg);
                }
            });
        },
        //基金详情
        handleDetail(row) {
            this.detailOpen = true;
            this.src = 'http://fund.eastmoney.com/' + row.fundcode + '.html';
        },
        //删除基金
        delFund(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$post('/fund/del', { id: row.id }, true).then(response => {
                        if (response.code == 200) {
                            this.$message.success('删除成功');
                            this.getData();
                        } else {
                            this.$message.error(response.msg);
                        }
                    });
                })
                .catch(() => {});
        },
        // 取消按钮
        cancel() {
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            if (this.$refs.menu != undefined) {
                this.$refs.menu.setCheckedKeys([]);
            }
            this.form = {
                id: null,
                roleName: null,
                menuList: '',
                remark: ''
            };
            this.resetForm('form');
        },
        // 表单重置
        resetForm(refName) {
            if (this.$refs[refName]) {
                this.$refs[refName].resetFields();
            }
        },
        //合计计算
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                //这些字段不合计
                if (index === 2 || index === 3 || index === 4 || index === 5 || index === 6 || index === 9) {
                    sums[index] = '/';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                //合计
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] = '￥' + parseFloat(sums[index]).toFixed(2);
                } else {
                    sums[index] = '/';
                }
            });
            return sums;
        }
    }
};
</script>

