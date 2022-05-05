/* eslint-disable */

const state = {
  selectedBrand: {
    name: 'CDI',
    value: 'CDI'
  }
}

const getters = {
  getSelectedBrand (state) {
    return state.selectedBrand
  },
  getBrandList (state) {
    return state.brandList
  },
  memberType(state) {
    return state.memberType
  },
}

const actions = {
}

const mutations = {
  setSelectedBrand (state, value) {
    state.selectedBrand = state.brandList.filter(brand => brand.value === value)[0]
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}