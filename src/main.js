// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from '../src/store/index'
import '../src/assets/js/directives'
import qs from 'qs'
import $ from 'jquery'

/**饿了么框架element-ui*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/**bootstrap*/
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
/**进度条*/
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**图片预览*/
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
/**http封装*/
import {post,Delete,put,get} from '../src/util/http'
/**兼容 转码器*/
import 'babel-polyfill'

Vue.use(Vuex);
Vue.use(ElementUI)
Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.prototype.$post=post                  
Vue.prototype.$put=put
Vue.prototype.$get=get
Vue.prototype.$Delete=Delete
/**关闭警告*/
Vue.config.productionTip = false
/**是否显示环形进度动画，默认true*/
NProgress.configure({ showSpinner: false });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
