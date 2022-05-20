<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalMicroorganismCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>균종 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 20rem;">
          <col style="width: 3rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">균종명</th>
            <th scope="col">메모</th>
            <th scope="col">등록일</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
          <colgroup>
            <col style="width: 1rem;">
            <col style="width: 10rem;">
            <col style="width: 20rem;">
            <col style="width: 3rem;">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in contents" :key="index" @click="showModalMicroorganismUpdate(item.id)">
              <Td>{{ contents.length - index }}</Td>
              <Td>{{ item.name }}</Td>
              <Td>{{ item.memo }}</Td>
              <Td>{{ item.createtime | dateFormat }}</Td>
            </tr>
            <no-data-message :list="contents" :colspan="4"></no-data-message>
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
    <ModalMicroorganismCreate @callback="getContents" />
    <ModalMicroorganismUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalMicroorganismCreate from './ModalMicroorganismCreate'
import ModalMicroorganismUpdate from './ModalMicroorganismUpdate'

export default {
  name: 'MicroorganismList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalMicroorganismCreate,
    ModalMicroorganismUpdate,
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
    searchDocList (options) {
      const option = Object.assign({
        route: this.$route,
        router: this.$router,
        form: this.searchForm,
        callback: this.getDocList
      }, options)

      this.COMMON.searchPagination(option)
    },
    showModalMicroorganismCreate () {
      this.$modal.show('ModalMicroorganismCreate')
    },
    showModalMicroorganismUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalMicroorganismUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(query(collection(firestore, '균종_관리'), orderBy('createtime', 'desc')))
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
