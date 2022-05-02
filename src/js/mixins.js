export default {
  install (Vue) {
    Vue.mixin({
      mounted () {
      },
      data () {
        return {
        }
      },
      computed: {
        mixinRouteMetaGoList () { return this.$route.meta ? this.$route.meta.goList : false },
        mixinRouteMetaGoBack () { return this.$route.meta ? this.$route.meta.goBack : false },
        mixinRouteMetaTitle () { return this.$route.meta ? this.$route.meta.title : '' },
      },
      methods: {
        // Object Deep Copy
        deepCopy (obj) {
          const clone = {}
          for (const key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
              clone[key] = this.deepCopy(obj[key])
            } else {
              clone[key] = obj[key]
            }
          }
          return clone
        },
        /**
         * 숫자를 입력받았을때 공백/undefined/null/Nan 을 0으로 반환
         * @param {number} value 공백 처리할 숫자
         * @return {number} 공백/undefined/null/Nan 일 경우 0으로 반환
         */
        nanException (value) {
          if (value === '' || value === undefined || value === null || isNaN(value)) {
            return 0
          } else if (value >= 0 || value <= 0) {
            return value
          } else {
            return 0
          }
        },
        getManAge (birthDate) {
          console.log(birthDate)
          if (!birthDate) return '-'
          const birthday = new Date(birthDate)
          const today = new Date()

          let years = today.getFullYear() - birthday.getFullYear()
          birthday.setFullYear(today.getFullYear())

          if (today < birthday) years--

          return (years >= 0 && years < 200) ? years : '-'
        },
        goBack () {
          this.$router.go(-1)
        },
        setValidateError () {
          if (this.errors.items && this.errors.items.length > 0) {
            this.errors.items.forEach(item => {
              this.$nextTick(() => {
                document.getElementsByName(item.field)[0].classList.add('error')
              })
            })
            this.$toast.warning(
              '필수값을 확인해주세요.',
              this.ToastSettings
            )
          }
        }
      }
    })
  }
}
