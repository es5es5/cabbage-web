<template>
  <nav id="tab">
    <div class="title_wrap">
      <slot name="tab">메뉴2</slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Tab'
}
</script>

<style lang="scss" scoped>
#tab {
  @include clearfix;
  background-color: #fff;
  border: 1px solid $border;
  border-bottom: transparent;
  padding-top: 10px;

  .tab-item:last-child { margin-right: 0; }

  .tab-item {
    position: relative;
    cursor: pointer;
    text-align: center;
    padding: 6px 6px 7px 6px;
    float: left;
    font-size: 14px;
    font-weight: 400;
    width: 90px;
    height: 30px;
    background-color: #fff;
    color: #999;

    &.active {
      color: #333;
      text-align: center;

      &::after {
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 26px;
        height: 2px;
        background-color: #007EFF;
      }
    }
  }
}
</style>
