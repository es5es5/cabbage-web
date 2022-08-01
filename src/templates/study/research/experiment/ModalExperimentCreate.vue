<template>
  <modal
    name="ModalExperimentCreate"
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
      <h3 class="header">자료 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalExperimentCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <Legend>
              <span slot="title">기본 정보</span>
            </Legend>

            <div class="modalRow row">
              <div class="column column">
                <label for="name" class="required">이름</label>
                <input type="text" id="name" name="name" v-model="modalForm.name">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="startDate-input">취득일자</label>
                <DatePicker
                  id="startDate"
                  v-model="modalForm.startDate"
                  format="YYYY-MM-DD"
                />
              </div>
              <div class="column column-1">
                <label for="maker">제조사</label>
                <input type="text" id="maker" name="maker" v-model="modalForm.maker">
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
  name: 'ModalExperimentCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        category: '장비',
        serialNumber: '',
        name: '',
        placement: '',
        count: '0',
        startDate: '',
        maker: '',
        memo: '',
      }
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        category: '장비',
        serialNumber: '',
        name: '',
        placement: '',
        count: '0',
        startDate: '',
        maker: '',
        memo: '',
      }
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/research/experiment`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalExperimentCreate')
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
