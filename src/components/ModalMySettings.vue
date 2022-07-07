<template>
  <modal
    name="ModalMySettings"
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
      <h3 class="header">내 정보</h3>
      <div class="closeButton" @click="$modal.hide('ModalMySettings')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>접속 정보</legend>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="username" class="required">아이디</label>
                <input type="text" id="username" name="username" disabled v-model="modalForm.username" v-validate="'required'">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>사용자 정보</legend>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="displayName" class="required">이름</label>
                <input type="text" id="displayName" disabled name="displayName" v-model="modalForm.displayName" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="birthday">생년월일</label>
                <input type="date" id="birthday" disabled name="birthday" v-model="modalForm.birthday">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="position">역할</label>
                <input type="text" id="position" disabled name="position" v-model="modalForm.position" placeholder="ex) 선임연구원, 장비관리, 업체선정">
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      <!-- <div class="action_wrap">
        <button class="btn warning" @click="doUpdate">수정</button>
      </div> -->
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalMySettings',
  created () {
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
    _user () {
      return this.$store.getters['user/getUser']
    }
  },
  data () {
    return {
      modalForm: {
        username: '',
        displayName: '',
        position: '',
        birthday: '',
        memo: '',
        use: true,
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
        username: '',
        password: '',
        displayName: '',
        position: '',
        birthday: '',
        memo: '',
        use: true,
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/users/${this._user.id}`

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
        const apiURL = `${this.ENV_CUOME}/users/${this.id}`

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
          this.$modal.hide('ModalMySettings')
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/users/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalMySettings')
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
