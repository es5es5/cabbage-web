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
            <Legend>
              <span slot="title">접속 정보</span>
              <div slot="action">
                <button type="button" class="btn small" @click="changePassword = true">비밀번호 변경</button>
              </div>
            </Legend>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="username" class="required">아이디</label>
                <input type="text" id="username" name="username" disabled v-model="modalForm.username" v-validate="'required'">
              </div>
            </div>
            <transition name="fade">
              <div v-if="changePassword">
                <div class="modalRow row-2">
                  <div class="column column-1">
                    <label for="password" class="required">현재<br>비밀번호</label>
                    <input type="password" id="password" name="password" v-model="modalForm.password" v-validate="'required'">
                  </div>
                </div>
                <div class="modalRow row-2">
                  <div class="column column-1">
                    <label for="password1" class="required">비밀번호</label>
                    <input type="password" id="password1" name="password1" v-model="changePasswordForm.password1" v-validate="'required'">
                  </div>
                  <div class="column column-1">
                    <label for="password2" class="required">비밀번호<br>확인</label>
                    <input type="password" id="password2" name="password2" v-model="changePasswordForm.password2" v-validate="'required'">
                  </div>
                </div>
              </div>
            </transition>
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

      <transition name="fade">
        <div class="action_wrap" v-if="changePassword">
          <button class="btn warning" @click="doUpdate">수정</button>
        </div>
      </transition>
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
      changePassword: false,
      changePasswordForm: {
        password1: '',
        password2: '',
      },
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
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = {
          username: this.modalForm.username,
          password: this.modalForm.password,
          password1: this.changePasswordForm.password1,
          password2: this.changePasswordForm.password2,
        }
        const url = `${this.ENV_CUOME}/auth/change-password`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            console.log(result)
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
