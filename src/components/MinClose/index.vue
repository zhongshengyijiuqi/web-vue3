<template>
    <div class="system-wrap">
        <i @click="min" class="el-icon-minus"></i>
        <i @click="close" class="el-icon-close"></i>
    </div>
</template>

<script setup>
import ENVIRONMENT from '@/utils/environment.js'
let close = () => {
    // console.log(ENVIRONMENT, '---ENVIRONMENT')
    if (ENVIRONMENT === 'Electron') {
        const { ipcRenderer } = window.require('electron')
        ipcRenderer.send('close-app')
    } else if (ENVIRONMENT === 'Android') {
        /* eslint-disable */
        plus.runtime.quit()
    }
}
let min = () =>{
    if (ENVIRONMENT === 'Electron') {
        const { ipcRenderer } = window.require('electron')
        ipcRenderer.send('min-app')
    } else if (ENVIRONMENT === 'Android') {
        const main = plus.android.runtimeMainActivity()
        main.moveTaskToBack(false)
    }
}

</script>

<style scoped lang="scss">
.system-wrap {
    font-size: 30px;
}

.system-wrap i {
    margin: 0 10px;
    color: #fff;
}
</style>
