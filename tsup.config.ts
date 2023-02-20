import {defineConfig} from 'tsup'

export default defineConfig({
    entry: [
        'src/index.ts'
    ],
    external: ['@qwik-city-plan'],
    dts: true,
    clean: true,
    minify: true,
    format: ['cjs', 'esm']
})