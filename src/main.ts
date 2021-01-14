import Vue from 'vue';
import Buefy from 'buefy';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import { PublicClientApplication } from '@azure/msal-browser';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconPack: 'fa'
});

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

Vue.prototype.$msalInstance = new PublicClientApplication(
  store.state.msalConfig
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
