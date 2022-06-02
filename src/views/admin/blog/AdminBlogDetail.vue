// 后台博客详情
<template>
  <el-form class="elform" label-width="100px" :model="data.form">
    <el-form-item label="标题">
      <el-input v-model="data.form.title" />
    </el-form-item>
    <el-form-item label="日期">
      <el-col :span="11">
        <el-date-picker
          v-model="data.form.createdTime"
          type="datetime"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="分类">
      <el-select
        v-model="data.form.category.id"
        class="m-2"
        placeholder="Select"
      >
        <el-option
          v-for="item in data.options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="正文" >
      <Ckeditor @getText="getText" v-model:text="data.form.body"></Ckeditor>
    </el-form-item>
    <el-form-item label="关键字">
      <el-input v-model="data.form.keywords" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="data.form.description" />
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
const { proxy } = getCurrentInstance();
const emit = defineEmits(["getText"]);
let data = reactive({ form: { category: {}, author: {} }, options: {} });

if(proxy.$route.params.id!=undefined){getBlog();}

getCategory();

function getBlog() {
  axios({
    method: "get",
    url: `/blog/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.form = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function getCategory() {
  axios({
    method: "get",
    url: `/blog/category`,
  })
    .then((res) => {
      data.options = res.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function getText(text) {
  data.form.body = text;
}
function onSubmit() {
  axios({
    method: "post",
    url: `/blog/update`,
    data: data.form,
  })
    .then((res) => {
      router.push("/admin/blog/blog"); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}

</script>
<style>
.elform{
  width: 1000px;
}
</style>