import {
  defineConfig
} from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //给内部的脚手架 配置解析
  resolve: {
    //路径别名的配置
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global:{}
  },
  server: {
        host:'0.0.0.0'
  }
})