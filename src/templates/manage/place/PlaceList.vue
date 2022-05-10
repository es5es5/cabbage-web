<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalPlaceCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>장소 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 20rem;">
          <col style="width: 3rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">장소명</th>
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
            <tr v-for="(item, index) in contents" :key="index" @click="showModalPlaceUpdate(item.id)">
              <td>{{ contents.length - index }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.memo }}</td>
              <td>{{ item.createtime | dateFormat }}</td>
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
    <ModalPlaceCreate @callback="getContents" />
    <ModalPlaceUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalPlaceCreate from './ModalPlaceCreate'
import ModalPlaceUpdate from './ModalPlaceUpdate'

export default {
  name: 'PlaceList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalPlaceCreate,
    ModalPlaceUpdate,
  },
  data () {
    return {
      selectedId: '',
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
    showModalPlaceCreate () {
      this.$modal.show('ModalPlaceCreate')
    },
    showModalPlaceUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalPlaceUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(query(collection(firestore, '장소_관리'), orderBy('createtime', 'desc')))
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
