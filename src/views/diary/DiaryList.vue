<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>日志</el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <!-- 主体 -->
  <el-card style="border-radius:18px; padding: 20px">
    <!-- 骨架 -->
    <el-skeleton style="width: 100%" :loading="data.listLoading" animated :count="5" >
      <template #template>
        <el-skeleton-item variant="text" style="width: 30%;height: 20px" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 90%" />
        <el-skeleton-item variant="text" style="width: 90%" />
        <el-skeleton-item variant="text" style="width: 40%" />
        <br>
      </template>
    </el-skeleton>

    <!-- 循环 -->
    <ul style="margin: 0px; padding: 20px">
      
      <li v-for="(item, index) in data.list" :key="index">
        <!-- <div v-if="isLogin||!item.hidden"> -->
        <p class="article_title">
          <router-link :to="'/diary/' + item.id">{{ item.title }}</router-link>
        </p>
        <br>
        <p class="article_text" style="padding-left:50px;padding-right:20px">{{ sliceStr(item.body, 150) }}...</p>
        <br>
        <p class="span-right">
          <svg
            class="bi bi-calendar-date"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"
            />
            <path
              fill-rule="evenodd"
              d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"
            />
            <path
              fill-rule="evenodd"
              d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
          {{ item.createdTime }}
        </p>
        <el-divider />
        <!-- </div> -->
      </li>

      <!-- {% empty %} -->
      <li v-if="data.list == []">暂无文章</li>
      <!-- {% endfor %} -->
    </ul>
  <el-pagination
    background
    layout="total,prev,pager,next,jumper"
    :page-size="data.pagesize"
    :total="data.total"
    @current-change="handleCurrentChange"
    :current-page="data.currentPage"
  />
  </el-card>
</template>

<script setup>
import { computed } from "vue";
import Pagination from "@/components/Pagination.vue";
import { ref,reactive } from "vue";
import axios from "@/utils/axios"; //导入axios
const api="diary"
let data = reactive({
  list: [], //结果列表
  pagesize: 15, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: true, //载入画面控制
});
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

const sliceStr = computed(() => {
  return function (val, len) {
    val = val.replace(/<[^>]+>/g, "");
    return val.length > len ? val.slice(0, len) + "..." : val;
  };
});
</script>