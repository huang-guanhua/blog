<template>
  <div class="footer">
    <div class="footer-content">
      <div><a href="https://github.com/">GitHub</a></div>
      <div><a href="https://github.com/">home</a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'com-head',
  data(){
    return {
    }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
@import '../../index.less';

.footer{
  .footer-content{
    padding: 20px;
    height: 100px;
    background-color: @glo-bgfooterColor;
    border-top: 1px solid @glo-color;
  }
}
</style>