<template>
  <modal
    name="ModalBusinessUpdate"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="800"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">주제 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalBusinessUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>사업 정보</legend>
            <div class="modalRow row">
              <div class="column column">
                <label for="title" class="required">사업명</label>
                <input type="text" id="title" name="title" v-model="modalForm.title" v-validate="'required'">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="startDate-input">시작 날짜</label>
                <DatePicker
                  id="startDate"
                  v-model="modalForm.startDate"
                />
              </div>
              <div class="column column-1">
                <label for="endDate-input">끝 날짜</label>
                <DatePicker
                  id="endDate"
                  v-model="modalForm.endDate"
                />
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="money">사업비</label>
                <input type="number" id="money" name="money" v-model.number="modalForm.money">
              </div>
              <div class="column column-1">
                <label for="businessManager">담당자</label>
                <input type="text" id="businessManager" name="businessManager" v-model.number="modalForm.businessManager">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <Legend>
              <span slot="title">과제 정보</span>
            </Legend>

            <div class="modalRow row">
              <div class="column column">
                <label for="projectTitle">과제명</label>
                <textarea name="projectTitle" id="projectTitle" v-model="modalForm.projectTitle"></textarea>
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="supervisor">주관부처</label>
                <input type="text" id="supervisor" name="supervisor" v-model.number="modalForm.supervisor">
              </div>
              <div class="column column-1">
                <label for="specializedOrganization">전문기관</label>
                <input type="text" id="specializedOrganization" name="specializedOrganization" v-model.number="modalForm.specializedOrganization">
              </div>
              <div class="column column-1">
                <label for="projectNo">과제번호</label>
                <input type="text" id="projectNo" name="projectNo" v-model.number="modalForm.projectNo">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <Legend>
              <span slot="title">현황</span>
            </Legend>

            <div class="modalRow row-4">
              <div class="column column-1">
                <label for="projectState">과제 상태</label>
                <select name="projectState" id="projectState" v-model="modalForm.projectState">
                  <option value="대기">대기</option>
                  <option value="선정">선정</option>
                  <option value="미선정">미선정</option>
                </select>
              </div>
              <div class="column column-3">
                <label for="projectPDF">PDF</label>
                <input type="text" id="projectPDF" name="projectPDF" v-model="modalForm.projectPDF">
              </div>
            </div>
            <div class="modalRow row-4">
              <div class="column column-1">
                <label for="presentationState">발표 상태</label>
                <select name="presentationState" id="presentationState" v-model="modalForm.presentationState">
                  <option value="대기">대기</option>
                  <option value="선정">선정</option>
                  <option value="미선정">미선정</option>
                </select>
              </div>
              <div class="column column-3">
                <label for="presentationPDF">PDF</label>
                <input type="text" id="presentationPDF" name="presentationPDF" v-model="modalForm.presentationPDF">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <Legend>
              <span slot="title">기관 정보</span>
            </Legend>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="supervisorStudyDepartment">주관연구</label>
                <input type="text" id="supervisorStudyDepartment" name="supervisorStudyDepartment" v-model="modalForm.supervisorStudyDepartment">
              </div>
              <div class="column column-1">
                <label for="supervisorStudyManager">책임자</label>
                <input type="text" id="supervisorStudyManager" name="supervisorStudyManager" v-model="modalForm.supervisorStudyManager">
              </div>
            </div>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="jointStudyDepartment">공동연구</label>
                <input type="text" id="jointStudyDepartment" name="jointStudyDepartment" v-model="modalForm.jointStudyDepartment">
              </div>
              <div class="column column-1">
                <label for="jointStudyManager">책임자</label>
                <input type="text" id="jointStudyManager" name="jointStudyManager" v-model="modalForm.jointStudyManager">
              </div>
            </div>
            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="rentStudyDepartment">위탁연구</label>
                <input type="text" id="rentStudyDepartment" name="rentStudyDepartment" v-model="modalForm.rentStudyDepartment">
              </div>
              <div class="column column-1">
                <label for="rentStudyManager">책임자</label>
                <input type="text" id="rentStudyManager" name="rentStudyManager" v-model="modalForm.rentStudyManager">
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
export default {
  name: 'ModalBusinessUpdate',
  created () {
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        title: '',
        startDate: '',
        endDate: '',
        money: 0,
        businessManager: '',
        projectTitle: '',
        supervisor: '',
        specializedOrganization: '',
        projectNo: '',
        projectState: '대기',
        projectPDF: '',
        presentationState: '대기',
        presentationPDF: '',
        supervisorStudyDepartment: '',
        supervisorStudyManager: '',
        jointStudyDepartment: '',
        jointStudyManager: '',
        rentStudyDepartment: '',
        rentStudyManager: '',
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
        title: '',
        startDate: '',
        endDate: '',
        money: 0,
        businessManager: '',
        projectTitle: '',
        supervisor: '',
        specializedOrganization: '',
        projectNo: '',
        projectState: '대기',
        projectPDF: '',
        presentationState: '대기',
        presentationPDF: '',
        supervisorStudyDepartment: '',
        supervisorStudyManager: '',
        jointStudyDepartment: '',
        jointStudyManager: '',
        rentStudyDepartment: '',
        rentStudyManager: '',
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/business/${this.id}`

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
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        const data = {}
        const apiURL = `${this.ENV_CUOME}/business/${this.id}`

        this.$axios({
          method: 'delete',
          url: apiURL,
          data
        }).then(result => {
          this.initData()
          this.$toast.success(
            '삭제되었습니다.',
            this.ToastSettings
          )
          this.$modal.hide('ModalBusinessUpdate')
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        data.consortiumSubs = this.consortiumSubs.map(item => item.name).join(',')

        const url = `${this.ENV_CUOME}/study-Business/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBusinessUpdate')
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
