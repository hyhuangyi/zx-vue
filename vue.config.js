module.exports = {
    baseUrl: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        open: true,//启动项目后自动开启浏览器
        host: '0.0.0.0',//ip
        port: 8087,//端口号
        https: false,//是否开启协议名,如果开启会发出警告
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        // before: app => {}
      }
}