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
        <caption>기타균주 리스트</caption>
        <colgroup>
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
            <th scope="col">활성테스트</th>
            <th scope="col">특허</th>
            <th scope="col">특허내용</th>
            <th scope="col">메모</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in contents" :key="index" @click="showModalExtraUpdate(item.id)">
            <td>{{ item.분류번호 }}</td>
            <td>{{ item.균종 }}</td>
            <td>{{ item.균주번호 }}</td>
            <td>{{ item.Origin }}</td>
            <td>{{ item.확보일 }}</td>
            <td>{{ item.기탁여부 ? 'Y' : 'N' }}</td>
            <td>{{ get장소(item.기탁장소) }}</td>
            <td>{{ get장소(item.보관장소) }}</td>
            <td>{{ item.stock갯수 }}</td>
            <td>{{ item.현재stock }}</td>
            <td>{{ item.활성테스트 }}</td>
            <td>{{ item.특허 }}</td>
            <td>{{ item.특허내용 }}</td>
            <td>{{ item.메모 }}</td>
          </tr>
          <no-data-message :list="contents" :colspan="14"></no-data-message>
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
    <ModalExtraCreate @callback="getContents" />
    <ModalExtraUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalExtraCreate from './ModalExtraCreate'
import ModalExtraUpdate from './ModalExtraUpdate'

export default {
  name: 'ExtraList',
  created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalExtraCreate,
    ModalExtraUpdate,
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
    get장소 (value) {
      return this.$store.getters['manage/get장소_관리List'].filter(item => item.id === value)[0] ? this.$store.getters['manage/get장소_관리List'].filter(item => item.id === value)[0].장소명 : '' || ''
    },
    showModalExtraCreate () {
      this.$modal.show('ModalExtraCreate')
    },
    showModalExtraUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalExtraUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(collection(firestore, '기타균주'))
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
