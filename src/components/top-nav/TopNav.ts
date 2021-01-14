import { AccountInfo } from '@azure/msal-browser';
import { Vue } from 'vue-property-decorator';
import Components from 'vue-class-component';
import { mapState } from 'vuex';

@Components({
  name: 'top-nav',
  computed: {
    ...mapState({
      account: 'user'
    })
  }
})
export default class TopNav extends Vue {

  public account!: AccountInfo | null;
  public mounted() {
    if (!this.$msalInstance) {
      return;
    }
    const accounts = this.$msalInstance.getAllAccounts();
    if (accounts.length === 0) {
      return;
    }
    this.$store.commit('setUser', accounts[0]);
  }

  public login() {
    if (this.$msalInstance)
    {
      this.$msalInstance
        .loginPopup(undefined)
        .then(() => {
          if (this.$msalInstance)
          {
            const myAccounts = this.$msalInstance.getAllAccounts();
            this.$store.commit('setUser', myAccounts[0]);
          }
        })
        .catch(error => {
          this.$buefy.notification.open({
            message: `error during authentication: ${error}`,
            type: 'is-danger',
            position: 'is-bottom'
          });
        });
    }
  }

  public logout() {
    if (this.$msalInstance)
    {
      this.$msalInstance
        .logout({})
        .then(() => {
          // this.$emitter.emit('logout', 'logging out');
          this.$store.commit('setUser', null);
        })
        .catch(error => {
          this.$buefy.notification.open({
            message: `error during logout: ${error}`,
            type: 'is-danger',
            position: 'is-bottom'
          });
        });
    }
  }
}
