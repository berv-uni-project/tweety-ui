export default {
  name: "top-nav",
  data() {
    return {
      isAuthenticated: false,
      profile: this.$auth.profile
    };
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
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
