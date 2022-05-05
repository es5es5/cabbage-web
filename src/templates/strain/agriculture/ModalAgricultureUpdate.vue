<template>
  <modal
    name="ModalAgricultureUpdate"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="900"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">농업균주 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalAgricultureUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="균종" class="required">균종</label>
                <input type="text" id="균종" v-model="modalForm.균종">
              </div>
              <div class="column column-1">
                <label for="균주번호">균주번호</label>
                <input type="text" id="균주번호" v-model="modalForm.균주번호">
              </div>
              <div class="column column-1">
                <label for="Origin" class="required">Origin</label>
                <input type="text" id="Origin" v-model="modalForm.Origin">
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="확보일-input">확보일</label>
                <DatePicker
                  id="확보일"
                  v-model="modalForm.확보일"
                />
              </div>

              <div class="column column-1">
                <label for="기탁여부Y" class="required">기탁여부</label>
                <div class="checkbox_wrap">
                  <input type="radio" name="기탁여부Yn" id="기탁여부Y" :value="true" v-model="modalForm.기탁여부">
                  <label for="기탁여부Y">Y</label>
                  <input type="radio" name="기탁여부Yn" id="기탁여부N" :value="false" v-model="modalForm.기탁여부">
                  <label for="기탁여부N">N</label>
                </div>
              </div>

              <div class="column column-1">
                <label for="기탁장소">기탁장소</label>
                <select name="기탁장소" id="기탁장소" :disabled="!this.modalForm.기탁여부" v-model="modalForm.기탁장소">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _장소" :key="index">{{ item.장소명 }}</option>
                </select>
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="보관장소">보관장소</label>
                <select name="보관장소" id="보관장소" v-model="modalForm.보관장소">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _장소" :key="index">{{ item.장소명 }}</option>
                </select>
              </div>

              <div class="column column-1">
                <label for="stock갯수">stock갯수</label>
                <input type="number" id="stock갯수" v-model="modalForm.stock갯수">
              </div>

              <div class="column column-1">
                <label for="현재stock">현재stock</label>
                <input type="number" id="현재stock" v-model="modalForm.현재stock">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="활성테스트">활성테스트</label>
                <input type="text" name="활성테스트" id="활성테스트" v-model="modalForm.활성테스트">
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column">
                <label for="특허">특허</label>
                <input type="text" name="특허" id="특허" v-model="modalForm.특허">
              </div>

              <div class="column column-2">
                <label for="특허내용">특허내용</label>
                <input type="text" name="특허내용" id="특허내용" v-model="modalForm.특허내용">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="메모">메모</label>
                <textarea name="메모" id="메모" v-model="modalForm.메모"></textarea>
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
  name: 'ModalAgricultureUpdate',
  created () {
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  computed: {
    _장소 () { return this.$store.getters['manage/get장소_관리List'] },
    _Origin () { return this.$store.getters['manage/getOrigin_관리List'] },
    _균종 () { return this.$store.getters['manage/get균종_관리List'] },
  },
  data () {
    return {
      modalForm: {
        균종: '',
        균주번호: '',
        Origin: '',
        확보일: '',
        기탁여부: false,
        기탁장소: '',
        보관장소: '',
        stock갯수: '',
        현재stock: '',
        활성테스트: '',
        특허: '',
        특허내용: '',
        메모: '',
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
        균종: '',
        균주번호: '',
        Origin: '',
        확보일: '',
        기탁여부: false,
        기탁장소: '',
        보관장소: '',
        stock갯수: '',
        현재stock: '',
        활성테스트: '',
        특허: '',
        특허내용: '',
        메모: '',
      }
    },
    async getContent () {
      const content = await getDoc(doc(firestore, '농업균주', this.id))
      this.modalForm = content.data()
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        await deleteDoc(doc(firestore, '농업균주', this.id))
        this.$toast.success(
          '삭제되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalAgricultureUpdate')
      }
    },
    async doUpdate () {
      await setDoc(doc(firestore, '농업균주', this.id), this.modalForm)
      this.initData()
      this.$toast.success(
        '수정되었습니다.',
        this.ToastSettings
      )
      this.$modal.hide('ModalAgricultureUpdate')
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
