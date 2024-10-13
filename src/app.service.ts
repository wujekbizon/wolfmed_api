import { Injectable, Inject } from '@nestjs/common';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm/sql';

@Injectable()
export class AppService {
  constructor(@Inject('DRIZZLE_ORM') private readonly db: NeonHttpDatabase) {}

  async getTable(name: string): Promise<any[]> {
    // This is a placeholder. You should replace it with a proper Drizzle query
    // once you have your schema and tables set up.
    const result = await this.db.execute(
      sql`SELECT * FROM ${sql.identifier(name)}`,
    );
    return result.rows;
  }
}
