<template>
  <modal
    name="ModalScheduleCreate"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="550"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">일정 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalScheduleCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row">
              <div class="column column">
                <label for="name" class="required">제목</label>
                <input type="text" id="name" name="name" v-model="modalForm.name" v-validate="'required'">
              </div>
            </div>

            <div class="modalRow row-4">
              <div class="column column-3">
                <label for="start-input" class="required">일시</label>
                <DatePicker
                  id="start"
                  v-model="modalForm.start"
                  format="YYYY-MM-DD HH:mm"
                  :minuteInterval="1"
                />
              </div>
              <div class="column column-1">
                <input type="checkbox" name="allDay" id="allDay" v-model="modalForm.allDay">
                <label for="allDay">하루종일</label>
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="memo">메모</label>
                <textarea name="memo" id="memo" v-model="modalForm.memo" />
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="action_wrap">
        <button class="btn primary" @click="doCreate">등록</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalScheduleCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        type: 'Schedule',
        name: '',
        memo: '',
      }
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        type: 'Schedule',
        name: '',
        memo: '',
      }
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/schedule`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalScheduleCreate')
          }).catch(error => {
            throw new Error(error)
          })
      } else {
        this.setValidateError()
        $event.target.disabled = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
