import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// 解决在使用ElementUI时点击同一个路由，页面报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/sys/dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/city',
                    component: () => import(/* webpackChunkName: "city" */ '../components/page/sys/city.vue'),
                    meta: { title: '城市列表' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/demo/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/demo/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/demo/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/demo/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/demo/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/demo/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/demo/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/demo/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/monitor',
                    component: () => import(/* webpackChunkName: "monitor" */ '../components/page/sys/monitor.vue'),
                    meta: { title: '服务监控' }
                },
                {
                    path: '/swagger',
                    component: () => import(/* webpackChunkName: "swagger" */ '../components/page/sys/swagger.vue'),
                    meta: { title: '接口文档' }
                }, {
                    path: '/druid',
                    component: () => import(/* webpackChunkName: "druid" */ '../components/page/sys/druid.vue'),
                    meta: { title: '数据监控' }
                }, {
                    path: '/operate',
                    component: () => import(/* webpackChunkName: "operate" */ '../components/page/sys/operate.vue'),
                    meta: { title: '操作日志' }
                }, {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/error/404.vue'),
                    meta: { title: '404' }
                }, {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/error/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/fund',
                    component: () => import(/* webpackChunkName: "fund" */ '../components/page/sys/fund.vue'),
                    meta: { title: '基金列表' }
                }, {
                    path: '/role',
                    component: () => import(/* webpackChunkName: "role" */ '../components/page/auth/role.vue'),
                    meta: { title: '角色管理' }
                }, {
                    path: '/user',
                    component: () => import(/* webpackChunkName: "user" */ '../components/page/auth/user.vue'),
                    meta: { title: '用户管理' }
                }, {
                    path: '/love',
                    component: () => import(/* webpackChunkName: "love" */ '../components/page/sys/love.vue'),
                    meta: { title: '爱情树' }
                }, {
                    path: '/generator',
                    component: () => import(/* webpackChunkName: "generator" */ '../components/page/sys/generator.vue'),
                    meta: { title: '代码生成' }
                }, {
                    path: '/map',
                    component: () => import(/* webpackChunkName: "map" */ '../components/page/sys/map.vue'),
                    meta: { title: '高德地图' }
                }, {
                    path: '/video',
                    component: () => import(/* webpackChunkName: "video" */ '../components/page/sys/video.vue'),
                    meta: { title: '视频播放' }
                }, {
                    path: '/waterfall-easy',
                    component: () => import(/* webpackChunkName: "waterfall-easy" */ '../components/page/sys/waterfall-easy.vue'),
                    meta: { title: '瀑布流-easy' }
                }, {
                    path: '/waterfall2',
                    component: () => import(/* webpackChunkName: "waterfall2" */ '../components/page/sys/waterfall2.vue'),
                    meta: { title: '瀑布流-2' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
