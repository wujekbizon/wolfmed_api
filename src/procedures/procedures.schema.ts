import { sql } from 'drizzle-orm';
import { pgTable, uuid, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const procedures = pgTable('procedures', {
  id: uuid('id').primaryKey().defaultRandom(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export type Step = {
  step: string;
};

export interface ProcedureData {
  name: string;
  procedure: string;
  algorithm: Step[];
}

export interface Procedure {
  id: string;
  data: ProcedureData;
  createdAt?: Date;
  updatedAt?: Date | null;
}

export type ExtendedProcedure = Omit<Procedure, 'data'> & { data: unknown };
