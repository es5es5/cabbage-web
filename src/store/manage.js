import { getDocs, collection } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

const state = {
  장소_관리: [],
  균종_관리: [],
  Origin_관리: [],
}

const getters = {
  get장소_관리List (state) { return state.장소_관리 },
  get장소 (state, value) { return state.장소_관리.filter(item => item.id === value.id)[0] || {} },
  getOrigin_관리List (state) { return state.Origin_관리 },
  getOrigin (state, value) { return state.Origin_관리.filter(item => item.id === value.id)[0] || {} },
  get균종_관리List (state) { return state.균종_관리 },
  get균종 (state, value) { return state.균종_관리.filter(item => item.id === value.id)[0] || {} },
}

const actions = {
  async set장소_관리 (context, COLLECTION_NAME) {
    const snapshots = await getDocs(collection(firestore, COLLECTION_NAME))
    return context.commit('set장소_관리', snapshots.docs.map(doc => doc.data()))
  },
  async setOrigin_관리 (context, COLLECTION_NAME) {
    const snapshots = await getDocs(collection(firestore, COLLECTION_NAME))
    return context.commit('setOrigin_관리', snapshots.docs.map(doc => doc.data()))
  },
  async set균종_관리 (context, COLLECTION_NAME) {
    const snapshots = await getDocs(collection(firestore, COLLECTION_NAME))
    return context.commit('set균종_관리', snapshots.docs.map(doc => doc.data()))
  },
}

const mutations = {
  set장소_관리 (state, value) { state.장소_관리 = value },
  setOrigin_관리 (state, value) { state.Origin_관리 = value },
  set균종_관리 (state, value) { state.균종_관리 = value },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
