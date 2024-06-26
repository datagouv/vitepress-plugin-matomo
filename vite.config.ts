import { resolve } from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';


export default defineConfig({
    plugins: [eslint()],
    build: {
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/main.ts'),
          formats: ['es'],
          name: 'VitepressPluginMatomo',
          // the proper extensions will be added
          fileName: 'vitepress-plugin-matomo',
        },
        sourcemap: true,
      },
});
