import axios from 'axios';
import qs from 'qs';
import globalApi from './globalApi';
import {
  Message,
  Loading
} from 'element-ui';

import router from '../router';

//超时时间15秒
axios.defaults.timeout = 15000;
//baseURL
axios.defaults.baseURL = globalApi.baseURL;
//是否携带cookie
axios.defaults.withCredentials = true

//http request 拦截器
axios.interceptors.request.use(
  request => {
    // console.log(request.isShow==true)
    if (request.isShow === true) {
      showFullScreenLoading();
    }
    // console.log(request)
    //全局设置header(token)
    request.headers = {
      "content-type": "application/x-www-form-urlencoded",
      'authorization': localStorage.getItem('token')
    }
    return request;
  },
  error => {
    tryHideFullScreenLoading();
    return Promise.reject(err);
  }
);


//http response 拦截器
axios.interceptors.response.use(
  response => {
    // console.log(response)
    //刷新token
    if (response.headers.authorization) {
      localStorage.setItem('token', response.headers.authorization);
    }
    //如果token失效或者被踢 重定向到登录页
    if (response.data.code == 'TOKEN_EXPIRE' || response.data.code == 'USER_KICKOUT') {
      // localStorage.clear();清空localStorage
      //清空menuList  
      localStorage.removeItem("menuList");
      router.push("/login");
    }
    if (response.config.isShow === true) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    tryHideFullScreenLoading();
    //处理错误
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          Message.error("未传TOKEN");
          router.push("/login")
          break;
        case 404:
          Message.error("请求错误，未找到资源");
          router.push("/404")
          break;
      }
    }
    return Promise.reject(error);
  }
)


/**
 * 封装get方法 
 * @param url
 * @param data
 * @param isShow 是否loading  boolean  true 或者 false
 * @returns {Promise}
 */
export function get(url, data = {}, isShow) {
  return new Promise((resolve, reject) => {

    axios.get(url, {
      params: data,
      isShow: isShow
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @param isShow  是否loading  boolean  true 或者 false
 * @returns {Promise}
 */
export function post(url, data = {}, isShow) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), { isShow: isShow })
      .then(response => {
        resolve(response.data);

      })
      .catch(err => {
        reject(err);
      })
  })
}

//直接在mian.js 直接Vue.use() //使用Vue.use() 插件必须要提供一个公开的install()方法

// export default {
//   install(Vue)  {
//       Vue.prototype.get =function  get(url, data = {}, isShow) {
//         return new Promise((resolve, reject) => {

//           axios.get(url, {
//             params: data,
//             isShow: isShow
//           })
//             .then(response => {
//               resolve(response.data);
//             })
//             .catch(err => {
//               reject(err);
//             })
//         })
//       }
//       Vue.prototype.post =function  post(url, data = {}, isShow) {
//         return new Promise((resolve, reject) => {
//           axios.post(url, qs.stringify(data), {isShow:isShow})
//             .then(response => {
//               resolve(response.data);

//             })
//             .catch(err => {
//               reject(err);
//             })
//         })
//       }
//   }
// }


let needLoadingRequestCount = 0;
//加载
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
//关闭
export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let loading;
//关闭
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '努力加载中....',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//关闭
function endLoading() {
  loading.close()
}