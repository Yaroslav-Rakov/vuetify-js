import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import Login from './views/Login.vue'


Vue.use(Vuelidate)

Vue.config.productionTip = false

// Register component globally
Vue.component(
    'LoginComponent', Login
  
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')