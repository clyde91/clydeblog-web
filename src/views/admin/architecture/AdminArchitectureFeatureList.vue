// 后台建筑特点列表
<template>
  <router-link :to="{ name: 'adminarchitecturefeatureadd' }"
    ><el-button type="primary">添加建筑特点</el-button></router-link
  ><br /><br />
  <el-table :data="list" height="700" v-loading="listLoading" style="width: 100%">
    <el-table-column prop="id" label="Id" sortable width="120" />
    <el-table-column prop="name" label="特点" width="200" />
    <el-table-column prop="parentId" label="父分类" />
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
  <Pagination
    @change="getChange"
    @loadingchange="getLoarding"
    module="architecture/feature"
    :pagesize="15"
  />
</template>

<script setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import Pagination from "@/components/Pagination.vue";
import { ref } from "vue";
const api = "architecture/feature";

let listLoading = ref(true); //载入画面
let list = ref([]); //列表信息

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
