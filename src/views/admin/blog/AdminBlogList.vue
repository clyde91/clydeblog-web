// 后台博客列表
<template>
  <router-link :to="{ name: 'adminblogadd' }">
    <el-button type="primary">添加文章</el-button>
  </router-link>
  <el-select
    v-model="data.category"
    placeholder="选择列表"
    @change="changeCategory"
    style="float:right;"
  >
    <el-option
      v-for="item in data.categorys"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
  <br /><br />
  <el-table
    :data="data.list"
    height="700"
    v-loading="data.listLoading"
    style="width: 100%"
  >
    <el-table-column prop="id" label="Id" sortable width="120" />
    <el-table-column prop="title" label="标题" width="600" />
    <el-table-column prop="category.name" label="分类" />
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
  <el-pagination
    background
    layout="total,prev,pager,next,jumper"
    :page-size="data.pagesize"
    :total="data.total"
    @current-change="handleCurrentChange"
    :current-page="data.currentPage"
  />
</template>

<script setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import { ref, reactive } from "vue";
const api = "blog";
let listQuery = reactive({
  name: "",
  orderField: "",
  orderType: "",
}); //筛选查询
let data = reactive({
  list: [], //结果列表
  pagesize: 15, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: true, //载入画面控制
  filter: {},
  category: 0,
  categorys: [],
});
getList(1);
getCategoryList();
//服务端获取列表
function getList(index) {
  data.listLoading = true;
  axios({
    method: "get",
    url:
      data.category == 0
        ? `/${api}/${index}/${data.pagesize}`
        : `/${api}/${data.category}/${index}/${data.pagesize}`,
    data: ({} = data.filter),
  })
    .then((res) => {
      data.list = res.data.data.records; //list数据
      data.total = res.data.data.total; //总项数
      data.listLoading = false;
    })
    .catch((error) => {
      console.log(error);
    });
}
//修改页数
function handleCurrentChange(index) {
  data.currentPage = index; //指定当前页面
  document.documentElement.scrollTop = 0;
  getList(index); //调用axios获得当前数据
}
//获得分类列表
function getCategoryList() {
  axios({
    method: "get",
    url: "/blog/category",
  })
    .then((res) => {
      data.categorys = res.data.data;
      data.categorys.push({ id: 0, name: "所有分类" });
    })
    .catch((error) => {
      console.log(error);
    });
}
//选择分类
function changeCategory() {
  data.currentPage = 1;
  getList(1);
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
