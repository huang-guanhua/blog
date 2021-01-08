import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import modules from './store';
import routesConfig from './config/routes';
import app from './app.vue';
import 'reset-css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import './index.less';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.devtools = process.env.NODE_ENV === 'development';

const router = new VueRouter(routesConfig)

const store = new Vuex.Store({
  modules
})

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(app)
})