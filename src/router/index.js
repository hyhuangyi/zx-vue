import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

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
                    component: () => import(/* webpackChunkName: "monitor" */ '../components/page/sys/monitor.vue'),
                    meta: { title: '系统首页'}
                },
               
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "cityTable" */ '../components/page/table/cityTable.vue'),
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
                    path: '/swagger',
                    component: () => import(/* webpackChunkName: "swagger" */ '../components/page/sys/swagger.vue'),
                    meta: { title: '接口文档' }
                }, {
                    path: '/druid',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/sys/druid.vue'),
                    meta: { title: '数据监控' }
                },{
                    path: '/404',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/error/404.vue'),
                    meta: { title: '404' }
                },{
                    path: '/403',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/error/403.vue'),
                    meta: { title: '403' }
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
