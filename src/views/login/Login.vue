<template>
  <br /><br />
  <el-card style="border-radius: 18px">
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <router-link to="/register"><el-button>注册</el-button></router-link>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script  setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import { ElMessage } from "element-plus"; //导入消息
import { reactive } from "vue";
const form = reactive({
  username: "",
  password: "",
});

function login() {
  axios({
    method: "post",
    url: "/login",
    params: { username: form.username, password: form.password },
  })
    .then((res) => {
      if (res.data.code !== 200) return ElMessage.error("登录失败");
      ElMessage.success("登录成功");
      // 设置Vuex登录标志位true， 默认userLogin位false
      // this.$store.dispatch("userLogin", true);
      // Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5存储，我们设置一个名为Flag，职位isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了
      sessionStorage.isLogin = true;
      sessionStorage.user = JSON.stringify(res.data.data);
      //返回登录前页面
      // router.go(-1);
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>