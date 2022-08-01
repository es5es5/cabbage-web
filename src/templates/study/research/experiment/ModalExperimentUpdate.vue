<template>
  <modal
    name="ModalExperimentUpdate"
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
      <h3 class="header">Experiment 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalExperimentUpdate')"></div>
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
                <label for="title" class="required">제목</label>
                <input type="text" id="title" name="title" v-model="modalForm.title">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="startDate">일자</label>
                <DatePicker
                  id="startDate"
                  v-model="modalForm.startDate"
                  format="YYYY-MM-DD"
                />
              </div>
              <div class="column column-1">
                <label for="manager" class="required">담당자</label>
                <input type="text" id="manager" name="manager" v-model="modalForm.manager">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="methodsLink" class="required">Methods</label>
                <input type="text" id="methodsLink" name="methodsLink" v-model="modalForm.methodsLink">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="resultsLink" class="required">Results</label>
                <input type="text" id="resultsLink" name="resultsLink" v-model="modalForm.resultsLink">
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
        <button class="btn warning" @click="doUpdate">수정</button>
        <button class="btn error" @click="doDelete">삭제</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalExperimentUpdate',
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
        startDate: '',
        manager: '',
        methodsLink: '',
        resultsLink: '',
        memo: '',
      }
    }
  },
  methods: {
    openEvent () {
      this.getContent()
    },
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        title: '',
        startDate: '',
        manager: '',
        methodsLink: '',
        resultsLink: '',
        memo: '',
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/research/experiment/${this.id}`

      this.$axios({
        method: 'get',
        url: apiURL,
        data
      }).then(result => {
        this.modalForm = result.data
      }).catch(error => {
        console.error(error)
      })
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        const data = {}
        const apiURL = `${this.ENV_CUOME}/research/experiment/${this.id}`

        this.$axios({
          method: 'delete',
          url: apiURL,
          data
        }).then(result => {
          this.initData()
          this.$toast.success(
            '삭제되었습니다.',
            this.ToastSettings
          )
          this.$modal.hide('ModalExperimentUpdate')
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/research/experiment/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalExperimentUpdate')
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
