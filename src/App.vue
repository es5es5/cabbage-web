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
  },
  data () {
    return {
    }
  },
  methods: {
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
