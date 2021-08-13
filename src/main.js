import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import LoginComponent from './components/Login.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

Vue.use(Vuelidate)

Vue.config.productionTip = false

// Register component globally
Vue.component(
    'LoginComponent', LoginComponent
  
)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')