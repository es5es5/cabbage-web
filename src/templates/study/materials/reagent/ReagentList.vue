<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalReagentCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>장비 리스트</caption>
        <colgroup>
          <col style="width: 20rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">이름</th>
            <th scope="col">보관장소</th>
            <th scope="col">개수</th>
            <th scope="col">취득일자</th>
            <th scope="col">제조사</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 20rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalReagentUpdate(item.id)">
              <Td>{{ item.name }}</Td>
              <Td>{{ item.placement }}</Td>
              <Td>{{ item.count }}</Td>
              <Td>{{ item.startDate | dateFormat }}</Td>
              <Td>{{ item.maker }}</Td>
            </tr>
            <no-data-message :list="contents" :colspan="5"></no-data-message>
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
    <ModalReagentCreate @callback="getContents" />
    <ModalReagentUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalReagentCreate from './ModalReagentCreate'
import ModalReagentUpdate from './ModalReagentUpdate'

export default {
  name: 'ReagentList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalReagentCreate,
    ModalReagentUpdate,
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
    showModalReagentCreate () {
      this.$modal.show('ModalReagentCreate')
    },
    showModalReagentUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalReagentUpdate')
    },
    getContents () {
      this.$axios
        .get(`${this.ENV_CUOME}/reagent`)
        .then(result => { this.contents = result.data })
        .catch(error => { throw new Error(error) })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
