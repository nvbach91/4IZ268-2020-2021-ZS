import Vue from 'vue'
import App from './App.vue'

import router from "@/router/index.js";
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false

//data validation plugin
Vue.use(Vuelidate)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
