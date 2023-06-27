
<template>
  <div class="main" style="min-width:1024px">
    <RouterView />

    <a href="javascript:;" class="version" @click="goHome">version： {{ localVersion }}</a>

    <div class="copyright">
      <!-- 分辨率：{{ screenConfig.width }} * {{ screenConfig.height }} -->
      Copyright©WinGo Soft.All rights reserved. 400-880-6020
    </div>

    <div class="loading" v-if="glLoading">
      <img src="@/assets/images/loading.gif" />
    </div>
  </div>
</template>
<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
// import { onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import { useStore } from '@/store'
const { proxy } = getCurrentInstance()
const store = useStore();
const router = useRouter()
const route = useRoute()
let { glLoading } = storeToRefs(store);
let localVersion = ref('')
// store.SHOW_LOADING()
// console.log(glLoading.value)
store.setCycleCount()
let goHome = () => {
  if (route.path !== '/') router.push({ path: '/' })
}
onMounted(() => {
  proxy.$storage.set("WEBAPI_NAME", 'WinGoWebApi')

  localVersion.value = proxy.$storage.get('version')
  if (!localVersion.value) {
    localVersion.value = '0.0'
    proxy.$storage.set('version', localVersion.value)
  }
})
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
}

.version {
  position: fixed;
  left: 0.1rem;
  bottom: 0.1vh;
  color: #fff;
  font-size: 0.16rem;
  cursor: pointer;
  z-index: 999;
  user-select: none;
  text-decoration: none;
  border: 0.01rem solid transparent;

  &:focus {
    border-color: rgb(84, 84, 224);
  }
}

.copyright {
  position: fixed;
  right: 30px;
  bottom: 6px;
  font-size: 16px;
  cursor: pointer;
  z-index: 999;
  color: #fff;
}

.loading {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.loading img {
  width: 100px;
  height: 100px;
  margin: -200px auto 0;
}
</style>
