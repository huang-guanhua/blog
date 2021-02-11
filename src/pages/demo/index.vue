<template>
  <div>
    <div>demo</div>
    <div>websocket</div>
    <div>最近数据推送时间{{time ? time : '暂无'}}</div>
    <div>发送邮件的邮箱<el-input v-model="email"></el-input></div>
    <div>
      发送内容
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
      </el-input>
    </div>
    <div><el-button type="primary" @click="sendEamil">发送</el-button></div>
  </div>
</template>

<script>
import {getSendEmail} from '../../service/home';
import { Message } from 'element-ui';
export default {
  name: 'demo',
  data(){
    return {
      ws: {},
      time: '',
      textarea2: '',
      email: ''
    }
  },

  methods: {
    init(){
      const that = this;
      const path = 'ws://huangguanhua.cn/api/ws'
      const socket  =  new WebSocket(path);
      this.socket = socket;
      // socket.onopen = open;
      // socket.onerror = error;
      // socket.onclose = closed;
      socket.onmessage = getMessage;
      // window.onbeforeunload = function(e) {
      //   e = e || window.event;
      //   if (e) {
      //     e.returnValue = "关闭提示";
      //     socket.close();
      //   }
      //   socket.close();
      //   return "关闭提示";
      // }
      // function open() {
      //   alert("socket连接成功");
      // }
      // function error() {
      //   alert("连接错误");
      // }
      // function closed() {
      //   alert("socket关闭");
      // }
      function getMessage(msg) {
        let data = msg.data || ''
        try {
          data = JSON.parse(data)
        } catch (error) {
          console.log(error)
        }
        if(data){
          that.time = new Date().toTimeString()
        }
        // if (typeof JSON.parse(msg.data) === "number") {
        //   console.log(JSON.parse(msg.data));
        //   count.value = msg.data;
        // } else {
        //   const obj = JSON.parse(msg.data);
        //   chatArr.push(obj);
        // }
        // await nextTick();
        // chatBox.value.scrollTop = chatBox.value.scrollHeight;
      }

    },

    sendEamil(){
      getSendEmail({
        type: 1,
        content: this.textarea2,
        url: this.email
      }).then(res => {
        if(res){
          Message.success('发送成功')
        }
      })
    }
  },

  created(){
    this.init()
    console.log('init')
  },

  destroyed(){
    console.log('destroyed', this.socket);
    this.socket.close()
  }

}
</script>

<style>

</style>