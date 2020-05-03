import Vue from 'vue'
import Router from 'vue-router'

//import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: Login
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: Register
    },
  ]
})
