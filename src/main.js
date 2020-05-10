import Vue from 'vue'
import App from './App.vue'
import router from './router'
import session from 'vue-session'
import VueJwtDecode from 'vue-jwt-decode'
import modal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VueJwtDecode)
Vue.use(session)
Vue.use(modal,{dynamic: true})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
