import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './plugins'

import MIXSINS from './js/mixins'
import COMMON from './js/common'
import FILTER from './js/filter'
import GlobalComponents from './components'

import { NODE_ENV, ENV_CUOME } from './js/api'

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
        case 403:
          // alert('사용자 정보가 없습니다.\n다시 로그인해주세요!')
          Vue.$cookies.remove('accessToken')
          location.href = '/login'
          return
      }
    }
    return Promise.reject(error)
  }
)

Vue.use(MIXSINS)
Vue.use(FILTER)
Vue.use(GlobalComponents)

Vue.config.productionTip = false
Vue.prototype.COMMON = COMMON
Vue.prototype.$eventBus = new Vue()
Vue.prototype.$axios = axios
Vue.prototype.NODE_ENV = NODE_ENV
Vue.prototype.ENV_CUOME = ENV_CUOME

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
