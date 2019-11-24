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
// axios.defaults.withCredentials = true

//http request 拦截器
axios.interceptors.request.use(
  request => {
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
    if (response.data.code == 'TOKEN_EXPIRE' || response.data.code=='USER_KICKOUT') {
      //清空localStorage
      localStorage.clear();
      router.push("/login");
    }
    if (response.config.isShow === true) {
      tryHideFullScreenLoading();
    }
    return response;
  },
  error => {
    tryHideFullScreenLoading();
    return Promise.reject(error)
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
        Message.error(err.stack);
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @param isShow 是否loading {isShow:true} 或者 {isShow:false}
 * @returns {Promise}
 */
export function post(url, data = {}, isShow = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), isShow)
      .then(response => {
        resolve(response.data);

      }, err => {
        reject(err);
        Message.error(err.stack);
      })
  })
}


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