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
      <h3 class="header">균종 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalMicroorganismCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row">
              <div class="column column">
                <label for="name" class="required">name</label>
                <input type="text" id="name" name="name" v-validate="'required'" v-model="modalForm.name">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="memo">memo</label>
                <textarea name="memo" id="memo" v-model="modalForm.memo"></textarea>
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
        name: '',
        memo: '',
        createtime: '',
      }
    }
  },
  methods: {
    openEvent () {
    },
    closeEvent () {
      this.$store.dispatch('manage/set균종_관리')
      this.$emit('callback')
    },
    initData () {
      this.modalForm = {
        name: '',
        memo: '',
        createtime: '',
      }
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        this.modalForm.createtime = moment().valueOf()
        await setDoc(doc(firestore, '균종_관리', this.COMMON.UUID()), this.modalForm)
        this.initData()
        this.$toast.success(
          '등록되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalMicroorganismCreate')
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
