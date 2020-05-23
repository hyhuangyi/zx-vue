<template>
    <vue-waterfall-easy ref="waterfall" :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
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
            group: 0 // 当前加载的加载图片的次数
        };
    },
    components: {
        vueWaterfallEasy
    },
    methods: {
        getData() {
            this.$get('/imgs', {}, true).then(res => {
                this.group++;
                if (this.group === 4) {
                    // 模拟已经无新数据，显示 slot="waterfall-over"
                    this.$refs.waterfall.waterfallOver();
                    return;
                }
                this.imgsArr = res;
            });
        }
    },
    created() {
        this.getData();
    }
};
</script>