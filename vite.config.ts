// 新增 path 模块导入（必须）
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ 正确声明一次（删除重复的 base）
  plugins: [react()], // ✅ 只保留一个 plugins 配置
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'terser',
  },
  resolve: {
    // ✅ 修复语法结构：补全 alias 闭合括号
    alias: {
      '@': path.resolve(__dirname, './src')
    }, // ← 这里需要闭合 alias 对象
    // ✅ 将 rollupOptions 移动到正确位置
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
