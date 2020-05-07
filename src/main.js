import Vue from 'vue'
import App from './App.vue'
import router from './router'
import session from 'vue-session'
import modal from 'vue-js-modal'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(session)
Vue.use(modal,{dynamic: true})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
