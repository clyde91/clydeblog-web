// 后台建筑特点详情
<template>
  <el-form label-width="120px" :model="data.form">
    <el-form-item label="特点">
      <el-input v-model="data.form.name" />
    </el-form-item>
    <el-form-item label="父分类">
      <el-select v-model="data.form.parentId"  placeholder="Select" size="large">
        <el-option
          v-for="item in data.options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
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
const api = "architecture/feature";
let data = reactive({ form: {}, options: [] });

if (proxy.$route.params.id != undefined) {
  getBlog();
}
getFatherFeature();

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
function getFatherFeature() {
  axios({
    method: "get",
    url: `/${api}/father`,
  })
    .then((res) => {
      data.options = res.data.data;
      data.options.splice(0, 0, { id: 0, name: "顶级分类" });
      console.log(data.options)
    })
    .catch((error) => {
      console.log(error);
    });
}

function onSubmit() {
  axios({
    method: "post",
    url: `/${api}/update`,
    data: data.form,
  })
    .then((res) => {
      router.push(`/admin/${api}`); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>