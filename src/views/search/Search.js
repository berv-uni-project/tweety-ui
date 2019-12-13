import axios from "axios";
import HomeForm from "@/components/home-form/HomeForm.vue";
import HomeResult from "@/components/home-result/HomeResult.vue";
import services from "@/services/index";

export default {
  name: "home",
  data() {
    return {
      form: {
        search: "",
        dinkes: [],
        dinpem: [],
        dinsos: [],
        dinpen: [],
        dinbina: [],
        method: null
      },
      result: {
        count: 0,
        query: []
      },
      isLoading: false,
      activeTab: 0
    };
  },
  components: {
    "home-form": HomeForm,
    "home-result": HomeResult
  },
  methods: {
    getData(accessToken) {
      axios
        .post(
          services.search,
          {
            Name: this.form.search,
            DinasKesehatan: this.form.dinkes.join(","),
            DinasPemuda: this.form.dinpem.join(","),
            DinasSosial: this.form.dinsos.join(","),
            DinasPendidikan: this.form.dinpen.join(","),
            DinasBinamarga: this.form.dinbina.join(","),
            IsKMP: this.form.method === "true"
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            responseType: "json"
          }
        )
        .then(response => {
          this.isLoading = false;
          if (response.status === 200) {
            this.$buefy.notification.open({
              message: "Success",
              type: "is-success",
              position: "is-bottom"
            });
            this.result.count = response.data.result.count;
            this.result.query = response.data.result.data.query;
            this.activeTab = 1;
          } else {
            this.$buefy.notification.open({
              message: "Form is not valid! Please check the fields.",
              type: "is-danger",
              position: "is-bottom"
            });
          }
        })
        .catch(error => {
          this.isLoading = false;
          this.$buefy.notification.open({
            message: error.message,
            type: "is-danger",
            position: "is-bottom"
          });
        });
    },
    submitData() {
      this.isLoading = true;
      this.$auth
        .getAccessToken()
        .then(this.getData)
        .catch(err => {
          this.$buefy.notification.open({
            message: err.message,
            type: "is-danger",
            position: "is-bottom"
          });
        });
    }
  }
};
