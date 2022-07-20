<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalBankCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>뱅크 리스트</caption>
        <colgroup>
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Code</th>
            <th scope="col">Genus</th>
            <th scope="col">Species</th>
            <th scope="col">Number</th>
            <th scope="col">Category</th>
            <th scope="col">Origin</th>
            <th scope="col">확보일</th>
            <th scope="col">보관 장소</th>
            <th scope="col">기탁 장소</th>
            <th scope="col">stock<br>(액체 / 분말)</th>
            <th scope="col">입출입</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <Tr v-for="(item, index) in contents" :key="index" @click.native="showModalBankUpdate(item.id)" center>
              <td><span>{{ item.code }}</span></td>
              <td><span>{{ item.genusInfo ? item.genusInfo.name : '' }}</span></td>
              <td><span>{{ item.speciesInfo ? item.speciesInfo.name : '' }}</span></td>
              <td><span>{{ item.bankNumber }}</span></td>
              <td><span>{{ item.category }}</span></td>
              <td><span>{{ item.originInfo ? item.originInfo.name : '' }}</span></td>
              <td><span>{{ item.gettingDate | dateFormat }}</span></td>
              <td><span>{{ item.stockPlacementInfo ? item.stockPlacementInfo.name : '' }}</span></td>
              <td><span>{{ item.rentPlacementInfo ? item.rentPlacementInfo.name : '' }}</span></td>
              <td><span>{{ item.liquidCount }} / {{ item.powderCount }}</span></td>
              <td><button type="button" class="btn small" @click.stop="showModalBankHistory(item.id)">입출입</button></td>
            </Tr>
            <no-data-message :list="contents" :colspan="11"></no-data-message>
          </tbody>
        </table>
      </div>
      <!-- <Pagination
        :totalElement="parseInt(contents.length)"
        :activePage="searchForm.pageIndex"
        :totalPages="searchForm.pageSize"
        :callback="page => {
          searchForm.pageIndex = page
          getContents()
        }">
      </Pagination> -->
      <span class="total">Total: {{ (contents.length || 0) | numberWithComma }}</span>
    </div>
    <ModalBankCreate :genusList="genusList" :placementList="placementList" :originList="originList" @callback="getContents" />
    <ModalBankUpdate :genusList="genusList" :placementList="placementList" :originList="originList" :id="selectedId" @callback="getContents" />
    <ModalBankHistory :id="selectedId" />
  </main>
</template>

<script>
import ModalBankHistory from './ModalBankHistory'
import ModalBankCreate from './ModalBankCreate'
import ModalBankUpdate from './ModalBankUpdate'

export default {
  name: 'BankList',
  async created () {
    this.getContents()
    this.getGenusList()
    this.getPlacementList()
    this.getOriginList()
  },
  watch: {
  },
  components: {
    ModalBankHistory,
    ModalBankCreate,
    ModalBankUpdate,
  },
  data () {
    return {
      selectedId: '',
      contents: [],
      genusList: [],
      placementList: [],
      originList: [],
      searchForm: {
        pageIndex: 1,
        pageSize: 15,
      },
    }
  },
  computed: {
  },
  methods: {
    searchList (options) {
      const option = Object.assign({
        route: this.$route,
        router: this.$router,
        form: this.searchForm,
        callback: this.getContents
      }, options)

      this.COMMON.searchPagination(option)
    },
    showModalBankCreate () {
      this.$modal.show('ModalBankCreate')
    },
    showModalBankHistory (id) {
      this.selectedId = id
      this.$modal.show('ModalBankHistory')
    },
    showModalBankUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalBankUpdate')
    },
    getGenusList () {
      const data = this.modalForm
      const url = `${this.ENV_CUOME}/genus`

      this.$axios({ method: 'get', url, data })
        .then(result => {
          this.genusList = result.data
        }).catch(error => {
          throw new Error(error)
        })
    },
    getPlacementList () {
      const data = this.modalForm
      const url = `${this.ENV_CUOME}/placement`

      this.$axios({ method: 'get', url, data })
        .then(result => {
          this.placementList = result.data
        }).catch(error => {
          throw new Error(error)
        })
    },
    getOriginList () {
      const data = this.modalForm
      const url = `${this.ENV_CUOME}/origin`

      this.$axios({ method: 'get', url, data })
        .then(result => {
          this.originList = result.data
        }).catch(error => {
          throw new Error(error)
        })
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/bank`)
        .then(result => {
          this.contents = result.data
          this.$Progress.finish()
        })
        .catch(error => {
          this.$Progress.fail()
          throw new Error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
