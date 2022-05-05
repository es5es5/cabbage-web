<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalOfficialCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover">
      <table>
        <caption>농업 균주 리스트</caption>
        <colgroup>
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">균주번호</th>
            <th scope="col">속</th>
            <th scope="col">종</th>
            <th scope="col">strain</th>
            <th scope="col">유래</th>
            <th scope="col">기탁</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <!-- <no-data-message :list="contents.list" :colspan="7"></no-data-message> -->
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
    <ModalOfficialCreate @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalOfficialCreate from './ModalOfficialCreate'

export default {
  name: 'OfficialList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalOfficialCreate,
  },
  data () {
    return {
      selectedContent: {},
      contents: {},
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
    showModalOfficialCreate () {
      this.$modal.show('ModalOfficialCreate')
    },
    showModalOfficialUpdate (idolId) {
      this.idolId = idolId
      this.$modal.show('ModalOfficialUpdate')
    },
    async getContents () {
      console.log(firestore)
      const querySnapshot = await getDocs(collection(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION))
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
      })
      // const list = []
      // const querySnapshot = await getDocs(collection(firestore, process.env.VUE_APP_FIRESTORE_COLLECTION))
      // querySnapshot.forEach((doc) => {
      //   list.push({
      //     id: doc.id,
      //     ...doc.data()
      //   })
      // })
      // this.idol = list
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
