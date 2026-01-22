
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 修改為相對路徑 './'，這樣無論您的 GitHub Repository 名稱是什麼，都能正確讀取資源
  base: './',
})
