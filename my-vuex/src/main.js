import Vue from 'vue'
import App from './App.vue'
// import store from './store'
import store from './myStore'

Vue.config.productionTip = false

// store.commit('increment')
// console.log(store.state.count)

new Vue({
  store,
  render: h => h(App),
  a: 23
}).$mount('#app')

