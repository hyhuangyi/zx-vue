import globalApi from './../utils/globalApi';
// 首先引入Mock
const Mock = require('mockjs');


// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
 Mock.setup({
    timeout: '200 - 400'
})
function getImgs(){
    const arr= [
        {
          "src": "./static/img/1.jpg",
          "href": "https://www.baidu.com",
          "info": "1"
        },
        {
          "src": "./static/img/2.jpg",
          "href": "https://www.baidu.com",
          "info": "2"
        },
        {
          "src": "./static/img/3.jpg",
          "href": "https://www.baidu.com",
          "info": "3"
        },
        {
          "src": "./static/img/4.jpg",
          "href": "https://www.baidu.com",
          "info": "4"
        },
        {
          "src": "./static/img/5.jpg",
          "href": "https://www.baidu.com",
          "info": "5"
        },
        {
          "src": "./static/img/6.jpg",
          "href": "https://www.baidu.com",
          "info": "6"
        },
        {
          "src": "./static/img/7.jpg",
          "href": "https://www.baidu.com",
          "info": "7"
        },
        {
          "src": "./static/img/8.jpg",
          "href": "https://www.baidu.com",
          "info": "8"
        },
        {
          "src": "./static/img/9.jpg",
          "href": "https://www.baidu.com",
          "info": "9"
        },
        {
          "src": "./static/img/10.jpg",
          "href": "https://www.baidu.com",
          "info": "10"
        },
        {
          "src": "./static/img/11.jpg",
          "href": "https://www.baidu.com",
          "info": "11"
        },
        {
          "src": "./static/img/12.jpg",
          "href": "https://www.baidu.com",
          "info": "12"
        },
        {
          "src": "./static/img/13.jpg",
          "href": "https://www.baidu.com",
          "info": "13"
        },
        {
          "src": "./static/img/14.jpg",
          "href": "https://www.baidu.com",
          "info": "14"
        },
        {
          "src": "./static/img/15.jpg",
          "href": "https://www.baidu.com",
          "info": "15"
        },
        {
          "src": "./static/img/16.jpg",
          "href": "https://www.baidu.com",
          "info": "16"
        },
        {
          "src": "./static/img/17.jpg",
          "href": "https://www.baidu.com",
          "info": "17"
        },
        {
          "src": "./static/img/18.jpg",
          "href": "https://www.baidu.com",
          "info": "18"
        },
        {
          "src": "./static/img/19.jpg",
          "href": "https://www.baidu.com",
          "info": "19"
        },
        {
          "src": "./static/img/20.jpg",
          "href": "https://www.baidu.com",
          "info": "20"
        }
      ];
    return arr;
}
 
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(globalApi.baseURL+'/imgs', 'get', getImgs); // 获取瀑布流图片