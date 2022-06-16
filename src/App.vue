<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: 'App',
  async created () {
    this.collectionList.forEach(async (item) => {
      this.$store.dispatch(`manage/set${item}`, item)
    })
    this.$axios.defaults.headers.common.Authorization = `Bearer ${this.$cookies.get('accessToken')}`
    this.getUserProfile()
  },
  data () {
    return {
      collectionList: [
        '장소_관리',
        'Origin_관리',
        '균종_관리',
      ]
    }
  },
  methods: {
    getUserProfile () {
      const apiURL = `${this.ENV_CUOME}/auth/profile`
      const data = {}
      this.$axios({
        method: 'get',
        url: apiURL,
        data
      }).then(result => {
        this.$store.commit('user/setUser', result.data)
      })
    },
  }
}
</script>

<style lang="scss">
.fade-enter-active { transition: opacity 1s }

.fade-enter,
.fade-leave-to { opacity: 0 }

@import '@/assets/scss/reset.scss';
@import '@/assets/scss/contents.scss';
@import '@/assets/scss/search.scss';
@import '@/assets/scss/form.scss';
@import '@/assets/scss/table.scss';
@import '@/assets/scss/button.scss';
@import '@/assets/scss/modal.scss';
@import '@/assets/scss/tree.scss';
@import '@/assets/scss/tooltip.scss';
@import '@/assets/scss/common.scss';
</style>
