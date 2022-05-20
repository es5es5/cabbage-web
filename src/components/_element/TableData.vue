<template>
  <td :title="noTitle ? '' : _title" class="tableData" :style="`text-align: ${right ? 'right' : center ? 'center' : left ? 'left' : 'left'}`">
    <span>
      <slot>
      </slot>
    </span>
  </Td>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    right: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    center: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    left: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    noTitle: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  computed: {
    _title () {
      return this.$slots.default ? this.$slots.default[0].text : '' || ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
