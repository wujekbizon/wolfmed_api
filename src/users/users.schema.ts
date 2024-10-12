import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId', { length: 256 }).notNull().unique(),
  username: varchar('username', { length: 256 }).default('').notNull(),
  motto: varchar('motto').default('').notNull(),
  testLimit: integer('testLimit').default(1000),
  createdAt: timestamp('createdAt').default(sql`CURRENT_TIMESTAMP`),
  supporter: boolean('supporter').default(false).notNull(),
  updatedAt: timestamp('updatedAt'),
});

export type User = {
  userId: string;
  username?: string;
  motto?: string;
  testLimit?: number;
  createdAt?: Date;
  supporter?: boolean;
  updatedAt?: Date;
};
