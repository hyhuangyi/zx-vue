import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component:resolve => require(['../components/view/login'],resolve),
    },
    {
      path: '/v1',
      name: 'HelloWorld',
      component: resolve => require(['../components/view/zx'],resolve),
    },
    { 
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/view/Tabs.vue'),
            meta: { title: '系统首页' }
        },
        {
            path: '/table',
            component: () => import(/* webpackChunkName: "table" */ '../components/view/BaseTable.vue'),
            meta: { title: '基础表格' }
        },
       
      
        {
            // vue-schart组件
            path: '/charts',
            component: () => import(/* webpackChunkName: "chart" */ '../components/view/BaseCharts.vue'),
            meta: { title: 'schart图表' }
        },
        
        {
            // 国际化组件
            path: '/i18n',
            component: () => import(/* webpackChunkName: "i18n" */ '../components/view/I18n.vue'),
            meta: { title: '国际化' }
        },
        {
            // 权限页面
            path: '/permission',
            component: () => import(/* webpackChunkName: "permission" */ '../components/view/Permission.vue'),
            meta: { title: '权限测试', permission: true }
        },
        {
            path: '/404',
            component: () => import(/* webpackChunkName: "404" */ '../components/view/404.vue'),
            meta: { title: '404' }
        },
        {
            path: '/403',
            component: () => import(/* webpackChunkName: "403" */ '../components/view/403.vue'),
            meta: { title: '403' }
        }
       ]
    }]
  })
