import { readFileSync } from "fs";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

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
