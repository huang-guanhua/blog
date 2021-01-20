<template>
  <div class="head">
    <div class="logo">
      <img class="logo-img" :src="logo">
    </div>
    <el-menu class="menu" mode="horizontal" :default-active="activeIndex" v-on:select="handleSelect">
      <router-link :to="item.key" v-for="(item, index) in menu" :key="item.key" >
        <el-menu-item class="menu-item" :index="String(index)">
          {{item.name}}
        </el-menu-item>
      </router-link>
    </el-menu>
    <div class="login">
      <div v-if="login && userName">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="out">退出</el-dropdown-item>
            <el-dropdown-item command="other">其他</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-else>
        <el-button size="small" @click="signShow">登录</el-button>
        <el-button plain size="small" @click="regShow">注册</el-button>
      </div>
    </div>
    <SignIn ref="signIn" @userlogin="userlogin" :login="login"></SignIn>
    <Register ref="register"></Register>
  </div>
</template>

<script>
import logo from '../../../public/logo.png';
import SignIn from '../../components/signIn';
import Register from '../../components/register';
import jsCookie from 'js-cookie';
export default {
  name: 'com-head',
  components: {
    SignIn,
    Register
  },
  data(){
    return {
      logo,
      login: false,
      userName: '',
      menu: [
        {name: '主页', key: 'home'},
        {name: '文章', key: 'article'},
        {name: 'demo', key: 'demo'},
        {name: '关于', key:'about'}
      ],
      activeIndex: '0',
    }
  },
  methods:{
    userlogin(par){
      const {login, userName} = par;
      if(login && userName){
        this.login = login;
        this.userName = userName;
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    regShow(){
      this.$refs.register.show()
    },
    signShow(){
      this.$refs.signIn.show()
    },
    handleCommand(idx){
      if(idx === 'out'){
        this.login = false,
        this.userName = '',
        jsCookie.remove('auth')
      }else {
        this.$message.info('other 暂无操作');
      }
    }

  },
  created(){
    console.log(this, 'head this')
  }
}
</script>

<style lang="less" scoped>
@import '../../index.less';

.head{
  height: 60px;
  color: @glo-color;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-bottom: 1px solid @glo-color;

  .logo{
    flex: 0 0 100px;
    .logo-img{
      height: 50px;
    }
  }

  .menu{
    display: flex;
    flex: 0 1 70%;
    background-color: @glo-bgcolor;

    .el-menu{
      background-color: @glo-bgcolor;
    }

    .menu-item{
      color: @glo-color;
      margin: 0 10px;
    }
  }

  .login{
    display: flex;
    flex: 1 0 auto;
    justify-content: flex-end;
  }
}
</style>