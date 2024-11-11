import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'

const defaultBuildConfig: BuildConfig = {
  entrypoints: ['./src/index.ts'],
  outdir: './dist'
}

await Promise.all([
  Bun.build({
    ...defaultBuildConfig,
    target: "bun",
    plugins: [dts()],
    format: 'esm',
    naming: "[dir]/[name].js",
  }),
])
