import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component:resolve => require(['../components/view/login'],resolve),
    },
    {
      path: '/v1',
      name: 'HelloWorld',
      component: resolve => require(['../components/view/zx'],resolve),
    },
    { 
      path: '/v2',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
            path: '/dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '../components/view/Tabs.vue'),
            meta: { title: '系统首页' }
        }]
    }]
  })
