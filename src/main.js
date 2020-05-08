import Vue from 'vue'
import App from './App.vue'
import router from './router'
import session from 'vue-session'
import modal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(session)
Vue.use(modal,{dynamic: true})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
