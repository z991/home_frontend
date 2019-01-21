import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
var axioIn = axios.create({
  timeout: 40000,
  withCredentials: true,
  baseURL: 'http://{{HOME_FRONTEND_URL}}'
})

axioIn.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  switch (error.response.status) {
    case 400:
      ElementUI.Message({
        showClose: true,
        message: error.response.data.error,
        type: 'error'
      })
      break
    case 401:
      ElementUI.Message({
        showClose: true,
        message: '没有操作权限',
        type: 'error'
      })
      break
    case 403:
      ElementUI.Message({
        showClose: true,
        message: '没有权限',
        type: 'error'
      })
      break
  }
  return Promise.reject(error.response)
})
// API规则： 请求后台的request 集合
// axioIn.interceptors.request.use(response => {
//     // response.headers={'Content-Type':'application/x-www-form-urlencoded'}
//     return response;

// }, error => {
// })
export default axioIn
