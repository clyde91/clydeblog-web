<template>
  <el-aside :width="iscollapse ? `64px` : `250px`" >
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#666699"
      :default-active="route"
      text-color="#fff"
      router
      :collapse="iscollapse"
      style="height:840px"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><grid /></el-icon>
          <span>博客</span>
        </template>
        <el-menu-item index="/admin/blog/blog">文章</el-menu-item>
        <el-menu-item index="/admin/blog/category">分类</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><school /></el-icon>
          <span>建筑</span>
        </template>
        <el-menu-item index="/admin/architecture/architecture">
          建筑
        </el-menu-item>
        <el-menu-item index="/admin/architecture/architect">
          建筑师
        </el-menu-item>
        <el-menu-item index="/admin/architecture/feature">
          建筑特点
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/admin/gossip">
        <el-icon><chat-dot-round /></el-icon>
        <span>说说</span>
      </el-menu-item>
      <el-menu-item index="/admin/diary">
        <el-icon><document /></el-icon>
        <span>日志</span>
      </el-menu-item>
      <el-menu-item index="/admin/health">
        <el-icon><histogram /></el-icon>
        <span>体重</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script setup>
import {
  Document,
  Menu as IconMenu,
  Histogram,
  Grid,
  ChatDotRound,
  School,
} from "@element-plus/icons-vue";
import { ref, reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const route = ref(proxy.$route.path);
let iscollapse = ref(false);
function toggleCollapse() {
  iscollapse.value = !iscollapse.value;
}
</script>
<style scoped>
.toggle-button {
  /* // 添加背景颜色 */
  background-color: #4a5064;
  /* // 设置文本大小 */
  font-size: 10px;
  /* // 设置文本行高 */
  line-height: 30 px;
  /* // 设置文本颜色 */
  color: #fff;
  /* // 设置文本居中 */
  text-align: center;
  /* // 设置文本间距 */
  letter-spacing: 0.2em;
  /* // 设置鼠标悬浮变小手效果 */
  cursor: pointer;
}
</style>