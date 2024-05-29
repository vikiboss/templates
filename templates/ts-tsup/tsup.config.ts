import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: true,
  outDir: 'dist',
  sourcemap: true,
  target: 'es6',
  treeshake: 'recommended',
  splitting: true,
  format: ['esm', 'cjs']
})
