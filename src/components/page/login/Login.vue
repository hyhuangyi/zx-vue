<template>
    <div class="login-wrap">
        <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="88"
            shapeType="circle"
            :particleSize="4"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
        />

        <div class="ms-login">
            <div class="ms-title">数据中心</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            param: {
                username: localStorage.getItem('username'),
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$post('/comm/login', this.param, true).then(res => {
                        if (res.code == 200) {
                            this.$message.success('登录成功');
                            localStorage.setItem('username', this.param.username);
                            localStorage.setItem('userId', res.data.userId);
                            localStorage.setItem('roleList', JSON.stringify(res.data.roleList));
                            localStorage.setItem('token', res.data.token);
                            var authUrl = [];
                            var menuList = res.data.menuVOList;
                            menuList.forEach(element => {
                                authUrl.push(element.menuUrl);
                                this.handleChild(element, authUrl);
                            });
                            localStorage.setItem('menuList', JSON.stringify(menuList));
                            localStorage.setItem('authUrl', JSON.stringify(authUrl));
                            // console.log(authUrl);
                            // this.fyReportLogin();
                            this.$router.push('/');
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //帆远report单点登录
        fyReportLogin() {
            var username = this.param.username;
            var password = this.param.password;
            if (username === '') {
                window.alert('请输入用户名');
                return false;
            }
            if (password === '') {
                window.alert('请输入密码');
                return false;
            }
            var url =
                'http://localhost:8075/webroot/decision/login/cross/domain' +
                '?fine_username=' +
                username +
                '&fine_password=' +
                password +
                '&validity=' +
                -2;
            this.$jsonp(url)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //递归获取所有权限url
        handleChild(e, list) {
            var arr = [];
            arr = e.subMenu;
            if (arr.length != 0) {
                arr.forEach(ec => {
                    list.push(ec.menuUrl);
                    this.handleChild(ec, list);
                });
            }
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(236, 243, 238);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 70%;
    top: 60%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>