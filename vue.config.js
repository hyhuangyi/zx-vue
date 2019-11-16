module.exports = {
    baseUrl: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        open: true,
        host: 'localhost',
        port: 8088,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        // before: app => {}
      }
}