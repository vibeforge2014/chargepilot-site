import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: process.env.SITE_BASE_PATH
    ? `${process.env.SITE_BASE_PATH.replace(/\/$/, "")}/`
    : "./",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        pricing: resolve(import.meta.dirname, "pricing.html"),
        terms: resolve(import.meta.dirname, "terms-of-service.html"),
        privacy: resolve(import.meta.dirname, "privacy-policy.html"),
        refund: resolve(import.meta.dirname, "refund-policy.html"),
        welcome: resolve(import.meta.dirname, "welcome/index.html")
      }
    }
  }
});
