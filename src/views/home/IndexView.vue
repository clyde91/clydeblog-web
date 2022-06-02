<template>
  <!-- ======= Hero Section ======= -->
  <div id="hero" class="home">
    <div class="container">
      <div class="hero-content typed typed-items">
        <h1><span class="typed">
        <vuetyped
          :strings="['我是郑伊田', '一头150斤肥猪','我热爱编程','也喜欢玩桌游','请多多指教']"
          :loop="true"
          :smart-backspace="true"
          :typeSpeed="150"
          :backSpeed="40"
          :backDelay="1000"
          :showCursor="true"
        >
          <div class="typing" />
        </vuetyped>
        </span></h1>
      </div>
    </div>
  </div>
  <!-- End Hero -->

  <main id="main">
    <!-- ======= 闲言碎语 Section ======= -->
    <div id="portfolio" class="paddsection">
      <div class="container">
        <div class="section-title text-center">
          <h2>闲言碎语</h2>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12 justify-content-center gossip_main">
            <div class="gossip_random"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End 闲言碎语 -->
    <!-- ======= 关于我 Section ======= -->
    <div id="about" class="paddsection">
      <div class="container">
        <div class="row justify-content-between">
          <div class="col-lg-4">
            <div class="div-img-bg">
              <div class="about-img">
                <img
                  src="https://clydeblog.oss-cn-shanghai.aliyuncs.com/static/assets/img/clyde.jpg"
                  class="img-responsive"
                  alt="me"
                />
              </div>
            </div>
          </div>

          <div class="col-lg-7">
            <div class="about-descr">
              <p class="p-heading">我是建筑设计师</p>
              <p class="separator">虽然我更喜欢编程。</p>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
    </div>

    <!-- 跑马灯 -->
    <div id="services">
      <div class="container">
        <div class="services-carousel owl-theme">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in skills" :key="item.index">
              <div class="services-block">
                <i :class="item.icon"></i>
                <span>{{ item.skill }}</span>
                <p class="separator" style="width: 250px">
                  {{ item.description }}
                </p>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>

    <!-- End 关于我 Section -->

    <!-- ======= 我的体重 Section ======= -->
    <div id="portfolio" class="paddsection">
      <div class="container">
        <div class="section-title text-center">
          <h2>我的体重</h2>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center">
            <div class="health_container"><div id="health"></div></div>
          </div>
        </div>
      </div>
    </div>
    <!-- End 我的体重 Section -->

    <!-- ======= 博客 Section ======= -->
    <div id="journal" class="text-left paddsection">
      <div class="container">
        <div class="section-title text-center">
          <h2>最新博客</h2>
        </div>
      </div>
      <div class="container">
        <div class="journal-block">
          <el-row :gutter="150">
            <el-col :xs="24" :span="8" v-for="item in list" :key="item.id">
              <div class="journal-info">
                <div class="journal-txt">
                  <h3>
                    <router-link :to="`/blog/${item.id}`">{{
                      item.title
                    }}</router-link>
                  </h3>
                  <!-- <p class="separator">{{ite}}</p> -->
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- End 博客 Section -->

    <!-- ======= 联系我 ======= -->
    <div id="contact" class="paddsection">
      <div class="container">
        <div class="contact-block1">
          <div class="row">
            <div class="col-lg-6">
              <div class="contact-contact">
                <h2 class="mb-30">联系我</h2>
                <ul class="contact-details">
                  <li><span>QQ：66704470</span></li>
                  <li><span>微信：clyde91</span></li>
                  <li><span>邮箱：clyde91@163.com</span></li>
                </ul>
              </div>
            </div>

            <div class="col-lg-6">
              <form action="" method="POST" role="form" class="php-email-form">
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group contact-block1">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        id="name"
                        placeholder="你的名字"
                        data-rule="minlen:1"
                        data-msg="请输入你的名字"
                      />
                      <div class="validate"></div>
                    </div>
                  </div>

                  <div class="col-lg-6">
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        placeholder="你的邮箱"
                        data-rule="email"
                        data-msg="请输入有效的邮箱"
                      />
                      <div class="validate"></div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control"
                        name="subject"
                        id="subject"
                        placeholder="主题"
                        data-rule="minlen:2"
                        data-msg="主题至少输入2个字"
                      />
                      <div class="validate"></div>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        name="message"
                        rows="12"
                        data-rule="required"
                        data-msg="内容不能为空"
                        placeholder="信息"
                      ></textarea>
                      <div class="validate"></div>
                    </div>
                  </div>

                  <div class="col-lg-12 mb-3">
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">
                      Your message has been sent. Thank you!
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <input
                      type="submit"
                      class="btn btn-defeault btn-send"
                      style="
                        background-color: #312745;
                        color: #9190a5;
                        margin-top: -20px;
                        margin-bottom: 10px;
                      "
                      value="发送信息"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End 联系我 -->
  </main>
  <!-- End 主页 -->
</template>

<script setup>
import vuetyped from "vue3typed/libs/typed";//导入打字
import axios from "@/utils/axios"; //导入axios
import { getgossip, gethealth } from "@/api/index.js";
import { ref } from "vue";
let list = ref([]);
const skills = [
  {
    skill: "design",
    description: "户型强排，平面布置，停车库设计，建筑外表皮设计",
    icon: "ion-ios-lightbulb-outline",
  },
  {
    skill: "PS/AI/ID",
    description: "掌握Photoshop+Illustrator+InDesign的文本制作流程。",
    icon: "ion-ios-browsers-outline",
  },
  {
    skill: "revit/rhino",
    description: "掌握revit与rhino的建模方法。rhino可建较复杂曲面",
    icon: "ion-ios-color-wand-outline",
  },
  {
    skill: "grasshopper/GhPython",
    description:
      "掌握参数化的原理。运用编程调用grasshopper接口的方法生成复杂曲面。",
    icon: "ion-social-android-outline",
  },
  {
    skill: "Python/Django",
    description:
      "掌握python语言。会用Django建立简单应用。",
    icon: "ion-ios-analytics-outline",
  },
  {
    skill: "Html/CSS/JS",
    description:
      "会用html、css与JavaScript美化网页。",
    icon: "ion-ios-analytics-outline",
  },
  {
    skill: "JAVA/Spring",
    description:
      "掌握java基础，会用spring建立后端",
    icon: "ion-ios-analytics-outline",
  },
  {
    skill: "Vue/ElementPlus",
    description:
      "掌握Vue3的使用。会用element组件美化页面",
    icon: "ion-ios-analytics-outline",
  },
];

getgossip();
gethealth();
getblog();

function getblog() {
  axios({
    method: "get",
    url: `/blog/index`,
  })
    .then((res) => {
      list.value = res.data.data; //list数据
    })
    .catch((error) => {
      console.log(error);
    });
}



</script>