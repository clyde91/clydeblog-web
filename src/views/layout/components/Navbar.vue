<template>
  <!-- {rolls} -->
  <nav id="main-nav" :class="rolls">
    <div class="row">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <img
              src="https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/logo-nav.png"
              alt="logo"
            />
          </router-link>
        </div>
        <div class="responsive" @click.stop="change">
          <el-icon><Operation color="#b8a07e"/></el-icon>
        </div>
        <ul class="nav-menu" ref="dis" >
          <li><router-link to="/">主页</router-link></li>
          <li><router-link to="/about">关于</router-link></li>
          <li><router-link to="/gossip">说说</router-link></li>
          <li><router-link to="/diary">日志</router-link></li>
          <li>
            <el-dropdown>
              <span>
                <router-link :to="{ name: 'archblog' }">建筑</router-link>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(category, index) in data.archblog"
                    :key="index"
                    class="dropdown-item"
                  >
                    <router-link :to="`/archblog/category/${category.id}`">
                      {{ category.name }}
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown>
              <span>
                <router-link :to="{ name: 'codeblog' }">编程</router-link>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(category, index) in data.codeblog"
                    :key="index"
                    class="dropdown-item"
                  >
                    <router-link :to="`/codeblog/category/${category.id}`">
                      {{ category.name }}
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li><router-link :to="{ name: 'guess'}">游戏</router-link></li>
          <li><router-link :to="{ name: 'architecture'}">图鉴</router-link></li>
          <User></User>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import axios from "@/utils/axios"; //导入axios
import User from "@/components/User.vue";
import { ArrowDown, Operation } from "@element-plus/icons-vue";
import { ref, reactive } from "vue";
import 'element-plus/theme-chalk/display.css'
const props = defineProps({ rolls: { default: "subpage-nav" } });
const data = reactive({
  archblog: [],
  codeblog: [],
});
getCategory();
function getCategory() {
  axios({
    method: "get",
    url: `/blog/category`,
  })
    .then((res) => {
      let list = res.data.data;
      for (let i = 0; i < list.length; i++) {
        if (list[i].parentId == 0) {
          data.archblog.push(list[i]);
        } else {
          data.codeblog.push(list[i]);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

let dis = ref(null)
function change() {
  if (dis.value.style.display == "none"||dis.value.style.display == "") {
    dis.value.style.display = "block";
  } else {
    dis.value.style.display = "none";
  }
}
function change2(){
  dis.value.style.display = "none";
}
// import { onMounted } from "vue";
// onMounted(() => {
//   if(document.body.clientWidth<800){
//   document.addEventListener("click", change2);}
// });
</script>
<style>
.nav-menu a{
  color: #9190a5;
}
.nav-menu a:hover{
  color: #b8a07e;
}
.dropdown-item a{
  color: #292929!important;
}
.dropdown-item a:hover{
  color: #b8a07e!important;
}
</style>