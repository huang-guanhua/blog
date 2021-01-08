<template>
  <el-dialog
    title="注册"
    :visible.sync="isShow"
    width="400px"
    >
    <el-input class="input-name" v-model="name" placeholder="请输入名字或昵称"></el-input>
    <el-input class="input-account" v-model="account" placeholder="请输入手机号或邮箱"></el-input>
    <el-input class="input-pasword" placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-input placeholder="请确认输入密码" v-model="conPfirmPassword" show-password></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button @click="registerUserAction">注 册</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {getregister} from '../../service/home';
export default {
  name: 'register',
  data(){
    return {
      isShow: false,
      name: '',
      account: '',
      password: '',
      conPfirmPassword: ''
    };
  },
  watch: {
    isShow: function (newValue, oldValue) {
      if(!newValue) {
        this.name = '',
        this.account = '',
        this.password = '',
        this.conPfirmPassword = ''
      }
    }
  },
  methods: {
    show(){
      this.isShow = true;
    },
    registerUserAction(){
      const {name, account, password, conPfirmPassword} = this;
      if(password === conPfirmPassword){
        if(name && account && password){
          getregister({
            name,
            account,
            password
          }).then(res => {
            if(res.status === 200 && res.reg === 1){
              this.$message.success('注册成功，请前往登录');
              this.isShow = false;
            }else{
              this.$message.error(res.message);
            }
          })
        }else{
          this.$message.error('输入框不能为空');
        }
      }else {
        this.$message.error('请确认两次输入密码是否一致');
      }
    }

  },
  
}
</script>

<style lang="less" scoped>
.input-account{
  margin: 10px 0 0 0;
}
.input-pasword{
  margin: 10px 0;
}
</style>