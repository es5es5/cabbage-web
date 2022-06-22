<template>
  <modal
    name="ModalGenusUpdate"
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
      <h3 class="header">속·종 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalGenusUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="이름" class="required">이름</label>
                <input type="text" id="이름" name="이름" v-model="modalForm.name" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="메모">메모</label>
                <input type="text" id="메모" name="메모" v-model="modalForm.memo">
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
  name: 'ModalGenusUpdate',
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
        name: '',
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
        name: '',
        memo: '',
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/genus/${this.id}`

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
        const apiURL = `${this.ENV_CUOME}/genus/${this.id}`

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
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/genus/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalGenusUpdate')
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
