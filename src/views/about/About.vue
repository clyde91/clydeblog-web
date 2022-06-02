<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
      <el-breadcrumb-item>关于</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-card style="border-radius: 18px">
    <el-row justify="center">
      <el-image
        style="width: 300px; border-radius: 12px"
        src="https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/clyde.jpg"
        fit="cover"
      />
    </el-row>
    <div>
      &nbsp;<strong style="font-size: 24px">关于为什么会有这个blog：</strong
      ><br /><br />
      <p class="about_text">
        起初是为了科学上网，搞了个梯子。然后发现租用的VPS还能建网站，不如耍着玩。就研究了一下。找回了以前废寝忘食的干
        劲。&nbsp;非常感谢"再敲一行代码"的教学视频。django内容基本都是跟着他视频学的。<br />
        最近准备转行自学了java跟vue。又换语言重写了一遍网站。这次连后台的前端后端、数据库都是手写的。还是前后端分离。<br />
        现在采用的技术是vue+springboot+mybatis+mysql+oos。
        <br /><br />这网站有什么用呢？一是将我自学的编程、软件归纳整理，方便自己或者有需要的人查看。二是作为一个平台展示自己的作品，进程。三
        是作为一个宣泄场所，宣泄自己的想法、心情。
      </p>
    </div>
    <br /><br />
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp"
        placement="top"
      >
        <el-card>
          <h4>{{ activity.title }}</h4>
          <p>{{ activity.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <br /><br /><br /><br /><br /><br />
  </el-card>
</template>
<script setup>
const activities = [
  {
    title: "网站的起点",
    content: "使用初学的html+css配合套用dedecms在自己购买的空间搭起来了",
    timestamp: "2018-03-08",
  },
  {
    title: "自学Python",
    content: "工作时候用到grasshopper，想用高级的GHPython插件。便自学了Python",
    timestamp: "2019-01-07",
  },
  {
    title: "网站的重建2.0",
    content:
      "辞职过年期间自学Django。用好看的bootstrap模板加上之前学的web技术修改了下",
    timestamp: "2021-02-24",
  },
  {
    title: "自学JAVA",
    content: "犹豫一年下定决心转行",
    timestamp: "2021-12-23",
  },
  {
    title: "网站的重建3.0",
    content:
      "将之前用Django的网站推倒重写。前后端分离。前端用vue3和elementui。将原来的bootstrap模板解构。后端用springboot。",
    timestamp: "2022-5-8",
  },
  {
    title: "猜建筑1.0",
    content: "后台将建筑资源整合增删改查。通过前台展示js进行答题小游戏",
    timestamp: "2022-5-27",
  },
];
</script>