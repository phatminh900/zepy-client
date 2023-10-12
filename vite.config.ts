/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    nodePolyfills({
      // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
      include: ["path"],
      // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
      exclude: [
        "fs", // Excludes the polyfill for `fs` and `node:fs`.
      ],
      // Whether to polyfill specific globals.
      globals: {
        Buffer: true, // can also be 'build', 'dev', or false
        global: true,
        process: true,
      },
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTest.ts"],
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  resolve: {
    alias: {
      src: "/src/",
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
  },
});
