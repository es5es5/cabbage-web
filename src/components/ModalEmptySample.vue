<template>
  <modal
    name="ModalEmptySample"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="600"
    :height="400"
    >

    <div class="header_wrap">
      <h3 class="header">Modal Empty Sample</h3>
      <div class="closeButton" @click="$modal.hide('ModalEmptySample')"></div>
    </div>

    <div class="content_wrap">
      <p>Hello, UI Framework.</p>
      <p>It's Modal!</p>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalEmptySample',
  created () {
  },
  computed: {
  },
  data () {
    return {
      // rem 으로 작성
      width: '80',
      height: '43'
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.$emit('callback') }
  }
}
</script>

<style lang="scss" scoped>
</style>
