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
function getImgs(req) {
  let group = qs.parse(req.body).group;
  // const arr= [
  //     {
  //       "src": "./static/img/1.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "1"
  //     },
  //     {
  //       "src": "./static/img/2.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "2"
  //     },
  //     {
  //       "src": "./static/img/3.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "3"
  //     },
  //     {
  //       "src": "./static/img/4.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "4"
  //     },
  //     {
  //       "src": "./static/img/5.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "5"
  //     },
  //     {
  //       "src": "./static/img/6.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "6"
  //     },
  //     {
  //       "src": "./static/img/7.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "7"
  //     },
  //     {
  //       "src": "./static/img/8.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "8"
  //     },
  //     {
  //       "src": "./static/img/9.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "9"
  //     },
  //     {
  //       "src": "./static/img/10.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "10"
  //     },
  //     {
  //       "src": "./static/img/11.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "11"
  //     },
  //     {
  //       "src": "./static/img/12.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "12"
  //     },
  //     {
  //       "src": "./static/img/13.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "13"
  //     },
  //     {
  //       "src": "./static/img/14.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "14"
  //     },
  //     {
  //       "src": "./static/img/15.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "15"
  //     },
  //     {
  //       "src": "./static/img/16.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "16"
  //     },
  //     {
  //       "src": "./static/img/17.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "17"
  //     },
  //     {
  //       "src": "./static/img/18.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "18"
  //     },
  //     {
  //       "src": "./static/img/19.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "19"
  //     },
  //     {
  //       "src": "./static/img/20.jpg",
  //       "href": "https://www.baidu.com",
  //       "info": "20"
  //     }
  //   ];
  //   const arr = [
  //     {
  //     "src": "./static/img/zx/default (1).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (2).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (3).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (4).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (5).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (6).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (7).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (8).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (9).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (10).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (11).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (12).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (13).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (14).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (15).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (16).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (17).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (18).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (19).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (20).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (21).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (22).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (23).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (24).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (25).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (26).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (27).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (28).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (29).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (30).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }, {
  //     "src": "./static/img/zx/default (31).jpeg",
  //     "href": "https://www.baidu.com",
  //     "info": "20"
  //   }
  // ];

  const arr = [
    {
      "src": "http://b220.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/5aoOdSQP5RT1bEV.QHhXJLdXW7GL6ZWV4YsXG9iw6rs!/b/dNwAAAAAAAAA&bo=OASgBQAAAAARB6k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b384.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/Gif.QU6dj4*3sutm7BoF7xHixSgl1ZIGNNFKN356Xg8!/b/dIABAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b388.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/m3GQLlfx.joSDfF6DqyFb0tWY9LCTvwixiOLiofM9q8!/b/dIQBAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b382.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/jGI9NhSFnWWKlFf73osJqBI4Su5bYSkR1ll*ff0qjjw!/b/dH4BAAAAAAAA&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b398.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/pD03uzfsmkpZqkrTSjSnWwDkL1wtAJAU*6DHKxB3aco!/b/dI4BAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b244.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/Aw.F68DGZszJmCWwB8NkxQV1Xszw39kmCyrMjEUrZkA!/b/dPQAAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b389.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/.CCwFJMBdZ6wxzc65dqPt3H9R0S*zfhBqeCCDbiy1DU!/b/dIUBAAAAAAAA&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b394.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/gSGTuH5GMVKsz*nIEh.827YtQynsuGyt4qXfDhsF83I!/b/dIoBAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b232.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/GznRZWYCBcnlmpCoL*WKadeAEzHBKRW5AIVEDGVO1Yk!/b/dOgAAAAAAAAA&bo=oAU4BAAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b221.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/Zmx6MqM51sv9PbJpcaK*bnCNANADsMsRrHlCiK4OfuM!/b/dN0AAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b378.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/QGdPv8JhYp4Oi*sZXjFa0ixeqvh613TdZ3NvABUB4bg!/b/dHoBAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b267.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/ri.2m0xRw3yN85uiJWSpEeJvsypYebbj0KXFk3MLc6g!/b/dAsBAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b398.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/UsmOiNQRZHiNo4oDz5iZCRKzfYi.41GGDasCFchrXWM!/b/dI4BAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b389.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/rCET2RAordm4l*.1uQcNamm5Wyibo7zA5mGvFZmmTxY!/b/dIUBAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b382.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/dTo8Rdb2IRL*sY4I3sT59GYgedEReVkp9mErgGsw3sA!/b/dH4BAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b244.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/jjo3aoFaoBmJoykT.lT*h1*G*VD7pZxdLSW0wLXnH5A!/b/dPQAAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b244.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/xDXKn4j4OUikRgrMcfD*kQAR0eySqnGiiMWZ66B3rio!/b/dPQAAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b244.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/Y4InYrlLlgPoa5y3bf7tLm0OHfMMI*NaCY9MuXAmjTA!/b/dPQAAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b244.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/HJYICoEfiGrFEMhOxw.oVyInktRl0lx0NrwT7bCgvk4!/b/dPQAAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b266.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/qL58MyHPqvoJ1geMoWIt6UMFt8PZ6ebYJTdfkzah51w!/b/dAoBAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b230.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/bGR.y63PVzYqKCQh2ac7guMa0*QyBhwINygUYc*k9C8!/b/dOYAAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b231.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/T.IZUALd9j*8uexTgOAxUu1600i6p1dB.Gu4vJMi4KQ!/b/dOcAAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b384.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/BPt8W31q1Opw2Yffw9T*At40Y46zop.owkXFfaRPRi0!/b/dIABAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b222.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/TmExG6TqizgQ5BI0qxhEQgrSVvI3bebKHPy8axQFp.g!/b/dN4AAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b389.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/zsJHfAasQMg4ZTs5ML1*ahdavfk2i*iYmki5kD.9y5c!/b/dIUBAAAAAAAA&bo=oAU4BAAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b364.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/nDjUrLHF5W9jR.qdKIKwLhI*1RJbR3P2UFUEWv5rnPI!/b/dGwBAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b364.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/z0TC3VBxovrsDVMiuBj8gzVOW7kNZylzQEst6wFnaS0!/b/dGwBAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b398.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/4J89kEyE7n.ViTjjk3YmCMKpHwZSAd*UnV.3N.qrD6E!/b/dI4BAAAAAAAA&bo=OASgBQAAAAARJ4k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }, {
      "src": "http://b222.photo.store.qq.com/psb?/sa14V10ZZCCb3WYtrG3270524ed3b4d9f0592b0cffb260c0c25414V14Mewfa4CL0gi/fwYvt4ks0oWKquFvvLjaISmJw9S5FIFpH4Gb9T2e7YI!/b/dN4AAAAAAAAA&bo=OASgBQAAAAARF7k!&rf=viewer_4&t=5",
      "href": "https://www.baidu.com",
      "info": "20"
    }
  ];
  return arr.slice((group - 1) * 10, group * 10);
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(globalApi.baseURL + '/imgs', 'post', getImgs); // 获取瀑布流图片