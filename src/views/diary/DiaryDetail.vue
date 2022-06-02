// 博客详情
<template>
  <!-- 添加seo信息
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo> -->
  <br>
  <el-card v-loading="loading" style="border-radius:18px; padding:30px">
      <div class="journal-txt">
        <h3>
          <a href="">{{ data.article.title }}</a>
        </h3>
      </div>
      <div class="post-meta">
        <ul class="list-unstyled mb-0">
          <li class="author">
            作者：clyde
          </li>
          <li class="date">
            发表日期：{{ data.article.createdTime }}
          </li>
        </ul>
        
      </div>
      <el-divider style="margin-top:0px"/>  
      <p class="mb-30">
        <div v-html="data.article.body"></div>
      </p>
  </el-card>
</template>

<script setup>
import { useMeta } from "vue-meta";
import { metaManager } from "@/main.js";
import { ref, reactive, getCurrentInstance } from "vue";
import axios from '@/utils/axios'//导入axios
let { proxy } = getCurrentInstance();
let data = reactive({
  article: "",
});
let loading = ref(true); //载入画面

getBlog();

function getBlog() {
axios({
      method: "get",
      url: `/diary/${proxy.$route.params.id}`,
    })
    .then((res) => {
      data.article = res.data.data;
      // rend();
      loading.value=false
    })
    .catch((error) => {
      console.log(error);
    });
}

// function rend() {
//   useMeta(
//     {
//       title: data.article.title,
//     },
//     metaManager
//   );
// }
</script>