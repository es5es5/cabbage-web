import Vue from 'vue'

// https://github.com/dzwillia/vue-simple-spinner
import Spinner from 'vue-simple-spinner'

// http://hilongjw.github.io/vue-progressbar/index.html
import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: ' rgb(0, 126, 255)',
  failedColor: 'red',
  thickness: '4px'
})
Vue.component('Spinner', Spinner)
