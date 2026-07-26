import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
  define: {
    // This tells Vite to replace any instance of 'global' with 'globalThis'
    // globalThis works across browser, Node, workers, and jsdom,
    // window only exists in browser-like environments.
    // globalThis reduces environment-specific edge cases in tests and tooling.
    global: "globalThis",
  },
});
