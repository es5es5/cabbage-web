<template>
  <div class="contents">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ContentsLayout'
}
</script>

<style>

</style>
