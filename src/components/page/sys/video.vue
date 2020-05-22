<template>
    <div class="video">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>
    </div>
</template>

<script>
export default {
    name: 'BusImg',
    data() {
        return {
            // 视频播放
            playerOptions: {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        type: '',
                        src: 'https://vdept.bdstatic.com/356e74584533766b464a7a41757a6a44/6e7a393847343265/f709ba8a82d3abf5a2f63f53301b8c46cfc1a52e72bea843fc9bbe082cb9c763a5e2e5bddd6187ee630a7dd5e12edbf9dc7ed7a1c5246c7d2d396f7d78068afd.mp4?auth_key=1590172193-0-0-b4e6c8c809af4159e7b9e348e3cbe0c5' //url地址
                        // src:'https://apd-bd3bce43a6617c6e3bef8ec349de7635.v.smtcdns.com/om.tc.qq.com/Ak6M-7uyKUsbX3EDyGXdqVUmu0Vk3zCcPfL2SD-YQzX8/uwMROfz2r5zCIaQXGdGnC2dfDmavB6NbsWKJAiRTQBPbT70a/b0351k14z90.mp4?sdtfrom=v1010&amp;guid=f5c61c8cc67e330d64cb25494ae2258b&amp;vkey=12A1BB6A64A957C246883854FC957BE94B549CA93A792D336F1B3F5B180EBAF0C6953BDEB992F794EC95ED031350F183996CEC3B40D00B48E548B8B6CD35799E294FB360922AA90A367FAE5914C72CC8B62746B9AAEE164312311CBBD49F849CBDDBD4D32B5F0B0A6267F91435025DDAEC197F331C678E1A41619713D1262A74';
                    }
                ],
                poster: 'http://5b0988e595225.cdn.sohucs.com/images/20180211/628567caf18c40feb492467a80e3c795.jpeg', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,
                    durationDisplay: true,
                    remainingTimeDisplay: false,
                    fullscreenToggle: true //全屏按钮
                }
            }
        };
    }
};
</script>

<style scoped>
.video {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    margin-top: 10px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #fff;
}
</style>
 