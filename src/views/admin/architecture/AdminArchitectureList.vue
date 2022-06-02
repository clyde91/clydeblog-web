// 后台建筑列表
<template>
  <el-card>
    <router-link :to="{ name: 'adminarchitectureadd' }">
      <el-button type="primary">添加建筑</el-button>
    </router-link>
    <el-button style="float: right" @click="resetFilter">重置</el-button>
    <el-button
      type="primary"
      style="float: right; margin-right: 15px"
      @click="getListByFilter"
      >查询</el-button
    ><br /><br />
    <el-form :inline="true" :model="listQuery"  label-width="140px">
      <el-form-item label="输入搜索：">
        <el-input
          v-model="listQuery.name"
          placeholder="建筑名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="输入搜索：">
        <el-input
          v-model="listQuery.country"
          placeholder="国家"
        ></el-input>
      </el-form-item>
      <el-form-item label="建筑师">
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
      <el-form-item label="特点">
        <el-cascader
          v-model="listQuery.features"
          :options="data.featureOptions"
          :props="props"
        >
        </el-cascader>
      </el-form-item>
    </el-form>
  </el-card>
  <br />
  <!-- 表格 -->
  <el-table
    :data="data.list"
    height="600"
    v-loading="data.listLoading"
    style="width: 100%"
    @sort-change="sort"
  >
    <el-table-column prop="id" label="Id" sortable="custom" width="120" />
    <el-table-column
      prop="name"
      label="建筑名称"
      sortable="custom"
      width="300"
    />
    <el-table-column prop="architect.name" sortable="custom" label="建筑师" />
    <el-table-column prop="country" sortable="custom" label="国家" />
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
import Pagination from "@/components/PaginationFilter.vue";
import { ref, reactive, watch } from "vue";
const api = "architecture";
const props = { multiple: true, value: `id`, label: `name`, emitPath: false }; //级联选择器props设定
let listQuery = reactive({
  name: "",
  architect: {},
  orderField: "",
  orderType: "",
}); //筛选查询
let data = reactive({
  list: [], //结果列表
  pagesize: 13, //每页个数
  total: 0, //总数
  currentPage: 1, //当前页数
  listLoading: true, //载入画面控制
  architectOptions: {}, //建筑师选择器
  featureOptions: [], //特点选择器
  filter: {},
});
getFeature(); //初始化获得级联菜单
getList(1); //初始化默认读取第一页

//服务端获取列表
function getList(index) {
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

//监听sort-change
function sort({ order, prop }) {
  if (order == "ascending") {
    listQuery.orderType = "asc";
  } else if (order == "descending") {
    listQuery.orderType = "desc";
  } else {
    listQuery.orderType = "asc";
  }
  if (prop == "architect.name") {
    listQuery.orderField = "architect_id";
  } else {
    listQuery.orderField = prop;
  }
  getListByFilter();
}
</script>
