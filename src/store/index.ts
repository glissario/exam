import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      actualModule: null,
      actualSemester: null,
      isLoggedIn: false,
      user: null,
    };
  },
  mutations: {},
  actions: {},
  modules: {},
});
