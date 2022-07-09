<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalPaperCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>자료 리스트</caption>
        <colgroup>
          <col style="width: 5rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">제목</th>
            <th scope="col">일자</th>
            <th scope="col">담당자</th>
            <th scope="col">Methods</th>
            <th scope="col">Results</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 5rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalPaperUpdate(item.id)">
              <Td>{{ item.id }}</Td>
              <Td>{{ item.title }}</Td>
              <Td>{{ item.startDate }}</Td>
              <Td>{{ item.writerInfo ? item.writerInfo.displayName : '' }}</Td>
              <Td>{{ item.methods }}</Td>
              <Td>{{ item.results }}</Td>
            </tr>
            <no-data-message :list="contents" :colspan="6"></no-data-message>
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
    <ModalPaperCreate @callback="getContents" />
    <ModalPaperUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalPaperCreate from './ModalPaperCreate'
import ModalPaperUpdate from './ModalPaperUpdate'

export default {
  name: 'PaperList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalPaperCreate,
    ModalPaperUpdate,
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
    showModalPaperCreate () {
      this.$modal.show('ModalPaperCreate')
    },
    showModalPaperUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalPaperUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/research`)
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
