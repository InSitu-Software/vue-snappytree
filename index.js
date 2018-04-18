import Vue from 'vue'
import App from './src/App.vue'

Vue.config.productionTip = false

export default new Vue({
  render: h => h(App)
}).$mount('#app')
