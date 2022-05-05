<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalOriginCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover">
      <table>
        <caption>Origin 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 20rem;">
          <col style="width: 3rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Origin명</th>
            <th scope="col">메모</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in contents" :key="index">
            <td>{{ contents.length - index }}</td>
            <td>{{ item.Origin명 }}</td>
            <td>{{ item.메모 }}</td>
            <td>{{ item.createtime | dateFormat }}</td>
          </tr>
          <no-data-message :list="contents" :colspan="4"></no-data-message>
        </tbody>
      </table>
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
    <ModalOriginCreate @callback="getContents" />
  </main>
</template>

<script>
import { getDocs, collection } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalOriginCreate from './ModalOriginCreate'

export default {
  name: 'OriginList',
  created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalOriginCreate,
  },
  data () {
    return {
      selectedContent: {},
      contents: [],
      searchForm: {
        pageIndex: 1,
        pageSize: 15,
      },
      isModalOpen: false
    }
  },
  computed: {
  },
  methods: {
    searchDocList (options) {
      const option = Object.assign({
        route: this.$route,
        router: this.$router,
        form: this.searchForm,
        callback: this.getDocList
      }, options)

      this.COMMON.searchPagination(option)
    },
    showModalOriginCreate () {
      this.$modal.show('ModalOriginCreate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(collection(firestore, 'Origin_관리'))
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
        this.contents = list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
