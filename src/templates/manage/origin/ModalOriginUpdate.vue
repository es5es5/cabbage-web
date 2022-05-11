<template>
  <modal
    name="ModalOriginUpdate"
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
      <h3 class="header">Origin 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalOriginUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row">
              <div class="column column">
                <label for="name" class="required">name</label>
                <input type="text" id="name" v-model="modalForm.name">
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
  name: 'ModalOriginUpdate',
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
      this.$store.dispatch('manage/setOrigin_관리')
      this.$emit('callback')
    },
    initData () {
      this.modalForm = {
        name: '',
        memo: '',
        createtime: '',
      }
    },
    async getContent () {
      const content = await getDoc(doc(firestore, 'Origin_관리', this.id))
      this.modalForm = content.data()
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        await deleteDoc(doc(firestore, 'Origin_관리', this.id))
        this.$toast.success(
          '삭제되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalOriginUpdate')
      }
    },
    async doUpdate () {
      await setDoc(doc(firestore, 'Origin_관리', this.id), this.modalForm)
      this.initData()
      this.$toast.success(
        '수정되었습니다.',
        this.ToastSettings
      )
      this.$modal.hide('ModalOriginUpdate')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
