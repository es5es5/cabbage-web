<template>
  <main>
    <transition name="fade" mode="out-in">
      <TitleTab>
        <template v-slot:title><h1 class="title">{{ mixinRouteMetaTitle }}</h1></template>
        <template v-slot:tab>
          <!-- <router-link tag="a" :to="{name: '균주_농업균주관리_리스트'}" class="tab-item">균주관리</router-link>
          <router-link tag="a" :to="{name: '균주_농업균주관리_통계'}" class="tab-item">통계</router-link> -->
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
  name: 'StudyLayout'
}
</script>

<style>

</style>
