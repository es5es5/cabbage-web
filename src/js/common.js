import moment from 'moment'

const COMMON = {
  searchPagination (options) {
    const option = Object.assign({
      type: 'search',
      page: 0,
      route: null,
      router: null,
      form: null,
      callback: null
    }, options)

    if (option.type === 'init') {
      if (location.search) {
        const query = option.route.query
        for (const i in query) {
          if (i === 'page') {
            option.form[i] = parseInt(query[i])
          } else {
            option.form[i] = query[i]
          }
        }
      } else {
        option.router.replace({ query: option.form }).catch(() => {})
      }
    } else if (option.type === 'pagination') {
      option.form.page = (option.page - 1)
      option.router.push({ query: option.form }).catch(() => {})
    } else {
      option.form.page = 0
      option.router.replace({ query: option.form }).catch(() => {})
    }
    option.callback()
  },
  UUID () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  },
  /**
   * 전화번호 포맷
   * @param { Strong } tel
   * @returns { String } bohumAge
   */
  getTelFormat (tel) {
    let value = tel.replace(/-/g, '')
    var result = value
    if (!result || isNaN(result)) {
      value = ''
      return ''
    }

    if (value.length > 2) {
      if (value.substring(0, 2) === '02') {
        if (value.length > 5) {
          if (value.length > 9) {
            result = value.substring(0, 2) + '-' + value.substring(2, 6) + '-' + value.substring(6, 10)
          } else {
            result = value.substring(0, 2) + '-' + value.substring(2, 5) + '-' + value.substring(5, value.length)
          }
        } else if (value.length > 2) {
          result = value.substring(0, 2) + '-' + value.substring(2, value.length)
        }
      } else {
        if (value.length > 6) {
          if (value.length > 10) {
            result = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7, 11)
          } else {
            result = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6, value.length)
          }
        } else if (value.length > 3) {
          result = value.substring(0, 3) + '-' + value.substring(3, value.length)
        }
      }
    }

    return result
  },
  getToDateFormat (value, format) {
    let _format = format
    if (!_format) _format = 'YYYY-MM-DD'
    return moment(value).locale('ko').format(_format) || '-'
  },
  /**
   * API GET 요청시 파라미터 특수문자를 코드로 변환
   */
  replaceAPIGETParameter (parameter) {
    parameter = parameter.replace(/&/g, '%26')
    parameter = parameter.replace(/\+/g, '%2B')
    parameter = parameter.replace(/=/g, '%3D')

    return parameter
  },
}

export default COMMON
