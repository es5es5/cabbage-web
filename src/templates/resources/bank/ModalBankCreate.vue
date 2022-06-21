<template>
  <modal
    name="ModalBankCreate"
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
      <h3 class="header">뱅크 등록</h3>
      <div class="closeButton" @click="$modal.hide('ModalBankCreate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>균주 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="Genus" class="required">Genus</label>
                <select name="Genus" id="Genus" v-model="modalForm.genus" v-validate="'required'">
                  <option value="">선택</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="Species" class="required">Species</label>
                <select name="Species" id="Species" v-model="modalForm.species" v-validate="'required'">
                  <option value="">선택</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="No" class="required">No.</label>
                <input type="text" id="No" name="No" v-model="modalForm.no" v-validate="'required'">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>보관 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="stockPlacementId" class="required">보관 장소</label>
                <select name="stockPlacementId" id="stockPlacementId" v-model="modalForm.stockPlacementId">
                  <option value="">선택</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="rentPlacement" class="required">기탁 장소</label>
                <select name="rentPlacement" id="rentPlacement" v-model="modalForm.rentPlacement" v-validate="'required'">
                  <option value="">선택</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="확보일-input">확보일</label>
                <DatePicker
                  id="확보일"
                  v-model="modalForm.gettingDate"
                />
              </div>
            </div>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="liquidCount" class="required">액체</label>
                <input type="number" id="liquidCount" name="liquidCount" v-model="modalForm.liquidCount">
              </div>
              <div class="column column-1">
                <label for="powderCount" class="required">분말</label>
                <input type="number" id="powderCount" name="powderCount" v-model="modalForm.powderCount">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>특허 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="sequencing">Sequencing</label>
                <input type="text" id="sequencing" name="sequencing" v-model="modalForm.sequencing">
              </div>
              <div class="column column-2">
                <label for="safetyAnalysis">Safety Analysis</label>
                <input type="text" id="safetyAnalysis" name="safetyAnalysis" v-model="modalForm.safetyAnalysis">
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="immunaryTest">Immunary Test</label>
                <input type="text" id="immunaryTest" name="immunaryTest" v-model="modalForm.immunaryTest">
              </div>
              <div class="column column-2">
                <label for="etcActivity">ETC Activity</label>
                <input type="text" id="etcActivity" name="etcActivity" v-model="modalForm.etcActivity">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="wholeGenome">Whole Genome</label>
                <input type="text" id="wholeGenome" name="wholeGenome" v-model="modalForm.wholeGenome">
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
  name: 'ModalBankCreate',
  created () {
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        genus: '',
        species: '',
        no: '',
        stockPlacementId: '',
        rentPlacement: '',
        gettingDate: '',
        liquidCount: 0,
        powderCount: 0,
        sequencing: '',
        safetyAnalysis: '',
        immunaryTest: '',
        etcActivity: '',
        wholeGenome: '',
      }
    }
  },
  methods: {
    openEvent () {},
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        genus: '',
        species: '',
        no: '',
        stockPlacementId: '',
        rentPlacement: '',
        gettingDate: '',
        liquidCount: 0,
        powderCount: 0,
        sequencing: '',
        safetyAnalysis: '',
        immunaryTest: '',
        etcActivity: '',
        wholeGenome: '',
      }
    },
    doCreate () {
      const data = this.modalForm
      const apiURL = `${this.ENV_CUOME}/bank`

      this.$axios({
        method: 'post',
        url: apiURL,
        data
      }).then(result => {
        console.log(result)
      }).catch(error => {
        console.error(error)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
