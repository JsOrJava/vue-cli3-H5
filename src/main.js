import Vue from 'vue'
import App from './App.vue'
import Router from './routers'
import Store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

new Vue({
  Router,
  Store,
  i18n,
  render: h => h(App)
}).$mount('#app')
