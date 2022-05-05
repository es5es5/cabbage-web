<template>
  <main>
    <div class="search_wrap">
      <label for="">검색조건</label>
      <input type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap">
      <button type="button" class="btn primary" @click="showModalOriginCreate">등록</button>
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="table_wrap table-hover">
      <table>
        <caption>Origin 리스트</caption>
        <colgroup>
          <col style="width: 1rem;">
          <col style="width: 10rem;">
          <col style="width: 10rem;">
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
  </main>
</template>

<script>

import { collection, getDocs } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import ModalOriginCreate from './ModalOriginCreate'

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
  },
  data () {
    return {
      selectedContent: {},
      contents: {
        data: [{
          name: '김치',
          memo: '그들의 눈이 청춘 옷을 바이며, 두기 낙원을 수 그들의 봄바람이다. 밥을 소금이라 과실이 뿐이다. 피는 심장의 그들을 있는 인생의 역사를 약동하다.'
        }, {
          name: '인체',
          memo: '위하여, 수 모래뿐일 사막이다. 못하다 밥을 산야에 구할 원질이 피부가 봄바람이다. 보이는 인간의 얼마나 방황하여도, 천고에 그리하였는가?'
        }, {
          name: '산삼',
          memo: '실현에 착목한는 지혜는 그들의 청춘 끓는다. 심장의 품었기 보는 피어나는 길을 생생하며, 얼마나 보이는 황금시대의 보라. 이는 열락의 이상 부패뿐이다.'
        }, {
          name: '여성질',
          memo: '관현악이며, 역사를 보배를 그들의 소리다.이것은 사막이다. 가는 뜨고, 지혜는 위하여.'
        }, {
          name: 'stevia발효물',
          memo: '이상의 그러므로 꽃이 할지니, 무엇을 봄바람이다. 생의 곧 인도하겠다는 불러 끓는 우리 따뜻한 찾아 사막이다. 너의 산야에 풀이 않는 피다.'
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
    showModalOriginCreate () {
      this.$modal.show('ModalOriginCreate')
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
