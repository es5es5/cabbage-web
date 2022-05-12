<template>
  <modal
    name="ModalPlaceUpdate"
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
      <h3 class="header">장소 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalPlaceUpdate')"></div>
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
        <button class="btn warning" @click="doUpdate">수정</button>
        <button class="btn error" @click="doDelete">삭제</button>
      </div>
    </div>
  </modal>
</template>

<script>
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'ModalPlaceUpdate',
  created () {
  },
  computed: {
  },
  props: {
    id: {
      type: String,
      require: true
    }
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
      this.getContent()
    },
    closeEvent () {
      this.$emit('callback')
      this.$store.dispatch('manage/set장소_관리')
    },
    initData () {
      this.modalForm = {
        name: '',
        memo: '',
        createtime: '',
      }
    },
    async getContent () {
      const content = await getDoc(doc(firestore, '장소_관리', this.id))
      this.modalForm = content.data()
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        await deleteDoc(doc(firestore, '장소_관리', this.id))
        this.$toast.success(
          '삭제되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalPlaceUpdate')
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        await setDoc(doc(firestore, '장소_관리', this.id), this.modalForm)
        this.initData()
        this.$toast.success(
          '수정되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalPlaceUpdate')
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
