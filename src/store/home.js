const CHANGE_LOAD = 'CHANGE_LOAD';

export default {
  state: {
    globalLoading: false, // 全局请求加载状态
    info: {name: 'zhangsan'}
  },
  mutations: {
    [CHANGE_LOAD] (state, {curStatus}) {
      state.globalLoading = curStatus;
    }
  }
}