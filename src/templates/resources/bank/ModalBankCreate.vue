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
                <label for="category" class="required">구분</label>
                <select name="category" id="category" v-model="modalForm.category" v-validate="'required'">
                  <option value="">선택</option>
                  <option value="식품">식품</option>
                  <option value="농업">농업</option>
                  <option value="수산">수산</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="Origin" class="required">Origin</label>
                <select name="Origin" id="Origin" v-model="modalForm.originId" v-validate="'required'">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in originList" :key="index">{{ item.name }}</option>
                </select>
              </div>
            </div>

            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="Genus" class="required">Genus</label>
                <select name="Genus" id="Genus" v-model="modalForm.genusId" v-validate="'required'">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _Genus" :key="index">{{ item.name }}</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="Species" class="required">Species</label>
                <select name="Species" id="Species" v-model="modalForm.speciesId" v-validate="'required'">
                  <option value="">선택</option>
                  <option :value="item.id" v-for="(item, index) in _Species" :key="index">{{ item.name }}</option>
                </select>
              </div>
              <div class="column column-1">
                <label for="bankNumber" class="required">No.</label>
                <input type="text" id="bankNumber" name="bankNumber" v-model="modalForm.bankNumber" v-validate="'required'">
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
        <p style="font-weight: bold;">※보관 정보 입력은 등록 후에 해주세요.</p>
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
    _Genus () { return this.genusList.filter(item => item.type === 'Genus') || [] },
    _Species () { return this.genusList.filter(item => item.type === 'Species') || [] },
  },
  props: {
    genusList: {
      type: Array,
      default: () => [],
    },
    placementList: {
      type: Array,
      default: () => [],
    },
    originList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      modalForm: {
        category: '',
        genusId: '',
        speciesId: '',
        originId: '',
        bankNumber: '',
        stockPlacementId: '',
        rentPlacementId: '',
        gettingDate: this.COMMON.getToDate(),
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
        category: '',
        genusId: '',
        speciesId: '',
        originId: '',
        bankNumber: '',
        stockPlacementId: '',
        rentPlacementId: '',
        gettingDate: this.COMMON.getToDate(),
        liquidCount: 0,
        powderCount: 0,
        sequencing: '',
        safetyAnalysis: '',
        immunaryTest: '',
        etcActivity: '',
        wholeGenome: '',
      }
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/bank`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBankCreate')
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
