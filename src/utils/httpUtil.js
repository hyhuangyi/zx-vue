import axios from 'axios';
import qs from 'qs';
import globalApi from './globalApi';
import { Message } from 'element-ui';
import { Loading } from 'element-ui'

axios.defaults.timeout = 5000;
axios.defaults.baseURL =globalApi.baseURL;
//设置传输类型(json,form表单)
axios.defaults.headers = {
// "content-type": "application/json"         
"content-type": "application/x-www-form-urlencoded"        
}
// axios.defaults.withCredentials = true

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
      'Authorization':localStorage.getItem('token')
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


// //http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/managment",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url,isLoad,params={}){
  return new Promise((resolve,reject) => {
    if(isLoad){
      showFullScreenLoading();
    }
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
      if(isLoad){
        tryHideFullScreenLoading();
      }
    })
    .catch(err => {
      reject(err);
      if(isLoad){
        tryHideFullScreenLoading();
      }
      Message.error(err.stack);
    })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 export function post(url,isLoad,data = {}){
   return new Promise((resolve,reject) => {
    if(isLoad){
      showFullScreenLoading();
    }
     axios.post(url,qs.stringify(data))
          .then(response => {
            resolve(response.data);
            if(isLoad){
              tryHideFullScreenLoading();
            }
          },err => {
            reject(err);
            if(isLoad){
              tryHideFullScreenLoading();
            }
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
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
//关闭
function endLoading() {
  loading.close()
}