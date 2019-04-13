import Vue from "vue";
import Buefy from "buefy";
import VeeValidate from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AuthPlugin from "./plugins/auth";

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: "fa"
});
Vue.use(VeeValidate);
Vue.use(AuthPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
