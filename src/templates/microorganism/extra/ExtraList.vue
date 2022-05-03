<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalExtraCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover">
      <table>
        <caption>농업 균주 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">분류번호</th>
            <th scope="col">균종</th>
            <th scope="col">균주번호</th>
            <th scope="col">Origin</th>
            <th scope="col">확보일</th>
            <th scope="col">기탁여부</th>
            <th scope="col">기탁장소</th>
            <th scope="col">보관장소</th>
            <th scope="col">stock 개수</th>
            <th scope="col">현재 stock</th>
            <th scope="col">활성테스트(병명/활성강도) [+++이상 표기함]</th>
            <th scope="col">특허</th>
            <th scope="col">특허내용</th>
            <th scope="col">비고</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>20-66</td>
            <td>Brevibacillus formosus</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>큐옴바이오</td>
            <td>2</td>
            <td></td>
            <td>Botrytis cinerea KACC 40573(잿빛곰팡이병/+++)</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <!-- <no-data-message :list="contents.list" :colspan="7"></no-data-message> -->
        </tbody>
      </table>
      <!-- <Pagination
        :totalElement="parseInt(contents.count)"
        :activePage="searchForm.pageIndex"
        :totalPages="searchForm.pageSize"
        :callback="page => {
          searchForm.pageIndex = page
          getContents()
        }">
      </Pagination> -->
      <span class="total">Total: {{ (contents.count || 0) | numberWithComma }}</span>
    </div>
    <ModalExtraCreate @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalExtraCreate from './ModalExtraCreate'

export default {
  name: 'ExtraList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalExtraCreate,
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
    showModalExtraCreate () {
      this.$modal.show('ModalExtraCreate')
    },
    showModalExtraUpdate (idolId) {
      this.idolId = idolId
      this.$modal.show('ModalExtraUpdate')
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
