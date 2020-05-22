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
 