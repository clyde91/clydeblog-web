<template>
  <div>
    <template v-if="isLogin">
      <!-- <label for="exampleFormControlTextarea1">
        {{ user.username }},已登录。
      </label> -->
    </template>
    <template v-else>
      <label for="exampleFormControlTextarea1"> 目前以guest的身份发表。 </label>
      <router-link to="/login"><el-button>登录</el-button></router-link>
      <hr />
    </template>
  </div>
  <el-form :model="form" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="form.author" v-if="isLogin" disabled placeholder="" />
      <el-input v-model="form.author" v-else placeholder="" />
    </el-form-item>
    <el-form-item label="内容" prop="text">
      <el-input v-model="form.text" type="textarea" :rows="3" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">发布</el-button>
    </el-form-item>
  </el-form>
</template>

<script  setup>
import { ref, reactive } from "vue";
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import { ElMessage } from "element-plus";
let isLogin = ref(sessionStorage.isLogin);
let user = JSON.parse(sessionStorage.getItem("user"));
let form = reactive({
  author: "",
  text: "",
});
form.author = isLogin.value == `true` ? user.username : "guest";
const onSubmit = () => {
  if (form.text == "") {
    ElMessage({
      message: "内容不能为空",
      type: "error",
    });
    return;
  }
  axios({
    method: "post",
    url: `/gossip/add`,
    data: form,
  })
    .then((res) => {
      router.go(0); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
