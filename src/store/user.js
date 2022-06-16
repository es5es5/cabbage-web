const state = {
  user: {}
}

const getters = {
  getUser (state) { return state.user }
}

const actions = {
  logout (context) {
    context.commit('setUser', {})
  }
}

const mutations = {
  setUser (state, value) { state.user = value },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
