//导入vue
import {
  createApp
} from 'vue';
import App from './App.vue'; //导入App.vue 根组件
import router from './router'; //导入路由
import axios from 'axios'; //引入axios
import VueAxios from 'vue-axios'; // 引入vue-axios
// import {
//   createStore
// } from 'vuex';

import ElementPlus from 'element-plus'; // 引入ElementPlus
import 'element-plus/dist/index.css';
import locale from "element-plus/lib/locale/lang/zh-cn"; //中文
import {
  createMetaManager
} from 'vue-meta';

import CKEditor from '@ckeditor/ckeditor5-vue';
// import "@ckeditor/ckeditor5-build-classic/build/translations/zh-cn.js";


const app = createApp(App); //创建Vue实例
app.use(router) //挂载路由模块
  .use(VueAxios, axios) //挂载axios模块
  .use(ElementPlus, {
    locale
  }) //挂载ElementPlus模块
  .use(CKEditor) //挂载CKEditor
// .use(store) //挂载Vuex

import hljs from 'highlight.js';//全局注册自定义指令 v-hljs用于代码高亮
app.directive('hljs', el => {
  let blocks = el.querySelectorAll('pre code');
  Array.prototype.forEach.call(blocks, hljs.highlightBlock);
});


const metaManager = createMetaManager(false, {
  meta: {
    tag: 'meta',
    nameless: true
  }
}); //挂载vue-meta模块
// app.use(createMetaManager());
app.use(metaManager)
// app.use(metaPlugin)

// axios.defaults.baseURL = 'http://5.188.37.126:8098' //配置axios网站根路径
// axios.defaults.baseURL = 'http://192.168.220.130:8098' //配置axios网站根路径
// axios.defaults.baseURL = 'http://localhost:8098' //配置axios网站根路径
// app.config.globalProperties.$axios = axios; //配置axios的全局引用

app.mount('#app'); //渲染到#app
export {
  metaManager,
} //很关键