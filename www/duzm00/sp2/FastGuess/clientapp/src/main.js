import Vue from "vue"
import App from "./App.vue"
import router from "./router";

Vue.config.productionTip = false

if (process.env.NODE_ENV === "production") {
    Vue.prototype.$apiUrl = "https://fastguess.azurewebsites.net"
} else {
    Vue.prototype.$apiUrl = "http://localhost:5000"
}

new Vue({
    router,
    render: h => h(App),
}).$mount("#app")