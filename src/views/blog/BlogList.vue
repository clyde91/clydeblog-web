<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <template v-if="category == ''">
        <el-breadcrumb-item>{{ api }}</el-breadcrumb-item>
      </template>
      <template v-else>
        <el-breadcrumb-item :to="{ path: '/' }">{{ api }}</el-breadcrumb-item
        ><el-breadcrumb-item :to="{ path: '/' }">{{
          data.categoryname
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
  <!-- 主体 -->
  <el-card style="border-radius: 18px">
    <!-- 骨架 -->
    <el-skeleton
      style="width: 100%"
      :loading="data.listLoading"
      animated
      :count="5"
    >
      <template #template>
        <br>
        <el-skeleton-item variant="text" style="width: 30%; height: 20px" />
        <br>
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 100%" />
        <el-skeleton-item variant="text" style="width: 90%" />
        <el-skeleton-item variant="text" style="width: 90%" />
        <el-skeleton-item variant="text" style="width: 40%" />
        <br />
      </template>
    </el-skeleton>
    <!-- 循环 -->
    <ul style="margin: 0px; padding: 20px">
      <li v-for="(blog, index) in data.list" :key="index">
        <el-row>
          <el-col :span="8" class="hidden-sm-and-down">
            <router-link :to="`/${api}/${blog.id}`">
              <img
                class="blog_logo"
                :src="blog.category.logo"
                alt=""
                style="border-radius: 12px"
              />
            </router-link>
          </el-col>
          <!-- 右边文字 -->
          <el-col :xs="24" :md="16" style="padding-left: 20px">
            <p class="article_title">
              <router-link :to="`/${api}/${blog.id}`">
                {{ blog.title }}
              </router-link>
            </p>
            <p class="article_text">
              {{ sliceStr(blog.body, 130) }}
              <!-- <div v-html="sliceStr(blog.body, 150)"></div> -->
            </p>
            <p class="article_info">
              <span>
                <svg
                  class="bi bi-person"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 0 0 .014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 0 0 .022.004zm9.974.056v-.002.002zM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                </svg>
                {{ blog.author.username }}&nbsp;
              </span>
              <span>
                <svg
                  class="bi bi-folder"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
                  />
                </svg>
                {{ blog.category.name }}&nbsp;
              </span>
              <span>
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
                {{ blog.createdTime }}
              </span>
            </p>
          </el-col>
          <el-divider />
        </el-row>
      </li>

      <!-- {% empty %} -->
      <li v-if="data.list == null">暂无文章</li>
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
import "element-plus/theme-chalk/display.css";
import axios from "@/utils/axios"; //导入axios
import { computed } from "vue";
import Pagination from "@/components/Pagination.vue";
import { ref, reactive, getCurrentInstance } from "vue";
let { proxy } = getCurrentInstance();
let api = proxy.$route.path.replace("_", "").split("/")[1];
let category =
  proxy.$route.params.id == null ? "" : `/${proxy.$route.params.id}`;
let data = reactive({
  list: [], //结果列表
  pagesize: 10, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: true, //载入画面控制
  categoryname:""
});
getList(1);
//服务端获取列表
function getList(index) {
  data.listLoading = true;
  axios({
    method: "get",
    url: `/${api}${category}/${index}/${data.pagesize}`,
  })
    .then((res) => {
      data.list = res.data.data.records; //list数据
      data.total = res.data.data.total; //总项数
      data.listLoading = false;
      if (data.list.length != 0) {
        data.categoryname = data.list[0].category.name;
      } //用返回的第一个元素的值设置头导航。如果返回列表空就不设置了
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