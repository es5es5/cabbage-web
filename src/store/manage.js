const state = {
  장소_관리: [],
  균종_관리: [],
  Origin_관리: [],
}

const getters = {
  get장소_관리List (state) {
    return state.장소_관리
  },
  get장소 (state, value) {
    return state.장소_관리.filter(item => item.id === value.id)[0] || {}
  }
}

const actions = {
}

const mutations = {
  set장소_관리 (state, value) {
    state.장소_관리 = value
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
