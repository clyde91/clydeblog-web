// 后台日志列表
<template>
  <router-link :to="{ name: 'admindiaryadd' }"
    ><el-button type="primary">添加日志</el-button></router-link
  ><br /><br />
  <el-table :data="data.list" height="700" v-loading="data.listLoading" style="width: 100%">
    <el-table-column prop="id" label="Id" width="120" />
    <el-table-column prop="title" label="标题" width="300" />
    <el-table-column prop="createdTime" label="创建日期" />
    <el-table-column prop="title" label="是否私密" width="300">
      <template #default="scope">
         
        <el-switch
          @change="handleShowStatus(scope.row.id, scope.row.hidden)"
          v-model="scope.row.hidden"
          :active-value="true"
          :inactive-value="false"
        />
      </template>
    </el-table-column>
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
import Pagination from "@/components/Pagination.vue";
import { ref,reactive } from "vue";
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import { ElMessage } from "element-plus";
const api="diary"
let data = reactive({
  list: [], //结果列表
  pagesize: 13, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: true, //载入画面控制
});

function handleShowStatus(id, hidden) {
  axios({
    method: "post",
    url: `/${api}/updatehidden`,
    params: {
      id: id,
      hidden: hidden,
    },
  })
    .then((res) => {
      if (res.data.code == 200) {
        ElMessage({
          message: "修改成功",
          type: "success",
        });
      } else {
        ElMessage({
          message: "修改错误",
          type: "error",
        });
        router.go(0); //回到列表
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

let isLogin = ref(sessionStorage.isLogin);//是否登录
getList(1);
//服务端获取列表
function getList(index) {
  data.listLoading = true;
  axios({
    method: "get",
    url: `/${api}/${index}/${data.pagesize}`,
    params: {isLogin:isLogin.value},
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
