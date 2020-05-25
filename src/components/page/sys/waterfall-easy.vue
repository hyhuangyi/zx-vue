<template>
    <vue-waterfall-easy
        ref="waterfall"
        :imgsArr="imgsArr"
        @scrollReachBottom="getData"
        @click="clickFn"
    ></vue-waterfall-easy>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy'; //瀑布流
export default {
    name: 'app',
    components: {
        vueWaterfallEasy
    },
    data() {
        return {
            imgsArr: [],
            group: 1 // 当前加载的加载图片的次数
        };
    },
    components: {
        vueWaterfallEasy
    },
    methods: {
        getData() {
            this.$post('/imgs', { group: this.group }, true).then(res => {
                console.log(res);
                this.group++;
                if (res.length == 0) {
                    // 模拟已经无新数据，显示 slot="waterfall-over"
                    this.$refs.waterfall.waterfallOver();
                    return;
                }
                this.imgsArr = this.imgsArr.concat(res);
            });
        },
        //点击事件
        clickFn(event, { index, value }) {
            // 阻止a标签跳转
            event.preventDefault();
            // 只有当点击到图片时才进行操作
            if (event.target.tagName.toLowerCase() == 'img') {
                console.log('img clicked', index, value);
            }
        }
    },
    created() {
        this.getData();
    }
};
</script>