// 后台健康列表
<template>
  <router-link :to="{ name: 'admingossipadd' }">
    <el-button type="primary">添加说说</el-button>
  </router-link>
  <br /><br />
  <el-table :data="list" height="700" v-loading="listLoading" style="width: 100%">
    <el-table-column prop="id" label="Id" width="120" />
    <el-table-column prop="text" label="内容" width="700" />
    <el-table-column prop="createdTime" label="创建日期" />
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-button type="primary" size="small" @click="goto(scope.row.id)">
          编辑
        </el-button>
        <el-popconfirm title="是否确认删除？" @confirm="del(scope.row.id)">
          <template #reference>
            <el-button type="danger" size="small"> 删除 </el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <Pagination @change="getChange" @loadingchange="getLoarding" :module="api" :pagesize="15"></Pagination>
</template>

<script setup>
import Pagination from "@/components/Pagination.vue";
import { ref } from "vue";
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由

const api = "gossip";
let listLoading = ref(true); //载入画面
let list = ref([]);

function getChange(val) {
  list.value = val;
}
function getLoarding(val) {
  listLoading.value = val;
}
function goto(id) {
  router.push(`/admin/${api}/${id}`);
}
function del(id) {
  axios({
    method: "delete",
    url: `/${api}/del`,
    params: {
      id: id,
    },
  })
    .then((res) => {
      router.go(0); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
