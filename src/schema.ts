import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
  boolean,
  jsonb,
  serial,
  text,
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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const tests = pgTable('tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  category: varchar('category', { length: 256 }).notNull(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

interface Answer {
  option: string;
  isCorrect: boolean;
}

interface TestData {
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

export const procedures = pgTable('procedures', {
  id: uuid('id').primaryKey().defaultRandom(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

type Step = {
  step: string;
};

interface ProcedureData {
  name: string;
  procedure: string;
  algorithm: Step[];
}

export interface Procedure {
  data: ProcedureData;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export type ExtendedProcedure = Omit<Procedure, 'data'> & { data: unknown };

export const customersMessages = pgTable('customers_messages', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export type CustomerMessage = typeof customersMessages.$inferSelect;
export type NewCustomerMessage = typeof customersMessages.$inferInsert;

export const completedTests = pgTable('completed_tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId', { length: 256 }).notNull(),
  score: integer('score').notNull(),
  testResult: jsonb('testResult').notNull(),
  completedAt: timestamp('completedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

type FormattedAnswer = { questionId: string; answer: boolean };

export interface CompletedTest {
  id: string;
  userId: string;
  score: number;
  testResult: FormattedAnswer[];
  completedAt?: Date;
}

export type ExtendedCompletedTest = Omit<CompletedTest, 'testResult'> & {
  testResult: unknown;
};

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
