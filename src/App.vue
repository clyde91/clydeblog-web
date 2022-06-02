<template>
  <router-view :key="$route.fullPath" />
</template>

<script setup>

import { onMounted } from 'vue'
 
onMounted(() => {
  document.body.style.setProperty('--el-color-primary', '#5B2AC9');
  // document.body.style.setProperty('--el-color-primary-light-9', '#F5FBF0');
  // document.body.style.setProperty('--el-color-primary-light-3', '#95d475');
})
</script>
