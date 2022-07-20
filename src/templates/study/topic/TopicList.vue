<template>
  <main>
    <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalTopicCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>주제 리스트</caption>
        <colgroup>
          <col style="width: 10rem;">
          <col style="width: 20rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">연구명</th>
            <th scope="col">기간</th>
            <th scope="col">담당자</th>
            <th scope="col">컨소시엄</th>
            <th scope="col">필요성</th>
            <th scope="col">비용</th>
            <th scope="col">목표</th>
            <th scope="col">활용방안</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 10rem;">
            <col style="width: 20rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
            <col style="width: 10rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalTopicUpdate(item.id)">
              <td><span>{{ item.title }}</span></td>
              <td><span>{{ item.startDate | dateFormat }} ~ {{ item.endDate | dateFormat }}</span></td>
              <td><span>{{ item.manager }}</span></td>
              <td><span>{{ item.consortiumMain }}</span></td>
              <td><span>{{ item.needs }}</span></td>
              <td><span>{{ item.money | numberWithComma }}</span></td>
              <td><span>{{ item.goal }}</span></td>
              <td><span>{{ item.plan }}</span></td>
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
    <ModalTopicCreate @callback="getContents" />
    <ModalTopicUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import ModalTopicCreate from './ModalTopicCreate'
import ModalTopicUpdate from './ModalTopicUpdate'

export default {
  name: 'TopicList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalTopicCreate,
    ModalTopicUpdate,
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
    showModalTopicCreate () {
      this.$modal.show('ModalTopicCreate')
    },
    showModalTopicUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalTopicUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/study-topic`)
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
