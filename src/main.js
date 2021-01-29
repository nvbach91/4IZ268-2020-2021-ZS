import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue } from 'bootstrap-vue'

import store from "@/store/store"
import router from "@/router/index.js";
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)

//data validation plugin
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
