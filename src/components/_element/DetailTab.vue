<template>
  <nav id="tab">
    <slot name="tab"></slot>
  </nav>
</template>

<script>
export default {
  name: 'DetailTab'
}
</script>

<style lang="scss" scoped>
#tab {
  @include clearfix;
  background-color: transparent;
  margin-top: 10px;
  width: 1160px;

  .tab-item:last-child { margin-right: 0; }

  .tab-item {
    cursor: pointer;
    text-align: center;
    padding: 6px 6px 7px 6px;
    float: left;
    font-size: 16px;
    font-weight: 500;
    width: 130px;
    height: 34px;
    border: 1px solid transparent;
    border-radius: 3px 3px 0 0;
    margin-right: 2px;
    background-color: #fff;
    color: #999;

    &.active {
      color: #fff;
      background-color: #253966;
    }
  }
}
</style>
