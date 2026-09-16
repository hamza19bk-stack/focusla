import { defineConfig } from 'astro/config';

// Custom domain on GitHub Pages => site is the apex domain, base stays '/'.
export default defineConfig({
  site: 'https://focusla.shop',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
