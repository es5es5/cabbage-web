import Vue from 'vue'

import './toast'
import './loader'
// import './veeValidate'

// https://github.com/euvl/vue-js-modal
import VModal from 'vue-js-modal'
import VueCookies from 'vue-cookies'
import VeeValidate from 'vee-validate'
import VueAzureUploader from 'vue-azure-blob-upload'

Vue.use(VModal)
Vue.use(VueCookies)
Vue.use(VeeValidate)
Vue.use(VueAzureUploader)
