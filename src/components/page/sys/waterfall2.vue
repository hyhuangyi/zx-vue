
<style  lang="scss" scoped>
* {
    margin: 0;
}
.container-water-fall {
    // padding: 0 28px;
    width: 100vw;
    box-sizing: border-box;
    h4 {
        padding-top: 56px;
        padding-bottom: 28px;
        font-family: PingFangSC-Medium;
        font-size: 36px;
        color: #000000;
        letter-spacing: 1px;
        text-align: justify;
    }
    button {
        background-color:hotpink;
        color: #24292e;
        border: 1px solid rgba(27, 31, 35, 0.2);
        border-radius: 0.25em;
        width: 100px;
        line-height: 26px;
        font-size: 13px;
        margin: 4px 0;
        margin-right: 4px;
        cursor: pointer;
        outline: none;
        &.blue-light {
            background: #27fbc2;
        }
    }
    button:hover {
        background-image: linear-gradient(-180deg, #fafbfc, #ccc 90%);
    }

    .cell-item {
        width: 100%;
        // margin-bottom: 18px;
        background: #ffffff;
        border: 2px solid #f0f0f0;
        border-radius: 12px 12px 12px 12px;
        overflow: hidden;
        box-sizing: border-box;
        img {
            // border-radius: 12px 12px 0 0;
            width: 100%;
            height: auto;
            display: block;
        }
        .item-body {
            // border: 1px solid #F0F0F0;
            padding: 12px;
            .item-desc {
                font-size: 15px;
                color: #333333;
                line-height: 15px;
                font-weight: bold;
            }
            .item-footer {
                margin-top: 22px;
                position: relative;
                display: flex;
                align-items: center;
                .avatar {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background-repeat: no-repeat;
                    background-size: contain;
                }
                .name {
                    max-width: 150px;
                    margin-left: 10px;
                    font-size: 14px;
                    color: #999999;
                }
                .like {
                    position: absolute;
                    right: 0;
                    display: flex;
                    align-items: center;
                    &.active {
                        i {
                        }
                        .like-total {
                            color: #ff4479;
                        }
                    }
                    i {
                        width: 28px;
                        display: block;
                    }
                    .like-total {
                        margin-left: 10px;
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
        }
    }
}
.githubdata {
    float: right;
    margin-right: 90px;
    img {
        width: 14px;
        // height: 16px;
    }
}
</style>
<template>
    <div class="container-water-fall">
        <!-- <h1 style="position: fixed;left: 0;top: 100px;font-style: 15px;color:blue;z-index: 1000;">{{loadstatus}}</h1> -->
        <div class="btn-group">
            <button @click="loadmore">LoadMore</button>
            <button @click="switchCol(3)">3column(列)</button>
            <button @click="switchCol(4)">4column(列)</button>
            <button @click="switchCol(5)">5column(列)</button>
            <button @click="reset">reset(重置)</button>
        </div>
        <waterfall :col="col" :data="data" @loadmore="loadmore">
            <template>
                <div class="cell-item" v-for="(item,index) in data" :key="index">
                    <img v-if="item.img" :src="item.img" alt="加载错误" />
                    <div class="item-body">
                        <div class="item-desc">{{item.title}}</div>
                        <div class="item-footer">
                            <div
                                v-if="item.avatar"
                                class="avatar"
                                :style="{backgroundImage : `url(${item.avatar})` }"
                            ></div>
                            <div class="name">{{item.user}}</div>
                            <div class="like" :class="item.liked?'active':''">
                                <i></i>
                                <div class="like-total">{{item.like}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </waterfall>
        <loading :show="loading" />
    </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
import loading from './load';
export default {
    props: {
        title: String
    },
    components: {
        loading
    },
    data() {
        return {
            data: [],
            col: 3,
            loading: false,
            gitHubData: {},
            originData: [
                {
                    img: './static/img/zx/default (1).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (2).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (3).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (4).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (5).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (6).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (7).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (8).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (9).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (10).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (11).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (12).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (13).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (14).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (15).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (16).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (17).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (18).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (19).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (20).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (21).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (22).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (23).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (24).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (25).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (26).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (27).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (28).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (29).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (30).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }, {
                    img: './static/img/zx/default (31).jpeg',
                    avatar: 'https://img.xiaohongshu.com/avatar/5b7d198a7e6e15000155f7c9.jpg@80w_80h_90q_1e_1c_1x.jpg',
                    title: '最近浴室新宠，日系神仙好物了解一下～',
                    user: 'www',
                    like: '953'
                }
            ]
        };
    },
    computed: {
        itemWidth() {
            return 133 * 0.5 * (document.documentElement.clientWidth / 375);
        },
        gutterWidth() {
            return 10 * 0.5 * (document.documentElement.clientWidth / 375);
        }
    },
    methods: {
        reset() {
            this.data = [];
        },
        switchCol(col) {
            this.col = col;
        },
        loadmore() {
            this.loading = true;
            setTimeout(() => {
                this.data = this.data.concat(this.originData, this.originData);
                this.loading = false;
            }, 1000);
        }
    },
    mounted() {
        this.data = this.originData;
    }
};
</script>