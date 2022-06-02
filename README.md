# clydeblog

## 项目介绍
原本是建立在django基础上使用bootstrap框架的前端代码。学习vue后重新修改而成的一个博客网站前端。

### 项目演示

项目在线演示地址：[https://www.clydeblog.com/](https://www.clydeblog.com/)  

### 项目布局

``` lua
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 静态图片资源文件
├── components -- 通用组件封装
├── icons -- svg矢量图片文件
├── router -- vue-router路由配置
├── store -- vuex的状态管理
├── styles -- 全局css样式
├── utils -- 工具类
└── views -- 前端页面
    ├── home -- 首页
    ├── layout -- 通用页面加载框架
    ├── login -- 登录页
    ├── admin -- 后端模块页面
    ├── pms -- 商品模块页面
    └── sms -- 营销模块页面
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
