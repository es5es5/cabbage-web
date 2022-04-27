<template>
  <legend id="legend">
    <slot name="title" class="title"></slot>
    <div class="action">
      <slot name="action"></slot>
    </div>
  </legend>
</template>

<script>
export default {
  name: 'Legend'
}
</script>

<style lang="scss" scoped>

#legend {
  @include clearfix;
  position: relative;
}

.action {
  position: absolute;
  right: 0;
  top: -6px;
}

</style>
