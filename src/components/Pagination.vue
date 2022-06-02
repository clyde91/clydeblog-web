<template>
  <el-pagination
    background
    layout="total,prev,pager,next,jumper"
    :page-size="pagesize"
    :total="total"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
  />
</template>
<script setup>
import { ref } from "vue";
import axios from '@/utils/axios'
const props = defineProps({ module: String, pagesize: Number }); //module: 指定路径,pagesize:根据路径指定显示个数
const emit = defineEmits(["change","loadingchange"]);//自定义事件
let list = ref([]);
let currentPage = ref(1);
let total = ref(0);
getList(1);//默认读取第一页
function handleCurrentChange(index) {
  currentPage.value = index; //指定当前页面
  document.documentElement.scrollTop = 0;
  emit("loadingchange", true); //loading打开
  getList(index); //调用axios获得当前数据
}
function getList(index) {
  axios({
      method: "get",
      url: `/${props.module}/${index}/${props.pagesize}`,
    })
    .then((res) => {
      list = res.data.data.records; //list数据
      total.value = res.data.data.total; //总项数
      emit("change", list); //向父组件传数据
      emit("loadingchange", false); //loading关闭
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>
<style scoped>
.is-active{
  color: #5B2AC9;
}
</style>