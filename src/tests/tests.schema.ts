import { sql } from 'drizzle-orm';
import { pgTable, uuid, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const tests = pgTable('tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 256 }).notNull(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export interface Answer {
  option: string;
  isCorrect: boolean;
}

export interface TestData {
  question: string;
  answers: Answer[];
}

export interface Test {
  id: string;
  data: TestData;
  category: string;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export type ExtendedTest = Omit<Test, 'data'> & { data: unknown };
