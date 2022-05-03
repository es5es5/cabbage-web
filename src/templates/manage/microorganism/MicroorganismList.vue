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
    <div class="table_wrap table-hover">
      <table>
        <caption>농업 균주 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
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
        <tbody>
          <tr v-for="(item, index) in contents.data" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.memo }}</td>
            <td>{{ '2022-05-05' }}</td>
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
    <ModalMicroorganismCreate @callback="getContents" />
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalMicroorganismCreate from './ModalMicroorganismCreate'

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
    ModalMicroorganismCreate,
  },
  data () {
    return {
      selectedContent: {},
      contents: {
        data: [{
          name: 'Brevibacillus formosus',
          memo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint explicabo corporis?'
        }, {
          name: 'Bacillus pseudomycoides',
          memo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint explicabo corporis?'
        }, {
          name: 'Bacillus safensis',
          memo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint explicabo corporis?'
        }, {
          name: 'Bacillus amyloliquefaciens',
          memo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint explicabo corporis?'
        }, {
          name: 'Bacillus subtilis',
          memo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae sint explicabo corporis?'
        }]
      },
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
    showModalMicroorganismCreate () {
      this.$modal.show('ModalMicroorganismCreate')
    },
    showModalAgricultureUpdate (idolId) {
      this.idolId = idolId
      this.$modal.show('ModalAgricultureUpdate')
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
