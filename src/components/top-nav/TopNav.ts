import Vue from 'vue';
import Components from 'vue-class-component';

@Components({
  name: 'top-nav',
})
export default class TopNav extends Vue {
  public login() {
    this.$auth.loginWithRedirect();
  }

  public logout() {
    this.$auth.logout({
      returnTo: window.location.origin
    });
  }
}
