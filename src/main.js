import Vue from 'vue'
import App from './App.vue'
import router from './router'
import session from 'vue-session'
import VueJwtDecode from 'vue-jwt-decode'
import modal from 'vue-js-modal'
import io from 'socket.io-client'
import VueSocketIOExt from 'vue-socket.io-extended'

const socket = io('https://ec2-13-59-126-158.us-east-2.compute.amazonaws.com:8443');
Vue.use(VueSocketIOExt, socket);

Vue.config.productionTip = false
Vue.use(VueJwtDecode)
Vue.use(session)
Vue.use(modal,{dynamic: true})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
