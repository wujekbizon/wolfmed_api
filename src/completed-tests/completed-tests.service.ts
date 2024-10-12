import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import {
  completedTests,
  ExtendedCompletedTest,
} from './completed-tests.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class CompletedTestsService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getCompletedTestsByUser(
    userId: string,
  ): Promise<ExtendedCompletedTest[]> {
    return this.db
      .select()
      .from(completedTests)
      .where(eq(completedTests.userId, userId));
  }

  async getCompletedTest(id: string): Promise<ExtendedCompletedTest> {
    const result = await this.db
      .select()
      .from(completedTests)
      .where(eq(completedTests.id, id));

    if (result.length === 0) {
      throw new NotFoundException(`Completed test with ID ${id} not found`);
    }

    return result[0];
  }

  async deleteCompletedTest(id: string): Promise<void> {
    const result = await this.db
      .delete(completedTests)
      .where(eq(completedTests.id, id))
      .returning();

    if (result.length === 0) {
      throw new NotFoundException(`Completed test with ID ${id} not found`);
    }
  }
}
