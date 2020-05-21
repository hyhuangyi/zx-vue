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
                    class="handle-date-picker"
                ></el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="handleAdd" style="float:right;">新增角色</el-button>
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
                            @click="handleUpdate(scope.row)"
                        >数据权限</el-button>
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
            <div>
                <!-- 添加或修改角色配置对话框 -->
                <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                        <el-form-item label="角色名称" prop="roleName">
                            <el-input
                                v-model="form.roleName"
                                placeholder="请输入角色名称"
                                :disabled.sync="editDisable"
                            />
                        </el-form-item>

                        <el-form-item label="菜单权限">
                            <el-tree
                                :check-strictly="gl"
                                :data="menuOptions"
                                show-checkbox
                                ref="menu"
                                node-key="id"
                                empty-text="加载中，请稍后"
                                :props="defaultProps"
                            ></el-tree>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                    </div>
                </el-dialog>
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
            //true 将树的父级与子级关联移除 
            //false 将树的父级与子级关联绑
            gl:false,
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
            // 菜单列表
            menuOptions: [],
            // 角色表格数据
            tableData: [],
            // 总条数
            pageTotal: 0,
            idx: -1,
            id: -1,
            // 表单参数
            form: {},
            defaultProps: {
                children: 'subMenu',
                label: 'menuName'
            },
            // 表单校验
            rules: {
                roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
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
            this.$get('/role/list', this.query, true).then(res => {
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
                    this.$post('/role/state', { id: val.id, type: state }, true).then(res => {
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
        /** 查询菜单树结构 */
        getMenuTreeselect() {
            this.$get('/role/menus', {}, true).then(res => {
                if (res.code == 200) {
                    this.menuOptions = res.data;
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        // 所有菜单节点数据
        getMenuAllCheckedKeys() {
            // 目前被选中的菜单节点
            let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
            // 半选中的菜单节点
            let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
            checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
            return checkedKeys.join(',');
        },
        /** 根据角色ID查询菜单树结构 */
        getRoleMenuTreeselect(id) {
            this.gl=true;
            this.getMenuTreeselect();
            this.$get('/role/query', { id: id }, true).then(response => {
                if (response.code == 200) {
                    this.$refs.menu.setCheckedKeys(response.data.menuList);
                    this.gl=false;
                } else {
                    this.$message.error(response.msg);
                }
            });
        },
        // 取消按钮
        cancel() {
            this.editDisable = false;
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
        handleDelete(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$post('/role/del', { id: row.id }, true).then(response => {
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
        /** 新增按钮操作 */
        handleAdd() {
            this.reset();
            this.getMenuTreeselect();
            this.open = true;
            this.editDisable = false;
            this.title = '添加角色';
        },
        /** 修改按钮操作 */
        handleUpdate(row) {
            this.reset();
            const id = row.id;
            this.$nextTick(() => {
                this.getRoleMenuTreeselect(id);
            });
            this.$get('role/query', { id: id }, true).then(response => {
                if (response.code == 200) {
                    this.form = response.data;
                    this.open = true;
                    this.editDisable = true;
                    this.title = '修改角色';
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
                        this.form.menuList = this.getMenuAllCheckedKeys();
                        this.$post('/role/save', this.form, true).then(response => {
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
                        this.form.menuList = this.getMenuAllCheckedKeys();
                        this.$post('/role/save', this.form, true).then(response => {
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
        }
    }
};
</script>


