export default {
  methods: {
    handleLoginEvent(data) {
      this.$router.push(data.state.target || "/");
    }
  },
  created() {
    this.$auth.handleAuthentication();
  }
};
