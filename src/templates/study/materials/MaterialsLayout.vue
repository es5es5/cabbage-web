<template>
  <main>
    <transition name="fade" mode="out-in">
      <TitleTab>
        <template v-slot:title><h1 class="title">{{ mixinRouteMetaTitle }}</h1></template>
        <template v-slot:tab>
          <router-link tag="a" :to="{name: '연구_Materials_장비'}" class="tab-item">장비</router-link>
          <router-link tag="a" :to="{name: '연구_Materials_시약'}" class="tab-item">시약</router-link>
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
  name: 'MaterialsLayout',
}
</script>

<style>

</style>
