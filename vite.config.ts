/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "TSAlgorithms",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => {
        switch (format) {
          case "es":
            return `ts-algorithms.mjs`;
          case "cjs":
            return `ts-algorithms.cjs`;
          case "umd":
            return `ts-algorithms.umd.js`;
          default:
            return `ts-algorithms.${format}.js`;
        }
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      rollupTypes: true,
      include: ["src"],
      exclude: ["src/**/*.test.ts", "src/**/*.spec.ts"],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
