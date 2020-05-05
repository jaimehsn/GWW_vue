import Vue from 'vue'
import App from './App.vue'
import router from './router'
import session from 'vue-session'

Vue.config.productionTip = false
Vue.use(session)

new Vue({
  render: h => h(App),
  router,
  use:{
    
  }
  
}).$mount('#app')
