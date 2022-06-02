<template>
</template>
<script setup>
import { ref,reactive, getCurrentInstance } from "vue";
let { proxy } = getCurrentInstance();
let api = proxy.$route.path;
console.log(api);
</script>
