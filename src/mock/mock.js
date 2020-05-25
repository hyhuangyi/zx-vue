import globalApi from './../utils/globalApi';
import qs from 'qs';
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
function getImgsForWaterfallEasy(req) {
  let group = qs.parse(req.body).group;
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
  return arr.slice((group - 1) * 15, group * 15);
}

function getImgsForWaterfall2(req){
  let group = qs.parse(req.body).group;
  var arr=[
    {
      img:
        "https://image.watsons.com.cn//upload/8a316140.png?w=377&h=451&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "www",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/083767f0.JPG?w=828&h=620&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "952"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/02a4f38d.jpg?w=1067&h=1067&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/589585c1.jpeg?x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/d862d932.jpg?w=1080&h=1440&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/eb4fb58f.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title:
        "贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/415f984f.jpeg?w=828&h=1104&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/5c3e51e4.jpg?w=720&h=960&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/92761043.JPG?w=1000&h=999&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精123",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/da61c0f5.jpg?w=959&h=958&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/fcd68df4.jpg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/bef41e67.JPG?w=712&h=534&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/25ab20fe.JPG?w=1000&h=1200&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精123",
      like: "953"
    },
    {
      img:
        "https://ci.xiaohongshu.com/eb971d00-05ab-5b2a-ba03-52d8f544c42b?imageView2/2/w/400/q/50/format/jpg",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/4a3c1788.jpg?w=823&h=1000&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/0a89e6b7.jpg?w=1080&h=1920&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/99253111.jpg?w=1080&h=1920&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精123",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/13afe9a7.jpg?x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title:
        "贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试贵妇级好用的水乳有哪些呢？千万不要去乱尝试",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/98c7c4c3.jpg?w=1210&h=1210&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/54c5d7b4.jpg?w=828&h=991&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/71d19462.jpg?x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精123",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/642cb83c.jpeg?w=1080&h=1080&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/31e42833.jpg?w=750&h=750&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/92761043.JPG?w=1000&h=999&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/60cc9b8e.jpg?w=991&h=744&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "150元搞定全套护肤品，这些护肤好物必须交出来！",
      user: "迷人的小妖精迷人的小妖精123",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/b709ed72.jpg?w=552&h=414&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/137b50b0.jpg?x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "夏天用这款姨妈巾，让你体验真正的清爽",
      user: "迷人的小妖精迷人的小妖精",
      like: "952"
    },
    {
      img:
        "https://image.watsons.com.cn//upload/31e42833.jpg?w=750&h=750&x-oss-process=image/resize,w_1080",
      avatar:
        "https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg",
      title: "最近浴室新宠，日系神仙好物了解一下～",
      user: "迷人的小妖精迷人的小妖精",
      like: "953"
    }
  ];
  return arr.slice((group - 1) * 15, group * 15);
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(globalApi.baseURL + '/waterfall-easy', 'post', getImgsForWaterfallEasy); // 获取瀑布流图片
Mock.mock(globalApi.baseURL + '/waterfall2', 'post', getImgsForWaterfall2); // 获取瀑布流图片