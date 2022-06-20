import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import manage from './manage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    manage,
  }
})
