export default {
  name: "top-nav",
  data() {
    return {
      isAuthenticated: false,
      profile: this.$auth.profile
    };
  },
  methods: {
    burgerClick() {
      const burger = document.getElementById("burger");
      if (burger) {
        burger.classList.toggle("is-active");
        const target = burger.dataset.target;
        if (target) {
          const $target = document.getElementById(target);
          if ($target) {
            $target.classList.toggle("is-active");
          }
        }
      }
    },
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
    }
  },
  watch: {
    $route() {
      const burger = document.getElementById("burger");
      if (burger) {
        burger.classList.remove("is-active");
        const target = burger.dataset.target;
        if (target) {
          const $target = document.getElementById(target);
          if ($target) {
            $target.classList.remove("is-active");
          }
        }
      }
    }
  }
};
