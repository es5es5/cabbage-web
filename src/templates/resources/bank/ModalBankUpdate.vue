<template>
  <modal
    name="ModalBankUpdate"
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
      <h3 class="header">뱅크 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalBankUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>균주 정보</legend>
            <div class="modalRow row-3">
              <div class="column column-1">
                <label for="category" class="required">구분</label>
                <select name="category" id="category" v-model="modalForm.category" v-validate="'required'" disabled>
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
            <Legend>
              <span slot="title">보관 정보</span>
              <div slot="action">
                <button type="button" class="btn small" @click="addTable">추가</button>
              </div>
            </Legend>
            <div class="table_wrap table-hover table_wrap-scoll-y">
              <table>
                <caption>보관 리스트</caption>
                <colgroup>
                  <col style="width: 1rem;">
                  <col style="width: 10rem;">
                  <col style="width: 2rem;">
                  <col style="width: 2rem;">
                  <col style="width: 1.5rem;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">보관장소</th>
                    <th scope="col">액체</th>
                    <th scope="col">분말</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
              </table>
              <div class="table_scroll">
                <table>
                  <colgroup>
                    <col style="width: 1rem;">
                    <col style="width: 10rem;">
                    <col style="width: 2rem;">
                    <col style="width: 2rem;">
                    <col style="width: 1.5rem;">
                  </colgroup>
                  <tbody class="text-center">
                    <tr v-for="(stock, sIndex) in stockPlacementList" :key="sIndex">
                      <td><span>{{ sIndex + 1 }}</span></td>
                      <td>
                        <select :name="`stock_${sIndex}`" :id="`stock_${sIndex}`" v-model="stock.stockPlacementId">
                          <option value="">선택</option>
                          <option :value="place.id" v-for="(place, index) in placementList" :key="index">{{ place.name }}</option>
                        </select>
                      </td>
                      <td><input type="number" v-model="stock.liquidCount"></td>
                      <td><input type="number" v-model="stock.powderCount"></td>
                      <td><button type="button" class="btn error small" @click="removeTable(index)">삭제</button></td>
                    </tr>
                    <no-data-message :list="stockPlacementList" :colspan="5" message="보관 정보가 없습니다"></no-data-message>
                  </tbody>
                </table>
              </div>
              <table v-if="stockPlacementList !== []">
                <colgroup>
                  <col style="width: 1rem;">
                  <col style="width: 10rem;">
                  <col style="width: 2rem;">
                  <col style="width: 2rem;">
                  <col style="width: 1.5rem;">
                </colgroup>
                <tfoot>
                  <tr>
                    <td colspan="2"><strong>Total</strong></td>
                    <td><span>{{ modalForm.liquidCountTotal }}</span></td>
                    <td><span>{{ modalForm.powderCountTotal }}</span></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
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
        <button class="btn warning" @click="doUpdate">수정</button>
        <button class="btn error" @click="doDelete">삭제</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalBankUpdate',
  created () {
  },
  computed: {
    _Genus () { return this.genusList.filter(item => item.type === 'Genus') || [] },
    _Species () { return this.genusList.filter(item => item.type === 'Species') || [] },
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    },
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
      stockPlacementList: [],
      modalForm: {
        category: '',
        genusId: '',
        speciesId: '',
        originId: '',
        bankNumber: '',
        rentPlacementId: '',
        gettingDate: '',
        sequencing: '',
        safetyAnalysis: '',
        immunaryTest: '',
        etcActivity: '',
        wholeGenome: '',
      }
    }
  },
  methods: {
    openEvent () {
      this.getContent()
      this.getBankStockPlacementList()
    },
    closeEvent () { this.$emit('callback') },
    initData () {
      this.stockPlacementList = []
      this.modalForm = {
        category: '',
        genusId: '',
        speciesId: '',
        originId: '',
        bankNumber: '',
        rentPlacementId: '',
        gettingDate: '',
        sequencing: '',
        safetyAnalysis: '',
        immunaryTest: '',
        etcActivity: '',
        wholeGenome: '',
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/bank/${this.id}`

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
    async getBankStockPlacementList () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/bank/${this.id}/stock-placement`

      this.$axios({
        method: 'get',
        url: apiURL,
        data
      }).then(result => {
        this.stockPlacementList = result.data
      }).catch(error => {
        console.error(error)
      })
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        const data = {}
        const apiURL = `${this.ENV_CUOME}/bank/${this.id}`

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
          this.$modal.hide('ModalBankUpdate')
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      const a = await this.postBankStockPlacementList()
      console.log(a)
      if (await this.$validator.validate()) {
        const data = this.modalForm
        const url = `${this.ENV_CUOME}/bank/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBankUpdate')
          }).catch(error => {
            throw new Error(error)
          })
      } else {
        this.setValidateError()
      }
    },
    async postBankStockPlacementList () {
      if (this.stockPlacementList.some(item => item.stockPlacementId === '')) {
        this.$toast.warning(
          '보관 정보를 입력하세요',
          this.ToastSettings
        )
        return Promise.reject(false)
      } else {
        const data = this.stockPlacementList
        const url = `${this.ENV_CUOME}/bank/${this.id}/stock-placement`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBankUpdate')
            return Promise.resolve(true)
          }).catch(error => {
            return Promise.reject(error)
          })
      }
    },
    addTable () {
      this.stockPlacementList.push({
        id: this.COMMON.UUID(),
        stockPlacementId: '',
        liquidCount: 0,
        powderCount: 0,
      })
    },
    removeTable (index) {
      this.stockPlacementList.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.table_scroll {
  max-height: 180px;
}
</style>
