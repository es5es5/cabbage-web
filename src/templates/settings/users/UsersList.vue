<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalUsersCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>장소 리스트</caption>
        <colgroup>
          <col style="width: 2rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 5rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">이름</th>
            <th scope="col">가입일</th>
            <th scope="col">사용여부</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 2rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 5rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalUsersUpdate(item.id)">
              <Td>{{ item.id }}</Td>
              <Td>{{ item.displayName }}</Td>
              <Td>{{ item.createtime | dateFormat }}</Td>
              <Td>{{ item.use ? '사용' : '미사용' }}</Td>
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
    <ModalUsersCreate @callback="getContents" />
    <ModalUsersUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalUsersCreate from './ModalUsersCreate'
import ModalUsersUpdate from './ModalUsersUpdate'

export default {
  name: 'UsersList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalUsersCreate,
    ModalUsersUpdate,
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
    showModalUsersCreate () {
      this.$modal.show('ModalUsersCreate')
    },
    showModalUsersUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalUsersUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/users`)
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
