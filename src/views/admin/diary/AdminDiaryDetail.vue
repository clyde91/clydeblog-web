// 后台日志详情
<template>
  <el-form class="elform" :model="data.form" label-width="100px">
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
    <el-form-item label="正文">
      <Ckeditor @getText="getText" v-model:text="data.form.body"></Ckeditor>
    </el-form-item>
    <el-form-item label="是否隐私">
        <el-switch v-model="data.form.hidden" :active-value="true" :inactive-value="false" />
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
let api = "diary";
let data = reactive({
  form: {},
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