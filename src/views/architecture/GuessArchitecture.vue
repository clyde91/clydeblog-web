<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>猜建筑</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card style="border-radius: 18px">
    <el-image
      style="width: 100%; height: 600px; border-radius: 12px"
      :src="data.imgUrl"
      fit="cover"
      v-loading="data.loading"
    />
    <br />
    <div style="color:#5B2AC9;font-weight:900">{{ data.question }}</div>
    <br />
    <el-row :gutter="40">
      <el-col :span="8" v-for="(option,index) in data.options" :key="index"
        ><el-row justify="center">
          <el-button type="primary" @click="submit(index)">{{
            option
          }}</el-button></el-row
        >
      </el-col>
    </el-row>
  </el-card>

  <div ref="start">
    <el-button @click="initGuest" type="primary" class="getstart" size="large">
      开始猜建筑
    </el-button>
  </div>
  <el-dialog
    v-model="data.resultVisible"
    title="您的最终成绩是"
    :width="data.width"
  >
    <el-row justify="center">
      <h1>
        总共{{ data.count }}道题 答对<b>{{ data.score }}</b
        >次！<br />你可真是太棒了！
      </h1>
    </el-row>
    <br />
    <el-row justify="center">
      <el-button type="primary" @click="initGuest">再玩一次</el-button>
    </el-row>
  </el-dialog>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import axios from "@/utils/axios"; //导入axios
// let resultVisible = ref(false); //控制对话框显示
// let score = ref(0); //显示得分

let data = reactive({
  score: 0,
  options: [],
  questions: [],
  imgUrl:"https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/guest.jpg",
  answer:0,
  resultVisible: false,
  start: {},
  loading: false,
  count: 7,
  width: document.body.clientWidth > 1000 ? "30%" : " 70%",
  question: "",
});
let start = ref(null);
//初始化游戏
function initGuest() {
  data.score = 0;
  data.options = [];
  //   data.imgUrl = "https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/guest.jpg";
  data.resultVisible = false;
  start.value.style.display = "none";
  data.loading = true;
  getArchitectures();
}

//获得随机的12个建筑
function getArchitectures() {
  axios({
    method: "get",
    url: `/architecture/guest`,
    params:{count:data.count}
  })
    .then((res) => {
      data.questions = res.data.data;
      data.loading = false;
      makeQuestion();
    })
    .catch((error) => {
      console.log(error);
    });
}
//取出1个问题配置好options。imgUrl。answer
function makeQuestion() {
  let question=data.questions.pop()
  data.options=question.options
  data.imgUrl=question.photo
  data.answer=question.answer
  data.question=question.question
}
//提交答案并且清空options
function submit(answer) {
  //如果答案索引正确
  if (answer == data.answer) {
    data.score++;
  }
  data.options = [];
  //判断是否是最后一个。
  if (data.questions.length != 0) {
    //不是最后一个
    makeQuestion();
  } else {
    //最后一个。
    data.imgUrl =
      "https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/guest.jpg";
      data.question="";
    start.value.style.display = "block";
    data.resultVisible = true;
  }
}
</script>
<style scoped>
.getstart {
  position: absolute;
  top: 72%;
  display: block;
  left: 48%;
}
.item {
  align-items: center;
}
</style>