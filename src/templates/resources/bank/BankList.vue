<template>
  <main>
    <div class="search_wrap">
      <label for="search균주번호">균주번호</label>
      <input id="search균주번호" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalBankCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>농업 균주 리스트</caption>
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
            <th scope="col">No.</th>
            <th scope="col">Category</th>
            <th scope="col">Origin</th>
            <th scope="col">확보일</th>
            <th scope="col">보관 장소</th>
            <th scope="col">기탁장소</th>
            <th scope="col">stock 개수</th>
            <th scope="col">sequencing</th>
            <th scope="col">Whole Genome</th>
            <th scope="col">Safety analysis</th>
            <th scope="col">Immunary Test</th>
            <th scope="col">기타활성</th>
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
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalBankUpdate(item.id)">
              <Td>{{ item.code }}</Td>
              <Td>{{ item.genus }}</Td>
              <Td>{{ item.species }}</Td>
              <Td>{{ item.number }}</Td>
              <Td>{{ item.category }}</Td>
              <Td>{{ item.origin ? item.origin.name : '' }}</Td>
              <Td>{{ item.gettingDate }}</Td>
              <Td>{{ item.stockPlacement }}</Td>
              <Td>{{ item.rentPlacement }}</Td>
              <Td>{{ item.stockCount }}</Td>
              <Td>{{ item.sequencing }}</Td>
              <Td>{{ item.wholeGenome }}</Td>
              <Td>{{ item.safetyAnalysis }}</Td>
              <Td>{{ item.immunaryTest }}</Td>
              <Td>{{ item.etcActivity }}</Td>
            </tr>
            <no-data-message :list="contents" :colspan="15"></no-data-message>
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
    <ModalBankCreate @callback="getContents" />
    <ModalBankUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalBankCreate from './ModalBankCreate'
import ModalBankUpdate from './ModalBankUpdate'

export default {
  name: 'BankList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalBankCreate,
    ModalBankUpdate,
  },
  data () {
    return {
      selectedId: '',
      contents: [],
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
    showModalBankUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalBankUpdate')
    },
    getContents () {
      this.$axios.get(`${this.ENV_CUOME}/bank`)
        .then(result => {
          this.contents = result.data
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
