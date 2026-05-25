// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@api": path.resolve(__dirname, "./src/api"),
      // '@assets': path.resolve(__dirname, './src/assets'),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utilities": path.resolve(__dirname, "./src/utilities"),
      "@helpers": path.resolve(__dirname, "./src/helpers"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
