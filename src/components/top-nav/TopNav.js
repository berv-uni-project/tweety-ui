export default {
  name: "top-nav",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      //console.log(e);
      this.$buefy.notification.open(e.message);
    }
  }
};
