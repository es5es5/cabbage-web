<template>
  <modal
    name="ModalIdolUpdate"
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
      <h3 class="header">아이돌 MBTI 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalIdolUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="MBTI" class="required">MBTI</label>
                <select name="MBTI" id="MBTI" v-model="idolForm.mbti">
                  <option value="ISTJ">ISTJ</option>
                  <option value="ISTP">ISTP</option>
                  <option value="ISFJ">ISFJ</option>
                  <option value="ISFP">ISFP</option>
                  <option value="INTJ">INTJ</option>
                  <option value="INTP">INTP</option>
                  <option value="INFJ">INFJ</option>
                  <option value="INFP">INFP</option>
                  <option value="ESTJ">ESTJ</option>
                  <option value="ESTP">ESTP</option>
                  <option value="ESFJ">ESFJ</option>
                  <option value="ESFP">ESFP</option>
                  <option value="ENTJ">ENTJ</option>
                  <option value="ENTP">ENTP</option>
                  <option value="ENFJ">ENFJ</option>
                  <option value="ENFP">ENFP</option>
                </select>
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="본명" class="required">본명</label>
                <input type="text" id="본명" v-model="idolForm.name">
              </div>
              <div class="column column-1">
                <label for="예명">예명</label>
                <input type="text" id="예명" v-model="idolForm.nick">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="생년월일">생년월일</label>
                <input type="date" id="생년월일" v-model="idolForm.birthday">
              </div>
              <div class="column column-1">
                <label for="성별" class="required">성별</label>
                <select name="성별" id="성별" v-model="idolForm.gender">
                  <option value="남자">남자</option>
                  <option value="여자">여자</option>
                  <option value="무성">무성</option>
                </select>
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="회사">회사</label>
                <input type="text" id="회사" v-model="idolForm.company">
              </div>
              <div class="column column-1">
                <label for="그룹">그룹</label>
                <input type="text" id="그룹" v-model="idolForm.group">
              </div>
            </div>
          </fieldset>
        </form>
      </div>
      <div class="action_wrap">
        <button class="btn error pull-left" @click="doDelete">삭제</button>
        <button class="btn warning pull-right" @click="doUpdate">수정</button>
      </div>
    </div>
  </modal>
</template>

<script>
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'

export default {
  name: 'ModalIdolUpdate',
  created () {
  },
  props: {
    id: {
      type: String,
      require: true
    }
  },
  computed: {
  },
  data () {
    return {
      // rem 으로 작성
      width: '80',
      height: '43',
      idolForm: {
        name: '',
        nick: '',
        company: '',
        gender: '남자',
        birthday: moment().format('YYYY-MM-DD'),
        country: '',
        religion: '',
        natalArea: '',
        group: '',
        mbti: 'ENTP',
        history: '',
        keyword: [],
        position: '',
      }
    }
  },
  methods: {
    openEvent () {
      this.getIdol()
    },
    closeEvent () { this.$emit('callback') },
    initData () {
      this.idolForm = {
        name: '',
        nick: '',
        company: '',
        gender: '',
        age: '',
        birthday: moment().format('1999-MM-DD'),
        country: '',
        religion: '',
        natalArea: '',
        group: '',
        mbti: 'ENTP',
        history: '',
        keyword: [],
        position: '',
      }
    },
    async getIdol () {
      const docData = await getDoc(doc(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION, this.id))
      this.idolForm = docData.data()
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        await deleteDoc(doc(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION, this.id))
        this.$modal.hide('ModalIdolUpdate')
        this.$toast.success(
          '삭제되었습니다.',
          this.ToastSettings
        )
      }
    },
    async doUpdate () {
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
        await setDoc(doc(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION, this.id), this.idolForm)
        this.initData()
        this.$toast.success(
          '수정되었습니다.',
          this.ToastSettings
        )
        this.$modal.hide('ModalIdolUpdate')
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
