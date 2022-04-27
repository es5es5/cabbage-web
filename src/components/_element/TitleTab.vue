<template>
  <nav id="tab">
    <div class="title_wrap">
      <img src="@/assets/images/icons/goList.svg" alt="goList" class="goList" v-if="mixinRouteMetaGoList" @click="goList" />
      <img src="@/assets/images/icons/goList.svg" alt="goBack" class="goList" v-if="mixinRouteMetaGoBack" @click="goBack" />
      <slot name="title"></slot>
      <slot name="tab"></slot>
      <slot name="setting"></slot>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TitleTab',
  props: {
    listRouteName: {
      type: String,
      default: () => 'Home',
      required: false
    }
  },
  methods: {
    goList () {
      this.$router.push({
        name: this.mixinRouteMetaGoList
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
#tab {
  border-bottom: 1px solid $border;
  border-radius: 3px;
  padding-bottom: 10px;

  .goList {
    @include hover;
    margin: 0 10px;
  }

  .title {
    display: inline-block;
    font-size: 20px;
    font-weight: bold;
    min-width: 200px;
    max-width: 300px;
  }

  .tab-item {
    cursor: pointer;
    display: inline-block;
    color: #555;
    // width: 80px;
    // min-width: 80px;
    // max-width: 160px;
    font-size: 18px;
    margin-left: 12px;
    margin-right: 12px;
    font-weight: bold;

    &:hover { color: $primary; }
    &.active { color: $primary; }
  }
  .tab-setting {
    float: right;
    @include hover(.8);
    font-weight: bold;
    padding-top: 10px;
  }
}
</style>
