/* eslint-disable */

const state = {
  brandList: [{
    name: 'CDI',
    value: 'CDI'
  }, {
    name: 'APRIL',
    value: 'APRIL'
  }, {
    name: 'i-GARTEN',
    value: 'i-GARTEN'
  }, {
    name: 'Page',
    value: 'Page'
  }, {
    name: 'Bouncy',
    value: 'Bouncy'
  }, {
    name: 'NOISY',
    value: 'NOISY'
  }, {
    name: 'CMS',
    value: 'MT'
  }],
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