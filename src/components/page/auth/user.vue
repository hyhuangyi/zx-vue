<template>
    <div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-input v-model="query.phone" placeholder="手机号" class="handle-input mr10"></el-input>
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
                <el-button type="primary" @click="handleAdd" style="float:right;">新增用户</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="编号" align="center"></el-table-column>
                <el-table-column prop="username" label="用户名" align="center"></el-table-column>
                <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
                <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
                <el-table-column prop="status" label="状态" align="center">
                    <template scope="scope">
                        <el-switch
                            v-model="scope.row.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="0"
                            :inactive-value="1"
                            @change="changeSwitch(scope.row)"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="roleNames" label="角色" align="center"></el-table-column>
                <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
                <el-table-column prop="updateDate" label="更新时间" align="center"></el-table-column>
                <el-table-column label="操作" width="250" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            class="green"
                            @click="handleUpdate(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-star-off"
                            class="green"
                            @click="resetPassword(scope.row)"
                        >重置密码</el-button>
                        <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
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

            <!-- 添加或修改参数配置对话框 -->
            <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户名称" prop="username">
                                <el-input
                                    v-model="form.username"
                                    placeholder="请输入用户昵称"
                                    :disabled.sync="editDisable"
                                />
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="手机号码" prop="phone">
                                <el-input
                                    v-model="form.phone"
                                    placeholder="请输入手机号码"
                                    maxlength="11"
                                    :disabled.sync="editDisable"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <el-form-item label="角色" prop="roles">
                                <el-select
                                    v-model="form.roles"
                                    multiple
                                    placeholder="请选择"
                                    @change="selectChange"
                                >
                                    <el-option
                                        v-for="item in roleOptions"
                                        :key="item.id"
                                        :label="item.roleName"
                                        :value="item.id"
                                        :disabled="item.isDel == 1"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="备注">
                                <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm">确 定</el-button>
                    <el-button @click="cancel">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'user',
    data() {
        return {
            query: {
                name: '',
                phone: '',
                sedate: '',
                startDate: null,
                endDate: null,
                current: 1,
                size: 10
            },
            // 遮罩层
            loading: true,
            // 选中数组
            ids: [],
            // 非单个禁用
            single: true,
            // 非多个禁用
            multiple: true,
            // 弹出层标题
            title: '',
            // 是否显示弹出层
            open: false,
            //编辑是否可操作
            editDisable: false,
            // 用户表格数据
            tableData: [],
            // 角色选项
            roleOptions: [],
            // 总条数
            pageTotal: 0,
            idx: -1,
            id: -1,
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                username: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
                        message: '请输入正确的手机号码',
                        trigger: 'blur'
                    }
                ],
                email: [
                    { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
                    {
                        type: 'email',
                        message: "'请输入正确的邮箱地址",
                        trigger: ['blur', 'change']
                    }
                ],
                roles: [{ required: true, message: '角色不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.handDate();
            this.$get('/user/list', this.query, true).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data.records;
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
            this.$set(this.query, 'current', 1);
            this.getData();
        },
        changeSwitch(val) {
            let state = val.status;
            let message = '';
            if (state == 0) {
                message = '此操作将启用用户，是否继续';
            } else {
                message = '此操作将禁用用户，是否继续';
            }
            this.$confirm(message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$post('/user/state', { userId: val.id, status: state }, true).then(res => {
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
        handleDelete(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$post('/user/del', { id: row.id }, true).then(response => {
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
        resetPassword(row) {
            this.$confirm('确定要重置密码吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$post('/user/reset', { id: row.id }, true).then(response => {
                        if (response.code == 200) {
                            this.$message.success('重置成功');
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
            this.editDisable = false;
            this.open = false;
            this.reset();
        },
        // 表单重置
        reset() {
            this.form = {
                id: null,
                username: null,
                phone: '',
                email: '',
                remark: '',
                roles: []
            };
            this.resetForm('form');
        },
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.open = true;
            this.editDisable = false;
            this.title = '添加用户';
            this.$get('user/role/select', {}, false).then(response => {
                if (response.code == 200) {
                    this.roleOptions = response.data;
                } else {
                    this.$message.error(response.msg);
                }
            });
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id;
            this.$get('user/role/select', {}, false).then(response => {
                if (response.code == 200) {
                    this.roleOptions = response.data;
                } else {
                    this.$message.error(response.msg);
                }
            });
            this.$get('/user/info/' + id, {}, true).then(response => {
                if (response.code == 200) {
                    this.form = response.data;
                    let arr = [];
                    if (response.data.roleIds != null) {
                        arr = response.data.roleIds.split(',');
                    }
                    var roleList = [];
                    arr.forEach(element => {
                        roleList.push(parseInt(element));
                    });

                    this.form.roles = roleList;
                    this.open = true;
                    this.editDisable = true;
                    this.title = '修改用户';
                } else {
                    this.$message.error(response.msg);
                }
            });
        },
        //提交表单 有id编辑 无id新增
        submitForm: function() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    // console.log(this.form);
                    if (this.form.id != undefined) {
                        this.$post('/user/save', this.form, true).then(response => {
                            if (response.code == 200) {
                                this.open = false;
                                this.editDisable = false;
                                this.getData();
                                this.$message.success('修改成功');
                            } else {
                                this.$message.error(response.msg);
                            }
                        });
                    } else {
                        this.$post('/user/save', this.form, true).then(response => {
                            if (response.code == 200) {
                                this.open = false;
                                this.editDisable = false;
                                this.getData();
                                this.$message.success('新增成功');
                            } else {
                                this.$message.error(response.msg);
                            }
                        });
                    }
                }
            });
        },
        // 表单重置
        resetForm(refName) {
            if (this.$refs[refName]) {
                this.$refs[refName].resetFields();
            }
        },
        //解决下拉选无法选中问题
        selectChange() {
            this.$forceUpdate();
        }
    }
};
</script>
