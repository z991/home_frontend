export default {
  setHistory (state, info) {
    state.History = info
    window.sessionStorage.History = info
  },
  setHistoryIndex (state, info) {
    state.HistoryIndex = info
    window.sessionStorage.HistoryIndex = info
  },
  setUserInfo (state, info) {
    state.UserInfo = info
    window.sessionStorage.UserInfo = JSON.stringify(info)
  },
  setPower (state, info) {
    state.power = info
    window.sessionStorage.power = JSON.stringify(info)
  },
  setGroupList (state, info) {
    state.groupList = JSON.stringify(info)
    window.localStorage.groupList = JSON.stringify(info)
  }
}
