import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  created() {
 
      console.log(process.env.VUE_APP_BASE_URI);
  },
  render: h => h(App)
}).$mount('#app')