<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="@/assets/img/head.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2020-05-20</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>杭州</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">520</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">1314</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">999</div>
                                    <div>数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
                    <div slot="header" class="clearfix">
                        <span>励志短句</span>
                        <el-button style="float: right; padding: 3px 0" type="text" @click="add">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '@/components/common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('username'),
            todoList: [
                {
                    title: '务须咬牙厉志,蓄其气而长其志,切不可恭然自馁也!',
                    status: false
                },
                {
                    title: '即使赚得了全世界，却失去了自己，又有什么意义呢?',
                    status: false
                },
                {
                    title: '不肯下一点功夫，永远不会明白自己从何而来，又将立足于何处。',
                    status: false
                },
                {
                    title: '凡事不要想得太复杂，手握的太紧，东西会碎，手会疼。',
                    status: false
                },
                {
                    title: ' 你多学一样本事，就少说一句求人的话。',
                    status: false
                },
                {
                    title: '人在千里，家在心里；家在千里，人在心里。',
                    status: false
                },
                {
                    title: '退是一种胸怀，让是一种修养，退、让则是一种智慧。',
                    status: false
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '最近六个月各用户访问趋势'
                },
                xRorate: 25,
                labels: [],
                datasets: []
            },
            options2: {
                type: 'line',
                title: {
                    text: '最近六个月各用户访问趋势'
                },
                labels: [],
                datasets: []
            }
        };
    },
    components: {
        Schart
    },
    methods: {
        add() {
            this.$message.error('暂不支持操作');
        },
        chartData() {
            this.$get('/operate/chart', this.query, true).then(res => {
                if (res.code == 200) {
                    this.options.labels = res.data.labels;
                    this.options.datasets = res.data.datasets;
                    this.options2.labels = res.data.labels;
                    this.options2.datasets = res.data.datasets;
                } else {
                    this.$message.error(res.msg);
                }
            });
        }
    },
    created(){
        this.chartData();
    },
    computed: {
        role() {
            console.log(this.name);
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}
.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}
.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}
.grid-num {
    font-size: 30px;
    font-weight: bold;
}
.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}
.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}
.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}
.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}
.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}
.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}
.user-info-list span {
    margin-left: 70px;
}
.mgb20 {
    margin-bottom: 20px;
}
.todo-item {
    font-size: 14px;
    color: darkcyan;
}
.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
.schart {
    width: 100%;
    height: 300px;
}
</style>