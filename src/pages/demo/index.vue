<template>
  <div>
    <div>demo-email</div>
    <div>websocket</div>
    <div>最近数据推送时间{{time ? time : '暂无'}}</div>
    <div>发送邮件的邮箱<el-input v-model="email"></el-input></div>
    <div>test</div>
    <div>
      发送内容
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea2">
      </el-input>
    </div>
    <div><el-button size="mini" type="primary" @click="sendEamil">发送</el-button></div>

    <div>demo-websocket</div>
    <div>世界聊天室</div>
    <div class="container">
      <el-input v-model="curName" placeholder="聊天需要先填写账号名称"></el-input>
      <span>{{curName}}--</span>
      <el-row class="warpper">
        <el-col :span="24" :class="curName == item.name ? 'self' : 'other' " v-for="(item, key) in messageList.list" :key="key">
          <div v-if="curName == item.name"><span class="info">{{item.message}}</span>：<span>{{item.name}}</span></div>
          <div v-else><span>{{item.name}}</span>：<span class="info">{{item.message}}</span></div>
        </el-col>
      </el-row>
    </div>
    <div class="send-input">
      <el-input v-model="messageInfo"></el-input>
      <el-button @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import {getSendEmail, getSendMessage} from '../../service/home';
import { Message } from 'element-ui';
export default {
  name: 'demo',
  data(){
    return {
      ws: {},
      time: '',
      textarea2: '',
      email: '',
      messageInfo: '',
      curName: 'siri',
      divEle: null,
      messageList: {
        userName: '',
        list: [
        ]
      }
    }
  },

  watch: {
    messageList: function() {
      const ele = this.divEle;
      this.$nextTick(function(){
        if(ele.scrollHeight > 300){
          ele.scrollTo(0, 800)
        }
      })
    }
  },

  methods: {
    init(){
      const that = this;
      const path = 'wss://huangguanhua.cn/api/ws'
      const socket = new WebSocket(path);
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
        if(data && data.list){
          that.time = new Date().toTimeString();
          that.messageList.list = data.list;
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
    },

    sendMessage(){
      const message = this.messageInfo;
      const curName = this.curName;

      if(!curName){
        Message.error('账号输入框不能为空');
        return;
      }

      if(message){
        const list = [...this.messageList.list]
        const msg = {
          name: curName,
          message: message
        }
        list.push(msg);
        this.messageList = {
          userName: curName,
          list
        };
        this.socket.send(JSON.stringify(msg));
        this.messageInfo = '';
        // getSendMessage;
      } else {
        Message.error('输入框不能为空');
      }
    }
  },

  created(){
    this.curName = ~~(Math.random()*10000)
    this.init();
    const socket = this.socket;
    setTimeout(() => {
      this.divEle = document.querySelector(".warpper");
    })

    setTimeout(() => {
      socket.send('{}')
    }, 1000)
  },

  destroyed(){
    console.log('destroyed', this.socket);
    this.socket.close()
  }

}
</script>

<style lang="less" scoped>
.send-input{
  display: flex;
}
.container{
  padding: 10px;
  border: 1px solid #dddddd;
}
.warpper{
  background: rgb(233, 232, 232);
  max-height: 300px;
  overflow-y: auto;

  .self{
    display: flex;
    justify-content: flex-end;
    padding: 7px 7px 7px 0;

    & .info{
      background: rgba(0, 128, 0, 0.6);
      padding: 5px;
      border-radius: 6px;
    }
  }
  .other{
    display: flex;
    justify-content: flex-start;
    padding: 7px 0 7px 7px;

    & .info{
      background: rgba(255, 255, 255, 1);
      padding: 5px;
      border-radius: 6px;
    }
  }

}
</style>