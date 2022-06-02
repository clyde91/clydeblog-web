<template>
      <Navbar rolls="subpage-nav"></Navbar>
      <AppMain></AppMain>
      <Footerbar></Footerbar>
      <Backtop></Backtop>
</template>

<script>
import Navbar from'./components/Navbar.vue'
import Footerbar from'./components/Footerbar.vue'
import AppMain from'./components/AppMain.vue'
import Backtop from'@/components/Backtop'
export default {
  name: 'layout',
  components: {
    Navbar,
    Footerbar,
    AppMain,
    Backtop
  },
}
</script>
<style scoped>

</style>

