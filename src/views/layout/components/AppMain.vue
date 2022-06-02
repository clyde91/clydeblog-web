<template>
  <div class="main">
    <el-row justify="center">
      <el-col :xl="10" :lg="12" :md="16" :sm="18" :xs="24">
        <!-- <slot name="header"></slot> -->
        <router-view></router-view>
        <!-- <el-button @click="test">test</el-button> -->
        <!-- <slot name="footer"></slot> -->
      </el-col>
    </el-row>
  </div>
</template>


<style>
.main {
  padding-top: 90px;
  padding-bottom: 60px;
}
</style>
