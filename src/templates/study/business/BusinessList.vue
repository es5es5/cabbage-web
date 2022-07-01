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
            <th scope="col">사업명</th>
            <th scope="col">기간</th>
            <th scope="col">과제번호</th>
            <th scope="col">과제명</th>
            <th scope="col">주관부처</th>
            <th scope="col">전문기관</th>
            <th scope="col">과제상태</th>
            <th scope="col">발표상태</th>
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
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalBusinessUpdate(item.id)">
              <Td>{{ item.businessTitle }}</Td>
              <Td>{{ item.startDate | dateFormat }} ~ {{ item.endDate | dateFormat }}</Td>
              <Td>{{ item.projectNo }}</Td>
              <Td>{{ item.projectTitle }}</Td>
              <Td>{{ item.supervisor }}</Td>
              <Td>{{ item.specializedOrganization }}</Td>
              <Td>{{ item.projectState }}</Td>
              <Td>{{ item.presentationState }}</Td>
            </tr>
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
