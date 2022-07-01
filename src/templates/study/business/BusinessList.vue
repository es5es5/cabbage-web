<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalBusinessCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>사업 리스트</caption>
        <colgroup>
          <col style="width: 4rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 20rem;">
          <col style="width: 8rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 8rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">사업명</th>
            <th scope="col">기간</th>
            <th scope="col">과제명</th>
            <th scope="col">사업비</th>
            <th scope="col">주관부처</th>
            <th scope="col">담당자</th>
            <th scope="col">현황</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 4rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 20rem;">
            <col style="width: 8rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 8rem;">
          </colgroup>
          <tbody>
            <Tr v-for="(item, index) in contents" :key="index" @click.native="showModalBusinessUpdate(item.id)" center>
              <Td>{{ item.id }}</Td>
              <Td left>{{ item.businessTitle }}</Td>
              <Td>{{ item.startDate | dateFormat }} ~ {{ item.endDate | dateFormat }}</Td>
              <Td left>{{ item.projectTitle }}</Td>
              <Td right>{{ item.money | numberWithComma }}</Td>
              <Td>{{ item.supervisor }}</Td>
              <Td>{{ item.businessManager }}</Td>
              <Td>{{ item.projectState }} / {{ item.presentationState }}</Td>
            </Tr>
            <no-data-message :list="contents" :colspan="8"></no-data-message>
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
    <ModalBusinessCreate @callback="getContents" />
    <ModalBusinessUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalBusinessCreate from './ModalBusinessCreate'
import ModalBusinessUpdate from './ModalBusinessUpdate'

export default {
  name: 'BusinessList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalBusinessCreate,
    ModalBusinessUpdate,
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
    showModalBusinessCreate () {
      this.$modal.show('ModalBusinessCreate')
    },
    showModalBusinessUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalBusinessUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/business`)
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
