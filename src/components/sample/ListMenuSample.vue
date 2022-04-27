<template>
  <main>
    <div class="search_wrap">
      <label for="">유입일</label>
      <input type="date">
      <span class="separator">~</span>
      <input type="date">

      <span class="separator">|</span>

      <label for="">고객명</label>
      <input type="text" placeholder="고객명">
      <span class="separator">|</span>

      <label for="">전화번호</label>
      <input type="text" placeholder="고객 전화번호">
      <span class="separator">|</span>

      <button type="button" class="btn-search">검색</button>
    </div>
    <div class="action_wrap empty">
      <!-- <button type="button" class="btn primary">등록</button> -->
    </div>
    <div class="table_wrap table-hover">
      <table>
        <caption>리스트</caption>
        <colgroup>
          <col style="width: 10rem;">
        </colgroup>
        <thead>
          <tr>
            <th scope="col">No.</th>
          </tr>
          <no-data-message :list="0" :colspan="24"></no-data-message>
        </thead>
        <tbody>
        </tbody>
      </table>
      <!-- <Pagination
        :totalElement="parseInt(distributionList.totalElements)"
        :totalPages="searchForm.size"
        :activePage="searchForm.page"
        :callback="searchDistribution">
      </Pagination>
      <span class="total">Total: {{distributionList.totalElements}}</span> -->
    </div>
  </main>
</template>

<script>

export default {
  name: 'SampleName',
  created () {
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
