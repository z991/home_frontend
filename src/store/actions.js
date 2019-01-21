export default {
  // dispath 触发异步请求
  // 映射用户信息
  setHistory ({
    commit
  }, info) {
    // console.log('commit=' + commit, 'info=' + info)
    commit('setHistory', info || {})
  },

  setHistoryIndex ({
    commit
  }, info) {
    commit('setHistoryIndex', info || {})
  },

  setUserInfo ({
    commit
  }, info) {
    commit('setUserInfo', info || {})
  },
  setPower ({
    commit
  }, info) {
    commit('setPower', info || {})
  },
  setGroupList ({
    commit
  }, info) {
    commit('setGroupList', info || {})
  }
  // "动作"({commit},{
  //   commit("SET_DATAHEADER",DAFA``)
  // })
}
