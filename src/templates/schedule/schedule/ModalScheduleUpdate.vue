<template>
  <modal
    name="ModalScheduleUpdate"
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
      <h3 class="header">일정 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalScheduleUpdate')"></div>
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
        <button class="btn warning" @click="doUpdate">수정</button>
        <button class="btn error" @click="doDelete">삭제</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalScheduleUpdate',
  created () {
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        title: '',
        allDay: true,
        memo: '',
      }
    }
  },
  methods: {
    openEvent () { this.getContents() },
    closeEvent () {
      this.initData()
      this.$emit('callback')
    },
    initData () {
      this.modalForm = {
        title: '',
        allDay: true,
        memo: '',
      }
    },
    getContents () {
      this.$axios
        .get(`${this.ENV_CUOME}/schedule/${this.id}`)
        .then(result => {
          this.modalForm = result.data
        })
        .catch(error => {
          throw new Error(error)
        })
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/schedule/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            console.log(result)
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
          }).catch(error => {
            throw new Error(error)
          })
        this.$emit('callback-update')
        this.$modal.hide('ModalScheduleUpdate')
      } else {
        this.setValidateError()
        $event.target.disabled = false
      }
    },
    async doDelete ($event) {
      const data = {}
      const url = `${this.ENV_CUOME}/schedule/${this.id}`
      if (confirm('삭제하시겠습니까?')) {
        this.$axios({ method: 'delete', url, data })
          .then(result => {
            console.log(result)
            this.$toast.success(
              '삭제되었습니다.',
              this.ToastSettings
            )
            this.$emit('callback')
            this.$modal.hide('ModalScheduleUpdate')
          }).catch(error => {
            throw new Error(error)
          })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
