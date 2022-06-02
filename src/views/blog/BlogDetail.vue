// 博客详情
<template>
  <!-- 添加seo信息 -->
  <metainfo>
    <template v-slot:title="{ content }">{{ content }}</template>
  </metainfo>
  <br />
  <el-card style="border-radius: 18px; padding: 30px">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="text" style="width: 80%; height: 30px" />
        <br /><br />
      </template>
    </el-skeleton>
    <div class="journal-txt">
      <h3>
        <a href="">{{ data.article.title }}</a>
      </h3>
    </div>
    <div class="post-meta">
      <ul class="list-unstyled mb-0">
        <li class="author">作者：{{ data.article.author.username }}</li>
        <li class="">分类：{{ data.article.category.name }}</li>
        <li class="date">发表日期：{{ data.article.createdTime }}</li>
      </ul>
      <el-divider style="margin-top: 0px" />
      <!-- 骨架 -->
      <el-skeleton style="width: 100%" animated :count="8" :loading="loading"> </el-skeleton>
    </div>
    <p class="mb-30">
      <div v-html="data.article.body" v-hljs></div>
    </p>
  </el-card>
</template>

<script setup>
import hljs from "highlight.js"; //引入highlight
import "highlight.js/styles/xcode.css";

import { useMeta } from "vue-meta";
import { metaManager } from "@/main.js";
import axios from "@/utils/axios"; //导入axios
import { ref, reactive, getCurrentInstance } from "vue";
let { proxy } = getCurrentInstance();
// let api = proxy.$route.path.replace("_", "").split("/")[1];
let api = "blog";
let loading = ref(true); //载入画面
let data = reactive({
  article: {
    author: "",
    category: "",
  },
});

getBlog();

function getBlog() {
  axios({
    method: "get",
    url: `/${api}/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.article = res.data.data;
      loading.value = false;
      rend();
    })
    .catch((error) => {
      console.log(error);
    });
}

function rend() {
  useMeta(
    {
      title: data.article.title,
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
      meta: [
        { name: "keywords", content: data.article.keywords },
        { name: "description", content: data.article.description },
      ],
    },
    metaManager
  );
}
</script>