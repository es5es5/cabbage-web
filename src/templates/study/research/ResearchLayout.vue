<template>
  <main>
    <transition name="fade" mode="out-in">
      <TitleTab>
        <template v-slot:title><h1 class="title">{{ mixinRouteMetaTitle }}</h1></template>
        <template v-slot:tab>
          <router-link tag="a" :to="{name: '연구_자료_Experiment'}" class="tab-item">Experiment</router-link>
          <router-link tag="a" :to="{name: '연구_자료_Patent'}" class="tab-item">Patent</router-link>
          <router-link tag="a" :to="{name: '연구_자료_Paper'}" class="tab-item">Paper</router-link>
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
  name: 'ResearchLayout',
}
</script>

<style>

</style>
