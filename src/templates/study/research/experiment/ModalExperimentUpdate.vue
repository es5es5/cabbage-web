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
      <h3 class="header">장비·시약 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalExperimentUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <Legend>
              <span slot="title">기본 정보</span>
            </Legend>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="category" class="required">구분</label>
                <select name="category" id="category" v-model="modalForm.category">
                  <option value="장비">장비</option>
                  <option value="시약">시약</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="serialNumber">일련번호</label>
                <input type="text" id="serialNumber" name="serialNumber" v-model="modalForm.serialNumber">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="name" class="required">이름</label>
                <input type="text" id="name" name="name" v-model="modalForm.name">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="placement">보관장소</label>
                <input type="text" id="placement" name="placement" v-model="modalForm.placement">
              </div>
              <div class="column column-1">
                <label for="count">개수</label>
                <input type="text" id="count" name="count" v-model="modalForm.count">
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
    openEvent () {
      this.getContent()
    },
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
