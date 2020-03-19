import Vue from 'vue'
import App from './views/App'
import router from './router'
import './plugins/reg'
import './assets/sass/main.sass'

Vue.config.devtools = true
// Vue.config.productionTip = true
// Vue.config.devtools = true

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
