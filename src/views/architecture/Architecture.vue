<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>建筑图鉴</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-button
    style="
      position: relative;
      float: right;
      margin-top: -40px;
      margin-right: 40px;
    "
    type="primary"
    @click="data.searchVisible = !data.searchVisible"
    ><el-icon><Search /></el-icon>&nbsp;&nbsp;&nbsp;查询</el-button
  >
  <!-- 跑马灯 -->
  <el-card style="border-radius: 18px;height=680px">
    <el-skeleton style="width: 100%" :loading="data.listLoading" animated >
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 500px" />
            <br>
         <el-skeleton-item variant="text" style="width: 30%;height: 25px" />
         <el-skeleton-item variant="text" style="width: 100%" />
         <el-skeleton-item variant="text" style="width: 100%" />
         <el-skeleton-item variant="text" style="width: 100%" />
         <el-skeleton-item variant="text" style="width: 100%" />
         <el-skeleton-item variant="text" style="width: 100%" />
         <el-skeleton-item variant="text" style="width: 40%" />
      </template>
    </el-skeleton>
    <el-carousel
      indicator-position="outside"
      height="680px"
      v-if="data.list.length > 0"
    >
      <el-carousel-item v-for="item in data.list" :key="item">
        <el-image
          style="width: 100%; height: 500px; border-radius: 12px"
          :src="item.photo"
          fit="cover"
        />
        <div
          style="
            width: 100px;
            float: right;
            margin-right: 50px;
            margin-top: 30px;
          "
        >
          <el-avatar shape="circle" :size="100" :src="item.architect.avatar" />
          <div style="text-align: center">
            <span style="display: inline-block; width: 100px; color: #5f5e73">{{
              item.architect.name
            }}</span>
          </div>
        </div>
        <br /><br />
        <div style="margin-left: 20px">
          <div style="color: #5b2ac9; font-size: 20px; font-weight: 900">
            {{ item.name }}
          </div>
          <div style="color: #5b2ac9; font-size: 16px">
            &nbsp;{{ item.country }}
          </div>
          <br />
          <span v-for="feature in item.features" :key="feature.id">
            <el-tag class="ml-2" :type="data.colors[Math.floor(5 * Math.random())]">{{ feature.name }}</el-tag>
          </span>
          <!-- <div><el-rate v-model="" size="large" /></div> -->
        </div>
      </el-carousel-item>
    </el-carousel>

    <el-pagination
      background
      layout="total,prev,pager,next"
      :page-size="data.pagesize"
      :total="data.total"
      @current-change="handleCurrentChange"
      :current-page="data.currentPage"
    />
  </el-card>

  <!-- 查询窗口 -->
  <el-dialog v-model="data.searchVisible" :width="data.width">
    <el-button style="float: right" @click="resetFilter">重置</el-button>
    <el-button
      type="primary"
      style="float: right; margin-right: 15px"
      @click="getListByFilter"
      >查询</el-button
    ><br /><br />
    <el-form :inline="true" :model="listQuery" label-width="140px">
      <el-form-item label="建筑名称:">
        <el-input
          v-model="listQuery.name"
          placeholder="请输入建筑名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="国家:">
        <el-input
          v-model="listQuery.country"
          placeholder="请输入建筑所在国家"
        ></el-input>
      </el-form-item>
      <el-form-item label="建筑师:">
        <el-select
          v-model="listQuery.architect.id"
          filterable
          remote
          placeholder="请输入名字"
          :remote-method="getArchitect"
        >
          <el-option
            v-for="item in data.architectOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="特点:">
        <el-cascader
          v-model="listQuery.features"
          :options="data.featureOptions"
          :props="props"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import Pagination from "@/components/PaginationFilter.vue";
import { ref, reactive, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
const api = "architecture";
const props = { multiple: true, value: `id`, label: `name`, emitPath: false,checkStrictly: false, }; //级联选择器props设定
let listQuery = reactive({
  name: "",
  architect: {},
  orderField: "",
  orderType: "",
}); //筛选查询
let data = reactive({
  list: [], //结果列表
  pagesize: 7, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: false, //载入画面控制
  architectOptions: {}, //建筑师选择器
  featureOptions: [], //特点选择器
  filter: {},
  searchVisible: false,
  width: document.body.clientWidth > 1000 ? "30%" : " 70%",
  colors:["","success","info","warning","danger"]
});
getList(1);
getFeature(); //初始化获得级联菜单
//服务端获取列表
function getList(index) {
  data.list = [];
  data.listLoading = true;
  axios({
    method: "post",
    url: `/${api}/${index}/${data.pagesize}`,
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

//多条件查询
function getListByFilter() {
  // convertFeatureToObject(features)
  //将条件赋值到data中
  data.filter = JSON.parse(JSON.stringify(listQuery));
  data.filter.features = convertFeatureToObject(data.filter.features);
  data.searchVisible = false;
  getList(1); //从第一页开始
}
//重置条件
function resetFilter() {
  listQuery.name = "";
  listQuery.country = "";
  listQuery.architect = {};
  listQuery.features = [];
}
//获得级联列表
function getFeature() {
  axios({
    method: "get",
    url: `/${api}/feature`,
  })
    .then((res) => {
      data.featureOptions = getFeatureOptions(res.data.data);
      // loading.value=false
    })
    .catch((error) => {
      console.log(error);
    });
}
//将传来列表根据parentId分成层级的对象
function getFeatureOptions(features) {
  let featureOptions = [];
  for (let i in features) {
    let feature = features[i];
    //如果是父级那么新建
    if (feature.parentId == 0) {
      // console.log("父亲");
      feature.children = [];
      featureOptions.push(feature);
      //如果是子集。插入children
    } else {
      // console.log("儿子");
      featureOptions[feature.parentId - 1].children.push(feature);
    }
  }
  return featureOptions;
}
//将传来feature对象转为数组
function convertFeaturesToArray(features) {
  let temp = [];
  for (let i in features) {
    let feature = features[i];
    temp.push(feature.id);
  }
  return temp;
}
//将features列表转为对象
function convertFeatureToObject(features) {
  let temp = [];
  for (let i in features) {
    let feature = { id: features[i] };
    temp.push(feature);
  }
  return temp;
}
//获得建筑师列表
function getArchitect(name) {
  // loading.value=true
  axios({
    method: "get",
    url: `/${api}/architect/search`,
    params: { name: name },
  })
    .then((res) => {
      data.architectOptions = res.data.data;
      // loading.value=false
    })
    .catch((error) => {
      console.log(error);
    });
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
