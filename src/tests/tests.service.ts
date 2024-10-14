import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { tests } from './tests.schema';
import { eq } from 'drizzle-orm';
import { ExtendedTest } from 'src/schema';
import { TestDto } from './dto/test.dto';

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

  async createTest(testDto: TestDto): Promise<ExtendedTest> {
    const { data, category } = testDto;
    const newTest = await this.db
      .insert(tests)
      .values({
        data,
        category,
      })
      .returning();
    return newTest[0];
  }

  async updateTest(id: string, testDto: TestDto): Promise<ExtendedTest> {
    const { data, category } = testDto;
    const updatedTest = await this.db
      .update(tests)
      .set({ data, category })
      .where(eq(tests.id, id))
      .returning();
    return updatedTest[0];
  }

  async deleteTest(id: string): Promise<void> {
    await this.db.delete(tests).where(eq(tests.id, id));
  }
}
