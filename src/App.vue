<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

    <vue-progress-bar />
  </div>
</template>

<script>
import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'App',
  data () {
    return {
      collectionList: [
        '장소_관리'
      ]
    }
  },
  async created () {
    this.collectionList.forEach(async (item) => {
      const snapshots = await getDocs(collection(firestore, item))
      this.$store.commit(`manage/set${item}`, snapshots.docs.map(doc => doc.data()))
    })
  },
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
