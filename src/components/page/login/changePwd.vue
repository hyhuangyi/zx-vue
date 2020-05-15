<template>
    <div class="handle-box">
        <el-form
            class="user-account-key"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="100px"
        >
            <el-form-item label="原密码" prop="old">
                <el-input type="password" placeholder="请输入原密码" v-model="form.old"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="news">
                <el-input type="password" placeholder="请设置新密码" v-model="form.news"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirm">
                <el-input type="password" placeholder="请确认新密码" v-model="form.confirm"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">修改</el-button>
                <el-button @click="$refs['form'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'pwd',
    data() {
        return {
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                old: [{ required: true, message: '原不能为空', trigger: 'blur' }],
                news: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
                confirm: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
            }
        };
    },
    created() {},
    methods: {
        onSubmit() {
            let userId = localStorage.getItem('userId');
            this.form.id = userId;
            this.$post('/user/change/psw', this.form, true).then(response => {
                if (response.code == 200) {
                    this.$router.push('/login');
                    this.$message.success('修改成功,请重新登录');
                } else {
                    this.$message.error(response.msg);
                }
            });
        }
    }
};
</script>
<style scoped>

</style>


