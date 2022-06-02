// 后台博客详情
<template>
  <el-form class="elform" :model="data.form" label-width="100px">
    <el-form-item label="作者">
      <el-input v-model="data.form.author" />
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
    <el-form-item label="内容">
      <el-input v-model="data.form.text" type="textarea" :rows="2" />
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
let api = "gossip";
let data = reactive({
  form: {},
  // id: "",
  // weight: "",
  // recordDate: "",
});
if (proxy.$route.params.id != undefined) {
  getDetail();
}
function getDetail() {
  axios({
    method: "get",
    url: `/${api}/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.form = res.data.data;
      // form.id = res.data.data.id;
      // form.recordDate = res.data.data.recordDate;
      // form.weight = res.data.data.weight;
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