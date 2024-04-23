import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    },
  },
  build: {
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
      },
    },
  },
});
