import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    result: {
      count: 0,
      tweet: []
    },
    msalConfig: {
      auth: {
        clientId: 'd69b3d7e-fbb4-4d61-be50-8ac18e7e1927',
        authority: 'https://login.microsoftonline.com/common'
      },
      cache: {
        cacheLocation: 'localStorage'
      }
    },
    accessToken: '',
    user: null
  },
  mutations: {
    setResult(state, { count, tweet }) {
      state.result.count = count;
      state.result.tweet = tweet;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUser(state, userData) {
      state.user = userData;
    }
  },
  actions: {
    saveResult({ commit }, { count, tweet }) {
      commit('setResult', {
        count,
        tweet
      });
    }
  }
});

export default store;
