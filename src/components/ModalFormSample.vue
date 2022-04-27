<template>
  <modal
    name="ModalFormSample"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="600"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">Modal Form Sample</h3>
      <div class="closeButton" @click="$modal.hide('ModalFormSample')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row-4">
              <div class="column column-2">
                <label for="">일시</label>
                <input type="text">
              </div>
              <div class="column">
                <select name="" id="" class="full"></select>
              </div>
              <div class="column">
                <select name="" id="" class="full"></select>
              </div>
            </div>

            <div class="modalRow">
              <div class="column">
                <label for="">제목</label>
                <input type="text">
              </div>
            </div>

          </fieldset>
        </form>
      </div>
      <div class="action_wrap">
        <button class="btn primary">등록</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalFormSample',
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
