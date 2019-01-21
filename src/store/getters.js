let _sessionStorage = window.sessionStorage
export default {
  getHistory (state) {
    state.History = state.History || _sessionStorage.History
    return state.History
  },

  getHistoryIndex (state) {
    state.HistoryIndex = state.HistoryIndex || _sessionStorage.HistoryIndex
    return state.HistoryIndex
  },
  getUserInfo (state) {
    state.UserInfo = state.UserInfo.Userid === '' ? JSON.parse(_sessionStorage.UserInfo) || state.UserInfo : state.UserInfo
    return state.UserInfo
  },
  getPower (state) {
    state.power = state.power.role === '' ? JSON.parse(_sessionStorage.power) || state.power : state.power
    return state.power
  },
  getGroupList (state) {
    state.groupList = state.groupList === '' ? JSON.parse(_sessionStorage.groupList) || state.groupList : state.groupList
    return state.groupList
  }
}
