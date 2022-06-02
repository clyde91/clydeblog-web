// 后台建筑详情
<template>
  <el-form label-width="120px" :model="data.form">
    <el-form-item label="建筑名称">
      <el-input v-model="data.form.name" />
    </el-form-item>
    <el-form-item label="建筑师">
      <el-select
        v-model="data.form.architect.id"
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

    <el-form-item label="国家">
      <el-input v-model="data.form.country" />
    </el-form-item>
    <el-form-item label="特点">
      <el-cascader
        v-model="data.form.features"
        :options="data.featureOptions"
        :props="props"
      >
      </el-cascader>
    </el-form-item>
    <el-form-item label="图片">
      <upload
        @getImageUrl="getImageUrl"
        api="architecture/architecture/"
        :oldImageUrl="data.form.photo"
      ></upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <Back>取消</Back>
    </el-form-item>
  </el-form>
</template>
<script setup>
import axios from "@/utils/axios"; //导入axios
import router from "@/router"; //导入路由
import Ckeditor from "@/components/Ckeditor.vue";
import Back from "@/components/button/Back.vue";
import { ref, reactive, getCurrentInstance } from "vue";
import upload from "@/components/Upload.vue";
const { proxy } = getCurrentInstance();
const emit = defineEmits(["getText"]);
const api = "architecture";
const props = { multiple: true, value: `id`, label: `name`, emitPath: false }; //级联选择器props设定
let data = reactive({
  form: { architect: {} },
  architectOptions: {}, //建筑师选择器
  featureOptions: [], //特点选择器
});
// let loading=ref(false);//载入变量
getFeature(); //初始化获得级联菜单
//判断是add还是update获得建筑
if (proxy.$route.params.id != undefined) {
  getBlog();
}

function getBlog() {
  axios({
    method: "get",
    url: `/${api}/${proxy.$route.params.id}`,
  })
    .then((res) => {
      data.form = res.data.data;
      data.architectOptions = [data.form.architect];
      data.form.features=convertFeaturesToArray(data.form.features); //转为数组形式
    })
    .catch((error) => {
      console.log(error);
    });
}
//获得级联列表
function getFeature() {
  axios({
    method: "get",
    url: `/${api}/feature`,
  })
    .then((res) => {
      data.featureOptions=getFeatureOptions(res.data.data);
      // loading.value=false
    })
    .catch((error) => {
      console.log(error);
    });
}
//将传来列表根据parentId分成层级的对象
function getFeatureOptions(features) {
  let featureOptions=[]
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
  return featureOptions
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
  return temp
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
function getImageUrl(url) {
  data.form.photo = url;
}

function onSubmit() {
  data.form.features=convertFeatureToObject(data.form.features); //将数组转为对象
  axios({
    method: "post",
    url: `/${api}/update`,
    data: data.form,
  })
    .then((res) => {
      router.push(`/admin/${api}/${api}`); //回到列表
    })
    .catch((error) => {
      console.log(error);
    });
}
function onTest() {
  console.log(data.form.features);
}
</script>