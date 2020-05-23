<template>
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
</template>
<script>
import vueWaterfallEasy from 'vue-waterfall-easy' //瀑布流
export default {
    name: 'app',
    components: {
        vueWaterfallEasy
    },
    data() {
        return {
            imgsArr: [],
            group: 0 // request param
        };
    },
    components: {
        vueWaterfallEasy
    },
    methods: {
        getData() {
           this.$get('/imgs',{},true)
            .then(res => {
              this.imgsArr =res;
              this.group++
            })
        }
    },
    created() {
        this.getData();
    }
};
</script>