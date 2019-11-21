module.exports = {
    baseUrl: './',
    assetsDir: 'assets',
    productionSourceMap: false,
    outputDir: 'dist',
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 8087,
        https: false,
        hotOnly: false,
        // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
        proxy: null, // string | Object
        // before: app => {}
      }
}