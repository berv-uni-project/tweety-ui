export default {
  name: "top-nav",
  methods: {
    login() {
      this.$auth.loginWithRedirect({
        audiance: process.env.VUE_APP_AUDIANCE || window.location.origin
      });
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
