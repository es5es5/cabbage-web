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

    <div class="header_wrap" :style="`background-color: ${this.modalForm.color} !important;`">
      <h3 class="header">일정 등록</h3>
      <div class="closeButton" @click="doCancel"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row">
              <div class="column column">
                <label for="title" class="required">제목</label>
                <input type="text" id="title" name="title" v-model="modalForm.title" v-validate="'required'">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column">
                <label for="color" class="required">구분</label>
                <select name="color" id="color" v-model="modalForm.color">
                  <option value="#3688D8">실험</option>
                  <option value="#D40201">국책사업</option>
                  <option value="#F6BF25">교육</option>
                  <option value="#0C7F43">세미나 및 학회</option>
                  <option value="#8F24AA">연구미팅</option>
                </select>
              </div>
              <!-- <div class="column column">
                <label for="title" class="required">제목</label>
                <input type="text" id="title" name="title" v-model="modalForm.title" v-validate="'required'">
              </div> -->
            </div>

            <!-- <div class="modalRow row-4">
              <div class="column column-3">
                <label for="start-input" class="required">일시</label>
                <DatePicker
                  id="start"
                  v-model="modalForm.start"
                  format="YYYY-MM-DD HH:mm"
                  minuteInterval="15"
                />
              </div>
              <div class="column column-1">
                <input type="checkbox" name="allDay" id="allDay" v-model="modalForm.allDay">
                <label for="allDay">하루종일</label>
              </div>
            </div> -->

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
        title: '',
        allDay: true,
        memo: '',
        color: '#3688D8',
      }
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.initData() },
    initData () {
      this.modalForm = {
        title: '',
        allDay: true,
        memo: '',
        color: '#3688D8',
      }
    },
    doCancel () {
      this.$emit('callback', false, this.modalForm)
      this.$modal.hide('ModalScheduleCreate')
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        this.$emit('callback', true, this.modalForm)
        this.$modal.hide('ModalScheduleCreate')
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
