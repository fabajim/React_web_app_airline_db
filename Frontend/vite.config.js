import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import http from "https";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        agent: new http.Agent()
      },
    },
  },
  plugins: [react()],
});
