<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalAgricultureCreate">등록</button>
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
            <th scope="col">메모</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in contents" :key="index">
            <td>{{ item.분류번호 }}</td>
            <td>{{ item.균종 }}</td>
            <td>{{ item.균주번호 }}</td>
            <td>{{ item.Origin }}</td>
            <td>{{ item.확보일 }}</td>
            <td>{{ item.기탁여부 }}</td>
            <td>{{ item.기탁장소 }}</td>
            <td>{{ item.보관장소 }}</td>
            <td>{{ item.stockr갯수 }}</td>
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
    <ModalAgricultureCreate @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalAgricultureCreate from './ModalAgricultureCreate'

export default {
  name: 'AgricultureList',
  created () {
    this.getContents()
  },
  watch: {
    mixinSelectedBrand () {
      // this.getContents()
    }
  },
  components: {
    ModalAgricultureCreate,
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
    showModalAgricultureCreate () {
      this.$modal.show('ModalAgricultureCreate')
    },
    showModalAgricultureUpdate (idolId) {
      this.idolId = idolId
      this.$modal.show('ModalAgricultureUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(collection(firestore, '농업균주'))
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
