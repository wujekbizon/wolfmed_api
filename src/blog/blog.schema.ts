import { sql } from 'drizzle-orm';
import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 256 }).notNull(),
  date: varchar('date', { length: 64 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export type Post = typeof blogPosts.$inferSelect;
