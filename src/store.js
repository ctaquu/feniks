import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    pdf: {
      id: null,
      name: null
    },
    category: {
      id: null,
      title: null,
      subtitle: null
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    pdf(state) {
      return state.pdf;
    },
    category(state) {
      return state.category;
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_PDF(state, pdf) {
      state.pdf = pdf;
    },
    SET_CATEGORY(state, category) {
      state.category = category;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    setPDF({ commit }, pdf) {
      if (pdf) {
        commit("SET_PDF", pdf);
      } else {
        commit("SET_PDF", {
          id: null,
          name: null
        });
      }
    },
    setCategory({ commit }, category) {
      if (category) {
        commit("SET_CATEGORY", category);
      } else {
        commit("SET_CATEGORY", {
          id: null,
          title: null,
          subtitle: null
        });
      }
    }
  }
});
