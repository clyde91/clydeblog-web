// 后台建筑师详情
<template>
  <el-form label-width="120px" :model="data.form">
    <el-form-item label="建筑师姓名">
      <el-input v-model="data.form.name" />
    </el-form-item>
    <el-form-item label="国家">
      <el-input v-model="data.form.country" />
    </el-form-item>
    <el-form-item label="照片">
      <upload
        @getImageUrl="getImageUrl"
        api="architecture/architect/"
        :oldImageUrl="data.form.avatar"
      ></upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <Back>取消</Back>
    </el-form-item>
  </el-form>
</template>
<script setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import Ckeditor from "@/components/Ckeditor.vue";
import Back from "@/components/button/Back.vue";
import { ref, reactive, getCurrentInstance } from "vue";
import upload from "@/components/Upload.vue";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["getText"]);
const api = "architecture/architect";
let data = reactive({ form: { } });

if(proxy.$route.params.id!=undefined){getBlog();}

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
  data.form.avatar = url;
}


function onSubmit() {
  axios({
    method: "post",
    url: `/${api}/update`,
    data: data.form,
    // {
    // id: data.form.id,
    // title: data.form.title,
    // body: data.form.body,
    // createdTime: data.form.createdTime,
    // category_id: data.form.category.id,
    // },
  })
    .then((res) => {
      router.push(`/admin/${api}`); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
function onTest() {
  console.log(data.form);
}
</script>