import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In dev, Vite serves the UI on :3001 and proxies the API + WebSocket to Express on :3000,
// so the browser sees a single origin — the same as in production.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: {
      "/api": { target: "http://localhost:3000" },
      "/socket.io": { target: "http://localhost:3000", ws: true },
    },
  },
});
