<template>
  <footer id="footer">
    <div class="bottom">
      <div class="container">
        <div class="row margin-h">
          <div class="col-lg-6 col-xs-12 text-lg-left footer_l text-center">
            <p class="copyright-text">
              &copy; Copyright <strong>clyde</strong>. All Rights Reserved
            </p>
            <div class="credits">Designed by <a href="#">clyde</a></div>
          </div>

          <div class="col-lg-6 col-xs-12 text-lg-right footer_r text-center">
            <ul class="list-inline">
              <li class="list-inline-item">
                <router-link to="/">主页</router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/about">关于</router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/gossip">说说</router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/diary">日志</router-link>
              </li>
              <li class="list-inline-item">
                <a href="">建筑</a>
              </li>
              <li class="list-inline-item">
                <router-link to="/code_blog">编程</router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/guess">游戏</router-link>
              </li>
              <li class="list-inline-item">
                <router-link to="/architecture">图鉴</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
#footer a {
  color: #292929;
}
#footer a:hover {
  color: #b8a07e;
}
</style>
