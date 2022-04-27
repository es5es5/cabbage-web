<template>
  <main>
    <transition name="fade" mode="out-in">
      <TitleTab v-if="
        [
          'LayoutSample',
        ].includes($route.name)">
        <template v-slot:title><h1 class="title">{{ mixinRouteMetaTitle }}</h1></template>
        <template v-slot:tab>
          <!-- <router-link tag="a" :to="{name: ''}" class="tab-item"></router-link> -->
        </template>
      </TitleTab>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<script>
export default {
  name: 'LayoutSample'
}
</script>

<style>

</style>
