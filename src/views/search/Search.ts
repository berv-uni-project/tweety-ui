import axios from 'axios';
import Vue from 'vue';
import { mapState } from 'vuex';
import Components from 'vue-class-component';
import HomeForm from '@/components/home-form/HomeForm.vue';
import HomeResult from '@/components/home-result/HomeResult.vue';
import services from '@/services/index';
import { AuthenticationResult, AccountInfo, SilentRequest } from '@azure/msal-browser';

@Components({
  name: 'home',
  components: {
    'home-form': HomeForm,
    'home-result': HomeResult
  },
  computed: {
    ...mapState({
      account: 'user'
    })
  }
})
export default class Search extends Vue {
  public account!: AccountInfo | null;
  protected form: any = {
    search: '',
    dinkes: [],
    dinpem: [],
    dinsos: [],
    dinpen: [],
    dinbina: [],
    method: null
  }
  protected result: any = {
    count: 0,
    query: []
  }
  protected isLoading: boolean = false
  protected activeTab: number = 0
  protected getData(authResult: AuthenticationResult) {
    axios
      .post(
        services.search,
        {
          Name: this.form.search,
          DinasKesehatan: this.form.dinkes.join(','),
          DinasPemuda: this.form.dinpem.join(','),
          DinasSosial: this.form.dinsos.join(','),
          DinasPendidikan: this.form.dinpen.join(','),
          DinasBinamarga: this.form.dinbina.join(','),
          IsKMP: this.form.method === 'true'
        },
        {
          headers: {
            Authorization: `Bearer ${authResult.accessToken}`
          },
          responseType: 'json'
        }
      )
      .then(response => {
        this.isLoading = false;
        if (response.status === 200) {
          this.$buefy.notification.open({
            message: 'Success',
            type: 'is-success',
            position: 'is-bottom'
          });
          this.result.count = response.data.result.count;
          this.result.query = response.data.result.data.query;
          this.activeTab = 1;
        } else {
          this.$buefy.notification.open({
            message: 'Form is not valid! Please check the fields.',
            type: 'is-danger',
            position: 'is-bottom'
          });
        }
      })
      .catch(error => {
        this.isLoading = false;
        this.$buefy.notification.open({
          message: error.message,
          type: 'is-danger',
          position: 'is-bottom'
        });
      });
  }

  protected submitData() {
    if (!this.$msalInstance) {
      return;
    }
    this.isLoading = true;
    const request: SilentRequest = {
      scopes: ['openid', 'User.Read'],
      account: this.account || undefined
    };
    this.$msalInstance
      .acquireTokenSilent(request)
      .then(this.getData)
      .catch((err: any) => {
        this.$buefy.notification.open({
          message: err.message,
          type: 'is-danger',
          position: 'is-bottom'
        });
        this.isLoading = false;
      });
  }
}
