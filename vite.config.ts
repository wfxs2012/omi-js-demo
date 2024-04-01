import { defineConfig } from 'vite'
// @ts-ignore
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'h.f',
    jsxInject: `import { h } from 'omi'`,
  },
  resolve: {
    alias: {
      '@': resolve('./src/'),
    },
  },
})
