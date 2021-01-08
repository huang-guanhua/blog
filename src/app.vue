
<template>
  <div id="root">
    <el-container>
      <el-header>
        <Head></Head>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
      <el-footer class="foot">
        <Footer></Footer>
      </el-footer>
    </el-container>
    
  </div>
</template>

<script>
import Head from './components/head';
import Footer from './components/footer'
export default {
  name: 'app',
  components: {
    Head,
    Footer
  }
}
</script>

<style lang="less" scoped>
#root{
  // width: 1200px;
  // margin: 0 auto;

  .main{
    min-height: 70vh;
  }

  .foot{
    padding: 0;
  }
}
</style>