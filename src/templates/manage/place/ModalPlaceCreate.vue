<template>
  <modal
    name="ModalPlaceCreate"
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
      <div class="closeButton" @click="$modal.hide('ModalPlaceCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row">
              <div class="column column">
                <label for="장소명" class="required">장소명</label>
                <input type="text" id="장소명" v-model="modalForm.장소명">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="메모">메모</label>
                <textarea name="메몹" id="메모" v-model="modalForm.메모"></textarea>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="action_wrap">
        <button class="btn primary" @click.once="doCreate">등록</button>
      </div>
    </div>
  </modal>
</template>

<script>
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'ModalPlaceCreate',
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
        장소명: '',
        메모: '',
        createtime: '',
      }
    }
  },
  methods: {
    openEvent () {
    },
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        장소명: '',
        메모: '',
        createtime: '',
      }
    },
    async doCreate () {
      this.modalForm.createtime = moment().valueOf()
      await setDoc(doc(firestore, '장소_관리', this.COMMON.UUID()), this.modalForm)
      this.initData()
      this.$toast.success(
        '등록되었습니다.',
        this.ToastSettings
      )
      this.$store.dispatch('manage/set장소_관리')
      this.$modal.hide('ModalPlaceCreate')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
