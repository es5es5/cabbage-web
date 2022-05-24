import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './plugins'

import MIXSINS from './js/mixins'
import COMMON from './js/common'
import FILTER from './js/filter'
import GlobalComponents from './components'

Vue.use(MIXSINS)
Vue.use(FILTER)
Vue.use(GlobalComponents)

Vue.config.productionTip = false
Vue.prototype.COMMON = COMMON
Vue.prototype.$eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
