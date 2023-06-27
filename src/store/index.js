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
        glLoading: state => state.loading,
        gCycleCount(state) {
            return state.cycleCount
        },
    },
    actions: {
        SHOW_LOADING() {
            this.loading = true
        },
        HIDDEN_LOADING() {
            this.loading = false
        },
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