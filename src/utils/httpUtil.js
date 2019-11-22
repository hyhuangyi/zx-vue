import axios from 'axios';
import qs from 'qs';
import globalApi from './globalApi';
import { Message } from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL =globalApi.baseURL;

// axios.defaults.headers = {
//"content-type": "application/json",           // 设置传输类型(json,form表单)
// }

// //http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     const token = getCookie('名称'); //注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/json',
//       'Access-Control-Allow-Origin': '*'
//     }
//     // if(token){
//     //   config.params = {'token':token}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );


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

export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
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
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,qs.stringify(data))
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err);
            Message.error(err.stack);
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function Delete(url,params={}){
  return new Promise((resolve,reject) => {
    axios.delete(url,{
      params:params
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
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,qs.stringify(data))
         .then(response => {
           resolve(response.data);
         },err => {
            reject(err);
            Message.error(err.stack);
         })
  })
} 