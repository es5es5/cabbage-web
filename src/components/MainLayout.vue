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
  components: {
    SideBar,
    Header
  }
}
</script>

<style lang="scss" scoped>
#mainLayout {
  @include clearfix;
}
</style>
