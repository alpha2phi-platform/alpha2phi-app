/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      cypress: true,
      requireEnv: false,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  server: {
    host: true,
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
});
