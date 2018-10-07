import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('prettyDate', function (date) {
  if (!date) return ''
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
