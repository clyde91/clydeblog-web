//返回上一页
<template>
  <el-button @click="back"><slot>返回</slot></el-button>
</template>
<script setup>
import router from '@/router'; //导入路由
let name = "Back";
function back() {
  router.go(-1);//后退不保存表单
}
</script>