import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
    },
  },
  build: { chunkSizeWarningLimit: 10000 },
});
