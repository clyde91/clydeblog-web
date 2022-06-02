<template>
  <template v-if="!isLogin">
    <li key="1">
      <router-link to="/login">登录</router-link>
    </li>
  </template>
  <template v-else>
  <li key="2">
    <el-dropdown class="dropdown">
      <el-avatar :src="`${user != null ? user.avatar : ''}`" size="small" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item
            ><router-link to="/admin">后台管理</router-link></el-dropdown-item
          >
          <el-dropdown-item @click="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </li>
 </template>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'
import router from '@/router'; //导入路由
let isLogin = ref(sessionStorage.isLogin);
let user = JSON.parse(sessionStorage.getItem("user"));
function logout() {
  sessionStorage.clear();
  user = null;
  console.log(isLogin);
  ElMessage.success("注销成功");
  router.go(0);
}
</script>
