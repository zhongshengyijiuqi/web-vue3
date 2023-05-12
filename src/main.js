import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' //状态管理器
import Components from '@/components' //公共组件
import directives from '@/extend/directives.js' //指令

import '@/plugins' //公共插件框架
import echarts from '@/plugins/echarts.js';
import storage from '@/plugins/storage.js';
import utils from '@/utils'
import '@/assets/main.scss'
const app = createApp(App)

app.config.globalProperties.$utils = utils;
app.config.globalProperties.$echarts = echarts;
app.config.globalProperties.$storage = storage;

for (const key in Components) { // 挂载多个组件
  app.component(key, Components[key]);
}
for (const key in directives) { // 挂载多个指令
  app.directive(key, directives[key])
}

app.use(createPinia())
app.use(router)

app.mount('#app')

