<template>
  <div class="footer">
    <div class="footer-content">
      <div><a href="https://github.com/">GitHub</a></div>
      <div><a href="https://es6.ruanyifeng.com/">es6</a></div>
      <div style="margin:0 auto;display:flex">
        <a href="https://beian.miit.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;margin-right:10px">桂ICP备2021000407号-1</a>
		 		<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602005463" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img :src="recordIcon" style="float:left;"/><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">粤公网安备 44030602005463号</p></a>
		 	</div>
    </div>
  </div>
</template>

<script>
import recordIcon from '../../assets/recordIcon.png'
export default {
  name: 'com-head',
  data(){
    return {
      recordIcon
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