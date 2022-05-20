<template>
  <main>
    <div class="search_wrap">
      <label for="search균주번호">검색</label>
      <input id="search균주번호" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div>
    <div class="action_wrap empty">
      <!-- <button type="button" class="btn primary" @click="showModalAgricultureCreate">등록</button> -->
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="chart_wrap ring">
      <VeRing
        :data="chartData"
        height="330px"
        width="100%"
      />
      <p class="chartTitle">균종별 갯수</p>
    </div>
    <div class="chart_wrap line">
      <VeLine
        :data="chartData"
        height="330px"
        width="100%"
      />
      <p class="chartTitle">균종별 갯수</p>
    </div>
  </main>
</template>

<script>

import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore } from '@/plugins/firebase'
import VeRing from 'v-charts/lib/ring.common'
import VeLine from 'v-charts/lib/bar.common'

export default {
  name: 'AgricultureStatics',
  async created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    VeRing,
    VeLine,
  },
  data () {
    return {
      chartData: {
        columns: ['균종', '갯수'],
        rows: [
          // { 日期: '1/1', 访问用户: 1111, 下单用户: 1093, },
          // { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, },
          // { 日期: '1/3', 访问用户: 2222, 下单用户: 2623, },
          // { 日期: '1/4', 访问用户: 3333, 下单用户: 1423, },
          // { 日期: '1/5', 访问用户: 4444, 下单用户: 3492, },
          // { 日期: '1/6', 访问用户: 5555, 下单用户: 4293, }
        ]
      },
      // chartData: {
      //   columns: ['date', 'PV'],
      //   rows: [
      //     { date: '01-01', PV: 1231 },
      //     { date: '01-02', PV: 1223 },
      //     { date: '01-03', PV: 2123 },
      //     { date: '01-04', PV: 4123 },
      //     { date: '01-05', PV: 3123 },
      //     { date: '01-06', PV: 7123 }
      //   ]
      // },
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
    _균종NameList () { return this.$store.getters['manage/get균종_관리List'].map(item => item.name) },
    _contents () {
      return this.contents
        .filter(item => item.균종.indexOf(this.searchForm.균종) > -1)
        .filter(item => item.균주번호.indexOf(this.searchForm.균주번호) > -1)
        .filter(item => this.searchForm.기탁장소 !== '' ? this.searchForm.기탁장소 === item.기탁장소 : true)
        .filter(item => this.searchForm.보관장소 !== '' ? this.searchForm.보관장소 === item.보관장소 : true)
        .filter(item => this.searchForm.Origin !== '' ? this.searchForm.Origin === item.Origin : true)
    }
  },
  methods: {
    getManage (manage, value) {
      return this.$store.getters[`manage/get${manage}_관리List`].filter(item => item.id === value)[0] ? this.$store.getters[`manage/get${manage}_관리List`].filter(item => item.id === value)[0].name : '' || ''
    },
    async getContents () {
      let list = []
      const querySnapshot = await getDocs(query(collection(firestore, '농업균주'), orderBy('createtime', 'desc')))
      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data()
        })
      })
      list = list.map(item => {
        return {
          name: this.getManage('균종', item.균종),
          stock: this.getManage('장소', item.보관장소),
          rent: this.getManage('장소', item.기탁장소),
          ...item
        }
      })
      this._균종NameList.forEach(name => {
        this.chartData.rows.push({
          균종: name,
          갯수: list.filter(item => item.name === name).length
        })
      })
      console.log(this.chartData.row)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart_wrap::v-deep {
  width: 30%;
  float: left;
  :first-child { margin: 0 auto; }

  &.line {
    width: 70%;
  }
}
.chartTitle {
  font-size: 1.25rem;
  font-weight: bold;
  color: $primary;
  text-align: center;
}
</style>
