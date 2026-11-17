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

### OSS 图片上传

普通图片和 CKEditor 图片共用 `src/api/oss.js`，先请求 `GET /oss/policy?api=业务目录`，再以签名表单直接上传 OSS。前端不保存长期 AccessKey Secret。

签名接口继续兼容现有返回格式：

```json
{
  "code": 200,
  "data": {
    "host": "https://your-bucket.oss-cn-shanghai.aliyuncs.com",
    "dir": "media/blog/draft/",
    "accessKeyId": "签名使用的 AccessKey ID",
    "policy": "Base64 编码的上传策略",
    "signature": "后端生成的签名"
  }
}
```

后端可额外返回 `key` 指定完整对象名；未返回时，前端在 `dir` 下生成随机文件名，避免同名覆盖。`dir` 应包含结尾的 `/`。使用 STS 签名时，可返回 `securityToken`，前端将其作为 `x-oss-security-token` 表单字段提交。图片上限为 10 MiB；私有对象的访问地址需由后端另行签发。

部署前需要在后端校验上传权限、限制目录和文件大小、设置较短的签名有效期，并在 OSS 配置网站来源的 CORS。前端大小和类型校验仅用于交互提示，不能替代服务端限制。后端长期密钥应存于服务器环境变量或受保护配置中，不得通过接口返回。

如果旧密钥曾被打包或发布，应在阿里云侧停用或轮换，同时替换旧构建文件、清理相关缓存；仅修改源码不会让旧密钥失效。

运行上传回归检查：

```sh
npm run test:upload
```
