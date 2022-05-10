<template>
  <main>
    <div class="search_wrap">
      <label for="균종">균종</label>
      <input id="균종" type="text" placeholder="" v-model="searchForm.균종">
      <span class="separator">|</span>

      <label for="균종">균주번호</label>
      <input id="균주번호" type="text" placeholder="" v-model="searchForm.균주번호">
      <span class="separator">|</span>

      <label for="기탁장소">기탁장소</label>
      <select name="기탁장소" id="기탁장소" v-model="searchForm.기탁장소">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_기탁장소`">{{ item.장소명 }}</option>
      </select>
      <span class="separator">|</span>

      <label for="보관장소">보관장소</label>
      <select name="보관장소" id="보관장소" v-model="searchForm.보관장소">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_보관장소`">{{ item.장소명 }}</option>
      </select>
      <span class="separator">|</span>

      <!-- <label for="Origin">Origin</label>
      <select name="Origin" id="Origin" v-model="searchForm.Origin">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_Origin`">{{ item.장소명 }}</option>
      </select>
      <span class="separator">|</span> -->

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalAgricultureCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>농업 균주 리스트</caption>
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
        </colgroup>
        <thead>
          <tr>
            <th scope="col">균종</th>
            <th scope="col">균주번호</th>
            <th scope="col">Origin</th>
            <th scope="col">확보일</th>
            <th scope="col">기탁장소</th>
            <th scope="col">보관장소</th>
            <th scope="col">stock 개수</th>
            <th scope="col">현재 stock</th>
            <th scope="col">활성테스트</th>
            <th scope="col">특허</th>
          </tr>
        </thead>
      </table>
      <div class="table_scroll">
        <table>
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
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in _contents" :key="index" @click="showModalAgricultureUpdate(item.id)">
              <td>{{ item.균종 }}</td>
              <td>{{ item.균주번호 }}</td>
              <td>{{ item.Origin }}</td>
              <td>{{ item.확보일 }}</td>
              <td>{{ get장소(item.기탁장소) }}</td>
              <td>{{ get장소(item.보관장소) }}</td>
              <td>{{ item.stock갯수 }}</td>
              <td>{{ item.현재stock }}</td>
              <td>{{ item.활성테스트 }}</td>
              <td>{{ item.특허 }}</td>
            </tr>
            <no-data-message :list="_contents" :colspan="10"></no-data-message>
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
      <span class="total">Total: {{ (_contents.length || 0) | numberWithComma }}</span>
    </div>
    <ModalAgricultureCreate @callback="getContents" />
    <ModalAgricultureUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalAgricultureCreate from './ModalAgricultureCreate'
import ModalAgricultureUpdate from './ModalAgricultureUpdate'

export default {
  name: 'AgricultureList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalAgricultureCreate,
    ModalAgricultureUpdate,
  },
  data () {
    return {
      selectedId: '',
      contents: [],
      searchForm: {
        균종: '',
        균주번호: '',
        기탁장소: '',
        보관장소: '',
        Origin: '',
        pageIndex: 1,
        pageSize: 15,
      },
      isModalOpen: false
    }
  },
  computed: {
    _장소 () { return this.$store.getters['manage/get장소_관리List'] },
    _Origin () { return this.$store.getters['manage/getOrigin_관리List'] },
    _균종 () { return this.$store.getters['manage/get균종_관리List'] },
    _contents () {
      return this.contents
        // .filter(item => item.균종.indexOf(this.searchForm.균종) > -1)
        .filter(item => item.균종.indexOf(this.searchForm.균종) > -1)
        .filter(item => item.균주번호.indexOf(this.searchForm.균주번호) > -1)
        .filter(item => this.searchForm.기탁장소 !== '' ? this.searchForm.기탁장소 === item.기탁장소 : true)
        .filter(item => this.searchForm.보관장소 !== '' ? this.searchForm.보관장소 === item.보관장소 : true)
        .filter(item => this.searchForm.Origin !== '' ? this.searchForm.Origin === item.Origin : true)
        // .filter(item => item.customerName.indexOf(this.searchForm.customerName) > -1)
        // .filter(item => this.getToDate(item.salesDate).indexOf(this.getToDate(this.searchForm.salesDate)) > -1)
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
    get장소 (value) {
      return this.$store.getters['manage/get장소_관리List'].filter(item => item.id === value)[0] ? this.$store.getters['manage/get장소_관리List'].filter(item => item.id === value)[0].name : '' || ''
    },
    showModalAgricultureCreate () {
      this.$modal.show('ModalAgricultureCreate')
    },
    showModalAgricultureUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalAgricultureUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(query(collection(firestore, '농업균주'), orderBy('createtime', 'desc')))
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
