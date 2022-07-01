<template>
  <tr :style="`text-align: ${right ? 'right' : center ? 'center' : left ? 'left' : 'left'}`">
    <slot>
    </slot>
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
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
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
</style>
