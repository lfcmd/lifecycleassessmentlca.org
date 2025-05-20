import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// In vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/', // 如果部署在根目录，使用'/'
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // 确保JS模块正确发送
        format: 'es',
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  }
})
