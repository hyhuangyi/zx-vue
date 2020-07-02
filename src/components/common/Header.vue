<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">数据中心</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/img.jpg" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided @click.native="csdnFun">CSDN</el-dropdown-item>
                        <el-dropdown-item divided>
                            <a
                                target="_blank"
                                href="//shang.qq.com/wpa/qunwpa?idkey=1e366d1b3da6c901ca5cebcf66f4b16d11869a85b5a584c5e782d6e8e5560bbc"
                            >
                                <el-dropdown-item>加群交流</el-dropdown-item>
                            </a>
                        </el-dropdown-item>

                        <!-- <a href="https://github.com/hyhuangyi/zx-vue.git" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
                        </a>-->
                        <el-dropdown-item divided @click.native="drawer=true">修改密码</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-drawer
                title="修改密码"
                :visible.sync="drawer"
                :with-header="false"
                :show-close="true"
                @close="closeDrawer()"
            >
                <div>
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
                            <el-button type="warning" plain @click="cancelForm()">取消</el-button>
                            <el-button type="primary" plain @click="onSubmit('form')">确认</el-button>
                            <el-button type="info" plain @click="resetForm('form')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div>
                    <vue-particles
                        color="#FF83FA"
                        :particleOpacity="0.7"
                        :particlesNumber="110"
                        shapeType="circle"
                        :particleSize="4"
                        linesColor="#EE5C42"
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
                </div>
            </el-drawer>

            <el-drawer title="CSDN" :visible.sync="drawer1" :with-header="false" :show-close="true">
                <div class="web-magic" style=" margin: 0 auto; margin-left: 100px;">
                    <el-button
                        type="info"
                        plain
                        :icon="i1"
                        @click="csdnControl(i1,1)"
                        style=" margin: 0 auto; margin-top: 20px;"
                    >{{v1}}</el-button>
                    <br />
                    <el-button
                        type="info"
                        plain
                        :icon="i2"
                        @click="csdnControl(i2,2)"
                        style=" margin: 0 auto; margin-top: 20px;"
                    >{{v2}}</el-button>
                </div>
                <div>
                    <vue-particles
                        color="#FF83FA"
                        :particleOpacity="0.7"
                        :particlesNumber="110"
                        shapeType="circle"
                        :particleSize="4"
                        linesColor="#EE5C42"
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
                </div>
            </el-drawer>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            drawer: false,
            drawer1: false,
            collapse: false,
            fullscreen: false,
            v1: '',
            v2: '',
            i1: '',
            i2: '',
            name: 'zx',
            message: 2,
            // 表单参数
            form: {},
            // 表单校验
            rules: {
                old: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
                news: [{ required: true, message: '新密码不能为空', trigger: 'blur' }],
                confirm: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
            }
        };
    },
    computed: {
        username() {
            let username = localStorage.getItem('username');
            return username ? username : this.name;
        }
    },
    methods: {
        //修改密码提交表单
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
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
        //csdn方法
        csdnFun() {
            this.drawer1 = true;
            this.$get('/comm/runStatus', {}, false).then(response => {
                if (response.code == 200) {
                    if (response.data.v1 == null) {
                        this.v1 = '点击开启第一页';
                        this.i1 = 'el-icon-video-play';
                    } else {
                        this.v1 = '正在运行,总次数：' + response.data.v1 + '次,点击停止';
                        this.i1 = 'el-icon-video-pause';
                    }
                    if (response.data.v2 == null) {
                        this.v2 = '点击开启第二页';
                        this.i2 = 'el-icon-video-play';
                    } else {
                        this.v2 = '正在运行,总次数：' + response.data.v2 + '次,点击停止';
                        this.i2 = 'el-icon-video-pause';
                    }
                } else {
                    this.$message.error(response.msg);
                }
            });
        },
        //开启
        csdnControl(type, page) {
            if (type == 'el-icon-video-play') {
                this.$get('/comm/start/csdn', { page: page,minute:2}, false).then(response => {
                    if (response.code == 200) {
                        this.csdnFun();
                        this.$message.success('启动成功');
                    } else {
                        this.$message.error(response.msg);
                    }
                });
            } else {
                this.$get('/comm/stop/csdn', { page: page }, false).then(response => {
                    if (response.code == 200) {
                        this.csdnFun();
                        this.$message.success('关闭成功');
                    } else {
                        this.$message.error(response.msg);
                    }
                });
            }
        },
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('menuList');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        }
    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.user-account-key {
    margin: 8px auto;
    width: 98%;
    text-align: center;
}
</style>
