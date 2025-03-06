// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/NewsWave/',  // Set base path for GitHub Pages deployment
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
