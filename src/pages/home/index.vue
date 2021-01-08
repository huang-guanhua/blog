<template>
  <div class="home">
    <el-row>
      <el-col :span="18">
        <div class="grid-content">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>前端脚手架开发入门</span>
            </div>
            <div v-for="o in texts" :key="o" class="text">
              {{o}}
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-aside">4</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getlogin, getList, getAction, getInfo, getmenuList} from '../../service/home';
import {mapState} from 'vuex';
export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      texts: [
        'commander: 强大的node命令行处理工具。能轻松的获取命令行的参数',
        'inquirer: 命令行交互工具，让你能以“问答”的交互方式来完成一系列的命令行操作。',
        'download-git-repo: git仓库下载工具，通常用来下载模板代码。',
        'ora: 终端loading美化工具。'
      ],
      init: {}
    }
  },
  computed: mapState({
    info: state => state
  }),
  methods: {
    getLoginAction: () => {
      getlogin({
        account: 123456,
        password: 'qwerty'
      })
    },
    getListAction: () => {
      getList({
        id: '1001',
        start: 1,
        limit: 10,
      })
    },
    getMenuListAction: (par) => {
      getmenuList(par)
    }
  },
  created(){
    // getAction();
    // getInfo();
    // console.log(this.info, 'state');
    // this.getLoginAction(),
    // this.getListAction()
    this.getMenuListAction({
      start: 1,
      limit: 10,
    })
  }
}
</script>

<style lang="less" scoped>
.home{
  .grid-content{
    min-height: 70vh;
    margin-right: 5px;
    background-color: #fff;

    .text {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .grid-aside{
    min-height: 70vh;
    margin-left: 5px;
    background-color: #fff;
  }
}
</style>