<template>
  <main>
    <div class="search_wrap">
      <label for="search균종">균종</label>
      <select name="search균종" id="search균종" v-model="searchForm.균종">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _균종" :key="`${index}_균종`">{{ item.name }}</option>
      </select>
      <span class="separator">|</span>

      <label for="search균주번호">균주번호</label>
      <input id="search균주번호" type="text" placeholder="" v-model="searchForm.균주번호">
      <span class="separator">|</span>

      <label for="searchOrigin">Origin</label>
      <select name="searchOrigin" id="searchOrigin" v-model="searchForm.Origin">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _Origin" :key="`${index}_Origin`">{{ item.name }}</option>
      </select>
      <span class="separator">|</span>

      <label for="search기탁장소">기탁장소</label>
      <select name="search기탁장소" id="search기탁장소" v-model="searchForm.기탁장소">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_기탁장소`">{{ item.name }}</option>
      </select>
      <span class="separator">|</span>

      <label for="search보관장소">보관장소</label>
      <select name="search보관장소" id="search보관장소" v-model="searchForm.보관장소">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_보관장소`">{{ item.name }}</option>
      </select>
      <span class="separator">|</span>

      <!-- <label for="Origin">Origin</label>
      <select name="searchOrigin" id="searchOrigin" v-model="searchForm.Origin">
        <option value="">전체</option>
        <option :value="item.id" v-for="(item, index) in _장소" :key="`${index}_Origin`">{{ item.장소명 }}</option>
      </select>
      <span class="separator">|</span> -->

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalFisheriesCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover table_wrap-scoll-y">
      <table>
        <caption>수산업균주 리스트</caption>
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
            <tr v-for="(item, index) in _contents" :key="index" @click="showModalFisheriesUpdate(item.id)">
              <Td>{{ getManage('균종', item.균종) }}</Td>
              <Td>{{ item.균주번호 }}</Td>
              <Td>{{ getManage('Origin', item.Origin) }}</Td>
              <Td>{{ item.확보일 }}</Td>
              <Td>{{ getManage('장소', item.기탁장소) }}</Td>
              <Td>{{ getManage('장소', item.보관장소) }}</Td>
              <Td>{{ item.stock갯수 }}</Td>
              <Td>{{ item.현재stock }}</Td>
              <Td>{{ item.활성테스트 }}</Td>
              <Td>{{ item.특허 }}</Td>
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
    <ModalFisheriesCreate @callback="getContents" />
    <ModalFisheriesUpdate :id="selectedId" @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalFisheriesCreate from './ModalFisheriesCreate'
import ModalFisheriesUpdate from './ModalFisheriesUpdate'

export default {
  name: 'FisheriesList',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalFisheriesCreate,
    ModalFisheriesUpdate,
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
    getManage (manage, value) {
      return this.$store.getters[`manage/get${manage}_관리List`].filter(item => item.id === value)[0] ? this.$store.getters[`manage/get${manage}_관리List`].filter(item => item.id === value)[0].name : '' || ''
    },
    showModalFisheriesCreate () {
      this.$modal.show('ModalFisheriesCreate')
    },
    showModalFisheriesUpdate (id) {
      this.selectedId = id
      this.$modal.show('ModalFisheriesUpdate')
    },
    async getContents () {
      const list = []
      const querySnapshot = await getDocs(query(collection(firestore, '수산업균주'), orderBy('createtime', 'desc')))
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
