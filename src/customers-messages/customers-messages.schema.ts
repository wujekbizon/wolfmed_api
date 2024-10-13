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

export type CustomerMessage = typeof customersMessages.$inferSelect;
export type NewCustomerMessage = typeof customersMessages.$inferInsert;
