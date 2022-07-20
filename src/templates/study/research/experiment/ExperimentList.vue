<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalExperimentCreate">등록</button>
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
            <tr v-for="(item, index) in contents" :key="index" @click="showModalExperimentUpdate(item.id)">
              <td><span>{{ item.id }}</span></td>
              <td><span>{{ item.title }}</span></td>
              <td><span>{{ item.startDate | dateFormat }}</span></td>
              <td><span>{{ item.manager }}</span></td>
              <td><span>{{ item.methodsLink }}</span></td>
              <td><span>{{ item.resultsLink }}</span></td>
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
    <ModalExperimentCreate @callback="getContents" />
    <ModalExperimentUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalExperimentCreate from './ModalExperimentCreate'
import ModalExperimentUpdate from './ModalExperimentUpdate'

export default {
  name: 'ExperimentList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalExperimentCreate,
    ModalExperimentUpdate,
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
    showModalExperimentCreate () {
      this.$modal.show('ModalExperimentCreate')
    },
    showModalExperimentUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalExperimentUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/research/experiment`)
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
