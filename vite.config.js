import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 将 @ 设置为项目根目录下的 src 目录
    },
  },
  server: {
    proxy: {
      // 将以 '/api' 开头的请求代理到目标服务器
      '/api': {
        target: 'http://localhost:8099', // 目标服务器地址
        // target: 'gplhp.back1.hpnu.cn', // 目标服务器地址
        changeOrigin: true, // 设置为 true，以便正确处理跨域请求
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径，去掉 '/api' 前缀
      },
    },
  },
})
