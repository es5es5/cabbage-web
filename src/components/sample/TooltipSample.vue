<template>
  <div class="tooltip_wrap">
    <ul>
      <li v-for="(item, index) in list" :key="index" class="list_item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TooltipSample',
  created () {},
  mounted () {},
  props: {
    list: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
