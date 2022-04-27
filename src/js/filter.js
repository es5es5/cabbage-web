import moment from 'moment'

export default {
  install (Vue) {
    Vue.filter('numberWithComma', value => {
      if (value !== 0 && !value) return ''
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    })
    Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
      if (!value) return '-'
      return moment(value).locale('ko').format(format)
    })
    Vue.filter('dateTimeFormat', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
      if (!value) return '-'
      return moment(value).locale('ko').format(format)
    })
    Vue.filter('upperCase', value => {
      if (!value) return ''
      return value.toUpperCase()
    })
    Vue.filter('sexFormat', value => {
      if (!value) return ''
      return value === '0' ? '남' : '여'
    })
  }
}
