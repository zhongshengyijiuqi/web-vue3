import { defineStore } from 'pinia'
import { onBeforeUnmount } from 'vue'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      loading: false,
      cycleCount: 0,
    }
  },
  getters: {
    glLoading(state) {
      return state.loading
    },
    gCycleCount(state) {
      return state.cycleCount
    },
  },
  actions: {
    setCycleCount() {
      let timer = setInterval(() => {
        this.cycleCount++
      }, 1000)
      onBeforeUnmount(() => {
        clearInterval(timer)
        timer = null
      })
    },
  },
})