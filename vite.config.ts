import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vite không mặc định cung cấp process.env cho client.
    // Cấu hình này sẽ thay thế process.env.API_KEY trong code bằng giá trị thực
    // từ biến môi trường lúc build, theo đúng yêu cầu bảo mật.
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})