import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuex from 'vuex';
import globalApi from './utils/globalApi';
import axios from 'axios';
import qs from 'qs';
import { post, get } from './utils/httpUtil';
import VueJsonp from 'vue-jsonp';//jsonp
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import VueParticles from 'vue-particles';//粒子特效
import VueAMap from 'vue-amap';//地图
import VideoPlayer from 'vue-video-player';//视频
import 'vue-video-player/src/custom-theme.css';
import 'video.js/dist/video-js.css';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/zx-table.css';//引入table公共页面
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
//定义全局baseUrl
Vue.prototype.GLOBAL_BaseUrl = globalApi.baseURL;
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueParticles);
Vue.use(VueI18n);
Vue.use(VueJsonp);
Vue.use(VueAMap);
Vue.use(VideoPlayer);
VueAMap.initAMapApiLoader({
    key: 'f36a05999d5745eddd6c274b088a9a55',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
});
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
Vue.prototype.$qs = qs;
Vue.prototype.$http = axios;
Vue.prototype.$post = post;
Vue.prototype.$get = get;

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | zx-vue`;
    const role = localStorage.getItem('username');
    const menuList = localStorage.getItem('menuList');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (!menuList && to.path !== '/login' && to.path !== '/403') {
        //菜单在localStorage找不到
        ElementUI.Message({
            message: '登录过期',
            type: 'warning',
            center: true
        });
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});
//引入mock.js
require('./mock/mock.js')

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
