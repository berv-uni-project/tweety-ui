import Vue from "vue";
import Vuex from "vuex";
import LogRocket from "logrocket";
import createPlugin from "logrocket-vuex";

Vue.use(Vuex);

LogRocket.init("uah8l9/tweety");
const logrocketPlugin = createPlugin(LogRocket);
const store = new Vuex.Store({
  plugins: [logrocketPlugin],
  state: {
    result: {
      count: 0,
      tweet: []
    }
  },
  mutations: {
    setResult(state, { count, tweet }) {
      state.result.count = count;
      state.result.tweet = tweet;
    }
  },
  actions: {
    saveResult({ commit }, { count, tweet }) {
      commit("setResult", {
        count,
        tweet
      });
    }
  }
});

export default store;
