import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import { preventEllipsis } from '/plugins/preventEllipsis';

export default defineConfig({
  site: 'https://codemacabre.com',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [preventEllipsis],
    remarkRehype: {
      clobberPrefix: 'note-',
      footnoteBackContent: '↑',
      footnoteLabelProperties: {
        className: ''
      }
    },
  }
});
