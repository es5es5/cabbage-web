<template>
  <main>
    <div class="search_wrap">
      <label for="name">이름</label>
      <input type="text" placeholder="" v-model="searchForm.name">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalOriginCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
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
            <tr v-for="(item, index) in _contents" :key="index" @click="showModalOriginUpdate(item.id)">
              <Td>{{ contents.length - index }}</Td>
              <Td>{{ item.name }}</Td>
              <Td>{{ item.memo }}</Td>
              <Td>{{ item.createtime | dateFormat }}</Td>
            </tr>
            <no-data-message :list="_contents" :colspan="4"></no-data-message>
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
    <ModalOriginCreate @callback="getContents" />
    <ModalOriginUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalOriginCreate from './ModalOriginCreate'
import ModalOriginUpdate from './ModalOriginUpdate'

export default {
  name: 'OriginList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalOriginCreate,
    ModalOriginUpdate,
  },
  data () {
    return {
      selectedId: '',
      contents: [],
      searchForm: {
        name: '',
        pageIndex: 1,
        pageSize: 15,
      },
    }
  },
  computed: {
    _contents () {
      return this.contents
        .filter(item => item.name.indexOf(this.searchForm.name) > -1)
    }
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
    showModalOriginUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalOriginUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(query(collection(firestore, 'Origin_관리'), orderBy('createtime', 'desc')))
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      })
      this.contents = list
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
