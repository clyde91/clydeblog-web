// 后台博客分类列表
<template>
  <router-link :to="{ name: 'adminblogcategoryadd' }"
    ><el-button type="primary">添加分类</el-button></router-link
  ><br /><br />
  <el-table :data="list" height="700" style="width: 100%">
    <el-table-column prop="id" label="Id" width="120" />
    <el-table-column prop="name" label="分类名称" width="200" />
    <el-table-column prop="parentId" label="父分类ID" width="100" />
    <el-table-column prop="logo" label="logo地址" />
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
  <!-- <Pagination @change="getChange" module="blog/category" :pagesize="10" ></Pagination> -->
</template>

<script setup>
import axios from '@/utils/axios'//导入axios
import router from '@/router'; //导入路由
import Pagination from "@/components/Pagination.vue";
import { ref } from "vue";
let list = ref([]);
const api = "blog/category";
getList();
function getList() {
  axios({
      method: "get",
      url: "/blog/category",
    })
      .then((res) => {
        list.value = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  
}
function goto(id) {
  router.push(`/admin/blog/category/${id}`);
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
      // router.push(`/admin/blog/blog`); //回到列表
      router.go(0); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
