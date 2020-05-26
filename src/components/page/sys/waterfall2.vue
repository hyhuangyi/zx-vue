
<style  lang="scss" scoped>
* {
    margin: 0;
}
.container-water-fall {
    // padding: 0 28px;
    // width: 100vw;
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
        background-color:plum;
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
</style>
<template>
    <div class="container-water-fall">
        <!-- <h1 style="position: fixed;left: 0;top: 100px;font-style: 15px;color:blue;z-index: 1000;">{{loadstatus}}</h1> -->
        <div class="btn-group">
            <button @click="switchCol(4)">4column(列)</button>
            <button @click="switchCol(5)">5column(列)</button>
            <button @click="switchCol(6)">6column(列)</button>
            <button @click="reset">reset(重置)</button>
        </div>
        <waterfall :col="col" :data="data" @loadmore="getData">
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

        <div
            @click="getData"
            style="text-align:center;line-height:5rem;color:#836FFF"
            v-show="loadMore"
        >加载更多</div>
        <!-- 底部提示 -->
        <div style="text-align:center;line-height:1rem;color:grey;font-style:italic;font-size:12px;" v-show="msg">{{msg}}</div>
    </div>
</template>

<script>
/*
  注意:
  1.itemWidth需要与gutterWidth一起使用才会生效，否则会进行自适应宽度
  2.使用了waterfall的组件不允许使用scoped,否则样式会有问题
*/
export default {
    props: {
        title: String
    },
    data() {
        return {
            col: 3,
            group: 1,
            data: [],
            msg: '',
            loadMore: false,
            isbottom: false //判断是否到底
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
        //重置参数
        reset() {
            this.col = 3;
            this.group = 1;
            this.data = [];
            this.msg = '';
            this.isbottom = false;
            this.loadMore = false;
            this.getData();
        },
        switchCol(col) {
            this.col = col;
        },
        getData() {
            if (this.isbottom) {
                return;
            }
            this.$post('/waterfall2', { group: this.group }, true).then(res => {
                console.log(res);
                this.group++;
                if (res.length == 0) {
                    this.isbottom = true;
                    this.msg = '我也是有底线的';
                    this.loadMore = false;
                    return;
                }
                this.data = this.data.concat(res);
                //防止刷新/重置先显示出来
                setTimeout(() => {
                    this.loadMore = true;
                }, 1000);
            });
        }
    },

    mounted() {
        this.getData();
    }
};
</script>