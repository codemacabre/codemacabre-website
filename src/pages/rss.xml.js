import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { getContainerRenderer as getMDXRenderer } from '@astrojs/mdx';
import { loadRenderers } from 'astro:container';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const notes = await getCollection('notes');

  const items = [];
  for (const note of notes) {
    const { Content } = await note.render();
    let content = await container.renderToString(Content);
    const link = new URL(`/notes/${note.slug}`, context.url.origin).toString();
    const customData = '<dc:creator>Myles Lewando</dc:creator>';
    
    content = content.replace('src="/', `src="${context.site}`).replace('href="/', `href="${context.site}`);
    items.push({ ...note.data, link, customData, content });
  }

  return rss({
    title: 'Code Macabre',
    description: 'Notes from Myles Lewando',
    site: context.site,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/'
    },
    items,
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" /><language>en-gb</language>`
  });
}
