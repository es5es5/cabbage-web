<template>
  <modal
    name="ModalUsersCreate"
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
      <h3 class="header">사용자 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalUsersCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>접속 정보</legend>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="username" class="required">아이디</label>
                <input type="text" id="username" name="username" v-model="modalForm.username" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="password" class="required">초기<br>비밀번호</label>
                <input type="text" id="password" name="password" v-model="modalForm.password" v-validate="'required'">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>사용자 정보</legend>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="displayName" class="required">이름</label>
                <input type="text" id="displayName" name="displayName" v-model="modalForm.displayName" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="birthday">생년월일</label>
                <input type="date" id="birthday" name="birthday" v-model="modalForm.birthday">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="position">역할</label>
                <input type="text" id="position" name="position" v-model="modalForm.position" placeholder="ex) 선임연구원, 장비관리, 업체선정">
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
  name: 'ModalUsersCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        username: '',
        password: '',
        displayName: '',
        position: '',
        birthday: '',
        memo: '',
        use: true,
      }
    }
  },
  methods: {
    openEvent () {},
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
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/users`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalUsersCreate')
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
