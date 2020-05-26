import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Login from '@/components/Login'
//import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: Main
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: Login
    },
  ]
})
