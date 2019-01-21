// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 未登陆 路由拦截
router.beforeEach((to, from, next) => {
  if (to.fullPath === '/login') {
    if (sessionStorage.username) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (sessionStorage.username === undefined) {
      console.log('未登录')
      ElementUI.Message({
        showClose: true,
        message: '请先登录',
        type: 'error'
      })
      next({path: '/login'})
    } else {
      next()
    }
  }
})
