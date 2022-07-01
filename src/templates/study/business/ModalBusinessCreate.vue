<template>
  <modal
    name="ModalBusinessCreate"
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
      <h3 class="header">사업 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalBusinessCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>사업 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-2">
                <label for="businessTitle" class="required">사업명</label>
                <input type="text" id="businessTitle" name="businessTitle" v-model="modalForm.businessTitle" v-validate="'required'">
              </div>
              <div class="column column-1">
                <label for="money">사업비</label>
                <input type="number" id="money" name="money" v-model.number="modalForm.money">
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
                <label for="supervisor">주관부처</label>
                <input type="text" id="supervisor" name="supervisor" v-model.number="modalForm.supervisor">
              </div>
              <div class="column column-1">
                <label for="specializedOrganization">전문기관</label>
                <input type="text" id="specializedOrganization" name="specializedOrganization" v-model.number="modalForm.specializedOrganization">
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

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="projectNo">과제번호</label>
                <input type="text" id="projectNo" name="projectNo" v-model.number="modalForm.projectNo">
              </div>
              <div class="column column-1">
                <label for="businessManager">담당자</label>
                <input type="text" id="businessManager" name="businessManager" v-model.number="modalForm.businessManager">
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
        <button class="btn primary" @click="doCreate">등록</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalBusinessCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        businessTitle: '',
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
    openEvent () {},
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        businessTitle: '',
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
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/business`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBusinessCreate')
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
