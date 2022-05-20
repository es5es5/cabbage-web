<template>
  <tr v-if="!_list || _list.length < 1">
    <td :colspan="_colspan">{{ _loading ? loading_message : message }}</Td>
  </tr>
</template>

<script>
export default {
  name: 'NoDataMessage',
  created () {},
  mounted () {},
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    },
    colspan: {
      type: [Number, String],
      default: () => 1
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    loadingMessage: {
      type: String,
      default: () => '데이터를 가져오는 중입니다'
    },
    message: {
      type: String,
      default: () => '검색 결과가 없습니다'
    }
  },
  data () {
    return {
      loading_message: '데이터를 가져오는 중입니다'
    }
  },
  computed: {
    _colspan () {
      return this.colspan
    },
    _list () {
      return this.list
    },
    _loading () {
      return this.loading
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
td { cursor: auto !important; text-align: center; }
</style>
