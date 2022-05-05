import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import manage from './manage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common,
    manage,
  }
})
