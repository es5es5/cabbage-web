<template>
  <modal
    name="ModalExtraCreate"
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
      <h3 class="header">기타 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalExtraCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>균주 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="균종" class="required">균종</label>
                <select name="균종" id="균종" v-model="modalForm.균종" v-validate="'required'">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _균종" :key="`${index}_균종`">{{ item.name }}</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="균주번호" class="required">균주번호</label>
                <input type="text" id="균주번호" name="균주번호" v-model="modalForm.균주번호" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="Origin">Origin</label>
                <select name="Origin" id="Origin" v-model="modalForm.Origin">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _Origin" :key="`${index}_Origin`">{{ item.name }}</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>보관 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="보관장소">보관장소</label>
                <select name="보관장소" id="보관장소" v-model="modalForm.보관장소">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_보관장소`">{{ item.name }}</option>
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

            <div class="modalRow row-3">
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
                <select name="기탁장소" id="기탁장소" v-model="modalForm.기탁장소">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_기탁장소`">{{ item.name }}</option>
                </select>
              </div>

              <div class="column column-1">
                <label for="확보일-input">확보일</label>
                <DatePicker
                  id="확보일"
                  v-model="modalForm.확보일"
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>특허 정보</legend>
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
                <label for="활성테스트">활성테스트</label>
                <input type="text" name="활성테스트" id="활성테스트" v-model="modalForm.활성테스트">
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
        <button class="btn primary" @click="doCreate">등록</button>
      </div>
    </div>
  </modal>
</template>

<script>
import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'ModalExtraCreate',
  created () {
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
    openEvent () {},
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
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        this.modalForm.createtime = moment().valueOf()
        await setDoc(doc(firestore, '기타균주', this.COMMON.UUID()), this.modalForm)
        this.initData()
        this.$toast.success(
          '등록되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalExtraCreate')
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
