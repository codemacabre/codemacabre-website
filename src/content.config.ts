import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const notesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/notes' }),
  schema: () => z.object({
    category: z.string(),
    date: z.date(),
    description: z.string(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
    title: z.string(),
    update: z.date().optional()
  })
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/projects' }),
  schema: () => z.object({
    current: z.boolean(),
    date: z.date(),
    description: z.string(),
    endDate: z.date().optional(),
    featured: z.boolean(),
    status: z.string(),
    title: z.string()
  })
});

export const collections = {
  'notes': notesCollection,
  'projects': projectsCollection
};
