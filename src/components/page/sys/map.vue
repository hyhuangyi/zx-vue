<template>
    <div id="app">
        <el-amap-search-box
            class="search-box"
            :search-option="searchOption"
            :on-search-result="onSearchResult"
        ></el-amap-search-box>
        <div class="amap-wrapper">
            <el-amap class="amap-box" :center="mapCenter" :plugin="plugin" :vid="'amap-vue'">
                <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker>
            </el-amap>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            plugin: [
                {
                    pName: 'MapType',
                    defaultType: 0,
                    events: {
                        init(instance) {
                            // console.log(instance);
                        }
                    }
                }
            ],
            markers: [[120.1352036, 30.2413431]],
            searchOption: {
                city: '杭州',
                citylimit: false
            },
            mapCenter: [120.1352036, 30.2413431]
        };
    },
    methods: {
        addMarker: function() {
            let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
            let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
            this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
            let latSum = 0;
            let lngSum = 0;
            if (pois.length > 0) {
                pois.forEach(poi => {
                    let { lng, lat } = poi;
                    lngSum += lng;
                    latSum += lat;
                    this.markers = [];
                    this.markers.push([poi.lng, poi.lat]);
                });
                let center = {
                    lng: lngSum / pois.length,
                    lat: latSum / pois.length
                };
                this.mapCenter = [center.lng, center.lat];
            }
        }
    }
};
</script>

<style>
.search-box {
    position: absolute;
    top: 12%;
    left: 8%;
}
.amap-wrapper {
    width: 88%;
    height: 90%;
    margin: 0 auto;
    margin-top: 10px;
    border: 1px solid green;
}
</style>