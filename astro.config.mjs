import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://codemacabre.com',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkRehype: {
      clobberPrefix: 'note-',
      footnoteBackContent: '↑',
    },
  }
});
