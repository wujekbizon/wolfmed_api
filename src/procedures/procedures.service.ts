import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { procedures, ExtendedProcedure } from './procedures.schema';

@Injectable()
export class ProceduresService {
  constructor(@Inject('DRIZZLE_ORM') private db: PostgresJsDatabase) {}

  async getAllProcedures(): Promise<ExtendedProcedure[]> {
    return this.db.select().from(procedures);
  }
}
