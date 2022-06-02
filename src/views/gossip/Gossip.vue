<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>说说</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <el-card style="border-radius:18px; padding:30px 50px">
    <AddGossip></AddGossip>
  </el-card>
  <br>
  <el-card style="border-radius:18px; padding:50px">
        <!-- 骨架 -->
    <el-skeleton style="width: 100%" :loading="listLoading" animated :count="4" >
      <template #template>
        <el-skeleton-item variant="text" style="width: 30%;height: 20px" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 40%" />
        <br><br>
      </template>
    </el-skeleton>
          <!-- 循环 -->
    <ul>
      <li class="gossip_item" v-for="(gossip, index) in list" :key="index">
        <p >
          <div class="gossip_author" style="margin-left: -40px">{{ gossip.author }}：</div>
          <br>
          <div v-html="gossip.text"></div>
          <br>
          <div class="span-right">{{ gossip.createdTime }}</div>
        </p>
        <el-divider />
      </li>
    </ul>
    <Pagination @change="getChange" @loadingchange="getLoarding" module="gossip" :pagesize="10"></Pagination>
  </el-card>
</template>

<script setup>
import AddGossip from "./AddGossip.vue";
import Pagination from "@/components/Pagination.vue";
import { ref } from "vue";
let listLoading = ref(true); //载入画面
let list = ref([]);

function getChange(val) {
  list.value = val;
}
function getLoarding(val) {
  listLoading.value = val;
}
</script>