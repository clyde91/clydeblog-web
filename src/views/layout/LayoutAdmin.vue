<template>
  <el-container>
    <el-header height="90px">
      <div class="admin_logo">
        <router-link to="/">
          <img
            src="https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/logo-nav.png"
            alt="logo"
          />
        </router-link>
      </div>
      <div class="user"><User></User></div>
    </el-header>
    <el-container>
      <Sidebar></Sidebar>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import User from "@/components/User.vue";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import Footerbar from "./components/Footerbar.vue";
import AppMain from "./components/AppMain.vue";
import Backtop from "@/components/Backtop";
</script>
<style scoped>
:deep(.el-header) {
  padding: 0 !important;
  background-color: #342c45;
  height: 70px;
}
.admin_logo {
  padding-left: 20px;
  padding-top: 10px;
}
.user {
  position: relative;
  float: right;
  top: -35px;
  right: 40px;
}
</style>