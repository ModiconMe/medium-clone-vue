import Vue from 'vue'
import Vuex from 'vuex'
import auth from "@/store/auth";
import feed from "@/store/feed";
import tags from "@/store/tags";
import article from "@/store/article";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    tags,
    article
  }
})
