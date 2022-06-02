const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, //编译依赖
  // 部署应用时的基本 URL
  // 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath
  // 基本路径,相对路径  或其他别名
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",    //三元运算。等于production时赋值'/'
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === "production" ? "https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/" : "/",
  // publicPath: "https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/",
  // 输出文件目录
  outputDir: 'dist',


  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  // devServer: {
  //   proxy: ''
  // },
  configureWebpack: {
    // 打包忽略文件
    externals: {
      "vue": "Vue",
      "vue-router": "VueRouter",
      "axios": "axios",
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      // chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: {
        css: [
          // 'https://cdn.staticfile.org/element-plus/2.1.11/index.min.css',
          // '//cdn.jsdelivr.net/npm/element-plus/dist/index.css',
          'https://cdn.staticfile.org/bootstrap/4.6.1/css/bootstrap.min.css',
          'https://cdn.staticfile.org/hover.css/2.3.1/css/hover-min.css',
          'https://cdn.staticfile.org/ionicons/2.0.0/css/ionicons.min.css',
          'https://cdn.staticfile.org/boxicons/2.1.2/css/boxicons.min.css',
          'https://cdn.staticfile.org/venobox/1.9.3/venobox.min.css',
          // 'https://cdn.staticfile.org/highlight.js/11.5.1/styles/default.min.css'
        ],
        js: [

          // 'https://cdn.staticfile.org/vue/3.2.13/vue.runtime.global.min.js',
          // 'https://cdn.staticfile.org/vue-router/4.0.3/vue-router.global.min.js',
          'https://cdn.staticfile.org/vue/3.2.13/vue.runtime.global.prod.min.js',
          'https://cdn.staticfile.org/vue-router/4.0.3/vue-router.global.prod.min.js',


          'https://cdn.staticfile.org/axios/0.27.2/axios.min.js',
          'https://cdn.staticfile.org/vue-meta/3.0.0-alpha.10/vue-meta.global.min.js',
          'https://cdn.staticfile.org/jquery/3.5.1/jquery.min.js',
          'https://cdn.staticfile.org/bootstrap/5.1.3/js/bootstrap.bundle.min.js',
          'https://cdn.staticfile.org/jquery-easing/1.4.1/jquery.easing.min.js',
          'https://cdn.staticfile.org/validate.js/0.9.0/validate.js',

          'https://cdn.staticfile.org/jquery.isotope/3.0.6/isotope.pkgd.min.js',
          'https://cdn.staticfile.org/jquery.sticky/1.0.4/jquery.sticky.min.js',
          'https://cdn.staticfile.org/venobox/1.9.3/venobox.min.js',
          // 'https://cdn.staticfile.org/highlight.js/11.5.1/highlight.min.js'
        ]
      },
    }
  }
})