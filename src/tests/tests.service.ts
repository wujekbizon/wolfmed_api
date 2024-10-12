import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { tests, Test, ExtendedTest } from './tests.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class TestsService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllTests(): Promise<ExtendedTest[]> {
    return this.db.select().from(tests);
  }

  async getTestById(id: string): Promise<ExtendedTest> {
    const result = await this.db.select().from(tests).where(eq(tests.id, id));

    if (result.length === 0) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return result[0];
  }
}
