import { sql } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const customersMessages = pgTable('customers_messages', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updatedAt'),
});

export interface CustomerMessage {
  id: number;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export type NewCustomerMessage = Omit<
  CustomerMessage,
  'id' | 'createdAt' | 'updatedAt'
>;
