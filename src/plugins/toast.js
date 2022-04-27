import Vue from 'vue'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const ToastOptions = {
  transition: 'Vue-Toastification__fade',
  maxToasts: 5,
  newestOnTop: true
}

const ToastSettings = {
  position: 'top-center',
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.4,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
}

Vue.use(Toast, ToastOptions)
Vue.prototype.ToastSettings = ToastSettings
