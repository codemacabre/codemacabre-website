import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const notes = await getCollection('notes');
  return rss({
    title: 'Code Macabre',
    description: 'Notes from Myles Lewando',
    site: context.site,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      dc: "http://purl.org/dc/elements/1.1/"
    },
    items: notes.map((note) => ({
      title: note.data.title,
      pubDate: note.data.date,
      description: note.data.description,
      link: `/notes/${note.slug}/`,
      content: sanitizeHtml(parser.render(note.body).replace('src="/', `src="${context.site}`).replace('href="/', `href="${context.site}`), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['code', 'pre', 'img'])
      }),
      customData: '<dc:creator>Myles Lewando</dc:creator>',
    })),
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" /><language>en-gb</language>`,
  });
}
