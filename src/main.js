import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' //状态管理器
import requestApi from '@/request/axios' //api
import Components from '@/components' //公共组件

import directives from '@/extend/directives.js' //指令
import plugins from '@/plugins' //公共插件框架

import utils from '@/utils'
import '@/assets/main.scss'


const app = createApp(App)

app.use(createPinia())

import { useStore } from '@/store'
const store = useStore();

app.config.globalProperties.$utils = utils;

let axios = requestApi(app.config.globalProperties, store)
app.config.globalProperties.$axios = axios;

for (const key in plugins) { // 挂载多个全局公共插件框架
  let name = plugins[key]
  app.config.globalProperties['$' + key] = name;
}
for (const key in Components) { // 挂载多个组件
  app.component(key, Components[key]);
}
for (const key in directives) { // 挂载多个指令
  app.directive(key, directives[key])
}


app.use(router)

app.mount('#app')

