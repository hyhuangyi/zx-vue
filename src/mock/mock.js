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
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179884&di=d1d6896a688cc2de6408c24750e3b0f9&imgtype=0&src=http%3A%2F%2Fi3.bbs.fd.zol-img.com.cn%2Fg5%2FM00%2F06%2F0C%2FChMkJ1m1meyIEB8pAAh0T-1HNigAAgWKwM0NiQACHRn909.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2192316936,131704123&fm=26&gp=0.jpgg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1143438203,2101264949&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2213244297,14939061&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3266171808,3775387722&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=178acd35ad3108da87acfedc5781de54&imgtype=0&src=http%3A%2F%2Fimage3.cnpp.cn%2Fupload%2Fimages%2F20180515%2F11494176405_1200x800.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=87243d27c07d0e4442a9902801c2ae53&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F0e2442a7d933c895f7116ee6d01373f08202003b.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=f45ac5bcb987d66b3d8f4b7dd7a1e0e4&imgtype=0&src=http%3A%2F%2Fwww.cnarts.net%2Fuploadimages%2Fcweb%2Fservice%2Fysbz%2Fwallpaper%2F2013-10-29%2F20131029154057.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=72ccba639b07320b0eab56538cbf9dbe&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F0%2F586e154595341.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=ee6a071b36590685d06719d95b5615a2&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fe4dde71190ef76c6c4e1e62a9d16fdfaaf5167fb.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=5138c387777527247d47bb959815ce3d&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20190506%2F13%2F1557120483-rgJbtiDoZj.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179882&di=821cc67add5d537ff2a6c31a41844c8d&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F57a2ea7d8528a.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2677956604,1956114454&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3727988810,1718830361&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397445437&di=7309acd4b515039a419eb05810573937&imgtype=0&src=http%3A%2F%2Fimg2.imgtn.bdimg.com%2Fit%2Fu%3D1032090787%2C3027113824%26fm%3D214%26gp%3D0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179881&di=86f5ca8908eb6c0e64dd1b9629d4ac3e&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165620x7cknad7vruvec1z.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179881&di=c7d9559e23766d21f3102ab2bcf77d39&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-29%2F5a1e130e127ef.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397480554&di=4372446df04ef91f8f04d3300355ebca&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2162350810%2C1376544716%26fm%3D214%26gp%3D0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179875&di=901e9a102d0bafc4add6299acea7ec88&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fe%2F57e88e535ec12.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179875&di=b5aaee2e322a4c2cf2b89ab9e217fefb&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201411%2F20%2F145145w5u4504gu4th7g0z.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397515995&di=880912891180b15fb6b7d67d99a84f32&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-12%2F5b47466f22d18.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179875&di=81a2771bc2d9a64eab2a14bdcd9ff09a&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190508%2F18%2F1557310281-uADByfZaFU.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179874&di=17a2da8b8734ae0450fa7bb93888408d&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20191203%2F16%2F1575360970-tymRzKqjPJ.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179874&di=930b162103d13e145e07c611944257a2&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F57a3ee32a91e5.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179874&di=4494a58c0dc9b7606890deaf3f48ce07&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20190730%2F22%2F1564496908-GgIZBhXQnM.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397592754&di=4638202bdf5b061710956d0b3c9141a0&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3485739298%2C1441935116%26fm%3D214%26gp%3D0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397179872&di=6d3cf06bb4fc29d8eaf93deaa7a6999f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-07-12%2F5b4746707a89c.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397515416&di=5894c2f44d0deedd2c0935c89cfa03ef&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-08-16%2F5b750e453a879.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590397515416&di=1ad2473c7bff03e71001528a79340e9e&imgtype=0&src=http%3A%2F%2Fimg.ewebweb.com%2Fuploads%2F20191006%2F20%2F1570364729-oWFwEyjagP.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=350409649,190622771&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }, {
    "src": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=278960241,2975037047&fm=26&gp=0.jpg",
    "href": "https://www.baidu.com",
    "info": "20"
  }
];
  return arr.slice((group - 1) * 20, group * 20);
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock(globalApi.baseURL + '/imgs', 'post', getImgs); // 获取瀑布流图片