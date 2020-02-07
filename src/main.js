import Vue from "vue";
import Buefy from "buefy";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: "fa"
});

let audiance = process.env.VUE_APP_AUDIANCE;

if (!audiance) {
  audiance = window.location.origin;
}
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audiance,
  onRedirectCallback: appState => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  }
});
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
