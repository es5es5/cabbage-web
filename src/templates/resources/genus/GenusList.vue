<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalGenusCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>속종 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 5rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">이름</th>
            <th scope="col">메모</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 1rem;">
            <col style="width: 5rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalGenusUpdate(item.id)">
              <Td>{{ item.id }}</Td>
              <Td>{{ item.name }}</Td>
              <Td>{{ item.memo }}</Td>
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
    <ModalGenusCreate @callback="getContents" />
    <ModalGenusUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalGenusCreate from './ModalGenusCreate'
import ModalGenusUpdate from './ModalGenusUpdate'

export default {
  name: 'GenusList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalGenusCreate,
    ModalGenusUpdate,
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
    showModalGenusCreate () {
      this.$modal.show('ModalGenusCreate')
    },
    showModalGenusUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalGenusUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/genus`)
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
