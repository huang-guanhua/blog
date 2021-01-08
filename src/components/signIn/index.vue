<template>
  <el-dialog
    title="登录"
    :visible.sync="isShow"
    width="30%"
  >
    <el-input class="input-user" v-model="account" placeholder="请输入账号"></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="signInUserAction">登 录</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getlogin} from '../../service/home';
export default {
  name: 'signIn',
  data(){
    return {
      account: '',
      password: '',
      isShow: false,
    };
  },
  watch: {
    isShow: function (newValue, oldValue) {
      if(!newValue) {
        this.account = '',
        this.password = ''
      }
    }
  },
  methods: {
    show(){
      this.isShow = true;
    },
    signInUserAction(){
      const {account, password} = this;
      if(account && password){
        getlogin({account,password}).then(res => {
          if(res.auth === 1){
            this.$emit('userlogin', {login: true, userName: res.user});
            this.isShow = false
          }else{
            this.$message.error(res.message);
          }
        })
      }else {
        this.$message.error('账号或密码不能为空');
      }
      
    }
  },
}
</script>

<style lang="less" scoped>
.input-user{
  margin: 10px 0;
}
</style>