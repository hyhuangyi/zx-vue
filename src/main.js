// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from '../src/store/index'

import qs from 'qs'
import $ from 'jquery'
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
/**饿了么框架element-ui*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css';
import './components/common/directives';
/**http封装*/
import {post,Delete,put,get} from '../src/util/http'
/**Vue粒子特效(vue-particles插件)*/
import VueParticles from 'vue-particles'  
/**兼容 转码器*/
import 'babel-polyfill'


Vue.use(VueParticles) 
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

Vue.prototype.$qs = qs
Vue.prototype.$http = axios
Vue.prototype.$post=post                  
Vue.prototype.$put=put
Vue.prototype.$get=get
Vue.prototype.$Delete=Delete
/**关闭警告*/
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
