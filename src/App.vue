<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { onMounted, onBeforeUnmount } from 'vue'
// import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
const store = useStore();
// let { cycleCount } = storeToRefs(store);

store.setCycleCount()
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <div class="main" style="min-width:1024px">
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>
