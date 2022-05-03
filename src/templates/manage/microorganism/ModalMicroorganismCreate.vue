<template>
  <modal
    name="ModalMicroorganismCreate"
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
      <h3 class="header">농업균주 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalMicroorganismCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="균종" class="required">균종</label>
                <input type="text" id="균종" v-model="modalForm.균종">
              </div>
              <div class="column column-1">
                <label for="균주번호">균주번호</label>
                <input type="text" id="균주번호" v-model="modalForm.균주번호">
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
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'ModalMicroorganismCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      // rem 으로 작성
      width: '80',
      height: '43',
      modalForm: {
        균종: '',
        균주번호: '',
      }
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        균종: '',
        균주번호: '',
      }
    },
    async doCreate () {
      if (
        this.idolForm.name === '' ||
        this.idolForm.mbti === '' ||
        this.idolForm.birthday === ''
      ) {
        this.$toast.warning(
          '필수 입력값을 채워주세요.',
          this.ToastSettings
        )
        return false
      } else {
        await setDoc(doc(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION, this.COMMON.UUID()), this.idolForm)
        this.initData()
        this.$toast.success(
          '등록되었습니다.',
          this.ToastSettings
        )
        this.$emit('callback')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
