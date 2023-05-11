import { defineConfig, loadEnv } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'  //插件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, __dirname)
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: false,
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    base: './',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      }
    },
    css: {
      // 全局样式配置
      preprocessorOptions: {
        // scss: {
        //   additionalData: `@import "@/assets/base.scss";`,
        // },
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // 不生成 source map 
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
    server: {
      host: 'localhost',
      port: '8081',
      open: false,
    }
  }
})