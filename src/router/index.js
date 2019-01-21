import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/index.vue'
import NavigaMain from '@/views/navigaMain/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'navigaMain',
      component: NavigaMain
    }
  ]
})
