import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { imagetools } from 'vite-imagetools';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    imagetools({
      cache: { enabled: true },
      include: '**\/*.\{heif,avif,jpeg,jpg,JPG,png,tiff,webp,gif\}?*'
    }),
    ViteImageOptimizer({
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 70,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 70,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 70,
        progressive: true,
      },
      tiff: {
        // https://sharp.pixelplumbing.com/api-output#tiff
        quality: 70,
      },
      // gif does not support lossless compression
      // https://sharp.pixelplumbing.com/api-output#gif
      gif: {},
      webp: {
        // https://sharp.pixelplumbing.com/api-output#webp
        quality: 70,
      },
      avif: {
        // https://sharp.pixelplumbing.com/api-output#avif
        lossless: true,
      },
      cache: true,
      cacheLocation: './node_modules/.cache/viteimageoptimizer'
    }),
  ],
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.JPG'],
});

