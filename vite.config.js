import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path"; //added

// https://vite.dev/config/
export default defineConfig({
  // plugins: [vue()],
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
