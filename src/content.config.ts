import { z, defineCollection } from 'astro:content';

const notesCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
    category: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    title: z.string(),
    update: z.date().optional(),
  })
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: () => z.object({
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
  'projects': projectsCollection,
};
