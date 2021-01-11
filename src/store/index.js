import { createStore } from 'vuex'
import authModule from "@/store/authModule";
import createPersistedState from "vuex-persistedstate";


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule
  },
  plugins: [createPersistedState]
})
