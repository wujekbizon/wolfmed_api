import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  varchar,
  integer,
  jsonb,
  timestamp,
} from 'drizzle-orm/pg-core';

export const completedTests = pgTable('completed_tests', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: varchar('userId', { length: 256 }).notNull(),
  score: integer('score').notNull(),
  testResult: jsonb('testResult').notNull(),
  completedAt: timestamp('completedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type FormattedAnswer = { questionId: string; answer: boolean };

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
