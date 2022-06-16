<template>
  <div id="mainLayout">
    <SideBar />
    <Header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import Header from '@/components/Header'

export default {
  name: 'MainLayout',
  created () {
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
  components: {
    SideBar,
    Header
  },
  methods: {
    getUserProfile () {
      if (!this.$cookies.get('accessToken')) return
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

<style lang="scss" scoped>
#mainLayout {
  @include clearfix;
}
</style>
