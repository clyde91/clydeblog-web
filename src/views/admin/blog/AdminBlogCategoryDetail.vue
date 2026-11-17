// 后台博客分类详情
<template>
  <el-form class="elform" :model="data.form" label-width="100px">
    <el-form-item label="名称"> <el-input v-model="data.form.name" /> </el-form-item>
    <el-form-item label="父分类id"> <el-input v-model="data.form.parentId" /> </el-form-item>
    <el-form-item label="图标">
      <el-avatar shape="square" size="large" :src="data.form.logo" />
    </el-form-item>
    <el-form-item label="上传图片">
      <Upload @getImageUrl="getImageUrl" api="codeblog/category/"></Upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <Back>取消</Back>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { UserFilled } from "@element-plus/icons-vue";
import Upload from "@/components/Upload.vue";
import Ckeditor from "@/components/Ckeditor.vue";
import Back from "@/components/button/Back.vue";
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["getText"]);

let data = reactive({
form:{}
});
let api = "blog/category";

getBlog();

function getBlog() {
  axios({
    method: "get",
    url: `/${api}/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.form = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function getImageUrl(url) {
  data.form.logo = url;
}
function onSubmit() {
  axios({
    method: "post",
    url: `/${api}/update`,
    data:{}=data.form
  })
    .then((res) => {
      router.go(-1); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>