import { readFileSync } from "node:fs";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // Configuration for dev server to use firebase signInWithRedirect
  server: {
    https: {
      // Create a certificate for localhost
      key: readFileSync("certs/localhost.key"),
      cert: readFileSync("certs/localhost.crt"),
    },
    proxy: {
      "/__/auth": {
        target: "https://wallet.allenjoseph.dev",
        changeOrigin: true,
      },
    },
  },
});
